import React, { useRef } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileImage from './ProfileImage';
import useClickTracker from '../shared/useClickTracker';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const TopBar = (props) => {
  const actionArea = useRef();
  const dropDownVisible = useClickTracker(actionArea);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (anchorEl == null) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogout = () => {
    const action = {
      type: 'logout-success',
    };
    props.dispatch(action);
  };

  let links = <div></div>;
  if (props.user.isLoggedIn) {
    let dropDownClass = 'p-0 shadow dropdown-menu';
    if (dropDownVisible) {
      dropDownClass += ' show';
    }
    links = (
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ marginLeft: 700 }}
        ref={actionArea}
      >
        <ProfileImage image={props.user.image} />
        <span className="nav-link dropdown-toggle" style={{ color: '#00b894' }}>
          {props.user.displayName}
        </span>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>
            <Link to={`/${props.user.username}`}>My Profile</Link>
          </MenuItem>
          <MenuItem>
            <span onClick={onClickLogout}>Logout</span>
          </MenuItem>
        </Menu>
      </Button>
    );
  }
  return (
    <div className="bg-white shadow-sm mb-2">
      <div className="container">
        <nav className="navbar navbar-light navbar-expand">
          <Link to="/" className="navbar-brand">
            <img src={logo} width="50" alt="Capture" />
            <div
              style={{
                float: 'right',
                marginLeft: 15,
                marginTop: 10,
                fontWeight: 700,
              }}
            >
              Capture
            </div>
          </Link>
          {links}
        </nav>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(TopBar);
