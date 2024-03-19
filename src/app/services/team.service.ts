import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountRequest } from "../models/account-request";
import { Account } from "../models/account.model";
import { SaveModeRequest } from "../models/save-mode-request";
import { Team } from "../models/team.model";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',    
      'ngrok-skip-browser-warning':  'true'
    })
};

@Injectable({
    providedIn: "root"
  })
export class TeamService{
    url: string = 'https://charmed-presently-crab.ngrok-free.app/team';
   
    constructor(private http: HttpClient) {}

    save(request: Team): Observable<Team>{
      return this.http.post<Team>(this.url + '/save',request, httpOptions);
    }

    delete(id: number): Observable<any>{
       return this.http.post(this.url + '/delete?id='+id, httpOptions);
    }

    
    addUser(user: number, userName:string,team: number): Observable<any>{
      return this.http.post(this.url + '/addUser?user='+user+'&team='+team+'&name='+userName, httpOptions);
    }      

   deleteUser(user: number, team: number): Observable<any>{
     return this.http.post(this.url + '/deleteUser?user='+user+'&team='+team, httpOptions);
  }
    
}
