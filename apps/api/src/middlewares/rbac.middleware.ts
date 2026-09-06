import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@ums/shared';
import { ForbiddenError, UnauthorizedError } from '../utils/errors.util';
import prisma from '@ums/database';

export const requireRoles = (...allowedRoles: (UserRole | string)[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user || !req.user.roles) {
      throw new UnauthorizedError('User authentication context missing');
    }

    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));

    if (!hasRole) {
      throw new ForbiddenError(
        `Insufficient privileges: requires one of [${allowedRoles.join(', ')}]`
      );
    }

    next();
  };
};

export const requirePermission = (action: string, subject: string) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError('User authentication context missing');
    }

    // Admins bypass granular permissions
    if (req.user.roles.includes(UserRole.ADMIN)) {
      return next();
    }

    try {
      const userPermissions = await prisma.userRoleMap.findMany({
        where: { userId: req.user.userId },
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      });

      const hasPermission = userPermissions.some((urp) =>
        urp.role.permissions.some(
          (rp) => rp.permission.action === action && rp.permission.subject === subject
        )
      );

      if (!hasPermission) {
        return next(
          new ForbiddenError(`Missing required permission: ${action} on ${subject}`)
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
