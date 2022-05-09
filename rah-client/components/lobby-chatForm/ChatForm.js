import { useState } from 'react';
import styled from 'styled-components';
export default function ChatForm() {
  const [chatBoxInput, setChatBoxInput] = useState('');

  const chatBoxOnChange = (e) => {
    setChatBoxInput(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(chatBoxInput);
    setChatBoxInput('');
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <ChatInput
        type='text'
        placeholder='type to players'
        onChange={chatBoxOnChange}
        value={chatBoxInput}
      />
      <input hidden type='submit' />
    </Form>
  );
}

const Form = styled.form`
  margin-top: 1em;
`;

const ChatInput = styled.input`
  height: 35px;
  border-radius: 7px;
  width: 100%;
`;
