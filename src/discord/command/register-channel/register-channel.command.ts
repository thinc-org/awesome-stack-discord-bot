import { SlashCommandPipe } from '@discord-nestjs/common';
import {
  Command,
  EventParams,
  Handler,
  InteractionEvent,
} from '@discord-nestjs/core';
import { ClientEvents } from 'discord.js';

import { SetChannelDto } from './dto';
import { ChannelService } from '../../../channel';
import { Injectable } from '@nestjs/common';

@Command({
  name: 'register',
  description: 'register channel',
})
@Injectable()
export class RegisterChannelCommand {
  constructor(private channelService: ChannelService) {}

  @Handler()
  async onPlayCommand(
    @InteractionEvent(SlashCommandPipe) dto: SetChannelDto,
    @EventParams() args: ClientEvents['interactionCreate'],
  ): Promise<string> {
    await this.channelService.createChannelOrUpdateIfExist({
      guildId: args[0].guildId,
      name: args[0].guild.name,
      channelId: dto.channel,
    });
    return 'Registration was successful!';
  }
}
