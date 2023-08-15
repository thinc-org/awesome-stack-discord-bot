import { Module } from '@nestjs/common';
import { ParsingModule } from 'src/parsing/parsing.module';
import { GithubDispatcherService } from './github-dispatcher.service';

@Module({
  imports: [ParsingModule],
  providers: [GithubDispatcherService],
  exports: [GithubDispatcherService],
})
export class GithubDispatcherModule {}
