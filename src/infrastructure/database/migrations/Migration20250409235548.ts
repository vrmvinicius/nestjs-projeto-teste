import { Migration } from '@mikro-orm/migrations';

export class Migration20250409235548 extends Migration {
   override async up(): Promise<void> {
      this.addSql(
         `create table \`cliente\` (\`id\` integer not null primary key autoincrement, \`nome\` text not null, \`email\` varchar(255) not null, \`telefone\` varchar(20) not null, \`ativo\` integer not null, \`data_cadastro\` datetime not null);`,
      );
   }
}
