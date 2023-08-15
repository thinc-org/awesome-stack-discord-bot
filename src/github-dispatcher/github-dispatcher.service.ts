import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import { discordRequestDTO } from './dto';
import { ParsingService } from '../parsing/parsing.service';

@Injectable()
export class GithubDispatcherService {
  private log = new Logger(GithubDispatcherService.name);
  constructor(
    private readonly parsingService: ParsingService,
    private readonly configService: ConfigService,
  ) {}

  public async triggerBuild(data: discordRequestDTO): Promise<void> {
    const title = this.parsingService.getTitle(data.package_url);
    const body = {
      event_type: 'bot-webhook',
      client_payload: {
        package_name: title,
        tags: data.tags,
        package_url: data.package_url,
        from_server: data.from_server,
        by_user: data.by_user,
      },
    };
    try {
      await axios.post(this.configService.get('GITHUB_DISPATCH_URL'), body, {
        headers: {
          Accept: 'application/vnd.github.everest-preview+json',
          Authorization: `Bearer ${this.configService.get('GITHUB_TOKEN')}`,
          Host: 'api.github.com',
        },
      });
    } catch (error) {
      this.log.error(error);
    }
  }
}
