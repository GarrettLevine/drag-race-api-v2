import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getLogLevels from './utils/getLogLevels';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.NODE_ENV === 'production')
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
