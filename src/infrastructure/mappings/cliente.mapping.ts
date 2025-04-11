// src/infrastructure/mikro-orm/mappings/cliente.mapping.ts
import { Cliente } from '@/cliente/entities/cliente.entity';
import { Pedido } from '@/cliente/entities/pedido.entity';
import { EntitySchema } from '@mikro-orm/core';
import { EmailType } from '../types/email.type';
import { TelefoneType } from '../types/telefone.type';

export const ClienteMapping = new EntitySchema({
   class: Cliente,
   tableName: 'cliente', // Define explicitamente o nome da tabela
   properties: {
      id: {
         fieldName: 'id',
         type: 'number',
         primary: true,
         autoincrement: true,
      },
      nome: {
         fieldName: 'nome',
         type: 'string',
         length: 100,
         nullable: false,
      },
      email: {
         fieldName: 'email',
         type: EmailType,
         length: 150,
         nullable: false,
         unique: true,
         index: true,
      },
      telefone: {
         fieldName: 'telefone',
         type: TelefoneType,
         length: 20,
         nullable: false,
      },
      ativo: {
         fieldName: 'ativo',
         type: 'boolean',
         nullable: false,
         default: true,
         index: true,
      },
      dataCadastro: {
         fieldName: 'data_cadastro',
         type: 'Date',
         nullable: false,
         default: 'now()',
      },
      pedidos: {
         kind: '1:m', //Um cliente para muitos pedidos.
         entity: () => Pedido, //Entidade relacionada.
         type: 'array', //Tipo de relacionamento.
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return
         mappedBy: (pedido: any) => pedido.cliente, //Quem mapeia é o pedido, ou seja, na tabela pedido será criado id_cliente.
         joinColumn: 'id_cliente',
         orphanRemoval: true,
      },
   },
});
