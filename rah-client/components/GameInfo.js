import React, { useState } from 'react';
import styled from 'styled-components';
import { shadows } from '@mui/system';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export default function GameInfo (props) {
  const game = props.game
  const info = props.info
  return (
    <StyledContainer maxWidth={false}>
      <br/>
      <GameInfoCard>
        <h3>About your Game</h3>
        <div><b>Your Role:</b> {info.role}</div>
        <div><b>Players Remaining:</b> {info.playersLeft}</div>
        <div><b>Anubis Remaining:</b> {info.wolfsLeft}</div>
        <div><b>Doctors Remaining:</b> {info.doctorsLeft}</div>
        <div><b>Seers Remaining:</b> {info.seersLeft}</div>
        <div><b>Day:</b> {game.phase}</div>
      </GameInfoCard>
      <StyledCard>
        <h3>Instructions</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae
            consequuntur voluptatum laborum numquam blanditiis harum
            quisquam eius sed odit fugiat iusto fuga praesentium optio,
            eaque rerum! Provident similique accusantium nemo autem.
            Veritatis obcaecati tenetur iure eius earum ut molestias
            architecto voluptate aliquam nihil, eveniet aliquid culpa
            officia aut! Impedit sit sunt quaerat, odit, tenetur error,
            harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia.
            Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
            sapiente officiis modi at sunt excepturi expedita sint? Sed
            quibusdam recusandae alias error harum maxime adipisci amet
            laborum.</p>
      </StyledCard>
      <Button onClick={props.close}>X</Button>
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)`
  align-items: center;
  background-color: rgba(128, 128, 128, 0.112);
  display: flex;
  height: min-content;
  justify-content: center;
  text-align: center;
`;

const StyledCard = styled(Card)`
  margin: 5px;
  padding: 5px;
  width: 350px;
`;

const GameInfoCard = styled(Card)`
  height: fit-content;
  margin: 5px;
  padding: 5px;
  width: 350px;
`;

const Button = styled.button`
  align-self: flex-start;
  background-color: gray;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  float: right;
  height: fit-content;
  margin: 5px;
  position: relative;
  width: fit-content;
`;
