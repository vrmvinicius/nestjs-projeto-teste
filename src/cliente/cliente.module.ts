import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClienteController } from './cliente.controller';
import { CriarClienteHandler } from './commands/criar-cliente/criar-cliente.handler';
import { ObterClienteHandler } from './queries/obter-cliente/obter-cliente.handler';

@Module({
    imports: [CqrsModule],
    controllers: [ClienteController],
    providers: [
        ObterClienteHandler,
        CriarClienteHandler,
        Logger
    ],
})
export class ClienteModule { }
