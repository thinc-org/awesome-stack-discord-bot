import {
  Command,
  EventParams,
  Handler,
  InteractionEvent,
} from '@discord-nestjs/core';
import { ClientEvents } from 'discord.js';

import { SlashCommandPipe } from '@discord-nestjs/common';
import { Injectable } from '@nestjs/common';

import { ChannelService } from '../../../channel';
import { GithubDispatcherService } from '../../../github-dispatcher';
import { ShowcaseDto } from './dto';

@Command({
  name: 'show',
  description: 'showcase',
})
@Injectable()
export class ShowcaseCommand {
  constructor(
    private channelService: ChannelService,
    private githubDispatcher: GithubDispatcherService,
  ) {}

  @Handler()
  async onPlayCommand(
    @InteractionEvent(SlashCommandPipe) dto: ShowcaseDto,
    @EventParams() args: ClientEvents['interactionCreate'],
  ): Promise<string> {
    try {
      this.githubDispatcher.triggerBuild({
        by_user: args[0].user.username,
        from_server: args[0].guild.name,
        package_url: dto.package,
      });

      return `${dto.package} \nfrom <@${args[0].user.id}>`;
    } catch (error) {
      return 'Something went wrong!';
    }
  }
}
