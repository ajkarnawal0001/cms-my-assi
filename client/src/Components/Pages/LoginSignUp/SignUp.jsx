import React, { useEffect, useState } from "react";
import * as Components from "./LoginComponents";
import axios from 'axios';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@material-ui/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SetData, GetData } from "../../../Utils/LocalStorage";
import { updateAction } from "../../../Redux/action";
import { Formik } from "formik";
import * as Yup from "yup";
import { NotiToast } from "../../Notification/NotiToast";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
export const SignUp = ({ handleSign }) => {
  const navigate = useNavigate()
  const [signIn, toggle] = React.useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const dispatch = useDispatch();
  toast.configure()
  

  const { data, key, isLoading, isError } = useSelector(
    (state) => state.updateReducer,
    shallowEqual
  );

  const handleOnChangeAdmin = () => {
    setIsChecked(!isChecked);
  };

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
  });
  const { username, email, password, fullname } = user;

  const handle = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSignUp = async(e) => {
    e.preventDefault();
    const { username, email, password, fullname } = user;

    const payload = {
      username,
      email,
      password,
      fullname,
      admin:isChecked,
    };
    try {
      const res = await axios.post('http://localhost:8000/register',payload)
      .then((res)=>{
        return res
      })
      if(res.data.error==="false"){
        toggle(true)
      }
      toast.success(res.data.message)

      console.log(res);
    } catch (error) {
      toast.error(error.message)
    }
  };

  // login
  const [userLogin, setUserLogin] = useState({
    usernameLogin: "",
    passwordLogin: "",
  });
  const { usernameLogin, passwordLogin } = userLogin;

  const handleLogin = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };
  const submitLogin = async (e) => {
    e.preventDefault();
    let data = GetData("signupData");
    console.log(data, "data");
    const { usernameLogin, passwordLogin } = userLogin;
    const payload = {
      username: usernameLogin,
      password: passwordLogin,
    };

    try {
      const res = await axios.post('http://localhost:8000/login',payload)
      .then((res)=>{
        return res
      })
      if(res.data.error==="false"){
        navigate('/')
        window.location.reload(false);
        toggle(true)
        toast.success(res.data.message)
        SetData('loggedInData',res.data)
        SetData('loggedIn','IN')
      }

    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Box sx={{ mb: 2 }}>
            <TextField
              variant="outlined"
              required
              type="text"
              name="fullname"
              label="Enter your name"
              value={fullname}
              size="small"
              fullWidth
              onChange={handle}
            />
            <TextField
              style={{ marginTop: "20px" }}
              className="input"
              required
              fullWidth
              id="outlined-required"
              type="email"
              name="email"
              label="Enter your Email"
              value={email}
              variant="outlined"
              size="small"
              onChange={handle}
            />
            <TextField
              style={{ marginTop: "20px" }}
              className="input"
              required
              id="outlined-required"
              type="text"
              name="username"
              label="Enter your username"
              value={username}
              onChange={handle}
              fullWidth
              variant="outlined"
              size="small"
            />
            <TextField
              style={{ marginTop: "20px" }}
              className="input"
              fullWidth
              required
              id="outlined-required"
              type="password"
              name="password"
              label="Enter your password"
              value={password}
              onChange={handle}
              variant="outlined"
              size="small"
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox onChange={handleOnChangeAdmin} defaultChecked
                  name="admin" />
                }
                label="Admin"
              />
            </FormGroup>
            <Box sx={{ mt: 4 }}>
              <Button onClick={handleSignUp}
              color="primary"
              variant="contained"
              fullWidth 
              disabled={(user.password.length<8?true:false) || (user.email.length<1) || (user.fullname.length<1) || (user.username.length<1)}>
                Sign Up
              </Button>
            </Box>
          </Box>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <TextField
            className="input"
            variant="outlined"
            size="small"
            error={usernameLogin.length < 1 ? true : false}
            helperText={
              usernameLogin.length < 1 ? "Please fill this field" : ""
            }
            required
            id="outlined-required"
            onChange={handleLogin}
            value={usernameLogin}
            label="Username"
            fullWidth
            name="usernameLogin"
          />

          <TextField
            style={{ marginTop: "20px" }}
            className="input"
            required
            size="small"
            onChange={handleLogin}
            error={passwordLogin.length < 8 ? true : false}
            helperText={
              passwordLogin.length < 8 ? "Must Contain 8 Characters" : false
            }
            id="outlined-required"
            name="passwordLogin"
            variant="outlined"
            type="password"
            label="Password"
            fullWidth
            value={passwordLogin}
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Button
            color="primary"
            variant="contained"
            href="/home"
            fullWidth
            disabled={passwordLogin.length<8?true:false}
            sx={{ borderRadius: 2 }}
            onClick={(e) => {
              submitLogin(e);
            }}
          >
            Sign In
          </Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Box sx={{mr:8}}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
            </Box>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Box sx={{ml:6}}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
            </Box>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};
