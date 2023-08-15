import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { Pool } from 'pg';

import { ChannelService } from './channel.service';
import { ConfigService } from '@nestjs/config';
import { PostgresDialect, Kysely } from 'kysely';
import { DB } from 'src/db/types';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [
    ChannelService,
    {
      provide: 'DB_INSTANCE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dialect = new PostgresDialect({
          pool: new Pool({
            database: configService.get('DB_NAME'),
            host: configService.get('DB_HOST'),
            user: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'),
            port: configService.get('DB_PORT'),
          }),
        });

        return new Kysely<DB>({
          dialect,
        });
      },
    },
  ],
  exports: [ChannelService],
})
export class ChannelModule {}
