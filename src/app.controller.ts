import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { readFileSync } from 'fs';
import { ApiKeyGuard } from './app.guard';
import { AppService } from './app.service';

export class Word {
  word: string;
  uccharon: string;
  butpotti: string;
  utsho: string;
  porivasha: string;
  bisessho: string;
  bisheshon: string;
  sorbonam: string;
  obboy: string;
  kriya: string;
  kbisesso: string;
  kbisheshon: string;
  kmul: string;
  extraortho: string;
}
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  private words = JSON.parse(
    readFileSync('wordData/words.json', 'utf-8'),
  ) as Word[];

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('query') query: string) {
    console.log(query);

    const matches: Word[] = [];

    for (const word of this.words) {
      if (matches.length === 10) {
        break;
      }

      if (word.word.includes(query)) {
        matches.push(word);
      }
    }

    return matches.sort((a, b) => {
      if (a.word.startsWith(query) && b.word.startsWith(query)) {
        return 0;
      }

      if (a.word.startsWith(query) && !b.word.startsWith(query)) {
        return -1;
      }

      if (!a.word.startsWith(query) && b.word.startsWith(query)) {
        return 1;
      }

      return 0;
    });

    return matches;
  }
}
