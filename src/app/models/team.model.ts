import { Player } from "./player";

export class  Team { 
    id: number;
    name:string;
    associatedUsers: Array<number>;
    admins: Array<number>;
}
