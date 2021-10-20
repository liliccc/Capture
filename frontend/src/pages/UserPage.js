import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';

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
