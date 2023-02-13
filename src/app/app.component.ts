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
  public selectedPlayers: Array<Player> = [];
  public players: Array<Player> = [];
  public team1: Array<Player> = [];
  public team2: Array<Player> = [];
  public score1: number = 0;  
  public score2: number = 0;

  ngOnInit(){
    this.chargePlayers();
    this.players.sort((a, b) => a.name.localeCompare(b.name));
    this.players.forEach(p => p.overall = this.getOverall(p));
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
  

  public generateTeams() {
    let people = this.selectedPlayers;
    let combinations = [];
    for (let i = 0; i < 10; i++) {
      for (let j = i + 1; j < 10; j++) {
        for (let k = j + 1; k < 10; k++) {
          for (let l = k + 1; l < 10; l++) {
            for (let m = l + 1; m < 10; m++) {
              let group1 = [people[i], people[j], people[k], people[l], people[m]];
              let group2 = people.filter(person => !group1.includes(person));
              let group1Score = group1.reduce((total, person) => total + person.overall, 0) / 5;
              let group2Score = group2.reduce((total, person) => total + person.overall, 0) / 5;
              if (Math.abs(group1Score - group2Score) <= 1) {
                combinations.push([group1, group2]);
              }
            }
          }
        }
      }
    }
    let randomNumber = this.getRandomInt(combinations.length);
    this.team1 = combinations[randomNumber][0];    
    this.team2 = combinations[randomNumber][1];
    this.score1 = this.team1.reduce((total, person) => total + person.overall, 0) / 5;
    this.score2 = this.team2.reduce((total, person) => total + person.overall, 0) / 5;
    this.team1.sort((a, b) => this.compare(a.overall,b.overall));
    this.team2.sort((a, b) => this.compare(a.overall,b.overall));

  }
  public compare(a:number, b:number) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  
  public getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
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
    return (((player.finishing * 10 + player.passing * 8 + player.dribbling * 10 + player.defending * 7 + 
      player.speed * 5 + player.strength * 6 + player.stamina * 9 + player.aggression * 2 + player.composure * 5 + 
      player.positioning * 9 + player.vision * 7 + player.technique * 8) / 12) / 10) + 30;
  }
  
  public chargePlayers(){
    let eitan  = {
      name: "Eitan",
      finishing: 87,
      passing: 85,
      dribbling: 98,
      defending: 83,
      speed: 94,
      strength: 95,
      stamina: 97,
      aggression: 71,
      composure: 57,
      positioning: 93,
      vision: 92,
      technique: 97,
      overall:0,
    }    
    this.players.push(eitan);
    this.players.push(eitan);
    this.players.push(eitan);
    
    let mauri  = {
      name: "Mauri",
      finishing: 82,
      passing: 78,
      dribbling: 88,
      defending: 67,
      speed: 87,
      strength: 83,
      stamina: 68,
      aggression: 94,
      composure: 77,
      positioning: 76,
      vision: 76,
      technique: 90,
      overall:0,
    }
    this.players.push(mauri);

    let jano  = {
      name: "Jano",
      finishing: 62,
      passing: 77,
      dribbling: 66,
      defending: 71,
      speed: 82,
      strength: 79,
      stamina: 82,
      aggression: 50,
      composure: 87,
      positioning: 78,
      vision: 82,
      technique: 64,
      overall:0,
    }
    this.players.push(jano);

    let iñaki  = {
      name: "Iñako",
      finishing: 86,
      passing: 85,
      dribbling: 95,
      defending: 85,
      speed: 95,
      strength: 91,
      stamina: 98,
      aggression: 83,
      composure: 87,
      positioning: 86,
      vision: 81,
      technique: 88,
      overall:0,
    }
    this.players.push(iñaki);

    let fer  = {
      name: "Fer",
      finishing: 51,
      passing: 62,
      dribbling: 67,
      defending: 82,
      speed: 64,
      strength: 92,
      stamina: 57,
      aggression: 87,
      composure: 78,
      positioning: 54,
      vision: 58,
      technique: 63,
      overall:0,
    }
    this.players.push(fer);
    
    let jose  = {
      name: "Jose",
      finishing: 58,
      passing: 76,
      dribbling: 82,
      defending: 77,
      speed: 84,
      strength: 78,
      stamina: 55,
      aggression: 68,
      composure: 83,
      positioning: 82,
      vision: 78,
      technique: 81,
      overall:0,
    }
    this.players.push(jose);

    let juan  = {
      name: "Juan",
      finishing: 51,
      passing: 63,
      dribbling: 52,
      defending: 81,
      speed: 81,
      strength: 81,
      stamina: 75,
      aggression: 99,
      composure: 86,
      positioning: 52,
      vision: 58,
      technique: 61,
      overall:0,
    }
    this.players.push(juan);
    
    let juli  = {
      name: "Juli",
      finishing: 87,
      passing: 93,
      dribbling: 84,
      defending: 83,
      speed: 80,
      strength: 89,
      stamina: 88,
      aggression: 57,
      composure: 90,
      positioning: 95,
      vision: 97,
      technique: 94,
      overall:0,
    }
    this.players.push(juli);
    let percy  = {
      name: "Percy",
      finishing: 58,
      passing: 60,
      dribbling: 57,
      defending: 63,
      speed: 82,
      strength: 76,
      stamina: 86,
      aggression: 52,
      composure: 84,
      positioning: 56,
      vision: 55,
      technique: 60,
      overall:0,
    }
    this.players.push(percy);
    
    let saimon  = {
      name: "Saimon",
      finishing: 94,
      passing: 87,
      dribbling: 96,
      defending: 86,
      speed: 85,
      strength: 86,
      stamina: 81,
      aggression: 58,
      composure: 92,
      positioning: 95,
      vision: 93,
      technique: 96,
      overall:0,
    }
    this.players.push(saimon);

    let santi  = {
      name: "Santi",
      finishing: 50,
      passing: 52,
      dribbling: 51,
      defending: 68,
      speed: 61,
      strength: 81,
      stamina: 84,
      aggression: 50,
      composure: 90,
      positioning: 56,
      vision: 51,
      technique: 53,
      overall:0,
    }
    this.players.push(santi);
    
    let scopa  = {
      name: "Scopa",
      finishing: 54,
      passing: 56,
      dribbling: 55,
      defending: 56,
      speed: 73,
      strength: 74,
      stamina: 62,
      aggression: 53,
      composure: 90,
      positioning: 60,
      vision: 58,
      technique: 58,
      overall:0,
    }
    this.players.push(scopa);
  }
}
