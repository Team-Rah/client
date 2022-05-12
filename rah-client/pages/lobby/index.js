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
import { userState } from "../../_states/tokenState";
import { useRecoilState } from "recoil";
import { SocketContext } from "../../socket/socket";
import GamesList from "../../components/GamesList.js";
import {useRouter} from 'next/router';
export default function Lobby() {
const router = useRouter();

  const [value, setValue] = useState(0);
  const [user, setUser] = useRecoilState(userState);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const gameCreated = () => {
    setValue(0)
  }

  const socket = useContext(SocketContext);

  const [games, setGames] = useState([]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('userToken'))
    //gate-keep
    if (user.userToken.length < 1 && !localUser) {
      router.push('/')
    } else {
        setUser(localUser)
    }
    socket.emit("get-games", games);
    return () => {
      socket.on("receive-games", (games) => {
        console.log("game data is here", games);
        setGames(games);
      });
    };
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth={false} disableGutters={true} style={{ display: "flex", margin: "2%", position: 'relative', top: '-18px'}} >
        <div style={{position: 'relative', top: '45px', left: '33px', width: '215px'}}>
          <ActiveUsersList/>
        </div>

        <Container maxWidth={false} disableGutters={true} style={{ display: "flex", flexDirection: "column", width: "fit-content", }} >

          <TabsContainer
            TabIndicatorProps={{style: {backgroundColor: '#9A8249', color: '#F1F7ED'}}}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyledTab label="Lobby"
            />
            <StyledTab label="Create"
            />
          </TabsContainer>

          <Container
            maxWidth={false}
            id="gameDisplay-container"
            style={{ margin: "0" }}
          >
            {value === 0 ? <GamesList games={games} /> : <CreateGame handleChange={gameCreated} />}
          </Container>

          <Container maxWidth={false} id="lobbyChat-container">
            <LobbyChatRoom />
            <ChatForm />
          </Container>
        </Container>
      </Container>
    </>
  );
}

const OnlineTitle = styled.p`
  text-align: center;
`;

const TabsContainer = styled(Tabs)`
  margin-left: 28px;
`;

const StyledTab = styled(Tab)`
  color: #9A8249;
`;

