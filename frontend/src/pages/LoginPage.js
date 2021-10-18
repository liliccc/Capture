import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../redux/authActions';
import Grid from '@mui/material/Grid';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const LoginPage = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState();
  const [apiRunning, setApiRunning] = useState(false);

  useEffect(() => {
    setApiError();
  }, [username, password]);

  const onClickLogin = () => {
    const body = {
      username,
      password,
    };
    setApiRunning(true);
    props.actions
      .postLogin(body)
      .then((response) => {
        setTimeout(() => {
          setApiRunning(false);
        }, 3000);
        props.history.push('/');
      })
      .catch((error) => {
        if (error.response) {
          setApiRunning(false);
          setApiError(error.response.data.message);
        }
      });
  };

  let disableSubmit = false;
  if (username === '') {
    disableSubmit = true;
  }
  if (password === '') {
    disableSubmit = true;
  }
   const avatarStyle = {
     backgroundColor: '#00b0ff',
     width: 50,
     height: 50,
   };

  return (
    <div className="container">
      {apiError && (
        <div className="col-12 mb-3">
          <Alert severity="warning">{apiError}</Alert>
        </div>
      )}
      <Grid align="center">
        <Avatar style={avatarStyle}>
          <LockOpenIcon />
        </Avatar>
        <h2>Login in</h2>
      </Grid>
      <div className="col-12 mb-3 mt-3np">
        <TextField
          fullWidth
          label="Username"
          placeholder="Your username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>
      <div className="col-12 mb-3">
        <TextField
          fullWidth
          label="Password"
          placeholder="Your password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div className="text-center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={onClickLogin}
          disabled={disableSubmit || apiRunning}
        >
          {apiRunning && (
            <CircularProgress
              style={{ width: 20, height: 20, marginRight: 15 }}
            />
          )}
          Login
        </Button>
      </div>
    </div>
  );
};

LoginPage.defaultProps = {
  actions: {
    postLogin: () => new Promise((resolve, reject) => resolve({})),
  },
  dispatch: () => {},
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postLogin: (body) => dispatch(authActions.loginHandler(body)),
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
