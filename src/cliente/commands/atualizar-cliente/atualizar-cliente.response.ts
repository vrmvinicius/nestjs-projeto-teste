export class AtualizarClienteResponse {
   public readonly id: number;
   public readonly nome: string;
   public readonly email: string;
   public readonly telefone: string;

   constructor(params: { id: number; nome: string; email: string; telefone: string }) {
      this.id = params.id;
      this.nome = params.nome;
      this.email = params.email;
      this.telefone = params.telefone;
   }
}
