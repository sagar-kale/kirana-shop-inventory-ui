export class Customer {
    id: Number;
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
    type?: string;
}
export enum TYPE {
    CUSTOMER = 'CUSTOMER',
    WHOLESALER = 'WHOLESALER'
}
