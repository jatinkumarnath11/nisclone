import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { redis, createRedisSubscriber } from '../config/redis';
import { logger } from '../config/logger';
import { verifyAccessToken } from '../utils/jwt.util';
import { registerNotificationHandlers } from './notification.socket';
import { registerChatHandlers } from './chat.socket';
import { registerTransportHandlers } from './transport.socket';

export interface AuthenticatedSocket extends Socket {
  data: {
    userId: string;
    email: string;
    roles: string[];
  };
}

let io: Server | null = null;

export const initSocketServer = (httpServer: HttpServer): Server => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingTimeout: 60000,
  });

  // Redis Adapter for multi-instance scaling
  try {
    const pubClient = redis;
    const subClient = createRedisSubscriber();
    io.adapter(createAdapter(pubClient, subClient));
    logger.info('Socket.IO configured with Redis Pub/Sub adapter');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    logger.warn(`Redis adapter disabled for Socket.IO (running standalone mode): ${message}`);
  }

  // Socket Authentication Middleware
  io.use((socket, next) => {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.split(' ')[1];

    if (!token) {
      return next(new Error('Authentication error: Missing token'));
    }

    try {
      const payload = verifyAccessToken(token);
      socket.data = {
        userId: payload.userId,
        email: payload.email,
        roles: payload.roles,
      };
      next();
    } catch (_err) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket: Socket) => {
    const authSocket = socket as AuthenticatedSocket;
    const { userId, email } = authSocket.data;

    logger.info(`Socket client connected: ${authSocket.id} (User: ${email})`);

    // Join personal user room for direct targeting
    authSocket.join(`user:${userId}`);

    // Register domain-specific event handlers
    registerNotificationHandlers(io!, authSocket);
    registerChatHandlers(io!, authSocket);
    registerTransportHandlers(io!, authSocket);

    authSocket.on('disconnect', (reason) => {
      logger.info(`Socket client disconnected: ${authSocket.id} (${reason})`);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.io has not been initialized. Call initSocketServer first.');
  }
  return io;
};
