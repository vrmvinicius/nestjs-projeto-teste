import { ArgumentsHost, Catch, ExceptionFilter, UnprocessableEntityException } from '@nestjs/common';
import { Response } from 'express';

@Catch(UnprocessableEntityException)
export class ValidationFilter implements ExceptionFilter {
    catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse() as any;

        const errors = Array.isArray(exceptionResponse.errors)
            ? this.formatErrors(exceptionResponse.errors)
            : [exceptionResponse.message];

        response
            .status(status)
            .json({
                statusCode: status,
                message: 'Foram encontrados um ou mais erros de validação',
                errors: errors,
                timestamp: new Date().toISOString()
            });
    }

    private formatErrors(errors: any[]): any[] {
        return errors.map(error => ({
            campo: error.property,
            mensagem: Object.values(error.constraints)[0]
        }));
    }
}