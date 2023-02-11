import { Component } from '@angular/core';
import {Player} from '../app/player';
import { faStar } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fulbo-matchmaking';
  faStar = faStar;
  public basic: any;
  public menu = true;
  public viewMenu = false;  
  public asingTeam = false;
  public players: Array<Player> = [];
  public players2: Array<Player> = [];
  public players3: Array<Player> = [];
  public players4: Array<Player> = [];
  
  ngOnInit(){
    this.chargePlayers();
    this.players.sort((a, b) => a.name.localeCompare(b.name));
    this.players2.sort((a, b) => a.name.localeCompare(b.name));
    this.players3.sort((a, b) => a.name.localeCompare(b.name));
    this.players4.sort((a, b) => a.name.localeCompare(b.name));
  }

  public viewPlayer(){
    this.menu=false;
    this.asingTeam=false;
    this.viewMenu= true;
  }
  public asingTeams(){
    this.menu=false;
    this.viewMenu= false;
    this.asingTeam=true;
  }

  public back(){
    this.menu=true;
    this.viewMenu= false;
    this.asingTeam=false;
  }
  
  public getMediaColor(stat: number){
    return stat < 75? "white": stat < 80? "#008000" : stat < 90 ? "#FFFF00" : stat < 95 ? "#FF8000" : "#FF0000";
  }

  public getOverall(player: Player): number {
    return player.finishing * player.passing;
  }
  
  public chargePlayers(){
    let eitan  = {
      name: "Eitan",
      finishing: 8,
      passing: 7,
      dribbling: 10,
      defending: 7,
      speed: 9,
      strength: 10,
      stamina: 9,
      aggression: 5,
      composure: 3,
      positioning: 1,
      vision: 1,
      technique: 1
    }
    this.players.push(eitan);
    
    let mauri  = {
      name: "Mauricio",
      finishing: 5,
      passing: 5,
      dribbling: 7,
      defending: 4,
      speed: 8,
      strength: 4,
      stamina: 3,
      aggression: 9,
      composure: 6,
      positioning: 1,
      vision: 1,
      technique: 1,
    }
    this.players3.push(mauri);

    let jano  = {
      name: "Jano",
      finishing: 3,
      passing: 6,
      dribbling: 2,
      defending: 5,
      speed: 6,
      strength: 6,
      stamina: 7,
      aggression: 1,
      composure: 8,
      positioning: 1,
      vision: 1,
      technique: 1,
    }
    this.players2.push(jano);    

    let iñaki  = {
      name: "Iñako",
      finishing: 7,
      passing: 6,
      dribbling: 9,
      defending: 7,
      speed: 10,
      strength: 8,
      stamina: 10,
      aggression: 7,
      composure: 8,
      positioning: 1,
      vision: 1,
      technique: 1,
    }
    this.players.push(iñaki);

    let fer  = {
      name: "Fer",
      finishing: 1,
      passing: 4,
      dribbling: 5,
      defending: 8,
      speed: 5,
      strength: 9,
      stamina: 2,
      aggression: 7,
      composure: 6,
      positioning: 1,
      vision: 1,
      technique: 1,
    }
    this.players.push(fer);
    
    let jose  = {
      name: "Jose",
      finishing: 3,
      passing: 6,
      dribbling: 5,
      defending: 5,
      speed:6,
      strength: 5,
      stamina: 1,
      aggression: 4,
      composure: 7,
      positioning: 1,
      vision: 1,
      technique: 1,
    }
    this.players2.push(jose);

    let juan  = {
      name: "Juan",
      finishing: 1,
      passing: 4,
      dribbling: 1,
      defending: 7,
      speed: 5,
      strength: 6,
      stamina: 5,
      aggression: 10,
      composure: 9,
      positioning: 1,
      vision: 1,
      technique: 1,
    }
    this.players2.push(juan);    
    
    let juli  = {
      name: "Juli",
      finishing: 8,
      passing: 10,
      dribbling: 6,
      defending: 7,
      speed: 5,
      strength: 8,
      stamina: 8,
      aggression: 2,
      composure: 8,
      positioning: 1,
      vision: 1,
      technique: 1,
    }
    this.players3.push(juli);

    let percy  = {
      name: "Percy",
      finishing: 3,
      passing: 4,
      dribbling: 1,
      defending: 1,
      speed: 1,
      strength: 1,
      stamina: 1,
      aggression: 1,
      composure: 1,
      positioning: 1,
      vision: 1,
      technique: 1,
    }
    this.players3.push(percy);
    
    let saimon  = {
      name: "Saimon",
      finishing: 10,
      passing: 8,
      dribbling: 9,
      defending: 7,
      speed: 7,
      strength: 8,
      stamina: 7,
      aggression: 2,
      composure: 9,
      positioning: 1,
      vision: 1,
      technique: 1,
    }
    this.players4.push(saimon);

    let santi  = {
      name: "Santi",
      finishing: 1,
      passing: 2,
      dribbling: 1,
      defending: 4,
      speed: 6,
      strength: 5,
      stamina: 7,
      aggression: 1,
      composure: 10,
      positioning: 1,
      vision: 1,
      technique: 1,
    }
    this.players4.push(santi);    
    
    let scopa  = {
      name: "Scopa",
      finishing: 1,
      passing: 1,
      dribbling: 1,
      defending: 1,
      speed: 1,
      strength: 1,
      stamina: 1,
      aggression: 1,
      composure: 1,
      positioning: 1,
      vision: 1,
      technique: 1,
    }
    this.players4.push(scopa);
  }
}
