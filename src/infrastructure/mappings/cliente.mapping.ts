// src/infrastructure/mikro-orm/mappings/cliente.mapping.ts
import { Cliente } from '@/cliente/entities/cliente.entity';
import { EntitySchema } from '@mikro-orm/core';
import { EmailType } from '../types/email.type';
import { TelefoneType } from '../types/telefone.type';

export const ClienteMapping = new EntitySchema({
   class: Cliente,
   properties: {
      Id: {
         type: 'number',
         primary: true,
         autoincrement: true,
         fieldName: 'id', // Mapeia para a coluna "id"
      },
      Nome: {
         type: 'string',
         fieldName: 'nome',
      },
      Email: {
         type: EmailType, // Usa o custom type
         fieldName: 'email',
      },
      Telefone: {
         type: TelefoneType, // Usa o custom type
         fieldName: 'telefone',
      },
      Ativo: {
         type: 'boolean',
         fieldName: 'ativo',
      },
      DataCadastro: {
         type: 'Date',
         fieldName: 'data_cadastro',
      },
   },
});
