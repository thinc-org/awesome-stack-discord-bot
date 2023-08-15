import { Injectable, Logger } from '@nestjs/common';
import { db } from '../db';

interface CreateChannelOrUpdateIfExistArgs {
  guildId: string;
  name: string;
  channelId: string;
}

@Injectable()
export class ChannelService {
  private log = new Logger(ChannelService.name);
  async createChannelOrUpdateIfExist({
    channelId,
    guildId,
    name,
  }: CreateChannelOrUpdateIfExistArgs): Promise<void> {
    const result = await db
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
    this.log.debug(result);
  }
}
