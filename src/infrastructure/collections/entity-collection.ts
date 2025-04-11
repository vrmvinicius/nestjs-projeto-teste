import { Collection } from '@mikro-orm/core';

/**
 * Classe utilitária para gerenciar coleções de entidades de forma genérica
 * Compatível com arrays normais e com Collection do MikroORM
 */
export class EntityCollection<T extends object> {
   private items: T[] | Collection<T>;

   constructor(items: T[] | Collection<T> = []) {
      this.items = items;
   }

   /**
    * Adiciona um item à coleção
    * @param item Item a ser adicionado
    * @param caller Entidade que está chamando o método
    */
   add(item: T): void {
      if (this.isCollection(this.items)) {
         this.items.add(item);
      } else {
         this.items.push(item);
      }
   }

   /**
    * Remove um item da coleção
    * @param item Item a ser removido
    * @param compareFunction Função opcional para comparar itens
    * @param caller Entidade que está chamando o método
    */
   remove(item: T, compareFunction?: (a: T, b: T) => boolean): void {
      if (this.isCollection(this.items)) {
         this.items.remove(item);
      } else {
         const index = compareFunction
            ? this.items.findIndex((i) => compareFunction(i, item))
            : this.items.indexOf(item);

         if (index >= 0) {
            this.items.splice(index, 1);
         }
      }
   }

   /**
    * Retorna um item específico da coleção pelo índice
    * @param index Índice do item a ser retornado
    * @param caller Entidade que está chamando o método
    */
   getAt(index: number): T | undefined {
      if (this.isCollection(this.items)) {
         const allItems = this.items.getItems();
         return allItems[index];
      }
      return this.items[index];
   }

   /**
    * Retorna todos os itens da coleção
    * @param caller Entidade que está chamando o método
    */
   getAll(): T[] {
      if (this.isCollection(this.items)) {
         return this.items.getItems();
      }
      return [...this.items];
   }

   /**
    * Verifica se o objeto é uma Collection do MikroORM
    */
   private isCollection(obj: any): obj is Collection<T> {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return (
         obj &&
         typeof obj === 'object' &&
         typeof obj.add === 'function' &&
         typeof obj.remove === 'function' &&
         typeof obj.getItems === 'function'
      );
   }
}
