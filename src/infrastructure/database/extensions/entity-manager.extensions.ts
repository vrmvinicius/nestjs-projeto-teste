import { EntityBase } from '@/common/domain/entities/entity.base';
import { EntityData, EntityManager } from '@mikro-orm/core';

// Estende a interface EntityManager
declare module '@mikro-orm/core' {
   interface EntityManager {
      /**
       * Persiste uma entidade usando apenas as propriedades modificadas e faz flush
       * @param entity A entidade a ser persistida
       * @param excludeProperties Propriedades a serem excluídas do mapeamento
       */
      saveInsert<T extends EntityBase>(entity: T): Promise<void>;
      saveUpdate<T extends EntityBase>(entity: T): Promise<void>;
   }
}

// Implementa a função de extensão
export function setupEntityManagerExtensions() {
   EntityManager.prototype.saveInsert = async function <T extends EntityBase>(entity: T): Promise<void> {
      await this.persistAndFlush(entity);
   };

   EntityManager.prototype.saveUpdate = async function <T extends EntityBase>(entity: T): Promise<void> {
      const modifiedProps = entity.getModifiedPrivateProperties();
      const entityData = modifiedProps as EntityData<any>;
      this.assign(entity, entityData);
      await this.persistAndFlush(entity);
   };
}
