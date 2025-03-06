import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('messenger')
export class MessengerController {
    constructor(
        private readonly messengerService: MessengerService
    ) { }

    @Post('message')
    async sendMessage(@Body() messageData: CreateMessageDto) {
        return await this.messengerService.createMessage(messageData);
    }

    @Get('messages/:userId')
    async getUserMessages(@Param('userId') userId: string) {
        return await this.messengerService.findUserMessages(userId);
    }

    @Get('groups/:userId')
    async getUserGroups(@Param('userId') userId: string) {
        return await this.messengerService.findUserGroups(userId);
    }

    @Post('group')
    async createGroup(@Body() groupData: CreateGroupDto) {
        return await this.messengerService.createGroup(groupData);
    }

    @Post('messages/:messageId/read')
    async markMessageAsRead(
        @Param('messageId') messageId: string,
        @Body('userId') userId: string
    ) {
        return await this.messengerService.markMessageAsRead(messageId, userId);
    }
} 