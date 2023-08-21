import { Param } from '@discord-nestjs/core';

export class ShowcaseDto {
  @Param({
    name: 'package',
    description: 'The package to show',
    required: true,
  })
  package: string;
  @Param({
    name: 'discription',
    description: 'The package description',
  })
  description?: string;
}
