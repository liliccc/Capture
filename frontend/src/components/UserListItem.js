import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const UserListItem = (props) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <Link
          to={`/${props.user.username}`}
          className="list-group-item  list-group-item-action"
        >
          <div className="row">
            <ListItemIcon>
              <ProfileImage image={props.user.image} />
            </ListItemIcon>
            <ListItemText
              style={{ color: '#00b894' }}
            >{`${props.user.displayName}@${props.user.username}`}</ListItemText>
          </div>
        </Link>
      </ListItemButton>
    </ListItem>
  );
};

export default UserListItem;
