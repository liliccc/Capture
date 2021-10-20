import React, { useEffect, useReducer } from 'react';
import * as apiCalls from '../api/apiCalls';
import ProfileCard from '../components/ProfileCard';
import { connect } from 'react-redux';
import MessagesPage from '../components/MessagesPage';
import Spinner from '../components/Spinner';

const UserPage = (props) => {
  
  return (
    <div></div>
  );
};
UserPage.defaultProps = {
  match: {
    params: {},
  },
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state,
  };
};

export default connect(mapStateToProps)(UserPage);
