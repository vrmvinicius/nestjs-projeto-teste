import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { PedidoModule } from './pedido/pedido.module';
import config from './mikro-orm.config';

@Module({
   imports: [MikroOrmModule.forRoot(config), ClienteModule, PedidoModule],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
