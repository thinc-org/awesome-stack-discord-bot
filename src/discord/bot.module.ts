import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { CommandModule } from './command';

@Module({
  imports: [DiscordModule.forFeature(), CommandModule],
  providers: [],
})
export class BotModule {}
