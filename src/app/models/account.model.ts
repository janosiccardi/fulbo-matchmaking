import { Team } from "./team.model";

export class  Account { 
    id: number;
    us: string;
    pass: string;
    teams!: Array<Team>;
    nickname: string;
    smpMode: boolean;
}
