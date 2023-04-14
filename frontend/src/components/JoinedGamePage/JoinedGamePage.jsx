import React from 'react';

function JoinedGamePage(props) {
  const playerList = props.users.map(player => {
    return <li key={player.id}>{player.name}</li>;
  });

  return (
    <div className="Joined-Game">
      <h1>Game Players</h1>
      <ul>{playerList}</ul>
      {/* Add additional features here */}
    </div>
  );
}

export default JoinedGamePage;
