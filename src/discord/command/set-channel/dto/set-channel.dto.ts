import { Param } from '@discord-nestjs/core';

export class SetChannelDto {
  @Param({
    name: 'song',
    description:
      'Name or URL of song/playlist. Could be from (Youtube, Spotify, SoundCloud)',
    required: true,
  })
  song: string;

  @Param({
    name: 'volume',
    description: 'Volume of the song',
    required: true,
  })
  volume: string;
}
