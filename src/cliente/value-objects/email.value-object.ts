export class Email {
    private readonly value: string;

    constructor(value: string) {
        if (!this.isValidEmail(value)) {
            throw new Error('Invalid email');
        }
        this.value = value;
    }

    private isValidEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    toString(): string {
        return this.value;
    }
}