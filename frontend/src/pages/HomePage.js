import React from 'react';
import UserList from '../components/UserList';
import MessageSubmit from '../components/MessageSubmit';
import { connect } from 'react-redux';
import HoaxFeed from '../components/HoaxFeed';

class HomePage extends React.Component {
  
  render() {
    if (!this.props.loggedInUser.isLoggedIn) {
        this.props.history.push('/');
    }
    return (
      <div data-testid="homepage">
        <div className="row">
          <div className="col-8">
            {this.props.loggedInUser.isLoggedIn && <MessageSubmit />}
            <HoaxFeed />
          </div>
          <div className="col-4">
            <UserList />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedInUser: state
  };
};

export default connect(mapStateToProps)(HomePage);
