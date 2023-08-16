import { Module } from '@nestjs/common';
import { ParsingModule } from 'src/parsing/parsing.module';
import { ChatgptService } from './chatgpt.service';

@Module({
  imports: [ParsingModule],
  exports: [ChatgptService],
  providers: [ChatgptService],
})
export class ChatgptModule {}
