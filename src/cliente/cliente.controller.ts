import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Result } from 'src/common/results/result';
import { CriarClienteCommand } from './commands/criar-cliente/criar-cliente.command';
import { CriarClienteResponse } from './commands/criar-cliente/criar-cliente.response';
import { CriarClienteDto } from './commands/criar-cliente/dto/criar-cliente.dto';
import { ObterClienteTodosCommand } from './queries/obter-cliente-todos/obter-cliente-todos.command';
import { ObterClienteTodosResponse } from './queries/obter-cliente-todos/obter-cliente-todos.response';
import { ObterClienteCommand } from './queries/obter-cliente/obter-cliente.command';
import { ObterClienteResponse } from './queries/obter-cliente/obter-cliente.response';

@Controller()
export class ClientesController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus
    ) { }

    @Get('api/v1/clientes')
    async obterTodos(): Promise<ObterClienteTodosResponse[]> {
        const command = new ObterClienteTodosCommand({ativos: true});
        const response = await this.queryBus.execute(command) as Result<ObterClienteTodosResponse[]>;
        return response.valueOrThrowIfFailure();
    }

    @Get('api/v1/clientes/:id')
    async obter(@Param('id') id: number): Promise<ObterClienteResponse> {
        const command = new ObterClienteCommand({id: id});
        const response = await this.queryBus.execute(command) as Result<ObterClienteResponse>;
        return response.valueOrThrowIfFailure();
    }

    @Post('api/v1/clientes')
    async criar(@Body() criarClienteDto: CriarClienteDto): Promise<CriarClienteResponse> {
        const command = new CriarClienteCommand({
            nome: criarClienteDto.nome,
            email: criarClienteDto.email,
            telefone: criarClienteDto.telefone
        });

        const response = await this.commandBus.execute(command) as Result<CriarClienteResponse>;
        return response.valueOrThrowIfFailure();
    }
}
