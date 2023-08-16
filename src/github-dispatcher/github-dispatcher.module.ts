import { Module } from '@nestjs/common';

import { ChatgptModule } from 'src/chatgpt/chatgpt.module';
import { GithubDispatcherService } from './github-dispatcher.service';

@Module({
  imports: [ChatgptModule],
  providers: [GithubDispatcherService],
  exports: [GithubDispatcherService],
})
export class GithubDispatcherModule {}
