import { Collection } from '@mikro-orm/core';

/**
 * Classe base para todas as entidades de domínio
 */
export abstract class EntityBase {
   /**
    * O Midro-ORM possui os valores alterados nas propriedades privadas, mas não os expõe diretamente.
    * Se tentar acessar o valor pela propriedade 'get' lá estará o valor anterior, devido
    * a um mecanismo de 'snapshot' do ORM para atualização dos objetos. Sendo assim,
    * paraque não precisemos setar diretamente os valores no update, este método
    * obtém os valores das propreidades privadas alteradas.
    * Propriedades com valores não alterados estarão 'undefined' e serão ignorados.
    * @returns Um objeto contendo apenas as propriedades privadas que foram modificadas
    */
   getModifiedPrivateProperties(): Record<string, any> {
      const changes: Record<string, any> = {};

      // Obtém todas as propriedades com getters
      for (const prop of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
         // Ignora métodos e propriedades especiais
         if (
            typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), prop)?.get !== 'function' ||
            prop === 'constructor' ||
            prop.startsWith('__')
         ) {
            continue;
         }

         // Nome do campo privado correspondente
         const privateField = `_${prop}`;

         // Valor original do campo privado
         const value = (this as any)[privateField];

         if (value === undefined) {
            continue;
         }

         let valueToUse: any;

         if (value instanceof EntityBase) {
            valueToUse = value.getModifiedPrivateProperties();
            continue;
         }

         if (value instanceof Collection && value.length > 0 && value[0] instanceof EntityBase) {
            valueToUse = value.map((item) => {
               if (item instanceof EntityBase) {
                  return item.getModifiedPrivateProperties();
               }
               return item as EntityBase;
            });

            changes[prop] = valueToUse;
            continue;
         }

         // Trata value objects que possuem método toString()
         if (typeof value === 'object' && typeof value.toString === 'function') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            valueToUse = value?.toString();
         } else {
            // Para tipos primitivos, comparamos diretamente
            valueToUse = value; //currentValue;
         }

         changes[prop] = valueToUse;
      }

      return changes;
   }

   /**
    * Utility method to extract array from any collection type
    */
   toArray<T>(collection: any): T[] {
      if (!collection) return [];

      if (typeof collection.getAll === 'function') {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
         return collection.getAll();
      }

      if (typeof collection.getItems === 'function') {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
         return collection.getItems();
      }

      if (Array.isArray(collection)) {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return
         return [...collection];
      }

      return [];
   }
}
