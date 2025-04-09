import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Result } from "src/common/results/result";
import { ObterClienteCommand } from "./obter-cliente.command";
import { ObterClienteResponse } from "./obter-cliente.response";

@QueryHandler(ObterClienteCommand)
export class ObterClienteHandler implements
    IQueryHandler<ObterClienteCommand, Result<ObterClienteResponse>> {

    private readonly logger = new Logger(ObterClienteHandler.name);

    async execute(query: ObterClienteCommand): Promise<Result<ObterClienteResponse>> {
        
        if (!await query.isValid()) {
            return Result.fail(query.errors);
        }
        
        const response = new ObterClienteResponse({
            id: 1,
            nome: "teste",
            email: "teste",
            telefone: "teste",
            ativo: true,
            dataCadastro: new Date()
        });

        return Result.ok(response);
    }
}