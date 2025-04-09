import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Result } from "src/common/results/result";
import { CriarClienteCommand } from "./criar-cliente.command";
import { CriarClienteResponse } from "./criar-cliente.response";

@CommandHandler(CriarClienteCommand)
export class CriarClienteHandler implements 
    ICommandHandler<CriarClienteCommand, Result<CriarClienteResponse>> {
    
    async execute(command: CriarClienteCommand): Promise<Result<CriarClienteResponse>> {                
        
        if (!await command.isValid()) {
            return Result.fail(command.errors);
        }

        const response = new CriarClienteResponse({
            id: 1,
            nome: command.nome            
        })

        return Result.ok(response);
    }
}