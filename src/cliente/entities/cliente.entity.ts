import { Email } from "../value-objects/email.value-object";
import { Telefone } from "../value-objects/telefone.value-object";

export class Cliente {
    private id: number;
    private nome: string;
    private email: Email;
    private telefone: Telefone;
    private ativo: boolean;
    private dataCadastro: Date;

    get Id(): number { return this.id; }
    get Nome(): string { return this.nome; }
    get Email(): Email { return this.email; }
    get Telefone(): Telefone { return this.telefone; }
    get Ativo(): boolean { return this.ativo; }
    get DataCadastro(): Date { return this.dataCadastro; }

    private constructor() { }

    public static criar(        
        nome: string,
        email: string,
        telefone: string
    ): Cliente {
        const cliente = new Cliente();        
        cliente.nome = nome;
        cliente.email = new Email(email);
        cliente.telefone = new Telefone(telefone);
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