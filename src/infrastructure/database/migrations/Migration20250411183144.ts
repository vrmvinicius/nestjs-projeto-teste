import { Migration } from '@mikro-orm/migrations';

export class Migration20250411183144 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`cliente\` (\`id\` integer not null primary key autoincrement, \`nome\` text not null, \`email\` varchar(255) not null, \`telefone\` varchar(20) not null, \`ativo\` integer not null default true, \`data_cadastro\` datetime not null default 'now()');`);
    this.addSql(`create index \`cliente_email_index\` on \`cliente\` (\`email\`);`);
    this.addSql(`create unique index \`cliente_email_unique\` on \`cliente\` (\`email\`);`);
    this.addSql(`create index \`cliente_ativo_index\` on \`cliente\` (\`ativo\`);`);

    this.addSql(`create table \`pedido\` (\`id\` integer not null primary key autoincrement, \`numero\` integer not null, \`id_cliente\` integer not null, constraint \`pedido_id_cliente_foreign\` foreign key(\`id_cliente\`) references \`cliente\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`pedido_id_cliente_index\` on \`pedido\` (\`id_cliente\`);`);
  }

}
