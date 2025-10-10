import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  redirect(shortedUrl: string): string {
    return shortedUrl;
  }
}
