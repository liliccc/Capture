import React from 'react';
import ProfileImage from './ProfileImage';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';
import Button from '@mui/material/Button';

const ProfileCard = (props) => {
  const { displayName, username, image } = props.user;

  const showEditButton = props.isEditable && !props.inEditMode;

  return (
    <div className="card" style={{}}>
      <div className="card-header text-center">
        <ProfileImage
          image={image}
          src={props.loadedImage}
          style={{ width: 300, height: 300, marginLeft: 100 }}
        />
      </div>
      <div className="card-body text-center">
        {!props.inEditMode && (
          <h4 style={{ color: '#00b894' }}>{`${displayName}@${username}`}</h4>
        )}
        {props.inEditMode && (
          <div className="mb-2">
            <Input
              value={displayName}
              label={`Change Display Name for ${username}`}
              onChange={props.onChangeDisplayName}
              hasError={props.errors.displayName && true}
              error={props.errors.displayName}
            />
          </div>
        )}
        {showEditButton && (
          <Button
            variant="contained"
            style={{ backgroundColor: '#00b894' }}
            onClick={props.onClickEdit}
          >
            Edit
          </Button>
        )}
        {props.inEditMode && (
          <div>
            <ButtonWithProgress
              className="btn btn-primary"
              onClick={props.onClickSave}
              text={
                <span>
                  <i className="fas fa-save" /> Save
                </span>
              }
              pendingApiCall={props.pendingUpdateCall}
              disabled={props.pendingUpdateCall}
            />
            <Button
              variant="contained"
              style={{ backgroundColor: '#00b894' }}
              onClick={props.onClickCancel}
              disabled={props.pendingUpdateCall}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

ProfileCard.defaultProps = {
  errors: {}
};

export default ProfileCard;
