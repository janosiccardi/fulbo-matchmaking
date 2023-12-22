import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountRequest } from "../models/account-request";
import { Account } from "../models/account.model";
import { SaveModeRequest } from "../models/save-mode-request";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
@Injectable({
    providedIn: "root"
  })
export class AccountService{
    url: string = 'https://1146-2800-2130-7a40-73a-6857-bf5c-d128-1ca9.ngrok-free.app/account';
   
    constructor(private http: HttpClient) {}

    getAccount(request: AccountRequest): Observable<Account>{
      return this.http.post<Account>(this.url + '/get',request, httpOptions);
    }

    save(request: Account): Observable<Account>{
      return this.http.post<Account>(this.url + '/save',request, httpOptions);
    }
    
}
