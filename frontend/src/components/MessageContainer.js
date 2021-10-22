import React, { useRef } from 'react';
import ProfileImage from './ProfileImage';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import useClickTracker from '../shared/useClickTracker';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const MessageContainer = (props) => {
  const actionArea = useRef();
  const dropDownVisible = useClickTracker(actionArea);
  const { message, onClickDelete } = props;
  const { user, date } = message;
  const { username, displayName, image } = user;
  const relativeDate = format(date);

  const ownedByLoggedInUser = user.id === props.loggedInUser.id;

  let dropDownClass = 'p-0 shadow dropdown-menu';
  if (dropDownVisible) {
    dropDownClass += ' show';
  }

  return (
    <Card style={{ marginBottom: 10 }}>
      <CardContent>
        <div className="d-flex">
          <ProfileImage
            className="rounded-circle m-1"
            width="32"
            height="32"
            image={image}
          />
          <div>
            <Link to={`/${username}`} className="list-group-item-action">
              <h6 className="d-inline" style={{ color: '#00b894' }}>
                {displayName}@{username}
              </h6>
            </Link>
            <span style={{ color: '#00b894' }}> - </span>
            <span style={{ color: '#00b894' }}>{relativeDate}</span>
          </div>
          {ownedByLoggedInUser && (
            <div>
              <span
                data-testid="message-actions"
                ref={actionArea}
              />
              <IconButton
                style={{marginTop: -7}}
                variant="contained"
                aria-label="delete"
                onClick={onClickDelete}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </div>
        <div className="pl-5">{message.content}</div>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state,
  };
};

export default connect(mapStateToProps)(MessageContainer);
