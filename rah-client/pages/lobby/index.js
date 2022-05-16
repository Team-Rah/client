import React, { useState, useEffect, useContext } from 'react';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import Navbar from '../../components/Navbar/Navbar';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ChatForm from '../../components/Lobby/LobbyChatForm';
import GameRow from '../../components/GameRow.js';
import LobbyDisplay from '../../components/Lobby/LobbyDisplay';
import { sampleGame } from '../_sampleData/sampleGame.js';
import axios from 'axios';
import LobbyChatRoom from '../../components/Lobby/LobbyChatRoom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import CreateGame from '../../components/Lobby/CreateGame';
import ActiveUsersList from '../../components/ActiveUsersList';
import { userState } from '../../_states/tokenState';
import { useRecoilState } from 'recoil';
import { SocketContext } from '../../socket/socket';
import GamesList from '../../components/GamesList.js';
import { useRouter } from 'next/router';
export default function Lobby() {
  const router = useRouter();

  const [value, setValue] = useState(0);
  const [user, setUser] = useRecoilState(userState);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const socket = useContext(SocketContext);

  const [games, setGames] = useState([]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('userToken'));
    //gate-keep
    if (user.userToken.length < 1 && !localUser) {
      router.push('/');
    } else {
      setUser(localUser);
    }
    socket.emit('get-games', games);
    socket.on('receive-games', (games) => {
      setGames(games);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ minWidth: '900px', maxWidth: '1600px' }}>
        <Container
          maxWidth={false}
          disableGutters={true}
          style={{
            display: 'flex',
            margin: '2%',
            position: 'relative',
            top: '-20px',
          }}>
          <div
            style={{
              position: 'relative',
              top: '25px',
              left: '33px',
              width: '215px',
            }}>
            <ActiveUsersList />
          </div>

          <Container
            maxWidth={false}
            disableGutters={true}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 'fit-content',
            }}>
            <Container maxWidth={false} id='gameDisplay-container' style={{ marginBottom: '15px' }}>
              {value === 0 ? (
                <GamesList games={games} value={value} handleChange={handleChange} />
              ) : (
                <CreateGame handleChange={gameCreated} />
              )}
            </Container>

            <Container maxWidth={false} id='lobbyChat-container'>
              <LobbyChatRoom />
              <ChatForm />
            </Container>
          </Container>
        </Container>
      </div>
    </>
  );
}
