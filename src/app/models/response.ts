import { User } from '../signup/user';

export class Response {
    statusCode?: any;
    status?: string;
    errMessage: string;
    validationMsg: string;
    entity: any;
    entities: any[];
    validationError: boolean;
    success: boolean;
}
