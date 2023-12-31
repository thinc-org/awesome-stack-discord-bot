import { InjectDiscordClient } from '@discord-nestjs/core';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Client } from 'discord.js';

import { Kysely } from 'kysely';
import { DB } from 'src/db/types';

interface CreateChannelOrUpdateIfExistArgs {
  guildId: string;
  name: string;
  channelId: string;
}

@Injectable()
export class ChannelService {
  private log = new Logger(ChannelService.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    @Inject('DB_INSTANCE')
    private readonly db: Kysely<DB>,
  ) {}

  async createChannelOrUpdateIfExist({
    channelId,
    guildId,
    name,
  }: CreateChannelOrUpdateIfExistArgs): Promise<void> {
    try {
      await this.db
        .insertInto('guilds')
        .values({
          channel_id: channelId,
          guild_id: guildId,
          name: name,
        })
        .onConflict((oc) =>
          oc.column('guild_id').doUpdateSet({ channel_id: channelId, name }),
        )
        .execute();
    } catch (error) {
      this.log.warn(error);
      throw error;
    }
  }
}
