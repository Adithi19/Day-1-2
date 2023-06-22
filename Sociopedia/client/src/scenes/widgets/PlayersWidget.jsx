import React, { useState } from 'react';
import { useTheme, Button } from "@mui/material";

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 20,
  },
  heading: {
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: "white",
    padding: "2rem 2rem", 
    borderRadius: "9px", 
  },
  input: {
    marginRight: 10,
    marginBottom: 10,
    borderRadius: "20px", 
    padding: "1rem 1rem", 
    border: '1px solid #ccc',
    width: '300px',
    gap: "3rem",
    backgroundColor: "#f2f2f2" 
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  ul: {
    listStyle: 'none',
    padding: 0,
  },
  li: {
    marginBottom: 10,
  },
  span: {
    marginRight: 10,
  },
};

function PlayerForm({ addPlayer, editPlayer, editMode, setEditMode, editedPlayer }) {
  const { palette } = useTheme();

  const [name, setName] = useState(editedPlayer?.name || '');
  const [age, setAge] = useState(editedPlayer?.age || '');
  const [team, setTeam] = useState(editedPlayer?.team || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && age && team) {
      if (editMode) {
        editPlayer({ id: editedPlayer.id, name, age, team });
        setEditMode(false);
      } else {
        const player = { name, age, team };
        addPlayer(player);
      }
      setName('');
      setAge('');
      setTeam('');
    }
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Team"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        style={styles.input}
      />
        <Button
            fullWidth
            type="Show in New Page"
            sx={{
            m: "0.50rem 0",
            p: "0.50rem",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
            }}
        >
            {editMode ? 'Save' : 'Add Player'}
        </Button>
    </form>
  );
}

function PlayerList({ players, deletePlayer, editPlayer }) {
    const { palette } = useTheme();
  const [editedPlayer, setEditedPlayer] = useState(null);

  const handleEdit = (player) => {
    setEditedPlayer(player);
  };

  const handleCancel = () => {
    setEditedPlayer(null);
  };

  return (
    <ul style={styles.ul}>
      {players.map((player) => (
        <li key={player.id} style={styles.li}>
          {editedPlayer && editedPlayer.id === player.id ? (
            <PlayerForm
              editPlayer={editPlayer}
              editMode={true}
              setEditMode={setEditedPlayer}
              editedPlayer={editedPlayer}
            />
          ) : (
            <span style={styles.span}>
              {player.name}, Age: {player.age}, Team: {player.team}
            </span>
          )}
            <Button
            fullWidth
            onClick={() => handleEdit(player)}
            sx={{
                m: "0.10rem 0",
                p: "0.10rem",
                width: "0.2rem",
                marginRight: "0.5rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
            }}
            >
            Edit
            </Button>
            <Button
                fullWidth
                onClick={handleCancel}
                sx={{
                    m: "0.50rem 0",
                    p: "0.10rem",
                    width: "0.2rem",
                    marginRight: "0.5rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                }}
                >
                Cancel
            </Button>
            <Button
                fullWidth
                onClick={() => deletePlayer(player.id)}
                sx={{
                    m: "0.50rem 0",
                    p: "0.10rem",
                    width: "0.2rem",
                    marginRight: "0.5rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                }}
                >
                Delete
            </Button>
        </li>
      ))}
    </ul>
  );
}

function PlayersWidget() {
  const [players, setPlayers] = useState([]);

  const addPlayer = (player) => {
    const newPlayer = { id: Date.now(), ...player };
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
  };

  const deletePlayer = (id) => {
    setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
  };

  const editPlayer = (updatedPlayer) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => (player.id === updatedPlayer.id ? updatedPlayer : player))
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Player Management</h1>
      <PlayerForm addPlayer={addPlayer} editPlayer={editPlayer} />
      <PlayerList players={players} deletePlayer={deletePlayer} editPlayer={editPlayer} />
    </div>
  );
}

export default PlayersWidget;
