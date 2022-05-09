import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function LoginForm() {

  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = (data) => {
    axios({
      method: 'post',
      url: '/',
      data: {username: username, password: password, jwtToken: ''}
    })
      .then((res) => res)
      .catch((err) => err);
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} maxWidth="sm" id="login-container">
        <TextField placeholder="Username" {...register("username", { required: true })} />
        {errors.username && <span style={{color: 'red'}}>Enter a valid username</span>}
        <TextField placeholder="Password" {...register("password", { required: true })} />
        {errors.password && <span style={{color: 'red'}}>Enter a valid password</span>}
        <Button type="submit" sx={{ color: '#413C39' }} size="medium">Login</Button>
      </form>
  )
}
