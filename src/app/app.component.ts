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
import { Team } from './models/team.model';
import { TeamService } from './services/team.service';

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
  public addTeamDisplay = false;
  public editPlayerDisplay = false;
  public editTeamDisplay = false;
  public duplicatePlayerDisplay = false;
  public playerToEdit: Player;
  public accountToSingUp : Account = new Account();
  public singUp = false;
  public playerToAdd : Player;
  public teamToAdd : Team;
  public playerToDelete: Player;
  public teamToDelete: Team;
  public teamToEdit: Team;
  public playerToDuplicate: Player;
  public indexToDelete: number;
  public indexToDeleteTeam: number;
  public viewMenu = false;  
  public viewTeams = false;  
  public asingTeam = false;
  public selectedPlayers: Array<Player> = [];
  public optionsPlayers: Array<Player> = [];
  public players: Array<Player> = [];
  public team1: Array<Player> = [];
  public team2: Array<Player> = [];
  public score1: number = 0;  
  public score2: number = 0;
  public confirmDeletePlayer: boolean;
  public confirmDeleteTeam: boolean;
  public teams : Array<Team> = [];
  public smpMode: boolean;
  public adminTeam = false;
  public combinationQty: number;
  public selectedTeam: number;
  accountModel: Account;
  public overall!: Player;

  constructor(public generateService : GenerateService,
            public accountService : AccountService,
            public teamService: TeamService,
            public playerService: PlayerService) { 
  }
  ngOnInit(){
  }

  showId(){
    alert("Usuario: "+this.accountModel.nickname +"\nID: "+this.account);
  }

  public actionSingUpMenu(){
    this.singUp = !this.singUp;
    this.accountToSingUp = new Account();
  }

  
  public singUpAccount(){
    this.accountToSingUp.pass = CryptoJS.AES.encrypt(this.accountToSingUp.pass.trim(), 'fmm2023').toString();
    this.accountService.save(this.accountToSingUp).subscribe(data => {
      if(data.id != null){
        alert("Cuenta registrada!");
      }
    });
  }

  public selectTeam(team: Team){
    this.selectedTeam = team.id;
    this.adminTeam = team.admins.includes(this.account);
    this.getPlayers();  
    this.menu=true;
    this.login= false;
  }

  public getPlayers(){    
    this.playerService.getPlayers(this.selectedTeam).subscribe(data =>{
      this.players = data;
      this.players.sort((a, b) => a.name.localeCompare(b.name));     
      this.players.push(new Player());      
      this.players.forEach((value) => {
        if(value.name == "Overall" && value.team == 1){
         this.overall = value;
         const index = this.players.indexOf(value);
         this.players.splice(index);
         this.players.unshift(value);
        }
      });
    });
  }

  public getOvl(player :Player){
    if(this.smpMode || player.name == "Overall"){
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

  newTeam(){
    this.teamToAdd = new Team();
    this.addTeamDisplay = true;
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

    
  editTeam(team: Team){
    this.teamToEdit = team;
    this.editTeamDisplay = true;
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
        this.getPlayers();
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

  createTeam(){
    this.teamToAdd.admins = [this.account];
    this.teamToAdd.associatedUsers = [this.account];
    this.teamService.save(this.teamToAdd).subscribe(data =>{  
      if(data){
        this.teamToAdd = new Team();
        this.teams.splice(this.teams.length -1, 0, data);
        this.addTeamDisplay = false;
      }
    });
  }

  public deleteDialog(player: Player, i: number){
    this.playerToDelete = player;
    this.confirmDeletePlayer = true;
    this.indexToDelete = i;
  }

  public deleteTeamDialog(team: Team, i: number){
    this.teamToDelete = team;
    this.confirmDeleteTeam = true;
    this.indexToDeleteTeam = i;
  }
  public deleteTeam(){
    this.teamService.delete(this.teamToDelete.id).subscribe(data =>{
      this.teams.splice(this.indexToDeleteTeam,1);
    });
    this.confirmDeleteTeam = false;
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

  public closeDeleteTeamDialog(){
    this.confirmDeleteTeam = false;
    this.teamToDelete = new Team();
    this.indexToDeleteTeam = -1;
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
  selectionTeam(team: Team){    
    this.selectTeam(team);  
    this.viewTeams = false;
  }
  public back(){
    this.viewMenu= false;
    this.asingTeam=false;
    this.login=false;
    this.menu=false;
    this.viewTeams = true;
  }
  public loginAccount(){
    let request: AccountRequest = new AccountRequest();
    request.us = this.user;
    request.pass = CryptoJS.AES.encrypt(this.password.trim(), 'fmm2023').toString();
    this.accountService.getAccount(request).subscribe(data => {
      this.account = data.id;    
      this.teams = data.teams;
      this.teams.push(new Team());
      this.accountModel = data;
      this.smpMode = data.smpMode;
      this.viewTeams = true;
      this.login=false;
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
    return (((player.finishing * 10 + player.passing * 8 + player.dribbling * 9 + player.defending * 9 + 
      player.speed * 5 + player.strength * 6 + player.stamina * 6 + player.aggression * 1 + player.composure * 5 + 
      player.positioning * 9 + player.vision * 7 + player.technique * 7) / 12) / 10) +  31.3;
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

  isOverall(name: string): boolean{
    if(name == "Overall"){
        return this.selectedTeam == 1 && this.adminTeam;
    }else{
      return true;
    }
   }

}

