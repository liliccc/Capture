import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImageWithDefault';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const UserListItem = (props) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <Link
          to={`/${props.user.username}`}
          className="list-group-item list-group-item-action"
        >
          <ListItemIcon>
            <ProfileImage image={props.user.image} />
          </ListItemIcon>
          <ListItemText>{`${props.user.displayName}@${props.user.username}`}</ListItemText>
        </Link>
      </ListItemButton>
    </ListItem>
  );
};

export default UserListItem;
