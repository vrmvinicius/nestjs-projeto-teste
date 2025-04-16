import { Cliente } from '@/cliente/entities/cliente.entity';
import { EntityBase } from '@/common/domain/entities/entity.base';
import { EntityCollection } from '@/infrastructure/collections/entity-collection';
import { PedidoItem } from './pedido-item.entity';

export class Pedido extends EntityBase {
   private _id: number;
   private _numero: number;
   private _cliente: Cliente;

   private _itens: EntityCollection<PedidoItem>;

   get id(): number {
      return this._id;
   }
   get numero(): number {
      return this._numero;
   }
   get cliente(): Cliente {
      return this._cliente;
   }
   get itens(): EntityCollection<PedidoItem> {
      return this._itens;
   }

   // Este setter é necessário para que o ORM possa atualizar o ID após a inserção no banco de dados.
   set id(value: number) {
      this._id = value;
   }
   set itens(value: EntityCollection<PedidoItem>) {
      this._itens = value;
   }

   private constructor() {
      super();
      this._itens = new EntityCollection<PedidoItem>();
   }

   public static criar(params: { cliente: Cliente; numero: number }): Pedido {
      const pedido = new Pedido();
      pedido._cliente = params.cliente;
      pedido._numero = params.numero;
      return pedido;
   }

   public atribuirNumero(novoNumero: number): void {
      this._numero = novoNumero;
   }

   public atribuirCliente(cliente: Cliente): void {
      this._cliente = cliente;
   }

   public adicionarItem(item: PedidoItem): void {
      this._itens.add(item);
   }

   public itensArray(): PedidoItem[] {
      return this.toArray(this._itens);
   }
}
