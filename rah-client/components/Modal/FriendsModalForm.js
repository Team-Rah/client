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
  };
  return (
    <>
      <Box sx={style}>
        <FriendName>FRIEND NAME HERE</FriendName>
        <List style={{ marginTop: '1em', maxHeight: '200px', overflow: 'auto' }}>
          DO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE
          CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO
          HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE
          CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO
          HEREDO THE CHATS GO HEREDO THE CHATS GO HEREDO THE CHATS GO HERE
        </List>
        <Form onSubmit={onSubmitForm}>
          <TextareaAutosize
            onChange={onChangeForm}
            style={{ width: '100%', borderRadius: '7px' }}
            placeholder='Message friend name here'
          />
          <input hidden type='submit' />
        </Form>
        <Button
          style={{ maxWidth: '75px', maxHeight: '25px', marginTop: '2em' }}
          size='small'
          variant='outlined'
          color='error'>
          Unfriend
        </Button>
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
