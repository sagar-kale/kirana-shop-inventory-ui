import { Customer } from '../customer/customer';

export class Product {
    id: number;
    productName: string;
    catId: number;
    qty: number;
    measure: string;
    purchasePrice: number;
    salePrice: number;
    desc: string;
    customer: Customer;
}
