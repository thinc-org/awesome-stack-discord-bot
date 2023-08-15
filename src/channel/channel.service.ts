import { Injectable, Logger } from '@nestjs/common';
import { db } from '../db';
import { InjectDiscordClient } from '@discord-nestjs/core';
import { Client } from 'discord.js';

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
  ) {}

  async createChannelOrUpdateIfExist({
    channelId,
    guildId,
    name,
  }: CreateChannelOrUpdateIfExistArgs): Promise<void> {
    try {
      await db
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

  async sendShowcaseMessage(
    guildId: string,
    packageName: string,
    userId: string,
  ): Promise<void> {
    const { channel_id: channelId } = await db
      .selectFrom('guilds')
      .where('guild_id', '=', guildId)
      .select('channel_id')
      .executeTakeFirst();

    const chan = this.client.channels.cache.get(channelId);
    if (chan.isTextBased()) {
      await chan.send(`${packageName} \nfrom <@${userId}>`);
    }
  }
}
