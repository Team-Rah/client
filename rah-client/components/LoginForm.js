import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { userState } from '../_states/tokenState';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#F1F7ED",
  border: "1px solid gray",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  textAlign: "center",
};

// const basePath = 'http://localhost:4030/blueocean/api/v1';
const basePath = `http://35.245.230.155:4040/blueocean/api/v1`;

export default function LoginForm() {

  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [token, setToken] = useRecoilState(userState);

  useEffect(() => {
    if (submitted) {
      router.push('/lobby');
    }
  });

  const onSubmit = (data) => {
    axios({ method: 'POST', url: `${basePath}/users/login`, data: data })
      .then((res) => {
        if (res.status === 200) {
          setToken({userId: res.data.user._id, userToken: res.data.token, userName: res.data.user.userName});
          localStorage.setItem('userToken', JSON.stringify({userId: res.data.user._id, userToken: res.data.token, userName: res.data.user.userName}))
          setSubmitted(true);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Box sx={style}>
        <h3 style={{color: '#9A8249'}}>WELCOME BACK!</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          maxWidth="sm"
          id="login-container"
        >
          <TextField
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
          />
          {errors.email && (
            <div className="formValidation-error">Enter a valid email</div>
          )}
          <TextField
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <div className="formValidation-error">Enter a valid password</div>
          )}
          <Button type="submit" sx={{ color: "#9A8249", border: '1px solid #9A8249' }} size="medium">
            Login
          </Button>
        </form>
      </Box>
    </>
  );
}
