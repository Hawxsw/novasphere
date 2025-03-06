import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WhatsAppModule } from './modules/whatsapp/whatsapp.module';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { MessengerModule } from './modules/messenger/messenger.module';
import { OrganizationModule } from './modules/organization/organization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    WhatsAppModule,
    ChatbotModule,
    MessengerModule,
    OrganizationModule,
  ],
})
export class AppModule {}
