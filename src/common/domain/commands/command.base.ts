import { validate } from "class-validator";

export abstract class CommandBase {
    private _errors: any[] = [];

    get errors(): any[] {
        return this._errors;
    }

    get hasErrors(): boolean {
        return this._errors.length > 0;
    }

    abstract isValid(): Promise<boolean>;

    protected async validateThis(): Promise<boolean> {
        this._errors = await validate(this);
        return !this.hasErrors;
    }
}