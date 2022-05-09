import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';
import { jwtState } from '../_states/tokenState';
import { useRouter } from 'next/router';

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
  textAlign: 'center',
};

const basePath = 'http://localhost:4030/blueocean/api/v1';

export default function SignupForm(props) {
  const router = useRouter();

  useEffect(() => {
    if (submitted) {
      router.push('/lobby');
    }
  });

  const [submitted, setSubmitted] = useState(false);
  const [token, setToken] = useRecoilValue(jwtState);

  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = (data) => {
    axios({ method: 'post', url: `${basePath}/users`, data: data })
    .then((res) => {
      console.log(res, 'res');
      if (res.status === 200) {
        setSubmitted(true);
        setToken(res.token);
      }
    })
    .catch((err) => err);
  }

  return (
    <>
      <Box sx={style}>
        <h3>Sign Up</h3>
        <form id='signup-container' onSubmit={handleSubmit(onSubmit)}>
          <TextField sx={{border: 'none'}} placeholder='Username' {...register('userName', { required: true })} />
          {errors.username && <span style={{ color: 'red' }}>Enter a valid username</span>}
          <TextField placeholder='Password' {...register('password', { required: true })} />
          {errors.password && <span style={{ color: 'red' }}>Enter a valid password</span>}
          <TextField
            placeholder='Email'
            {...register('email', {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
          />
          {errors.email && <span style={{ color: 'red' }}>Enter a valid email</span>}

          <Button type='submit' size='medium' sx={{ color: '#413C39' }}>
            Create Account
          </Button>
        </form>
      </Box>
    </>
  );

}
