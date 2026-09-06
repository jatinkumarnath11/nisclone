import { Server } from 'socket.io';
import { AuthenticatedSocket } from './socket';

export const CHAT_EVENTS = {
  NEW_MESSAGE: 'message:new',
  USER_TYPING: 'chat:typing',
  USER_STOP_TYPING: 'chat:stop_typing',
  JOIN_ROOM: 'chat:join',
  LEAVE_ROOM: 'chat:leave',
} as const;

export const registerChatHandlers = (io: Server, socket: AuthenticatedSocket): void => {
  const { userId } = socket.data;

  socket.on(CHAT_EVENTS.JOIN_ROOM, (data: { conversationId: string }) => {
    socket.join(`conversation:${data.conversationId}`);
  });

  socket.on(CHAT_EVENTS.LEAVE_ROOM, (data: { conversationId: string }) => {
    socket.leave(`conversation:${data.conversationId}`);
  });

  socket.on(CHAT_EVENTS.USER_TYPING, (data: { conversationId: string }) => {
    socket.to(`conversation:${data.conversationId}`).emit(CHAT_EVENTS.USER_TYPING, {
      userId,
      conversationId: data.conversationId,
    });
  });

  socket.on(CHAT_EVENTS.USER_STOP_TYPING, (data: { conversationId: string }) => {
    socket.to(`conversation:${data.conversationId}`).emit(CHAT_EVENTS.USER_STOP_TYPING, {
      userId,
      conversationId: data.conversationId,
    });
  });
};
