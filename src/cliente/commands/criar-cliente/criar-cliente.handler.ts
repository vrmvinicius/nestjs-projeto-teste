import { Cliente } from '@/cliente/entities/cliente.entity';

import { EntityManager } from '@mikro-orm/core';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'src/common/results/result';
import { CriarClienteCommand } from './criar-cliente.command';
import { CriarClienteResponse } from './criar-cliente.response';
import { Pedido } from '@/pedido/entities/pedido.entity';

@CommandHandler(CriarClienteCommand)
export class CriarClienteHandler implements ICommandHandler<CriarClienteCommand, Result<CriarClienteResponse>> {
   constructor(private readonly em: EntityManager) {}

   async execute(command: CriarClienteCommand): Promise<Result<CriarClienteResponse>> {
      if (!(await command.isValid())) {
         return Result.fail(command.errors);
      }

      const emailJaCadastrado = await this.em.count(Cliente, { email: command.email });

      if (emailJaCadastrado) {
         return Result.fail(`Email ${command.email} já cadastrado`);
      }

      const cliente = Cliente.criar({
         nome: command.nome,
         email: command.email,
         telefone: command.telefone,
      });

      const pedido = Pedido.criar({ cliente: cliente, numero: 123456 });
      cliente.adicionarPedido(pedido);

      await this.em.transactional(async (em) => {
         await em.saveInsert(cliente);
      });

      const response = new CriarClienteResponse({
         id: cliente.id,
         nome: cliente.nome,
         email: cliente.email.toString(),
         telefone: cliente.telefone.toString(),
         dataCadastro: cliente.dataCadastro,
         pedidos: cliente.pedidosArray(),
      });

      return Result.created(response);
   }
}
