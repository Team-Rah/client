import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
export default function SignupForm(props) {

  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = (data) => {
    axios({ method: 'post', url: '/', data: { username: username, password: password, email: email } })
    .then((res) => console.log(res))
    .catch((err) => err);
  }

  return (
    <>
      <form id="signup-container" onSubmit={handleSubmit(onSubmit)}>
        <TextField placeholder="Username" {...register("username", { required: true })} />
        {errors.username && <span style={{color: 'red'}}>Enter a valid username</span>}
        <TextField placeholder="Password" {...register("password", { required: true })} />
        {errors.password && <span style={{color: 'red'}}>Enter a valid password</span>}
        <TextField placeholder="Email" {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} />
        {errors.email && <span style={{color: 'red'}}>Enter a valid email</span>}

        <Button type="submit" size="medium" sx={{ color: '#413C39'}}>Create Account</Button>
      </form>

    </>

  )
}
