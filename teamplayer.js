//To find the average, minimum and maximum score of the teams

const prompt = require('prompt-sync')();

class Player {
  static player_id = 1
  constructor(name, age, team) {
    this.id = Player.player_id;
    Player.player_id = Player.player_id + 1;
    this.name = name;
    this.age = age
    this.team = team;
  }
}

class nPlayers {
  constructor() {
    this.players = []
  }

  add_player(player) {
    this.players.push(player);
  }

  get_average_age() {
    let total_age = 0;
    for (let i = 0; i < this.players.length; i++) {
      total_age += this.players[i].age;
    }
    let average_age = total_age / this.players.length;
    return average_age;
  }
}

class Team {
  static team_id = 1
  constructor(name, score) {
    this.id = Team.team_id;
    Team.team_id = Team.team_id + 1;
    this.name = name;
    this.score = score;
  }
}

class nTeams {
  constructor() {
    this.teams = []
  }

  add_team(team) {
    this.teams.push(team);
  }

  get_average_score() {
    let total_score = 0;
    for (let i = 0; i < this.teams.length; i++) {
      total_score += this.teams[i].score;
    }
    let average_score = total_score / this.teams.length;
    return average_score;
  }

  get_max_score() {
    let max_score = this.teams[0].score;
    for (let i = 1; i < this.teams.length; i++) {
      if (max_score < this.teams[i].score) {
        max_score = this.teams[i].score;
      }
    }
    return max_score;
  }

  get_min_score() {
    let min_score = this.teams[0].score;
    for (let i = 1; i < this.teams.length; i++) {
      if (min_score > this.teams[i].score) {
        min_score = this.teams[i].score;
      }
    }
    return min_score;
  }
}

function input_number_teams() {
  let team_num = parseInt(prompt("Enter the number of teams: "));
  console.log("\n");
  return team_num;
}

function input_number_players() {
  let player_num = parseInt(prompt("Enter the number of players: "));
  console.log("\n");
  return player_num;
}

function input_player_details() {
  let player_name = prompt("Enter the player's name: ");
  let player_age = parseInt(prompt("Enter the player's age: "));
  let player_team = prompt("Enter the player's team: ")
  console.log("\n");
  return new Player(player_name, player_age, player_team);
}

function input_team_details() {
  let team_name = prompt("Enter the team name: ");
  let team_score = parseFloat(prompt("Enter the team score: "));
  console.log("\n");
  return new Team(team_name, team_score);
}

function input_n_players(number_players, players) {
  for (let i = 0; i < number_players; i++) {
    players.add_player(input_player_details());
  }
}

function input_n_teams(number_teams, teams) {
  for (let i = 0; i < number_teams; i++) {
    teams.add_team(input_team_details());
  }
}

function output(average_age, average_score, max_score, min_score) {
  console.log("Average Age: ", average_age)
  console.log("Average Score:", average_score);
  console.log("Max Score:", max_score);
  console.log("Min Score:", min_score);
}

function main() {
  let player_num = input_number_players();
  let team_num = input_number_teams();
  let players_array = new nPlayers();
  let teams_array = new nTeams();
  input_n_players(player_num, players_array);
  input_n_teams(team_num, teams_array);
  let average_age = players_array.get_average_age()
  let average_score = teams_array.get_average_score()
  let max_score = teams_array.get_max_score()
  let min_score = teams_array.get_min_score()
  output(average_age, average_score, max_score, min_score);
}

main();
