import { Cliente } from '@/cliente/entities/cliente.entity';
import { EntityManager } from '@mikro-orm/core';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Result } from 'src/common/results/result';
import { ObterClienteCommand } from './obter-cliente.command';
import { ObterClienteResponse } from './obter-cliente.response';

@QueryHandler(ObterClienteCommand)
export class ObterClienteHandler implements IQueryHandler<ObterClienteCommand, Result<ObterClienteResponse>> {
   constructor(private readonly em: EntityManager) {}

   private readonly logger = new Logger(ObterClienteHandler.name);

   async execute(query: ObterClienteCommand): Promise<Result<ObterClienteResponse>> {
      if (!(await query.isValid())) {
         return Result.fail(query.errors);
      }

      const cliente = await this.em.findOne(Cliente, {
         id: query.id,
         ativo: true,
      });

      if (!cliente) {
         return Result.notFound(`Cliente de ID ${query.id} não encontrado ou inativo.`);
      }

      const response = new ObterClienteResponse({
         id: cliente.id,
         nome: cliente.nome,
         email: cliente.email.toString(),
         telefone: cliente.telefone.toString(),
         ativo: true,
         dataCadastro: cliente.dataCadastro,
      });

      return Result.ok(response);
   }
}
