// src/infrastructure/mikro-orm/types/email.type.ts
import { Type } from '@mikro-orm/core';
import { Email } from 'src/cliente/value-objects/email.value-object';

export class EmailType extends Type<Email, string> {
   convertToDatabaseValue(value: Email): string {
      return value.toString(); // Assume que Email tem um método toString()
   }

   convertToJSValue(value: string): Email {
      return new Email(value); // Valida internamente
   }

   getColumnType(): string {
      return 'varchar(255)';
   }
}
