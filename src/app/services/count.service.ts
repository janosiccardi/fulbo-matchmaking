import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CountRequest } from "../models/count-request";
import { Count } from "../models/count.model";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
@Injectable({
    providedIn: "root"
  })
export class CountService{
    url: string = 'http://localhost:8080/count';
   
    constructor(private http: HttpClient) {}

    getCount(request: CountRequest): Observable<Count>{
      return this.http.post<Count>(this.url + '/get',request, httpOptions);
    }
    
    
}