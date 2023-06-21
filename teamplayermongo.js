//To find the average, minimum and maximum score of the teams

const prompt = require('prompt-sync')();

const {MongoClient, ServerApiVersion} = require('mongodb');

const uri = "mongodb+srv://adithivbsc22:UWUjQqigocvRLLc1@clusteradithi.6bto6mj.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient (uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

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

  get_average_age(number_players) {
    let total_age = 0;
    for (let i = 0; i < number_players; i++) {
      total_age += this.players[i].age;
    }
    let average_age = total_age / number_players;
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

  get_average_score(number_teams) {
    let total_score = 0;
    for (let i = 0; i < number_teams; i++) {
      total_score += this.teams[i].score;
    }
    let average_score = total_score / number_teams;
    return average_score;
  }

  get_max_score(number_teams) {
    let max_score = this.teams[0].score;
    for (let i = 1; i < number_teams; i++) {
      if (max_score < this.teams[i].score) {
        max_score = this.teams[i].score;
      }
    }
    return max_score;
  }

  get_min_score(number_teams) {
    let min_score = this.teams[0].score;
    for (let i = 1; i < number_teams; i++) {
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
    let player = input_player_details();
    players.add_player(player);
  }
  return players;
}

function input_n_teams(number_teams, teams) {
  for (let i = 0; i < number_teams; i++) {
    let team = input_team_details();
    teams.add_team(team);
  }
  return teams;
}

function output(average_age, average_score, max_score, min_score) {
  console.log("Average Age: ", average_age)
  console.log("Average Score:", average_score);
  console.log("Max Score:", max_score);
  console.log("Min Score:", min_score);
}

async function mongo(player_num, players_array, team_num, teams_array) {
  try {
    //Connecting to a database
    await client.connect();
    await client.db('admin').command({ping:1});
    console.log("Connected to Mongo DB");
    const dbName = client.db('Team&PlayersMongoDB');

    //Dropping the collections
    await dbName.dropCollection('Players');
    console.log("Collection Dropped");
    await dbName.dropCollection('Teams');
    console.log("Collection Dropped");

    //Creating the collections
    await dbName.createCollection('Players');
    console.log("Players Collection Created")
    await dbName.createCollection('Teams');
    console.log("Teams Collection Created")

    //Inserting to the players collection
    const collect_players = dbName.collection('Players');
    let i;
    for(i=0;i<player_num;i++) {
      await collect_players.insertOne({
      'ID': players_array.players[i].id,
      'Player Name': players_array.players[i].name,
      'Age': players_array.players[i].age,
      'Team': players_array.players[i].team,
      })
      console.log("Player %d inserted",players_array.players[i].id,"\n");
    }

    //Inserting to the teams collection
    const collect_teams = dbName.collection('Teams');
    for(i=0;i<team_num;i++) {
      await collect_teams.insertOne({
      'ID': teams_array.teams[i].id,
      'Team Name': teams_array.teams[i].name,
      })
      console.log("Team %d inserted",teams_array.teams[i].id,"\n");
    }

    //Update and delete the collections
    console.log("1. Update a player record \n2. Delete a player record \n3. Update a team record \n4. Delete a team record")
    let choice = parseInt(prompt("Enter your choice: "))
    if(choice == 1) {
      let id = parseInt(prompt("Enter the id of the player to be updated: "));
      let name = prompt("Enter the new player name: ");
      let age = parseInt(prompt("Enter the new player age: "));
      let team = prompt("Enter the new player team: ");
      await collect_players.updateOne({'ID': id}, {$set: {'Player Name': name, 'Age': age, 'Team': team}});
      console.log("Player Updated \n");
    }
    else if(choice == 2) {
      let id = parseInt(prompt("Enter the id of the player to be deleted: "));
      await collect_players.deleteOne({'ID': id});
      console.log("Player Deleted \n");
    }
    else if(choice == 3) {
        let id = parseInt(prompt("Enter the id of the team to be updated: "));
        let name = prompt("Enter the new team name: ");
        await collect_teams.updateOne({'ID': id}, {$set: {'Team Name': name}});
        console.log("Team Updated \n");  
    }
    else if(choice == 4) {
        let id = parseInt(prompt("Enter the id of the team to be deleted: "));
        await collect_teams.deleteOne({'ID': id});
        console.log("Team Deleted \n");
      }
    else {
      console.log("Invalid choice")
    }
  } finally {
    client.close();
  }
}

function main() {
  let player_num = input_number_players();
  let team_num = input_number_teams();
  let players_array = new nPlayers();
  let teams_array = new nTeams();
  input_n_players(player_num, players_array);
  input_n_teams(team_num, teams_array);
  let average_age = players_array.get_average_age(player_num)
  let average_score = teams_array.get_average_score(team_num)
  let max_score = teams_array.get_max_score(team_num)
  let min_score = teams_array.get_min_score(team_num)
  output(average_age, average_score, max_score, min_score);
  mongo(player_num, players_array, team_num, teams_array);
}

main();
