import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';

import { ChannelService } from './channel.service';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [ChannelService],
  exports: [ChannelService],
})
export class ChannelModule {}
