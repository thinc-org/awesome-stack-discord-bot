import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { CommandModule } from './command';
import { BotGateway } from './bot.gateway';

@Module({
  imports: [DiscordModule.forFeature(), CommandModule],
  providers: [BotGateway],
})
export class BotModule {}
