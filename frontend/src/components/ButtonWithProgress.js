import React from 'react';
import Button from '@mui/material/Button';

const ButtonWithProgress = (props) => {
  return (
    <Button
      className={props.className || 'btn btn-primary'}
      onClick={props.onClick}
      disabled={props.disabled}
      variant="contained"
      style={{
        backgroundColor: '#00b894',
        marginRight: 20
      }}
    >
      {props.pendingApiCall && (
        <div className="spinner-border text-light spinner-border-sm mr-1">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {props.text}
    </Button>
  );
};

export default ButtonWithProgress;
