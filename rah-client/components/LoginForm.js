import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function LoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    axios({
      method: 'post',
      url: '/',
      data: {username: username, password: password, jwtToken: ''}
    })
      .then((res) => res)
      .catch((err) => err);
  }

  return (
      <Container maxWidth="sm" id="login-container">
        <TextField label="Username" variant="standard" name="username" onChange={(e) => setUsername(e.target.value)} />
        <TextField label="Password" name="password" variant="standard" onChange={(e) => setPassword(e.target.value)}/>
        <Button variant="standard" sx={{ color: '#413C39' }} size="medium" onClick={(e) => handleSubmit(e)}>Login</Button>
      </Container>
  )
}
