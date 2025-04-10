// src/infrastructure/mikro-orm/types/email.type.ts
import { Type } from '@mikro-orm/core';
import { Telefone } from 'src/cliente/value-objects/telefone.value-object';

export class TelefoneType extends Type<Telefone, string> {
  convertToDatabaseValue(value: Telefone): string {
    return value.toString(); // Assume que Email tem um método toString()
  }

  convertToJSValue(value: string): Telefone {
    return new Telefone(value); // Valida internamente
  }

  getColumnType(): string {
    return 'varchar(20)';
  }
}