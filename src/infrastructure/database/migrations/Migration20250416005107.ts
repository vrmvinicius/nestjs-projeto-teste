import { Migration } from '@mikro-orm/migrations';

export class Migration20250416005107 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`pedido_item\` (\`id\` integer not null primary key autoincrement, \`id_pedido\` integer not null, \`descricao\` text not null, \`quantidade\` integer not null, \`valor_unitario\` integer not null, constraint \`pedido_item_id_pedido_foreign\` foreign key(\`id_pedido\`) references \`pedido\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`pedido_item_id_pedido_index\` on \`pedido_item\` (\`id_pedido\`);`);
  }

}
