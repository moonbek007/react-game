import React from "react";

function Statistics({ isFullScreen, scores }) {
  return (
    <div className="statistics" style={{ top: isFullScreen ? "90px" : "20px" }}>
      <h1>Statistics</h1>
      <h2>Players</h2>
      <div className="player-names">
        <h4>Player (X) :</h4>
        <h4>Player (O) :</h4>
        <h4>Draws :</h4>
      </div>
      <div className="scores">
        <h4>{scores.playerX}</h4>
        <h4>{scores.playerO}</h4>
        <h4>{scores.draws}</h4>
      </div>
    </div>
  );
}

export default Statistics;
