/**
 * Utilitários para trabalhar com o MikroORM de forma type-safe
 */

import { Populate } from '@mikro-orm/core';

/**
 * Retorna nomes de propriedades como um array tipado adequadamente para uso com a opção populate do MikroORM
 * @param names Nomes das propriedades da entidade
 * @returns Array de nomes de propriedades compatível com a opção populate do MikroORM
 */
export function propriedadesDe<T>(...names: Array<keyof T>): Populate<T> {
   return names as unknown as Populate<T>;
}
