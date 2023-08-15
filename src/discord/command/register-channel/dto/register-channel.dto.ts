import { Channel, Param } from '@discord-nestjs/core';
import { ChannelType } from 'discord.js';

export class SetChannelDto {
  @Channel([ChannelType.GuildText])
  @Param({
    name: 'channel',
    description: 'The channel to set as the showcase channel',
    required: true,
  })
  channel: string;
}
