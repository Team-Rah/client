import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../../_states/tokenState';
export default function CreateGame() {
  // /blueocean/api/v1/games
  //send token as header to so backend can get id from token
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState(0);
  const [gameName, setGameName] = useState('');
  const creator = useRecoilValue(userState);
  console.log(creator);
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
    const url = 'http://localhost:4030/blueocean/api/v1/games';
    console.log(players, gameName);
    axios
      .post(
        url,
        { players, gameName },
        {
          headers: {
            Authorization: `Bearer ${creator.userToken}`,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
