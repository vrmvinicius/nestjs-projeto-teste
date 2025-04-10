import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundFilter } from './common/filters/not-found.filter'; // Importa o novo filtro
import { ValidationFilter } from './common/filters/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    errorHttpStatusCode: 422
  }));

  app.useGlobalFilters(
    new ValidationFilter(), 
    new NotFoundFilter()
  ); // Registra o novo filtro

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
