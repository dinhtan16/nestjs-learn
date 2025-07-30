import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Response as ExpressResponse } from 'express';

export type Response<T> = {
  statusCode: number;
  message?: string;
  data: T;
  // timestamp: string;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((res: any) => this.responseHandler(res, context)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    //get response of the exception
    let res: any = null;
    if (exception instanceof HttpException) {
      res = exception.getResponse() as any;
    }

    const errorResponse = {
      statusCode: res?.statusCode || status,
      message: res?.message || exception?.message,
      error: res?.error || '',
      // timestamp: format(new Date().toISOString(), 'yyyy-MM-dd HH:mm:ss'),
    };

    return new HttpException(errorResponse, status);
  }

  responseHandler(res: any, context: ExecutionContext) {
    //set status header
    const resFormat = {
      '1': 200,
      '-1': 400,
      '-2': 400,
      '-3': 400,
      '-4': 400,
      '-5': 500,
    };

    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    // Only set status if res.statusCode exists in resFormat
    if (res.statusCode && resFormat[res.statusCode]) {
      response.status(resFormat[res.statusCode]);
    }

    return res;
  }
}
