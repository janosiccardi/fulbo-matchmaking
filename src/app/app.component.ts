import { Component, ViewChild } from '@angular/core';
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
import { Scroller } from 'primeng/scroller';

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
  public selectedUsers: Array<number> = [];
  public userNameToAdd : string;
  public userToAdd : number;
  public addUserToTeam: boolean;
  public overall: Player;
  @ViewChild('sc') sc!: Scroller;


  constructor(public generateService : GenerateService,
            public accountService : AccountService,
            public teamService: TeamService,
            public playerService: PlayerService) { 
  }

  ngOnInit(){
  }

  reset() {
    this.sc.scrollToIndex(0, 'smooth');
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
        if(value.name == "#Overall" && value.team == 1){
         this.overall = value;
        }
      });
    });
  }

 
  public changeMode(player: Player){
    this.changeModeLocal(player);
    this.updatePlayer();
  }

  public changeModeLocal(player: Player){
   player.goalkeeper = !player.goalkeeper;
   this.playerToEdit = player;
 }

  public getOvl(player :Player){
    if(this.smpMode || player.name == "#Overall"){
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
          alert("Debe ingresar nombre y/o numeros entre 1 y 99");
        }else{
          this.playerToAdd = new Player();
          this.addPlayerDisplay = false;
        }
        this.getPlayers();
      });
    }else{                
      alert("Debe ingresar nombre y/o numeros entre 1 y 99");
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
    p.diving = player.diving;
    p.handling = player.handling;
    p.kicking = player.kicking;
    p.positioning2 = player.positioning2;
    p.reflex = player.reflex;
    p.rejection = player.rejection;
    p.goalkeeper = player.goalkeeper;
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
          alert("Debe ingresar nombre y/o numeros entre 1 y 99");
        }else{     
        this.duplicatePlayerDisplay = false;
        this.playerToDuplicate = new Player();
        this.getPlayers();
        }
      });
    }else{                
      alert("Debe ingresar nombre y/o numeros entre 1 y 99");
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
    if(player.name == "#Overall"){
      return true;
    }
    if(!this.smpMode && !player.goalkeeper){
      return !(player.finishing == null || (player.finishing + '') == '' || player.finishing < 1 || player.finishing > 99 ||
          player.passing == null || (player.passing + '') == '' || player.passing < 1 || player.passing > 99 ||
          player.technique == null || (player.technique + '') == '' || player.technique < 1 || player.technique > 99 ||
          player.dribbling == null || (player.dribbling + '') == '' || player.dribbling < 1 || player.dribbling > 99 ||
          player.speed == null || (player.speed + '') == '' || player.speed < 1 || player.speed > 99 ||
          player.strength == null || (player.strength + '') == '' || player.strength < 1 || player.strength > 99 ||
          player.stamina == null || (player.stamina + '') == '' || player.stamina < 1 || player.stamina > 99 ||
          player.defending == null || (player.defending + '') == '' || player.defending < 1 || player.defending > 99 ||
          player.aggression == null || (player.aggression + '') == '' || player.aggression < 1 || player.aggression > 99 ||
          player.positioning == null ||(player.positioning + '') == '' || player.positioning < 1 || player.positioning > 99 ||
          player.vision == null || (player.vision + '') == '' || player.vision < 1 || player.vision > 99 ||
          player.composure == null || (player.composure + '') == '' || player.composure < 1 || player.composure > 99 ) && player.name != null && player.name.trim() != '';
    }
    if(!this.smpMode && player.goalkeeper){
      return !(player.positioning2 == null || (player.positioning2 + '') == '' || player.positioning2 < 1 || player.positioning2 > 99 ||
          player.handling == null || (player.handling + '') == '' || player.handling < 1 || player.handling > 99 ||
          player.kicking == null || (player.kicking + '') == '' || player.kicking < 1 || player.kicking > 99 ||
          player.diving == null || (player.diving + '') == '' || player.diving < 1 || player.diving > 99 ||
          player.rejection == null || (player.rejection + '') == '' || player.rejection < 1 || player.rejection > 99 ||
          player.reflex == null || (player.reflex + '') == '' || player.reflex < 1 || player.reflex > 99 ) && player.name != null && player.name.trim() != '';
    }
      return player.overallSmp != null && (player.overallSmp + '') != '' && player.overallSmp > 1 && player.overallSmp < 99 && player.name != null && player.name.trim() != '';
  }

  updatePlayer(){    
    this.playerToEdit.team = this.selectedTeam;
    if(this.validateFields(this.playerToEdit)){
      this.playerService.updatePlayer(this.playerToEdit).subscribe(data =>{      
        this.playerToEdit = new Player();
        this.getPlayers();
        this.editPlayerDisplay = false;
      },error =>{
        if (error.error.error == "Bad Request"){           
          alert("Debe ingresar nombre y/o numeros entre 1 y 99");
        }
      });
    }else{                
      alert("Debe ingresar nombre y/o numeros entre 1 y 99");
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
      if(p.finishing != null && p.passing != null && p.name != '#Overall'){
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
        this.team1.sort((a, b) => this.compare(a,b));
        this.team2.sort((a, b) => this.compare(a,b));        
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

  public compare(playerA:Player, playerB:Player) {
    let a = playerA.goalkeeper ? 0 : (!this.smpMode ? playerA.overall : playerA.overallSmp);
    let b = playerB.goalkeeper ? 0 : (this.smpMode ? playerB.overall : playerB.overallSmp);   
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

 
  saveMode(){
    this.accountModel.smpMode = this.smpMode;
    this.accountService.save( this.accountModel).subscribe(data => {
      this.smpMode = data.smpMode;
    });
    this.team1.sort((a, b) => this.compare(a,b));
    this.team2.sort((a, b) => this.compare(a,b));
    
  }

  isOverall(name: string): boolean{
    if(name == "#Overall"){
        return this.selectedTeam == 1 && this.adminTeam;
    }else{
      return true;
    }
   }
    
   public closeAddUser(){
    this.userNameToAdd = '';
    this.userToAdd = Number.NaN;
    this.addUserToTeam = false;
  }

  updateTeam(){
    const index = this.teams.indexOf(this.teamToEdit);
    this.teamService.save(this.teamToEdit).subscribe(data => { 
      this.teams.splice(index, 1, data);
      this.closeEditTeam();
      this.editTeam(this.teams[index]);
    });
  }
  
  closeEditTeam(){
    this.editTeamDisplay = false;
    this.teamToEdit = new Team();
  }

  makeAdmin(user: number){
    if(!this.teamToEdit.admins.includes(user)){
      this.teamToEdit.admins.push(user);
      this.updateTeam();
    }
  }

  deleteUserOfTeam(user:Account, team: number){
    if(this.teamToEdit.admins.length == 1 && this.teamToEdit.admins.includes(user.id)){
      alert("Debe haber un administrador del grupo!");
    }else{
      const index = this.teamToEdit.associatedUsers.indexOf(user.id);
      const indexUSER = this.teamToEdit.users.indexOf(user);
      this.teamService.deleteUser(user.id,team).subscribe(data =>{
        this.teamToEdit.associatedUsers.splice(index,1);
        this.teamToEdit.users.splice(indexUSER,1);
        if(this.teamToEdit.admins.includes(user.id)){
          const index2 = this.teamToEdit.admins.indexOf(user.id);
          this.teamToEdit.admins.splice(index2,1);
        }
      });
    }
  }
  addUserTeam(){
    if(this.teamToEdit.associatedUsers.includes(this.userToAdd)){
      let sameUser = true;
      this.teamToEdit.users.forEach((user) => {
        if(user.id == this.userToAdd){
          sameUser = user.nickname == this.userNameToAdd;
        }
      });
      if(sameUser){
        alert("Ya existe el usuario en el grupo grupo!");
      }else{
        alert("El usuario no existe o el nombre es incorrecto!");
      }
    }else{
      this.teamService.addUser(this.userToAdd,this.userNameToAdd,this.teamToEdit.id).subscribe(data =>{
        this.teamToEdit.associatedUsers.push(this.userToAdd);        
        this.teamToEdit.users.push(data);
        this.updateTeam();
        this.closeAddUser();
      }, error =>{
        if(error){                 
          alert("El usuario no existe o el nombre es incorrecto!");
        }
      });
    }
  }


  invalidGoalkeepers(selectedPlayers: Array<Player>): boolean{
    let count = 0;
    selectedPlayers.forEach((player) =>{
      if(player.goalkeeper){
          count++;
      }
    });
    return count != 0 && count != 2;
  }
}

