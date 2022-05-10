import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
export default function GameRow(props) {
  let game = props.game;
  let creator = game.owner;
  let gameName = game.gameName;
  //let players = game.players.length.toString() + '/' + game.player.allowed

  return (
    <Grid container columnSpacing={25}>
      <Grid item>
        <p>{creator}</p>
      </Grid>
      <Grid item>
        <p>{gameName}</p>
      </Grid>
      <Grid item>
        <p>players</p>
      </Grid>
    </Grid>
  );
}
