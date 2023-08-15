import { Module } from '@nestjs/common';
import { RegisterChannelCommand } from './set-channel';
import { DiscordModule } from '@discord-nestjs/core';
import { ChannelModule } from '../../channel';

@Module({
  imports: [DiscordModule.forFeature(), ChannelModule],
  providers: [RegisterChannelCommand],
})
export class CommandModule {}
