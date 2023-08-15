import { Param } from '@discord-nestjs/core';

export class ShowcaseDto {
  @Param({
    name: 'package',
    description: 'The package to show',
    required: true,
  })
  package: string;

  @Param({
    name: 'tag',
    description: 'The tag to show',
    required: true,
  })
  tag: string;
}
