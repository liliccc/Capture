import React, { Component } from 'react';
import ProfileImage from './ProfileImage';
import { connect } from 'react-redux';
import * as apiCalls from '../api/apiCalls';
import ButtonWithProgress from './ButtonWithProgress';
import Input from './Input';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


class MessageSubmit extends Component {
  state = {
    focused: false,
    content: undefined,
    pendingApiCall: false,
    errors: {},
  };

  onChangeContent = (event) => {
    const value = event.target.value;
    this.setState({ content: value, errors: {} });
  };

  resetState = () => {
    this.setState({
      pendingApiCall: false,
      focused: false,
      content: '',
      errors: {},
    });
  };

  onClickSubmit = () => {
    const body = {
      content: this.state.content,
      attachment: this.state.attachment,
    };
    this.setState({ pendingApiCall: true });
    apiCalls
      .postMessage(body)
      .then((response) => {
        this.resetState();
      })
      .catch((error) => {
        let errors = {};
        if (error.response.data && error.response.data.validationErrors) {
          errors = error.response.data.validationErrors;
        }
        this.setState({ pendingApiCall: false, errors });
      });
  };

  onFocus = () => {
    this.setState({
      focused: true,
    });
  };

  render() {
    let textAreaClassName = 'form-control w-100';
    if (this.state.errors.content) {
      textAreaClassName += ' is-invalid';
    }
    return (
      <Card style={{ marginBottom: 20, marginTop: 10 }}>
        <CardContent>
          <div className="row">
            <ProfileImage
              style={{ marginRight: 10 }}
              image={this.props.loggedInUser.image}
            />
          </div>
          <div className="flex-fill">
            <textarea
              className={textAreaClassName}
              rows={this.state.focused ? 3 : 1}
              onFocus={this.onFocus}
              value={this.state.content}
              onChange={this.onChangeContent}
            />
            {this.state.errors.content && (
              <span className="invalid-feedback">
                {this.state.errors.content}
              </span>
            )}
            {this.state.focused && (
              <div style={{ marginTop: 20 }}>
                <div className="text-right mt-1">
                  <ButtonWithProgress
                    disabled={this.state.pendingApiCall}
                    onClick={this.onClickSubmit}
                    pendingApiCall={this.state.pendingApiCall}
                    text="Submit"
                  />
                  <Button
                    variant="contained"
                    onClick={this.resetState}
                    disabled={this.state.pendingApiCall}
                    style={{
                      backgroundColor: '#00b894',
                    }}
                  >
                    <i className="fas fa-times"></i> Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state,
  };
};

export default connect(mapStateToProps)(MessageSubmit);
