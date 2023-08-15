import { Injectable } from '@nestjs/common';

@Injectable()
export class ParsingService {
  public getTitle(url: string): string {
    // strip http prefix
    const urlWithoutPrefix = url.replace(/(^\w+:|^)\/\//, '');
    // check if it's github
    const isGithub = urlWithoutPrefix.match(/^github.com/);
    if (isGithub) {
      // get the repo name
      const paths = urlWithoutPrefix.split('/');
      return `${paths[1]}/${paths[2]}`;
    }

    // check if it's npm
    const isNpm = urlWithoutPrefix.match(/^npmjs.com/);
    if (isNpm) {
      return urlWithoutPrefix.split('/')[2];
    }

    const domain = urlWithoutPrefix.split('/')[0];
    const commonTLDS = ['.com', '.net', '.org', '.app', '.co'];
    const tld = commonTLDS.find((tld) => domain.includes(tld)) ?? '';

    const commonSubDomain = [
      'www.',
      'blog.',
      'dev.',
      'app.',
      'api.',
      'docs.',
      'help.',
      'support.',
      'about.',
      'info.',
      'status.',
      'developer.',
    ];

    const subDomain = commonSubDomain.find((sub) => domain.includes(sub)) ?? '';

    return domain.slice(subDomain.length).replace(tld, '');
  }
}
