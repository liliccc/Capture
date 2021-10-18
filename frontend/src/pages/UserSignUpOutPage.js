import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import { TabContext } from '@mui/lab';
import { Tabs } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import UserSignupPage from './UserSignupPage';
import UserLoginPage from './LoginPage';
import * as apiCall from '../api/apiCalls';
import { connect } from 'react-redux';

const UserSignUpOutPage = (props) => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const actions = {
    postSignup: apiCall.signup,
  };

  const boxStyle = {
    backgroundColor: 'background.paper',
    width: 500,
    margin: '20px auto',
  };

  if (props.user.isLoggedIn) {
    props.history.push('/homepage');
  }
  return (
    <div>
      <Box sx={{ boxShadow: 3 }} style={boxStyle}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{ style: { background: '#00b0ff' } }}
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Sign Up" value="1" />
              <Tab label="Log in" value="2" />
            </Tabs>
          </Box>
          <TabPanel value="1">
            <UserSignupPage actions={actions} />
          </TabPanel>
          <TabPanel value="2">
            <UserLoginPage />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(UserSignUpOutPage);
