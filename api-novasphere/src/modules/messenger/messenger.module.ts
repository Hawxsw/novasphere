import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';
import { MessengerGateway } from './messenger.gateway';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MessengerService, MessengerGateway],
  controllers: [MessengerController],
  exports: [MessengerService],
})
export class MessengerModule { } 