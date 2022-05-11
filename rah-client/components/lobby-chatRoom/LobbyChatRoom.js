import React, { useState, useEffect, useContext } from 'react';
import List from '@mui/material/List';
import styled from 'styled-components';
import { SocketContext } from '../../socket/socket';
import Container from '@mui/material/Container';
export default function LobbyChatRoom() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([])

  const socket = useContext(SocketContext);

  //put where online players are.
  useEffect(() => {
    socket.on('connect', () => {
      //socket.emit('join-lobby', { username: 'josh' });
    });
    // socket.on('joined-lobby', (user) => {
    //   console.log('user', user);
    // });

    socket.on('recieved-message-lobby', (message) => {
      console.log('lobby', message)
      // message = {user:}
      setMessages([...messages, message]);
    })
  });
  //socket.on('lobby-message-recieved', { username: 'josh' })
  //building up message to display
  // useEffect(() => {
  //   socket.on('receive-message', (user, msg) => {
  //     const copyChat = [...chats]
  //     copyChat.push({user, msg})
  //     setChats(copyChat)
  //   })
  // })

  return (
    <StyledChatBox>
      {messages.map((message) => {
        return <p>{message.user}: {message.text}</p>
      })}
    </StyledChatBox>
  );
}

const StyledChatBox = styled(Container)`
  border: 1px solid black;
  margin-top: 1em;
  min-width: 100%;
  max-height: 70%;
  overflow: auto;
  padding: 7px;
`;
