const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const prompt = require('prompt-sync')();

const app = express();
const port = 3000;

const uri = "mongodb+srv://adithivbsc22:UWUjQqigocvRLLc1@clusteradithi.6bto6mj.mongodb.net/Team&PlayersExpressDB?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Failed to connect to MongoDB:', error));

// Define player schema
const playerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  team: String
});

// Create player model
const Player = mongoose.model('Player', playerSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Function to get user input
function getUserInput(promptText) {
  return prompt(promptText);
}

// Create player route
app.post('/players', async (req, res) => {
  const name = getUserInput('Enter player name: ');
  const age = parseInt(getUserInput('Enter player age: '));
  const team = getUserInput('Enter player team: ');

  if (!name || !age || !team) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const player = new Player({ name, age, team });
  try {
    await player.save();
    res.status(201).json({ message: 'Player added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add player' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
