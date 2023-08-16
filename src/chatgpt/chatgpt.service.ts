import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { ParsingService } from 'src/parsing/parsing.service';
import { ChatGPTData } from './dto/chatgpt-message.dto';
import { ChatGPTResponse } from './dto/chatgpt-response.dto';

@Injectable()
export class ChatgptService {
  constructor(
    private readonly parsingService: ParsingService,
    private readonly configService: ConfigService,
  ) {}

  public async getProjectInfo(url: string): Promise<ChatGPTData> {
    console.log('Fetching project info for url: ' + url);
    const html = await axios.get(url);
    let htmlString = '';
    // stringify if it's an object or array
    if (typeof html.data === 'object' || Array.isArray(html.data)) {
      htmlString = JSON.stringify(html.data);
    } else {
      htmlString = html.data;
    }

    const githubRepoRegex = /https:\/\/github\.com\/(.*)\/(.*)/;
    const githubRepoMatch = url.match(githubRepoRegex);
    if (githubRepoMatch) {
      const dom = new JSDOM(htmlString);

      htmlString = dom.window.document.getElementById('readme').textContent;
    }

    let message =
      readFileSync('./src/static/prompt.txt', 'utf8') + '\n\n' + url;
    '\n\n' + this.parsingService.getAllPlainText(htmlString);

    console.log('Sending message to GPT-3');

    try {
      const resp = await axios.post<ChatGPTResponse>(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'system', content: message }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.configService.get<string>(
              'OPENAI_API_KEY',
            )}`,
          },
        },
      );

      const res: ChatGPTData = JSON.parse(resp.data.choices[0].message.content);

      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
