import { Module } from '@nestjs/common';
import { ParsingModule } from 'src/parsing/parsing.module';
import { GithubDispatcherService } from './github-dispatcher.service';

@Module({
  imports: [ParsingModule],
  controllers: [],
  providers: [GithubDispatcherService],
})
export class GithubDispatcherModule {}
