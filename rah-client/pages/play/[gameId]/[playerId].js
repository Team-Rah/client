import Container from "@mui/material/Container";
import React, { useState, useEffect, useContext } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Navbar from "../../../components/Navbar/Navbar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import styled from "styled-components";
import axios from "axios";
import { SocketContext } from "../../../socket/socket";
import { getGameInfo } from "./funcs.js";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import GameInfo from "../../../components/GameInfo.js";
import PlayChat from "../../../components/GameRoom/PlayChatForm";
import PlayerCard from "../../../components/PlayerCard.js";
import { sampleGame } from "../../../pages/_sampleData/sampleGame.js";
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/solid';
const basePath = "http://localhost:4030/blueocean/api/v1";

export default function Game() {
  const [players, setPlayers] = useState([]);
  const [owner, setOwner] = useState();
  const [announcement, setAnnouncement] = useState(
    "somegr greauig yu ireuygr iuo"
  );
  const [role, setRole] = useState("wolf");
  const [phase, setPhase] = useState("night");
  const [card, setCard] = useState(0);
  const [open, setOpen] = useState(false);
  const [game, setGame] = useState();
  const [gameInfo, setGameInfo] = useState();
  const socket = useContext(SocketContext);
  const router = useRouter();
  const { gameId, playerId } = router.query;
  var started = false;
  const closeDrawer = () => {
    setOpen(false);
  };
  const startGame = () => {};
  const switchPhase = () => {
    phase === "night" ? setPhase("day") : setPhase("night");
  };
  const moveRight = () => {
    if (card < game.players.length - 5) {
      let current = card;
      setCard(current + 5);
    } else {
      let current = card;
      setCard(players.length - 5);
    }
  };
  const moveLeft = () => {
    if (Card > 5) {
      let current = card;
      setCard(current - 5);
    } else {
      let current = card;
      setCard(0);
    }
  };

  useEffect(() => {
    return () => {
      socket.on(`receive-message-${gameId}`, (user, message) => {
        if (user.userName === "announcement") {
          setAnnouncement(message);
        }
        console.log(user, message);
      });
      socket.on("game-send", (gameData) => {
        setGame(gameData);
        setGameInfo(getGameInfo(gameData, playerId));
      });
      if (started === false) {
        socket.emit("join-room", playerId, "333");
        socket.emit("start-test", playerId, gameId, 5000);
        started = true;
      }
    };
  }, []);

  useEffect(() => {
    const container = document.querySelector(".playerCardContainer");
    if (game) {
      const container = document.querySelector(".playerCardContainer");
      container.style.transitionDuration = ".8s";
      container.style.transform = `translate( -${card * 150}px)`;
    }
  }, [card]);

  useEffect(() => {
    console.log(game);
  }, [game]);

  return (
    <>
      <Navbar />
      <Container sx={{ float: "left", width: "25%" }}>
        <StyledPlayChat></StyledPlayChat>
        <PlayChat />
      </Container>
      {game ? (
        <Box sx={{ display: "inline-block", float: "right", width: "75%" }}>
          <Container maxWidth={false} id="gameBoard-container">
            {announcement ? <Alert>{announcement}</Alert> : null}
            <button onClick={() => setOpen(!open)}>Game Info</button>
            <Drawer
              open={open}
              className="gameInfoDrawer"
              variant="persistent"
              anchor="top"
            >
              <div>
                <GameInfo close={closeDrawer} info={gameInfo} game={game} />
              </div>
            </Drawer>
            {game ? (
              game.owner._id === playerId ? (
                <button onclick={startGame}>Start Game</button>
              ) : null
            ) : null}
            <h3>game owner: {game.owner}</h3>
            <h3>your role: {gameInfo.role}</h3>
            <h3>{game.phase}</h3>
          </Container>
          <Container maxWidth={false} id="playerCards-container">
            <StyledButton onClick={moveLeft}><ChevronLeftIcon height="25"/></StyledButton>

            <div className="viewport">
              <div
                disableGutters={true}
                maxWidth={false}
                className="playerCardContainer"
              >
                <Stack direction="row" spacing={0}>
                  {game.players ? (
                    game.players.map((player) => {
                      if (player.player.userID !== playerId) {
                        return (
                          <PlayerCard
                            key={player.player.userName}
                            phase={game.phase}
                            role={gameInfo.role}
                            player={player}
                          />
                        );
                      }
                    })
                  ) : (
                    <p>Loading</p>
                  )}
                </Stack>
              </div>
            </div>
            <StyledButton onClick={moveRight}>
              <ChevronRightIcon height="25"/>
            </StyledButton>
          </Container>
        </Box>
      ) : (
        <h2>no game</h2>
      )}
    </>
  );
}

const StyledPlayChat = styled(List)`
  border: 1px solid black;
  margin-top: 1em;
  min-width: 100%;
  height: 60vh;
  overflow: auto;
  padding: 7px;
`;

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  height: 20px;
  width: 20px;
  margin-left: 10px;
`;