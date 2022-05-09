import { useState } from 'react';
import styled from 'styled-components';
export default function PlayChat() {
  const [chat, setChat] = useState('');

  const chatHandler = (e) => {
    setChat(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(chat);
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
