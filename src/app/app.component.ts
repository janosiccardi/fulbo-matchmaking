import { Component } from '@angular/core';
import { AccountRequest } from './models/account-request';
import { DeletePlayerRequest } from './models/delete-player-request.model';
import { GenerateRequestModel } from './models/generate-teams-request.model';
import {Player} from './models/player';
import { AccountService } from './services/account.service';
import { GenerateService } from './services/generate-teams.service';
import { PlayerService } from './services/player.service';
import * as CryptoJS from 'crypto-js';
import { SaveModeRequest } from './models/save-mode-request';
import { Account } from './models/account.model';

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
  public account: number;
  public addPlayerDisplay = false;
  public editPlayerDisplay = false;
  public duplicatePlayerDisplay = false;
  public playerToEdit: Player;
  public playerToAdd : Player;
  public playerToDelete: Player;
  public playerToDuplicate: Player;
  public indexToDelete: number;
  public viewMenu = false;  
  public asingTeam = false;
  public selectedPlayers: Array<Player> = [];
  public optionsPlayers: Array<Player> = [];
  public players: Array<Player> = [];
  public team1: Array<Player> = [];
  public team2: Array<Player> = [];
  public score1: number = 0;  
  public score2: number = 0;
  public confirmDeletePlayer: boolean;
  public smpMode: boolean;
  public combinationQty: number;
  public selectedTeam: number;
  accountModel: Account;

  constructor(public generateService : GenerateService,
            public accountService : AccountService,
            public playerService: PlayerService) { 
  }
  ngOnInit(){
    this.selectedTeam = 1;
  }

  public getPlayers(){    
    this.playerService.getPlayers(this.selectedTeam).subscribe(data =>{
      this.players = data;
      this.players.sort((a, b) => a.name.localeCompare(b.name));     
      this.players.push(new Player());
    });
  }

  public getOvl(player :Player){
    if(this.smpMode){
      if(player.overallSmp == null || (player.overallSmp + '') == ''){
         return '0.0';
      }else{
        return (player.overallSmp+'').substr(0,4);
      }
    }else{
        return (player.overall == null || (player.overall + '') == '') ? '0.0' : player.overall.toFixed(1);
    }
  }

  newPlayer(){
    this.playerToAdd = new Player();
    this.addPlayerDisplay = true;
  }
  
  public addPlayer(){
    this.playerToAdd.team = this.selectedTeam;
    if(this.validateFields(this.playerToAdd)){
      this.playerService.addPlayer(this.playerToAdd).subscribe(data =>{    
      }, error =>{
        if(error.error == "This player already exist!"){
          alert(error.error);
        }else if (error.error.error == "Bad Request"){           
          alert("Debe ingresar numeros");
        }else{
          this.playerToAdd = new Player();
          this.addPlayerDisplay = false;
        }
        this.getPlayers();
      });
    }else{                
      alert("Debe ingresar numeros");
    }
  }

  public duplicate(player : Player){
    let p : Player = new Player();
    p.name = player.name;
    p.finishing = player.finishing;
    p.passing = player.passing;
    p.technique = player.technique;
    p.dribbling = player.dribbling;
    p.speed = player.speed;
    p.strength = player.strength;
    p.stamina = player.stamina;
    p.defending = player.defending;
    p.aggression = player.aggression;
    p.positioning = player.positioning;
    p.vision = player.vision;
    p.composure = player.composure;
    p.overallSmp = player.overallSmp;
    this.playerToDuplicate = p;
    this.duplicatePlayerDisplay = true;
  }

  public duplicatePlayer(){
    this.playerToDuplicate.team = this.selectedTeam;
    if(this.validateFields(this.playerToDuplicate)){
      this.playerService.addPlayer(this.playerToDuplicate).subscribe(data =>{    
      }, error =>{
        console.log(error);
        if(error.error == "This player already exist!"){
          alert(error.error);
        }else if (error.error.error == "Bad Request"){           
          alert("Debe ingresar numeros");
        }else{     
        this.duplicatePlayerDisplay = false;
        this.playerToDuplicate = new Player();
        this.getPlayers();
        }
      });
    }else{                
      alert("Debe ingresar numeros");
    }

  }
  
  editPlayer(player: Player){
    this.playerToEdit = player;
    this.editPlayerDisplay = true;
  }

  
  validateFields(player: Player) {
    if(!this.smpMode){
      return !(player.finishing == null || (player.finishing + '') == '' ||
          player.passing == null || (player.passing + '') == '' ||
          player.technique == null || (player.technique + '') == '' ||
          player.dribbling == null || (player.dribbling + '') == '' ||
          player.speed == null || (player.speed + '') == '' ||
          player.strength == null || (player.strength + '') == '' ||
          player.stamina == null || (player.stamina + '') == '' ||
          player.defending == null || (player.defending + '') == '' ||
          player.aggression == null || (player.aggression + '') == '' ||
          player.positioning == null ||(player.positioning + '') == '' ||
          player.vision == null || (player.vision + '') == '' ||
          player.composure == null || (player.composure + '') == '');
    }else{
      return player.overallSmp != null && (player.overallSmp + '') != '';
    }
  }

  updatePlayer(){    
    this.playerToEdit.team = this.selectedTeam;
    if(this.validateFields(this.playerToEdit)){
      this.playerService.updatePlayer(this.playerToEdit).subscribe(data =>{      
        this.playerToEdit.overall = this.getOverall(this.playerToEdit);
        this.playerToEdit = new Player();
        this.editPlayerDisplay = false;
      },error =>{
        if (error.error.error == "Bad Request"){           
          alert("Debe ingresar numeros");
        }
      });
    }else{                
      alert("Debe ingresar numeros");
    }
  }
  public viewPlayer(){
    this.menu=false;
    this.asingTeam=false;
    this.viewMenu= true;
  }
  public asingTeams(){
    this.menu=false;
    this.viewMenu= false; 
    this.optionsPlayers = [];
    for(let p of this.players){
      if(p.finishing != null && p.passing != null){
        this.optionsPlayers.push(p);
      }
    }
    this.asingTeam=true;
  }
    public generateTeams() { 
    let request: GenerateRequestModel = new GenerateRequestModel();
    request.players = this.selectedPlayers;
    request.smpMode = this.smpMode;
    this.generateService.generateTeams(request).subscribe(data => {
      if(data != null){
        this.team1 = data.team1;    
        this.team2 = data.team2;     
        this.score1 = this.team1.reduce((total, person) => total + person.overall, 0) / this.team1.length;
        this.score2 = this.team2.reduce((total, person) => total + person.overall, 0) / this.team2.length;
        if(!this.smpMode){
          this.team1.sort((a, b) => this.compare(a.overall,b.overall));
          this.team2.sort((a, b) => this.compare(a.overall,b.overall));
        }else{
          this.team1.sort((a, b) => this.compare(a.overallSmp,b.overallSmp));
          this.team2.sort((a, b) => this.compare(a.overallSmp,b.overallSmp));
        }
        this.combinationQty = data.combinationQty;
      }else{
        alert("Nigunga combinación posible!");
      }
    });
  }

  refresh(): void {
    window.location.reload();
}

  public deletePlayerDialog(player: Player, i: number){
    this.confirmDeletePlayer = true;
    this.playerToDelete = player;
    this.indexToDelete = i;
  }
  public deletePlayer(){
    let request: DeletePlayerRequest = new DeletePlayerRequest();
    request.playerName = this.playerToDelete.name;
    request.team = this.selectedTeam;
    this.playerService.deletePlayer(request).subscribe(data =>{
      this.players.splice(this.indexToDelete,1);
    });
    this.confirmDeletePlayer = false;
  }
  public closeDeleteDialog(){
    this.confirmDeletePlayer = false;
    this.playerToDelete = new Player();
    this.indexToDelete = -1;
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
  public loginAccount(){
    let request: AccountRequest = new AccountRequest();
    request.us = this.user;
    request.pass = CryptoJS.AES.encrypt(this.password.trim(), 'fmm2023').toString();
    this.accountService.getAccount(request).subscribe(data => {
      this.account = data.id;
      this.getPlayers();        
      this.menu=true;
      this.login= false;
      this.accountModel = data;
      this.smpMode = data.smpMode;
    });
  }

  public getMediaColorText(s: string){    
    let stat : number = +s;
    return stat < 75? "#white" : stat < 80 ? "#00AA00" : stat < 90 ? "#FFFF00" : stat < 95 ? "#FF8000" : "#FF0000";
  }
  public getMediaColor(stat: number){
    return stat < 75? "#white" : stat < 80 ? "#00AA00" : stat < 90 ? "#FFFF00" : stat < 95 ? "#FF8000" : "#FF0000";
  }
  public getOverall(player: Player): number {
    return (((player.finishing * 10 + player.passing * 8 + player.dribbling * 10 + player.defending * 9 + 
      player.speed * 5 + player.strength * 6 + player.stamina * 8 + player.aggression * 1 + player.composure * 5 + 
      player.positioning * 9 + player.vision * 7 + player.technique * 7) / 12) / 10) + 29;
  }
 
  saveMode(){
    this.accountModel.smpMode = this.smpMode;
    this.accountService.save( this.accountModel).subscribe(data => {
      this.smpMode = data.smpMode;
    });
    if(!this.smpMode){
      this.team1.sort((a, b) => this.compare(a.overall,b.overall));
      this.team2.sort((a, b) => this.compare(a.overall,b.overall));
    }else{
      this.team1.sort((a, b) => this.compare(a.overallSmp,b.overallSmp));
      this.team2.sort((a, b) => this.compare(a.overallSmp,b.overallSmp));
    }
  }

}

