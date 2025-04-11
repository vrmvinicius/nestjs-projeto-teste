import { EntityBase } from '@/common/domain/entities/entity.base';
import { EntityCollection } from '@/infrastructure/collections/entity-collection';
import { Email } from '../value-objects/email.value-object';
import { Telefone } from '../value-objects/telefone.value-object';
import { Pedido } from './pedido.entity';

export class Cliente extends EntityBase {
   private _id: number;
   private _nome: string;
   private _email: Email;
   private _telefone: Telefone;
   private _ativo: boolean;
   private _dataCadastro: Date;

   private _pedidos: EntityCollection<Pedido>;

   get id(): number {
      return this._id;
   }
   get nome(): string {
      return this._nome;
   }
   get email(): Email {
      return this._email;
   }
   get telefone(): Telefone {
      return this._telefone;
   }
   get ativo(): boolean {
      return this._ativo;
   }
   get dataCadastro(): Date {
      return this._dataCadastro;
   }
   get pedidos(): EntityCollection<Pedido> {
      return this._pedidos;
   }

   // Este setter é necessário para que o ORM possa atualizar o ID após a inserção no banco de dados.
   set id(value: number) {
      this._id = value;
   }
   set pedidos(value: EntityCollection<Pedido>) {
      this._pedidos = value;
   }

   private constructor() {
      super();
      this._pedidos = new EntityCollection<Pedido>();
   }

   public static criar(params: { nome: string; email: string; telefone: string }): Cliente {
      const cliente = new Cliente();
      cliente._nome = params.nome;
      cliente._email = new Email(params.email);
      cliente._telefone = new Telefone(params.telefone);
      cliente._ativo = true;
      cliente._dataCadastro = new Date();
      return cliente;
   }

   public desativar(): void {
      this._ativo = false;
   }

   public atualizarNome(novoNome: string): void {
      this._nome = novoNome;
   }

   public atualizarEmail(novoEmail: string): void {
      this._email = new Email(novoEmail);
   }

   public atualizarTelefone(novoTelefone: string): void {
      this._telefone = new Telefone(novoTelefone);
   }

   public adicionarPedido(pedido: Pedido): void {
      this._pedidos.add(pedido);
   }

   public pedidosArray(): Pedido[] {
      return this.toArray(this._pedidos);
   }
}
