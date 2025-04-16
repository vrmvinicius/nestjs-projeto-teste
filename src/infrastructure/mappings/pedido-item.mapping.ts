import { Pedido } from '@/pedido/entities/pedido.entity';
import { PedidoItem } from '@/pedido/entities/pedido-item.entity';
import { EntitySchema } from '@mikro-orm/core';

export const PedidoItemMapping = new EntitySchema({
   class: PedidoItem,
   tableName: 'pedido_item',
   properties: {
      id: {
         fieldName: 'id',
         type: 'number',
         primary: true,
         autoincrement: true,
      },
      pedido: {
         fieldName: 'id_pedido',
         kind: 'm:1', // Muitos itens para um pedido
         entity: () => Pedido,
         inversedBy: (pedido) => pedido.itens, // Supondo que Pedido tenha uma coleção 'itens'
         nullable: false,
      },
      descricao: {
         fieldName: 'descricao',
         type: 'string',
         length: 255,
         nullable: false,
      },
      quantidade: {
         fieldName: 'quantidade',
         type: 'number',
         nullable: false,
      },
      valorUnitario: {
         fieldName: 'valor_unitario',
         type: 'number',
         nullable: false,
      },
   },
});
