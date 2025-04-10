import { Email } from '../value-objects/email.value-object';
import { Telefone } from '../value-objects/telefone.value-object';

export class Cliente {
   private id: number;
   private nome: string;
   private email: Email;
   private telefone: Telefone;
   private ativo: boolean;
   private dataCadastro: Date;

   get Id(): number {
      return this.id;
   }
   get Nome(): string {
      return this.nome;
   }
   get Email(): Email {
      return this.email;
   }
   get Telefone(): Telefone {
      return this.telefone;
   }
   get Ativo(): boolean {
      return this.ativo;
   }
   get DataCadastro(): Date {
      return this.dataCadastro;
   }

   // Este setter é necessário para que o ORM possa atualizar o ID após a inserção no banco de dados.
   private set Id(value: number) {
      this.id = value;
   }

   private constructor() {}

   public static criar(params: { nome: string; email: string; telefone: string }): Cliente {
      const cliente = new Cliente();
      cliente.nome = params.nome;
      cliente.email = new Email(params.email);
      cliente.telefone = new Telefone(params.telefone);
      cliente.ativo = true;
      cliente.dataCadastro = new Date();
      return cliente;
   }

   public desativar(): void {
      this.ativo = false;
   }

   public atualizarNome(novoNome: string): void {
      this.nome = novoNome;
   }

   public atualizarEmail(novoEmail: string): void {
      this.email = new Email(novoEmail);
   }

   public atualizarTelefone(novoTelefone: string): void {
      this.telefone = new Telefone(novoTelefone);
   }
}
