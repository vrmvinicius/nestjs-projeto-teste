// src/infrastructure/mikro-orm/mappings/cliente.mapping.ts
import { Cliente } from '@/cliente/entities/cliente.entity';
import { Pedido } from '@/cliente/entities/pedido.entity';
import { EntitySchema } from '@mikro-orm/core';

export const PedidoMapping = new EntitySchema({
   class: Pedido,
   tableName: 'pedido', // Define explicitamente o nome da tabela
   properties: {
      id: {
         fieldName: 'id',
         type: 'number',
         primary: true,
         autoincrement: true,
      },
      numero: {
         fieldName: 'numero', // Corrigido o nome do campo (estava 'nome')
         type: 'number',
         length: 255,
         nullable: false,
      },
      cliente: {
         fieldName: 'id_cliente', //Nome do campo de vínculo com cliente.
         kind: 'm:1', //Vários pedidos para um cliente.
         entity: () => Cliente, //Entidade que relaciona.
         inversedBy: (cliente) => cliente.pedidos, //Cliente vinculado. Não é criado o campo de vínculo na tabela cliente.
         nullable: false,
      },
   },
});
