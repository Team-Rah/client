import React, { useState, useEffect, useContext } from "react";
import Container from "@mui/material/Container";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ChatForm from "../../components/Lobby/LobbyChatForm";
import GameRow from "../../components/GameRow.js";
import LobbyDisplay from "../../components/Lobby/LobbyDisplay";
import { sampleGame } from "../_sampleData/sampleGame.js";
import axios from "axios";
import LobbyChatRoom from "../../components/Lobby/LobbyChatRoom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import CreateGame from "../../components/Lobby/CreateGame";
import ActiveUsersList from "../../components/ActiveUsersList";
import { userState } from '../../_states/tokenState';
import { useRecoilState } from 'recoil';
import {SocketContext} from '../../socket/socket';
import GamesList from '../../components/GamesList.js';

export default function Lobby() {
  const [value, setValue] = useState(0);
  const [user, setUser] = useRecoilState(userState);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const socket = useContext(SocketContext);

  const [games, setGames] = useState([]);

  useEffect(() => {
    socket.emit('get-games', (games) => {
      console.log('game data is here')
       //setGames(games)
    })
     return () => {

       socket.on('receive-games', (games) => {
         console.log('game data is here', games)
          setGames(games)
       })
     }

  }, []);

//map gameRows out here-v
              //rows = games
console.log(games)
  return (
    <Container maxWidth={false} disableGutters={true}>
      <Navbar />

      <Container maxWidth={false} disableGutters={true} style={{ display: 'flex', margin: '2%' }}>
        <ActiveUsersList />

        <TabsContainer value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='Lobby' />
          <Tab label='Create' />
        </TabsContainer>

        <Box sx={{ display: 'inline-block', float: 'right', width: '80%' }}>
          <Container maxWidth={false} id='gameDisplay-container'>
            {value === 0 ? <GamesList games = {games}/> : <CreateGame />}
          </Container>

          <Container maxWidth={false} id='lobbyChat-container'>
            <LobbyChatRoom />
            <ChatForm />
          </Container>
        </Box>
      </Container>
    </Container>
  );
}

const OnlineTitle = styled.p`
  text-align: center;
`;

const TabsContainer = styled(Tabs)`
  position: absolute;
  margin-left: 22.1%;
  margin-top: 10px;
`;