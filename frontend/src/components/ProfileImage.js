import React from 'react';
import defaultPicture from '../assets/profile.png';
import Avatar from '@mui/material/Avatar';

const ProfileImage = (props) => {
  let imageSource = defaultPicture;
  if (props.image) {
    imageSource = `/images/profile/${props.image}`;
  }
  return (
    //eslint-disable-next-line
    <Avatar
      {...props}
      src={props.src || imageSource}
      onError={(event) => {
        event.target.src = defaultPicture;
      }}
    />
  );
};

export default ProfileImage;
