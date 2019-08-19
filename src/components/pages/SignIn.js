import React, { Component } from 'react';
import authenticate from '../../services/auth';
import styled from "styled-components";
import Loader from "../Loader";
//import { Link } from "react-router-dom";

import {
  Avatar,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Button as MuiButton,
  Paper,
  Typography
} from '@material-ui/core';
import { spacing } from '@material-ui/system';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${props => props.theme.spacing(5)}px;
`;

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            username: '',
            password: '',
            error: ''
          };

          this.submitClicked = this.submitClicked.bind(this);
    }
 


  submitClicked() {
    this.setState({ loading: true });
     console.log('Submit clicked!');
    // console.log(this.state.username);
    // console.log(this.state.password);

    authenticate(this.state.username, this.state.password).then(response => {
      //console.log(response);
      if (response.access) {
        console.log('AUTH SUCCESS');
        this.setState({ loading: false });
        ipcRenderer.send('set-settings', {
          key: 'access',
          val: response.access
        });
        ipcRenderer.send('set-settings', {
          key: 'refresh',
          val: response.refresh
        });
        ipcRenderer.send('logged-in', true);
      } else {
        this.setState({
          error: 'Failed to log in - check credentials.',
          loading: false
        });
        console.log('AUTH FAIL');
      }
    });
  }

  renderLoader() {
    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={this.submitClicked.bind(this)}
        >
          Sign In
        </Button>
      );
    }
  }

  render() {
    return (
        <Wrapper>
        <BigAvatar alt="user avatar" src="" />
  
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Welcome back!
        </Typography>
        <Typography component="h2" variant="body1" align="center">
          Sign in to your account to continue
        </Typography>
        <form>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" name="username" autoComplete="username" autoFocus onChange={event =>
                this.setState({ username: event.target.value })
              }/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me ( I don't work - coming soon... )"
          />
          <Button
            onClick = {this.submitClicked}
            fullWidth
            variant="contained"
            color="primary"
            mb={2}
            type="submit"
          >
            Sign in
          </Button>
          {/* <Button
             component={Link}
            to="/"
            fullWidth
            color="primary"
          >
            Forgot password
          </Button> */}
          <Typography component="h2" variant="body1" align="center">
          {this.state.error}
        </Typography>
        </form>
      </Wrapper>
    );
  }
}

export default SignIn;
