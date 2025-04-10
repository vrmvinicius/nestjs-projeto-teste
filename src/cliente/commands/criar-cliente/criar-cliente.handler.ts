import { Cliente } from "@/cliente/entities/cliente.entity";
import { EntityManager } from "@mikro-orm/core";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Result } from "src/common/results/result";
import { CriarClienteCommand } from "./criar-cliente.command";
import { CriarClienteResponse } from "./criar-cliente.response";

@CommandHandler(CriarClienteCommand)
export class CriarClienteHandler implements
    ICommandHandler<CriarClienteCommand, Result<CriarClienteResponse>> {

    constructor(
        private readonly em: EntityManager
    ) { }

    async execute(command: CriarClienteCommand): Promise<Result<CriarClienteResponse>> {

        if (!await command.isValid()) {
            return Result.fail(command.errors);
        }

        const cliente = Cliente.criar({
            nome: command.nome,
            email: command.email,
            telefone: command.telefone
        });

        await this.em.transactional(async (em) => {
            await em.persistAndFlush(cliente);
        });

        const response = new CriarClienteResponse({
            id: cliente.Id,
            nome: cliente.Nome,
            email: cliente.Email.toString(),
            telefone: cliente.Telefone.toString(),
            dataCadastro: cliente.DataCadastro
        })

        return Result.created(response);
    }
}