import { Cliente } from "src/cliente/entities/cliente.entity";

export class CriarClienteResponse {
    public readonly id: number;
    public readonly nome: string;
    
    constructor(params: {
        id: number;
        nome: string;        
    }) {
        this.id = params.id;
        this.nome = params.nome;        
    }
}