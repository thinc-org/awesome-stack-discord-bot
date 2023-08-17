import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import { ChatgptService } from 'src/chatgpt/chatgpt.service';
import { discordRequestDTO } from './dto';

@Injectable()
export class GithubDispatcherService {
  private log = new Logger(GithubDispatcherService.name);
  constructor(
    private readonly chatGPTService: ChatgptService,
    private readonly configService: ConfigService,
  ) {}

  public async triggerBuild(data: discordRequestDTO): Promise<void> {
    try {
      const chatGPTData = await this.chatGPTService.getProjectInfo(
        data.package_url,
      );
      const body = {
        event_type: 'bot-webhook',
        client_payload: {
          package_name: chatGPTData.name,
          tags: chatGPTData.tags,
          desc: chatGPTData.desc,
          package_url: data.package_url,
          from_server: data.from_server,
          by_user: data.by_user,
        },
      };

      await axios.post(this.configService.get('GITHUB_DISPATCH_URL'), body, {
        headers: {
          Accept: 'application/vnd.github.everest-preview+json',
          Authorization: `Bearer ${this.configService.get('GITHUB_TOKEN')}`,
          Host: 'api.github.com',
        },
      });
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  }
}
