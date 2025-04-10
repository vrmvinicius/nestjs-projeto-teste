import { Min } from 'class-validator';
import { CommandBase } from 'src/common/domain/commands/command.base';

export class ObterClienteCommand extends CommandBase {
   @Min(1, { message: 'Id deve ser maior que zero' })
   public readonly id: number;

   constructor(params: { id: number }) {
      super();
      this.id = params.id;
   }

   async isValid(): Promise<boolean> {
      return await this.validateThis();
   }
}
