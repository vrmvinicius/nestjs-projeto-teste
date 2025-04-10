import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientesController } from './cliente.controller';
import { CriarClienteHandler } from './commands/criar-cliente/criar-cliente.handler';
import { ObterClienteTodosHandler } from './queries/obter-cliente-todos/obter-cliente-todos.handler';
import { ObterClienteHandler } from './queries/obter-cliente/obter-cliente.handler';

@Module({
    imports: [CqrsModule],
    controllers: [ClientesController],
    providers: [
        ObterClienteHandler,
        ObterClienteTodosHandler,
        CriarClienteHandler,
        Logger
    ],
})
export class ClienteModule { }
