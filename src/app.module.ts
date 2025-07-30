import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
// import { TimeoutInterceptor } from './interceptor/timout.interceptor';

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },

    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TimeoutInterceptor,
    // },
  ],
})
export class AppModule {}
