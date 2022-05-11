import { useState, useContext } from 'react';
import styled from 'styled-components';
import {useRecoilValue} from 'recoil';
import { userState } from '../../_states/tokenState';
import { useRouter } from 'next/router'
import { SocketContext } from '../../socket/socket';

export default function PlayChat() {
  const [chat, setChat] = useState('');
  // const [user, setUser] = useRecoilState(userState);
  const user = useRecoilValue(userState);
  const socket = useContext(SocketContext);
  const chatHandler = (e) => {
    setChat(e.target.value);
  };
  const router = useRouter()
  const {gameId, playerId} = router.query

  const onSubmitHandler = (e) => {
    e.preventDefault()
    let message = {
      text: chat,
      time: Date.now(),
      username: user.userName
    }
    socket.emit('send-message', user, message, gameId);
    setChat('');
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <ChatInput value={chat} onChange={chatHandler} type='text' placeholder='message players' />
      <input hidden type='submit' />
    </form>
  );
}

const ChatInput = styled.input`
  width: 100%;
  height: 20px;
  border-radius: 7px;
`;
