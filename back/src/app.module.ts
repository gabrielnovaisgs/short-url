import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortUrlModule } from './short-url/short-url.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, ShortUrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
