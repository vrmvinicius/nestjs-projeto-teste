import { Cliente } from 'src/cliente/entities/cliente.entity';

export class ObterClienteResponse {
   public readonly id: number;
   public readonly nome: string;
   public readonly email: string;
   public readonly telefone: string;
   public readonly ativo: boolean;
   public readonly dataCadastro: Date;

   constructor(params: {
      id: number;
      nome: string;
      email: string;
      telefone: string;
      ativo: boolean;
      dataCadastro: Date;
   }) {
      this.id = params.id;
      this.nome = params.nome;
      this.email = params.email;
      this.telefone = params.telefone;
      this.ativo = params.ativo;
      this.dataCadastro = params.dataCadastro;
   }

   static fromEntity(cliente: Cliente): ObterClienteResponse {
      return new ObterClienteResponse({
         id: cliente.id,
         nome: cliente.nome,
         email: cliente.email.toString(),
         telefone: cliente.telefone.toString(),
         ativo: cliente.ativo,
         dataCadastro: cliente.dataCadastro,
      });
   }
}
