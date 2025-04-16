// src/infrastructure/mikro-orm/mappings/cliente.mapping.ts
import { Cliente } from '@/cliente/entities/cliente.entity';
import { PedidoItem } from '@/pedido/entities/pedido-item.entity';
import { Pedido } from '@/pedido/entities/pedido.entity';

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
      itens: {
         kind: '1:m', //Um cliente para muitos pedidos.
         entity: () => PedidoItem, //Entidade relacionada.
         type: 'array', //Tipo de relacionamento.
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return
         mappedBy: (pedidoItem: any) => pedidoItem.pedido, //Quem mapeia é o pedidoItem, ou seja, na tabela pedido será criado id_pedido.
         joinColumn: 'id_pedido',
         orphanRemoval: true,
      },
   },
});
