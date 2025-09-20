import { cleanupOpenApiDoc } from 'nestjs-zod';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const openApiDoc = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Short url')
      .setDescription('Short URL api description')
      .setVersion('1.0')
      .build(),
  );

  SwaggerModule.setup('docs', app, cleanupOpenApiDoc(openApiDoc));

  app.enableCors();
  app.setGlobalPrefix('/api/v1', {
    exclude: ['/'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
