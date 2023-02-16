import { Component } from '@angular/core';
import { CountRequest } from './models/count-request';
import { DeletePlayerRequest } from './models/delete-player-request.model';
import { GenerateRequestModel } from './models/generate-teams-request.model';
import {Player} from './models/player';
import { CountService } from './services/count.service';
import { GenerateService } from './services/generate-teams.service';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fulbo-matchmaking';
  public basic: any;
  public menu = false;
  public login = true;
  public user: string;  
  public password: string;
  public count: number;
  public addPlayerDisplay = false;
  public editPlayerDisplay = false;
  public playerToEdit: Player;
  public playerToAdd : Player;
  public viewMenu = false;  
  public asingTeam = false;
  public selectedPlayers: Array<Player> = [];
  public optionsPlayers: Array<Player> = [];
  public players: Array<Player> = [];
  public team1: Array<Player> = [];
  public team2: Array<Player> = [];
  public score1: number = 0;  
  public score2: number = 0;

  constructor(public generateService : GenerateService,
            public countService : CountService,
            public playerService: PlayerService) { 
  }
  ngOnInit(){
  }

  public getPlayers(){    
    this.playerService.getPlayers(this.count).subscribe(data =>{
      this.players = data;
      this.players.sort((a, b) => a.name.localeCompare(b.name));     
      this.players.push(new Player());
    });
  }


  newPlayer(){
    this.playerToAdd = new Player();
    this.addPlayerDisplay = true;
  }
  
  public addPlayer(){
    this.playerToAdd.cuenta = this.count;
    this.playerService.addPlayer(this.playerToAdd).subscribe(data =>{    
    }, error =>{
      if(error.error == "This player already exist!"){
        alert(error.error);
      }
      this.playerToAdd = new Player();
      this.addPlayerDisplay = false;
      this.getPlayers();
    });
  }
  
  editPlayer(player: Player){
    this.playerToEdit = player;
    this.editPlayerDisplay = true;
  }

  updatePlayer(){    
    this.playerToEdit.cuenta = this.count;
    this.playerService.updatePlayer(this.playerToEdit).subscribe(data =>{
    });
    this.playerToEdit.overall = this.getOverall(this.playerToEdit);
    this.playerToEdit = new Player();
    this.editPlayerDisplay = false;
  }
  public viewPlayer(){
    this.menu=false;
    this.asingTeam=false;
    this.viewMenu= true;
  }
  public asingTeams(){
    this.menu=false;
    this.viewMenu= false; 
    let a = this.players;
    a.splice(a.length-1,1);
    this.optionsPlayers = a;
    this.asingTeam=true;
  }
    public generateTeams() { 
    let request: GenerateRequestModel = new GenerateRequestModel();
    request.players = this.selectedPlayers;
    this.generateService.generateTeams(request).subscribe(data => {
      this.team1 = data.team1;    
      this.team2 = data.team2;     
      this.score1 = this.team1.reduce((total, person) => total + person.overall, 0) / 5;
      this.score2 = this.team2.reduce((total, person) => total + person.overall, 0) / 5;
      this.team1.sort((a, b) => this.compare(a.overall,b.overall));
      this.team2.sort((a, b) => this.compare(a.overall,b.overall));
    });
  }

  refresh(): void {
    window.location.reload();
}

  public deletePlayer(player: Player, i: number){
    let request: DeletePlayerRequest = new DeletePlayerRequest();
    request.playerName = player.name;
    request.id = 1;
    this.playerService.deletePlayer(request).subscribe(data =>{
      this.players.splice(i,1);
    });
  }

  public compare(a:number, b:number) {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  }

  public back(){
    this.menu=true;
    this.viewMenu= false;
    this.asingTeam=false;
    this.login=false;
  }
  public loginCount(){
    let request: CountRequest = new CountRequest();
    request.us = this.user;
    request.pass = this.password;
    this.countService.getCount(request).subscribe(data => {
      this.count = data.id;
      this.getPlayers();        
      this.menu=true;
      this.login= false;
    });
  }
  public getMediaColor(stat: number){
    return stat < 60? "#white" : stat < 70 ? "#008000" : stat < 80 ? "#FFFF00" : stat < 90 ? "#FF8000" : "#FF0000";
  }

  public getOverall(player: Player): number {
    return (((player.finishing * 10 + player.passing * 8 + player.dribbling * 10 + player.defending * 7 + 
      player.speed * 5 + player.strength * 6 + player.stamina * 9 + player.aggression * 2 + player.composure * 5 + 
      player.positioning * 9 + player.vision * 7 + player.technique * 8) / 12) / 10) + 29;
  }
 
}
