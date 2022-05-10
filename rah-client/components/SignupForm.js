import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Box from "@mui/material/Box";
import { userState } from "../_states/tokenState";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "7px",
  textAlign: "center",
};

const basePath = "http://localhost:4030/blueocean/api/v1";

export default function SignupForm(props) {
  const router = useRouter();

  useEffect(() => {
    if (submitted) {
      router.push("/lobby");
    }
  });

  const [submitted, setSubmitted] = useState(false);
  const [token, setToken] = useRecoilState(userState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios({ method: "post", url: `${basePath}/users`, data: data })
      .then((res) => {
        if (res.status === 200) {
          setToken({
            userId: res.data.user._id,
            userToken: res.data.token,
            userName: res.data.user.userName,
          });
          setSubmitted(true);
        }
      })
      .catch((err) => err);
  };

  return (
    <>
      <Box sx={style}>
        <h3>Sign Up</h3>
        <form id="signup-container" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder="Username"
            {...register("userName", { required: true, minLength: 5 })}
          />
          {errors.userName && (
            <div className="formValidation-error">Username must contain more than 5 alphanumeric characters</div>
          )}
          <TextField
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <div className="formValidation-error">
              Enter a valid password with:{" "}
              <ul>
                <li>At least 2 uppercase letters</li>
                <li>At least 1 number</li>
                <li>At least one special character</li>
              </ul>{" "}
            </div>
          )}
          <TextField
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
          />
          {errors.email && (
            <div className="formValidation-error">Enter a valid email</div>
          )}

          <Button type="submit" size="medium" sx={{ color: "#413C39" }}>
            Create Account
          </Button>
        </form>
      </Box>
    </>
  );

}
