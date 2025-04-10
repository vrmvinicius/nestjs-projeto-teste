import { CommandBase } from "src/common/domain/commands/command.base";

export class ObterClienteTodosCommand extends CommandBase {

    public readonly ativos: boolean;

    constructor(params: {
        ativos: boolean
    }) {
        super();
        this.ativos = params.ativos;
    }

    async isValid(): Promise<boolean> {
        return true;
    }
}