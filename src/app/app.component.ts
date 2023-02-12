import { Component } from '@angular/core';
import {Player} from '../app/player';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fulbo-matchmaking';
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
    return stat < 60? "#white" : stat < 70 ? "#008000" : stat < 80 ? "#FFFF00" : stat < 90 ? "#FF8000" : "#FF0000";
  }

  public getOverall(player: Player): number {
    return (Math.round(((player.finishing * 10 + player.passing * 8 + player.dribbling * 10 + player.defending * 7 + player.speed * 6 + player.strength * 6 + player.stamina * 10 + player.aggression * 2 + player.composure * 5 + player.positioning * 9 + player.vision * 7 + player.technique * 8) / 12) / 10)) + 30;
  }
  
  public chargePlayers(){
    let eitan  = {
      name: "Eitan",
      finishing: 87,
      passing: 83,
      dribbling: 97,
      defending: 84,
      speed: 94,
      strength: 95,
      stamina: 94,
      aggression: 72,
      composure: 63,
      positioning: 93,
      vision: 92,
      technique: 98
    }
    this.players.push(eitan);
    
    let mauri  = {
      name: "Mauri",
      finishing: 81,
      passing: 75,
      dribbling: 89,
      defending: 66,
      speed: 85,
      strength: 83,
      stamina: 62,
      aggression: 94,
      composure: 78,
      positioning: 73,
      vision: 77,
      technique: 90,
    }
    this.players3.push(mauri);

    let jano  = {
      name: "Jano",
      finishing: 62,
      passing: 77,
      dribbling: 64,
      defending: 71,
      speed: 78,
      strength: 79,
      stamina: 82,
      aggression: 50,
      composure: 87,
      positioning: 81,
      vision: 84,
      technique: 63,
    }
    this.players2.push(jano);    

    let iñaki  = {
      name: "Iñako",
      finishing: 84,
      passing: 80,
      dribbling: 95,
      defending: 85,
      speed: 96,
      strength: 91,
      stamina: 99,
      aggression: 83,
      composure: 87,
      positioning: 82,
      vision: 81,
      technique: 88,
    }
    this.players.push(iñaki);

    let fer  = {
      name: "Fer",
      finishing: 51,
      passing: 63,
      dribbling: 67,
      defending: 88,
      speed: 63,
      strength: 98,
      stamina: 57,
      aggression: 87,
      composure: 78,
      positioning: 54,
      vision: 58,
      technique: 63,
    }
    this.players.push(fer);
    
    let jose  = {
      name: "Jose",
      finishing: 58,
      passing: 77,
      dribbling: 78,
      defending: 75,
      speed:80,
      strength: 78,
      stamina: 55,
      aggression: 68,
      composure: 83,
      positioning: 82,
      vision: 78,
      technique: 81,
    }
    this.players2.push(jose);

    let juan  = {
      name: "Juan",
      finishing: 51,
      passing: 63,
      dribbling: 52,
      defending: 81,
      speed: 74,
      strength: 81,
      stamina: 75,
      aggression: 99,
      composure: 93,
      positioning: 52,
      vision: 58,
      technique: 61,
    }
    this.players2.push(juan);    
    
    let juli  = {
      name: "Juli",
      finishing: 88,
      passing: 98,
      dribbling: 84,
      defending: 83,
      speed: 73,
      strength: 89,
      stamina: 88,
      aggression: 57,
      composure: 89,
      positioning: 95,
      vision: 97,
      technique: 94,
    }
    this.players3.push(juli);

    let percy  = {
      name: "Percy",
      finishing: 56,
      passing: 58,
      dribbling: 57,
      defending: 63,
      speed: 71,
      strength: 76,
      stamina: 86,
      aggression: 52,
      composure: 84,
      positioning: 56,
      vision: 55,
      technique: 60,
    }
    this.players3.push(percy);
    
    let saimon  = {
      name: "Saimon",
      finishing: 97,
      passing: 87,
      dribbling: 98,
      defending: 85,
      speed: 80,
      strength: 86,
      stamina: 81,
      aggression: 58,
      composure: 91,
      positioning: 95,
      vision: 93,
      technique: 96,
    }
    this.players4.push(saimon);

    let santi  = {
      name: "Santi",
      finishing: 50,
      passing: 58,
      dribbling: 53,
      defending: 68,
      speed: 83,
      strength: 81,
      stamina: 84,
      aggression: 50,
      composure: 97,
      positioning: 56,
      vision: 51,
      technique: 56,
    }
    this.players4.push(santi);    
    
    let scopa  = {
      name: "Scopa",
      finishing: 54,
      passing: 56,
      dribbling: 55,
      defending: 61,
      speed: 68,
      strength: 74,
      stamina: 62,
      aggression: 53,
      composure: 78,
      positioning: 70,
      vision: 58,
      technique: 58,
    }
    this.players4.push(scopa);
  }
}
