import { EntityBase } from '@/common/domain/entities/entity.base';
import { Pedido } from './pedido.entity';

export class PedidoItem extends EntityBase {
   private _id: number;
   private _pedido: Pedido;
   private _descricao: string;
   private _quantidade: number;
   private _valorUnitario: number;

   get id(): number {
      return this._id;
   }
   get pedido(): Pedido {
      return this._pedido;
   }
   get descricao(): string {
      return this._descricao;
   }
   get quantidade(): number {
      return this._quantidade;
   }
   get valorUnitario(): number {
      return this._valorUnitario;
   }

   set id(value: number) {
      this._id = value;
   }

   private constructor() {
      super();
   }

   public static criar(params: {
      pedido: Pedido;
      descricao: string;
      quantidade: number;
      valorUnitario: number;
   }): PedidoItem {
      const item = new PedidoItem();
      item._pedido = params.pedido;
      item._descricao = params.descricao;
      item._quantidade = params.quantidade;
      item._valorUnitario = params.valorUnitario;
      return item;
   }

   public atualizarDescricao(descricao: string): void {
      this._descricao = descricao;
   }

   public atualizarQuantidade(quantidade: number): void {
      this._quantidade = quantidade;
   }

   public atualizarValorUnitario(valor: number): void {
      this._valorUnitario = valor;
   }
}
