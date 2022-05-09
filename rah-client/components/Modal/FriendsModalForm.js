import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import List from '@mui/material/List';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '7px',
};

export default function FriendsModalForm() {
  const [message, setMessage] = useState('');

  const onChangeForm = (e) => {
    setMessage(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log(message);

    setMessage('');
  };
  return (
    <>
      <Box sx={style}>
        <FriendName>FRIEND NAME HERE</FriendName>
        <StyledChatBox>
          DO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE
          CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO
          HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE
          CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO
          HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HERE
        </StyledChatBox>
        <Form onSubmit={onSubmitForm}>
          <FormInput
            value={message}
            type='text'
            onChange={onChangeForm}
            placeholder='Message friend name here'
          />
          <input hidden type='submit' />
        </Form>
        <StyledButton size='small' variant='outlined' color='error'>
          Unfriend
        </StyledButton>
      </Box>
    </>
  );
}

const FriendName = styled.p`
  text-align: center;
`;

const Form = styled.form`
  margin-top: 2em;
`;

const FormInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 7px;
`;

const StyledButton = styled(Button)`
  max-width: 75px;
  maxheight: 25px;
  margintop: 2em;
`;

const StyledChatBox = styled(List)`
  border: 1px solid black;
  margin-top: 1em;
  max-height: 200px;
  overflow: auto;
  padding: 7px;
`;
