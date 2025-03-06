import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '../auth/guards/ws-jwt-auth.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseGuards(WsJwtAuthGuard)
export class MessengerGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets: Map<string, string[]> = new Map();

  handleConnection(client: Socket) {
    const userId = client.data.user.id;
    const existingSockets = this.userSockets.get(userId) || [];
    this.userSockets.set(userId, [...existingSockets, client.id]);
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.user.id;
    const existingSockets = this.userSockets.get(userId) || [];
    this.userSockets.set(
      userId,
      existingSockets.filter(socketId => socketId !== client.id),
    );
  }

  emitToUser(userId: string, event: string, data: any) {
    const userSockets = this.userSockets.get(userId);
    if (userSockets) {
      userSockets.forEach(socketId => {
        this.server.to(socketId).emit(event, data);
      });
    }
  }

  emitToGroup(groupId: string, event: string, data: any) {
    this.server.to(`group:${groupId}`).emit(event, data);
  }

  @SubscribeMessage('joinGroup')
  handleJoinGroup(client: Socket, groupId: string) {
    client.join(`group:${groupId}`);
  }

  @SubscribeMessage('leaveGroup')
  handleLeaveGroup(client: Socket, groupId: string) {
    client.leave(`group:${groupId}`);
  }
} 