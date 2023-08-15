import { Module } from '@nestjs/common';
import { RegisterChannelCommand } from './set-channel';
import { DiscordModule } from '@discord-nestjs/core';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [RegisterChannelCommand],
})
export class CommandModule {}
