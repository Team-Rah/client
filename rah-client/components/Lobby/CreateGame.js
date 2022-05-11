import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
export default function CreateGame() {
  // /blueocean/api/v1/games

  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState(0);
  const [gameName, setGameName] = useState('');
  const nameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const numPlayers = (e) => {
    setPlayers(e.target.value);
  };

  const gameNameHandler = (e) => {
    setGameName(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(playerName, players, gameName);
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <label>How many people are playing?</label>
      <FormInput onChange={numPlayers} type='number' />
      <label>What will the game name be?</label>
      <FormInput onChange={gameNameHandler} type='text' />
      <StyledButton size='small' type='submit' variant='outlined'>
        Create
      </StyledButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  text-align: center;
  border: 1px solid black;
  margin-left: 10%;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 250px;
  padding: 10px;
`;

const FormInput = styled.input`
  margin: auto;
  width: 50%;
`;

const StyledButton = styled(Button)`
  width: 30%;
  margin: auto;
`;
