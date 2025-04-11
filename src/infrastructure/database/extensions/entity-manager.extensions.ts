import { EntityBase } from '@/common/domain/entities/entity.base';
import { EntityCollection } from '@/infrastructure/collections/entity-collection';
import { Collection, EntityData, EntityManager } from '@mikro-orm/core';

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

      /**
       * Cria uma coleção de entidades gerenciada
       * @param items Itens iniciais da coleção
       * @returns Uma coleção gerenciada
       */
      createCollection<T extends object>(items?: T[] | Collection<T>): EntityCollection<T>;
   }
}

// Implementa a função de extensão
export function setupEntityManagerExtensions() {
   EntityManager.prototype.saveInsert = async function <T extends EntityBase>(entity: T): Promise<void> {
      const processedEntity = processEntityCollections(entity);
      await this.persistAndFlush(processedEntity);
   };

   EntityManager.prototype.saveUpdate = async function <T extends EntityBase>(entity: T): Promise<void> {
      const modifiedProps = entity.getModifiedPrivateProperties();
      const entityData = modifiedProps as EntityData<any>;
      this.assign(entity, entityData);
      await this.persistAndFlush(entity);
   };

   EntityManager.prototype.createCollection = function <T extends object>(
      items?: T[] | Collection<T>,
   ): EntityCollection<T> {
      return new EntityCollection<T>(items);
   };
}

/**
 * Helper function to process EntityCollection instances in an entity
 * @param entity The entity to process
 * @returns The processed entity
 */
function processEntityCollections<T extends EntityBase>(this: any, entity: T): T {
   // Get all property names of the entity
   const propertyNames = Object.getOwnPropertyNames(entity);

   for (const prop of propertyNames) {
      const value = (entity as any)[prop];

      // Check if the property is an EntityCollection
      if (value instanceof EntityCollection) {
         // Replace the EntityCollection with its items array
         const items = value.getAll();
         (entity as any)[prop] = items;

         // Process each item in the collection if it's an EntityBase
         items.forEach((item) => {
            if (item instanceof EntityBase) {
               processEntityCollections(item);
            }
         });
      }
   }

   return entity;
}
