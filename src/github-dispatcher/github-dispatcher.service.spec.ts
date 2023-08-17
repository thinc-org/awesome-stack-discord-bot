import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { ParsingModule } from '../parsing/parsing.module';
import { GithubDispatcherService } from './github-dispatcher.service';

describe('GithubDispatcherService', () => {
  let service: GithubDispatcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ParsingModule, ConfigModule.forRoot()],
      providers: [GithubDispatcherService],
    }).compile();

    service = module.get<GithubDispatcherService>(GithubDispatcherService);
  });

  it('should be ok', async () => {
    await service.triggerBuild({
      package_url: 'https://entgo.io/',
      from_server: 'thinc',
      by_user: 'byte',
    });
  });
});
