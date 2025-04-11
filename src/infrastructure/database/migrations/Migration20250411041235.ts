import { Migration } from '@mikro-orm/migrations';

export class Migration20250411041235 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`clientes\` (\`id\` integer not null primary key autoincrement, \`nome\` text not null, \`email\` varchar(255) not null, \`telefone\` varchar(20) not null, \`ativo\` integer not null default true, \`data_cadastro\` datetime not null default 'now()');`);
    this.addSql(`create index \`clientes_email_index\` on \`clientes\` (\`email\`);`);
    this.addSql(`create unique index \`clientes_email_unique\` on \`clientes\` (\`email\`);`);
    this.addSql(`create index \`clientes_ativo_index\` on \`clientes\` (\`ativo\`);`);
  }

}
