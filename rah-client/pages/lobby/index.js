import { useState } from 'react';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import Navbar from '../../components/Navbar/Navbar';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ChatForm from '../../components/lobby-chatForm/ChatForm';
import LobbyDisplay from '../../components/lobby-gameDisplay/LobbyDisplay';
export default function Lobby() {
  return (
    <>
      <Navbar />
      <Container sx={{ float: 'left', width: '20%' }}>
        <OnlineTitle>Online</OnlineTitle>
        <LobbyDisplay />
      </Container>
      <Box sx={{ display: 'inline-block', float: 'right', width: '80%' }}>
        <Container maxWidth={false} id='gameDisplay-container'>
          <p>Game Display Remove Me</p>
          <p>Game Display Remove Me</p>
          <p>Game Display Remove Me</p>
          <p>Game Display Remove Me</p>
          <p>Game Display Remove Me</p>
          <p>Game Display Remove Me</p>
          <p>Game Display Remove Me</p>
          <p>Game Display Remove Me</p>
          <p>Game Display Remove Me</p>
          <p>Game Display Remove Me</p>
          <p>Game Display Remove Me</p>
          <p>Game Display Remove Me</p>
          <p>Game Display Remove Me</p>
        </Container>
        <Container maxWidth={false} id='lobbyChat-container'>
          <p>Chat box</p>
          <StyledChatBox>
            INSIDE HERE IS THE CHAT... INSIDE HERE IS THE CHAT... INSIDE HERE IS THE CHAT... INSIDE
            HERE IS THE CHAT... INSIDE HERE IS THE CHAT... INSIDE HERE IS THE CHAT...
          </StyledChatBox>
          <ChatForm />
        </Container>
      </Box>
    </>
  );
}

const OnlineTitle = styled.p`
  text-align: center;
`;

const StyledChatBox = styled(List)`
  border: 1px solid black;
  margin-top: 1em;
  min-width: 100%;
  min-height: 60%;
  overflow: auto;
  padding: 7px;
`;
