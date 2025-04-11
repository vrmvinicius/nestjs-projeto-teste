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
            // Se o campo privado for undefined, não há comparação a ser feita
            continue;
         }

         let valueToUse: any;

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
}
