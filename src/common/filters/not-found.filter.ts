import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
   catch(exception: NotFoundException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;

      response.status(status).json({
         statusCode: status,
         message: exceptionResponse.message || 'Recurso não encontrado',
         timestamp: new Date().toISOString(),
      });
   }
}
