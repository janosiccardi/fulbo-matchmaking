import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Player } from "src/app/models/player";
import { GenerateRequestModel } from "../models/generate-teams-request.model";
import { GenerateResponseModel } from "../models/generate-teams-response.model";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
@Injectable({
    providedIn: "root"
  })
export class GenerateService{ 
    url: string = 'http://localhost:8080/generate';
   
    constructor(private http: HttpClient) {}
    
    generateTeams(request: GenerateRequestModel): Observable<GenerateResponseModel>{
        return this.http.post<GenerateResponseModel>(this.url + '/generateTeams',request, httpOptions);
    }
    
}