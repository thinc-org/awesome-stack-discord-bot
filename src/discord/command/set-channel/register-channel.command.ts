import { SlashCommandPipe } from '@discord-nestjs/common';
import {
  Command,
  EventParams,
  Handler,
  InteractionEvent,
} from '@discord-nestjs/core';
import { ClientEvents } from 'discord.js';

import { SetChannelDto } from './dto';

@Command({
  name: 'register',
  description: 'register channel',
})
export class RegisterChannelCommand {
  @Handler()
  onPlayCommand(
    @InteractionEvent(SlashCommandPipe) dto: SetChannelDto,
    @EventParams() args: ClientEvents['interactionCreate'],
  ): string {
    console.log('DTO', dto);
    console.log('Event args', args);

    return `Channel Id is ${dto.song}.`;
  }
}
