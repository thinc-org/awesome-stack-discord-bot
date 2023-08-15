import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { DiscordModule } from '@discord-nestjs/core';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [ChannelService],
  exports: [ChannelService],
})
export class ChannelModule {}
