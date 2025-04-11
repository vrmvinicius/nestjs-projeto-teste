import { EntityBase } from '@/common/domain/entities/entity.base';
import { Cliente } from './cliente.entity';

export class Pedido extends EntityBase {
   private _id: number;
   private _numero: number;
   private _cliente: Cliente;

   get id(): number {
      return this._id;
   }
   get numero(): number {
      return this._numero;
   }
   get cliente(): Cliente {
      return this._cliente;
   }

   // Este setter é necessário para que o ORM possa atualizar o ID após a inserção no banco de dados.
   set id(value: number) {
      this._id = value;
   }

   private constructor() {
      super();
   }

   public static criar(params: { numero: number }): Pedido {
      const endereco = new Pedido();
      endereco._numero = params.numero;
      return endereco;
   }

   public atribuirNumero(novoNumero: number): void {
      this._numero = novoNumero;
   }

   public atribuirCliente(cliente: Cliente): void {
      this._cliente = cliente;
   }
}
