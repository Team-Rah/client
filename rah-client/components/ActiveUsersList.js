import Container from '@mui/material/Container';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../socket/socket';
import uuid from 'react-uuid';

// !! TO DO -> switch from props to users list
export default function ActiveUsersList(props) {

  const socket = useContext(SocketContext);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    socket.emit('join-room', {userName: uuid()}, 'lobby');
    socket.on('receive-lobby', (users) => {
      setUsersList(users);
    })
    socket.on('error', (err) => {
      console.error(err);
    })
  }, [])

  return (
    <Container maxWidth={false} id="activeUsers-container">
        <h3>Online Players</h3>
        {props.users.map((user) => (
          <div key={JSON.stringify(user)} maxWidth={false} className="activeUser-item">

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
  )
}