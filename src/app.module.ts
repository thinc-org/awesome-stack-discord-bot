import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GatewayIntentBits } from 'discord.js';

import { BotModule } from './discord';
import { ChatgptModule } from './chatgpt/chatgpt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('DISCORD_TOKEN'),
        discordClientOptions: {
          intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
        },
        registerCommandOptions: [
          {
            removeCommandsBefore: true,
          },
        ],
      }),
    }),
    BotModule,
    ChatgptModule,
  ],
})
export class AppModule {}
