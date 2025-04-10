export class Telefone {
   private readonly value: string;

   constructor(value: string) {
      if (!this.validateTelefone(value)) {
         throw new Error('Invalid telefone');
      }
      this.value = value;
   }

   private validateTelefone(telefone: string): boolean {
      const regex = /^\d{10,11}$/;
      return regex.test(telefone);
   }

   toString(): string {
      return this.value;
   }
}
