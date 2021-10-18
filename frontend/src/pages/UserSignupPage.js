import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../redux/authActions';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';

export const UserSignupPage = (props) => {
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    username: '',
    password: '',
    passwordRepeat: ''
  });
  const [errors, setErrors] = useState({});
  const [apiRunning, setApiRunning] = useState(false);

  const onChange = (event) => {
    const { value, name } = event.target;

    setUserInfo((previousUserInfo) => {
      return {
        ...previousUserInfo,
        [name]: value
      };
    });

    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: undefined
      };
    });
  };

  const onClickSignup = () => {
    const user = {
      username: userInfo.username,
      displayName: userInfo.displayName,
      password: userInfo.password
    };
    setApiRunning(true);
    props.actions
      .postSignup(user)
      .then((response) => {
        setTimeout(() => {
          setApiRunning(false);
        }, 3000);
        props.history.push('/homepage');
      })
      .catch((apiError) => {
        if (apiError.response.data && apiError.response.data.validationErrors) {
          setErrors(apiError.response.data.validationErrors);
        }
        setApiRunning(false);
      });
  };

  let passwordRepeatError;
  const { password, passwordRepeat } = userInfo;
  if (password || passwordRepeat) {
    passwordRepeatError =
      password === passwordRepeat ? '' : 'Does not match to password';
  }

   const avatarStyle = {
     backgroundColor: '#00b0ff',
     width: 50,
     height: 50,
   };

  return (
    <div className="container">
      <Grid align="center">
        <Avatar style={avatarStyle}>
          <AddBoxIcon />
        </Avatar>
        <h2>Sign Up</h2>
      </Grid>
      <div className="col-12 mb-3 mt-3">
        <TextField
          fullWidth
          name="displayName"
          label="Display Name"
          placeholder="Your display name"
          value={userInfo.displayName}
          onChange={onChange}
          error={errors.displayName && true}
          helperText={errors.displayName}
        />
      </div>
      <div className="col-12 mb-3">
        <TextField
          fullWidth
          name="username"
          label="Username"
          placeholder="Your username"
          value={userInfo.username}
          onChange={onChange}
          error={errors.username && true}
          helperText={errors.username}
        />
      </div>
      <div className="col-12 mb-3">
        <TextField
          fullWidth
          name="password"
          label="Password"
          placeholder="Your password"
          type="password"
          value={userInfo.password}
          onChange={onChange}
          error={errors.password && true}
          helperText={errors.password}
        />
      </div>
      <div className="col-12 mb-3">
        <TextField
          fullWidth
          name="passwordRepeat"
          label="Password Repeat"
          placeholder="Repeat your password"
          type="password"
          value={userInfo.passwordRepeat}
          onChange={onChange}
          error={passwordRepeatError && true}
          helperText={passwordRepeatError}
        />
      </div>
      <div className="col-12 mb-3">
        <FormControlLabel
          control={<Checkbox name="checked" />}
          label="I accept the terms and conditions."
        />
      </div>
      <div className="text-center">
        <Button
          variant="contained"
          color="primary"
          onClick={onClickSignup}
          disabled={apiRunning || passwordRepeatError ? true : false}
        >
          {apiRunning && (
            <CircularProgress
              style={{ width: 20, height: 20, marginRight: 15 }}
            />
          )}
          Sign up
        </Button>
      </div>
    </div>
  );
};

UserSignupPage.defaultProps = {
  actions: {
    postSignup: () =>
      new Promise((resolve, reject) => {
        resolve({});
      })
  },
  history: {
    push: () => {}
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postSignup: (user) => dispatch(authActions.signupHandler(user))
    }
  };
};

export default connect(null, mapDispatchToProps)(UserSignupPage);
