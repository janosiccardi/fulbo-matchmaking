import { Account } from "./account.model";
import { Player } from "./player";

export class  Team { 
    id: number;
    name:string;
    associatedUsers: Array<number>;
    users: Array<Account>;
    admins: Array<number>;
}
