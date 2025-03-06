import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const client: Socket = context.switchToWs().getClient();
        const token = client.handshake.auth.token || client.handshake.headers.authorization;

        try {
            const decoded = verify(token, process.env.JWT_SECRET);
            client.data.user = decoded;
            return true;
        } catch (err) {
            return false;
        }
    }
} 