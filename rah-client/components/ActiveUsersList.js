import Container from "@mui/material/Container";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SocketContext } from "../socket/socket";
import uuid from "react-uuid";
import { userState } from "../_states/tokenState";
import { useRecoilValue } from "recoil";
import Typography from "@mui/material/Typography";
// remove
import activeUsers from "../pages/_sampleData/activeUsers";

// !! TO DO -> switch from props to users list
export default function ActiveUsersList() {
  const socket = useContext(SocketContext);
  const userData = useRecoilValue(userState);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    socket.emit("join-room", userData.userName, "lobby");
    socket.on("receive-lobby", (users) => {
      setUsersList(users);
      // console.log(users, 'users');
    });
    socket.on("error", (err) => {
      console.error(err);
    });
  }, []);

  return (
    <div id="activeUsers-outerContainer">
      <Title id="activeUsers-header">ONLINE PLAYERS</Title>
      <Container
        disableGutters={true}
        maxWidth={false}
        id="activeUsers-container"
      >
        {/* {!usersList.length ? <div>No active users</div> : usersList.map((user) => ( */}
        {activeUsers.map((user) => (
          <div key={JSON.stringify(user)} className="activeUser-item">
            <div id="activeUsersList-container">
              <div className="activeUsers-username">
                <span className="userAvatar">{user.userName[0]}</span>
                <span className="userName">{user.userName}</span>
              </div>
              <span className="activeUsers-rank"> {user.score} </span>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}

const Title = styled(Typography)`
  font-family: monospace;
  text-align: center;
  letter-spacing: 0.1rem;
  padding-top: 6px;
  font-weight: 700;
`;
