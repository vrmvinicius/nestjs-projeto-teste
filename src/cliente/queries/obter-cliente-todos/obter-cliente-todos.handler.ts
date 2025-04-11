import { Cliente } from '@/cliente/entities/cliente.entity';
import { EntityManager } from '@mikro-orm/core';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Result } from 'src/common/results/result';
import { ObterClienteTodosCommand } from './obter-cliente-todos.command';
import { ObterClienteTodosResponse } from './obter-cliente-todos.response';

@QueryHandler(ObterClienteTodosCommand)
export class ObterClienteTodosHandler
   implements IQueryHandler<ObterClienteTodosCommand, Result<ObterClienteTodosResponse[]>>
{
   constructor(private readonly em: EntityManager) {}

   private readonly logger = new Logger(ObterClienteTodosHandler.name);

   async execute(query: ObterClienteTodosCommand): Promise<Result<ObterClienteTodosResponse[]>> {
      if (!(await query.isValid())) {
         return Result.fail(query.errors);
      }

      const clientes: Cliente[] = await this.em.find(Cliente, {
         ativo: query.ativos,
      });

      if (clientes.length === 0) {
         return Result.notFound('Nenhum cliente encontrado.');
      }

      const response = ObterClienteTodosResponse.fromEntity(clientes);

      return Result.ok(response);
   }
}
