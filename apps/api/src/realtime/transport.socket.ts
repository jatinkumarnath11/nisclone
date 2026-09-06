import { Server } from 'socket.io';
import { AuthenticatedSocket } from './socket';

export const TRANSPORT_EVENTS = {
  BUS_LOCATION_UPDATE: 'bus:location',
  SUBSCRIBE_ROUTE: 'transport:subscribe_route',
  UNSUBSCRIBE_ROUTE: 'transport:unsubscribe_route',
} as const;

export interface BusLocationPayload {
  busId: string;
  routeId: string;
  latitude: number;
  longitude: number;
  speed?: number;
  heading?: number;
  timestamp: string;
}

export const registerTransportHandlers = (
  io: Server,
  socket: AuthenticatedSocket
): void => {
  socket.on(TRANSPORT_EVENTS.SUBSCRIBE_ROUTE, (data: { routeId: string }) => {
    socket.join(`route:${data.routeId}`);
  });

  socket.on(TRANSPORT_EVENTS.UNSUBSCRIBE_ROUTE, (data: { routeId: string }) => {
    socket.leave(`route:${data.routeId}`);
  });

  // Drivers broadcast bus location
  socket.on(TRANSPORT_EVENTS.BUS_LOCATION_UPDATE, (data: BusLocationPayload) => {
    io.to(`route:${data.routeId}`).emit(TRANSPORT_EVENTS.BUS_LOCATION_UPDATE, data);
  });
};
