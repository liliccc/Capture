import React from 'react';
import ProfileImage from './ProfileImage';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';

const ProfileCard = (props) => {
  const { displayName, username, image } = props.user;

  const showEditButton = props.isEditable && !props.inEditMode;

  return (
    <div className="card" style={{ }}>
      <div className="card-header text-center">
        <ProfileImage
          image={image}
          src={props.loadedImage}
          style={{ width: 300, height: 300, marginLeft: 100 }}
        />
      </div>
      <div className="card-body text-center">
        {!props.inEditMode && <h4>{`${displayName}@${username}`}</h4>}
        {props.inEditMode && (
          <div className="mb-2">
            <Input
              value={displayName}
              label={`Change Display Name for ${username}`}
              onChange={props.onChangeDisplayName}
              hasError={props.errors.displayName && true}
              error={props.errors.displayName}
            />
            <div className="mt-2">
              <Input
                type="file"
                onChange={props.onFileSelect}
                hasError={props.errors.image && true}
                error={props.errors.image}
              />
            </div>
          </div>
        )}
        {showEditButton && (
          <button
            className="btn btn-outline-success"
            onClick={props.onClickEdit}
          >
            <i className="fas fa-user-edit" /> Edit
          </button>
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
            <button
              className="btn btn-outline-secondary ml-1"
              onClick={props.onClickCancel}
              disabled={props.pendingUpdateCall}
            >
              <i className="fas fa-window-close" /> Cancel
            </button>
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
