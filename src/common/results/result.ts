import { HttpStatus, NotFoundException, UnprocessableEntityException, ValidationError } from "@nestjs/common";

export class Result<T> {
    private isSuccess: boolean;
    private isFailure: boolean;
    private error: string;
    private validationErrors?: ValidationError[];
    private _value: T;
    private _httpStatus: HttpStatus;

    get IsSuccess(): boolean { return this.isSuccess; }
    get IsFailure(): boolean { return this.isFailure; }
    get Error(): string | undefined { return this.error; }
    get ValidationErrors(): ValidationError[] | undefined { return this.validationErrors; }
    get HttpStatus(): HttpStatus { return this._httpStatus; }

    private constructor(params: {
        isSuccess: boolean,
        httpStatus: HttpStatus,
        value: T,
        error: string,
        validationErrors?: ValidationError[]
    }) {
        this.isSuccess = params.isSuccess;
        this._httpStatus = params.httpStatus;
        this.isFailure = !params.isSuccess;
        this.error = params.error;
        this.validationErrors = params.validationErrors;
        this._value = params.value;
    }

    public getValue(): T {
        if (!this.isSuccess) {
            throw new Error('Cannot get value from failed result');
        }
        return this._value;
    }

    public static created<U>(value: U): Result<U> {
        return new Result<U>({
            isSuccess: true,
            httpStatus: HttpStatus.CREATED,
            value: value,
            error: '',
            validationErrors: []
        });
    }

    public static ok<U>(value: U): Result<U> {
        return new Result<U>({
            isSuccess: true,
            httpStatus: HttpStatus.OK,
            value: value,
            error: '',
            validationErrors: []
        });
    }

    public static fail<U>(
        errorOrValidationErrors: string | ValidationError[],
        validationErrors?: ValidationError[]): Result<U> {

        if (Array.isArray(errorOrValidationErrors)) {
            return new Result<U>({
                isSuccess: false,
                httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
                value: undefined as U,
                error: '',
                validationErrors: errorOrValidationErrors
            });
        }

        return new Result<U>({
            isSuccess: false,
            httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
            value: undefined as U,
            error: errorOrValidationErrors,
            validationErrors: validationErrors
        });
    }

    public static notFound<U>(message: string): Result<U> {
        return new Result<U>({
            isSuccess: false,
            httpStatus: HttpStatus.NOT_FOUND,
            value: undefined as U,
            error: message,
            validationErrors: []
        });
    }

    public valueOrThrowIfFailure(): T {
        if (!this.isFailure) {
            return this.getValue();
        }
        switch (this._httpStatus) {
            case HttpStatus.NOT_FOUND:
                throw new NotFoundException({
                    message: this.error,
                    errors: this.validationErrors
                });
            case HttpStatus.UNPROCESSABLE_ENTITY:
            default:
                throw new UnprocessableEntityException({
                    message: this.error,
                    errors: this.validationErrors
                });
        }
    }
}