import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Player } from "src/app/models/player";
import { DeletePlayerRequest } from "../models/delete-player-request.model";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',    
      'ngrok-skip-browser-warning':  'true'
    })
};

@Injectable({
    providedIn: "root"
  })
export class PlayerService{
    url: string = 'https://charmed-presently-crab.ngrok-free.app/player';
   
    constructor(private http: HttpClient) {}

    getPlayers(id: string): Observable<Array<Player>>{
        return this.http.get<Array<Player>>(this.url + '/getPlayers?id=' + id);
    }
    deletePlayer(request: DeletePlayerRequest): Observable<boolean>{
      return this.http.post<boolean>(this.url + '/deletePlayer',request, httpOptions);
    }
    addPlayer(player: Player): Observable<boolean>{
      return this.http.post<boolean>(this.url + '/addPlayer',player, httpOptions);
    }

    
    updatePlayer(player: Player): Observable<boolean>{
      return this.http.post<boolean>(this.url + '/updatePlayer',player, httpOptions);
    }
    
    
}
