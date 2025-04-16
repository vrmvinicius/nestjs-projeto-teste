import { Pedido } from '@/pedido/entities/pedido.entity';

export class AtualizarClienteResponse {
   public readonly id: number;
   public readonly nome: string;
   public readonly email: string;
   public readonly telefone: string;
   public readonly pedidos: Pedido[];

   constructor(params: { id: number; nome: string; email: string; telefone: string; pedidos: Pedido[] }) {
      this.id = params.id;
      this.nome = params.nome;
      this.email = params.email;
      this.telefone = params.telefone;
      this.pedidos = params.pedidos;
   }
}
