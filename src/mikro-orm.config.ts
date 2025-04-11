import { FileCacheAdapter, Options } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { ClienteMapping } from './infrastructure/mappings/cliente.mapping';
import { PedidoMapping } from './infrastructure/mappings/pedido.mapping';

const config: Options = {
   entities: [ClienteMapping, PedidoMapping],
   entitiesTs: ['src/**/*.entity.ts'],
   driver: SqliteDriver, // Changed from 'type' to 'driver'
   dbName: 'database/projeto-teste.sqlite',
   debug: true,
   pool: {
      min: 2,
      max: 10,
   },
   migrations: {
      tableName: 'mikro_orm_migrations',
      path: 'dist/infrastructure/database/migrations',
      pathTs: 'src/infrastructure/database/migrations',
      glob: '!(*.d).{js,ts}',
   },
   extensions: [Migrator],
   metadataCache: {
      enabled: true,
      adapter: TsMorphMetadataProvider as any,
      options: {
         cacheDir: 'temp/metadata-cache',
      },
   },
   resultCache: {
      adapter: FileCacheAdapter,
      options: { cacheDir: 'temp/query-cache' },
   },
};

export default config;
