// src/infrastructure/mikro-orm/mappings/cliente.mapping.ts
import { Cliente } from '@/cliente/entities/cliente.entity';
import { EntitySchema } from '@mikro-orm/core';
import { EmailType } from '../types/email.type';
import { TelefoneType } from '../types/telefone.type';

export const ClienteMapping = new EntitySchema({
   class: Cliente,
   properties: {
      id: {
         type: 'number',
         primary: true,
         autoincrement: true,
         fieldName: 'id', // Mapeia para a coluna "id"
      },
      nome: {
         type: 'string',
         fieldName: 'nome',
      },
      email: {
         type: EmailType, // Usa o custom type
         fieldName: 'email',
      },
      telefone: {
         type: TelefoneType, // Usa o custom type
         fieldName: 'telefone',
      },
      ativo: {
         type: 'boolean',
         fieldName: 'ativo',
      },
      dataCadastro: {
         type: 'Date',
         fieldName: 'data_cadastro',
      },
   },
});
