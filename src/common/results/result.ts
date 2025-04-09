import { UnprocessableEntityException, ValidationError } from "@nestjs/common";

export class Result<T> {
    public isSuccess: boolean;
    public isFailure: boolean;
    public error?: string;
    public validationErrors?: ValidationError[];
    private _value: T;

    private constructor(isSuccess: boolean, value: T, error?: string, validationErrors?: ValidationError[]) {
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this.validationErrors = validationErrors;
        this._value = value;
    }

    public getValue(): T {
        if (!this.isSuccess) {
            throw new Error('Cannot get value from failed result');
        }
        return this._value;
    }

    public static ok<U>(value: U): Result<U> {
        return new Result<U>(true, value, undefined);
    }

    public static fail<U>(
        errorOrValidationErrors: string | ValidationError[],
        validationErrors?: ValidationError[]): Result<U> {

        if (Array.isArray(errorOrValidationErrors)) {
            return new Result<U>(false, undefined as U, undefined, errorOrValidationErrors);
        }
        
        return new Result<U>(false, undefined as U, errorOrValidationErrors, validationErrors);
    }

    public valueOrthrowIfFailure(): T {
        if (this.isFailure) {
            throw new UnprocessableEntityException({
                message: this.error,
                errors: this.validationErrors
            });
        }
        return this.getValue();
    }   
}