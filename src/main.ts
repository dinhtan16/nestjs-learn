import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { TimeoutInterceptor } from './interceptor/timout.interceptor';
import { ValidationPipe } from './validateion/pipes';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global scoped interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
