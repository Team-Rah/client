import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function SignupForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    axios({
      method: 'post',
      url: '/',
      data: { username: username, password: password, email: email }
    })
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <>
      <Container id="signup-container" maxWidth={false}>
        <TextField variant="standard" name="username" label="Username" onChange={(e) => setUsername(e.target.value)}/>
        <TextField variant="standard" name="password" label="Password" onChange={(e) => setPassword(e.target.value)} />
        <TextField variant="standard" name="email" label="Email" onChange={(e) => setEmail(e.target.value)}/>
        <Button variant="standard" size="medium" onClick={(e) => handleSubmit(e)}>Create Account</Button>
      </Container>

    </>

  )
}