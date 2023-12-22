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
    url: string = 'https://41c8-2800-2130-7a40-73a-6857-bf5c-d128-1ca9.ngrok-free.app/player/getPlayers?id=8DzTyrSnu7bAPXMQqBK5jg==/generate';
   
    constructor(private http: HttpClient) {}
    
    generateTeams(request: GenerateRequestModel): Observable<GenerateResponseModel>{
        return this.http.post<GenerateResponseModel>(this.url + '/generateTeams',request, httpOptions);
    }
    
}
