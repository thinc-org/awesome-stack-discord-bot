import { Module } from '@nestjs/common';
import { RegisterChannelCommand } from './register-channel';
import { DiscordModule } from '@discord-nestjs/core';

import { ChannelModule } from '../../channel';
import { ShowcaseCommand } from './showcase/showcase.command';
import { GithubDispatcherModule } from '../../github-dispatcher';

@Module({
  imports: [DiscordModule.forFeature(), ChannelModule, GithubDispatcherModule],
  providers: [RegisterChannelCommand, ShowcaseCommand],
})
export class CommandModule {}
