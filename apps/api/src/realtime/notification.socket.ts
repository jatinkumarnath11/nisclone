import { Server } from 'socket.io';
import { AuthenticatedSocket } from './socket';

export const NOTIFICATION_EVENTS = {
  NEW_NOTIFICATION: 'notification:new',
  NOTICE_PUBLISHED: 'notice:published',
  ATTENDANCE_UPDATED: 'attendance:updated',
  ASSIGNMENT_SUBMITTED: 'assignment:submitted',
  RESULT_PUBLISHED: 'result:published',
  FEE_PAYMENT: 'fee:payment',
  COMPLAINT_UPDATED: 'complaint:updated',
} as const;

export const registerNotificationHandlers = (
  io: Server,
  socket: AuthenticatedSocket
): void => {
  const { userId } = socket.data;

  socket.on('notification:read', (data: { notificationId: string }) => {
    // Acknowledge notification marked as read
    socket.emit('notification:ack', { id: data.notificationId, isRead: true });
  });
};

export const emitToUser = (
  io: Server,
  userId: string,
  event: string,
  payload: unknown
): void => {
  io.to(`user:${userId}`).emit(event, payload);
};

export const broadcastNotice = (io: Server, notice: unknown): void => {
  io.emit(NOTIFICATION_EVENTS.NOTICE_PUBLISHED, notice);
};
