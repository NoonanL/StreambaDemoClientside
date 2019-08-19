import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setTheme } from "../redux/actions/themeActions";
// import { darken } from "polished";

import {
  Badge,
  Grid,
  Hidden,
  // InputBase,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar
} from "@material-ui/core";

import { Menu as MenuIcon } from "@material-ui/icons";

import {
  Bell,
  MessageSquare,
  // Search as SearchIcon,
  Sliders,
  Power
} from "react-feather";


const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const AppBar = styled(MuiAppBar)`
  background: ${props => props.theme.palette.common.white};
  color: ${props => props.theme.palette.grey["500"]};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

// const Search = styled.div`
//   border-radius: 2px;
//   background-color: ${props => props.theme.palette.common.white};
//   display: none;
//   position: relative;
//   width: 100%;

//   &:hover {
//     background-color: ${props =>
//       darken(0.025, props.theme.palette.grey["100"])};
//   }

//   ${props => props.theme.breakpoints.up("md")} {
//     display: block;
//   }
// `;

// const SearchIconWrapper = styled.div`
//   width: 50px;
//   height: 100%;
//   position: absolute;
//   pointer-events: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   svg {
//     width: 22px;
//     height: 22px;
//   }
// `;

// const Input = styled(InputBase)`
//   color: inherit;
//   width: 100%;

//   > input {
//     color: ${props => props.theme.palette.grey["700"]};
//     padding-top: ${props => props.theme.spacing(2.5)}px;
//     padding-right: ${props => props.theme.spacing(2.5)}px;
//     padding-bottom: ${props => props.theme.spacing(2.5)}px;
//     padding-left: ${props => props.theme.spacing(12)}px;
//     width: 160px;
//   }
// `;

class SettingsMenu extends Component {
  state = {
    anchorMenu: null
  };

  toggleMenu = event => {
    this.setState({ anchorMenu: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorMenu: null });
  };

  render() {
    const { dispatch } = this.props;
    const { anchorMenu } = this.state;
    const open = Boolean(anchorMenu);

    return (
      <React.Fragment>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.toggleMenu}
          color="inherit"
        >
          <Sliders />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorMenu}
          open={open}
          onClose={this.closeMenu}
        >
          <MenuItem
            onClick={() => {
              dispatch(setTheme(0));
              this.closeMenu();
            }}
          >
            Blue
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setTheme(1));
              this.closeMenu();
            }}
          >
            Green
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setTheme(2));
              this.closeMenu();
            }}
          >
            Purple
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

SettingsMenu = connect()(SettingsMenu);


class UserMenu extends Component {
  state = {
    anchorMenu: null
  };

  componentDidMount(){
  }

  toggleMenu = event => {
    this.setState({ anchorMenu: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorMenu: null });
  };

  render() {
    const { anchorMenu } = this.state;
    const open = Boolean(anchorMenu);

    return (
      <React.Fragment>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.toggleMenu}
          color="inherit"
        >
          <Power />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorMenu}
          open={open}
          onClose={this.closeMenu}
        >
          <MenuItem
            onClick={() => {
              console.log('Profile page clicked!')
              this.closeMenu();
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.closeMenu();
              ipcRenderer.send('logged-in', false);
            }}
          >
            Sign out
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

class NotificationsMenu extends Component {
  state = {
    anchorMenu: null
  };

  componentDidMount(){
  }

  toggleMenu = event => {
    this.setState({ anchorMenu: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorMenu: null });
  };

  render() {
    const { anchorMenu } = this.state;
    const open = Boolean(anchorMenu);

    return (
      <React.Fragment>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.toggleMenu}
          color="inherit"
        >
          <Badge badgeContent={2} color="secondary">
                <Bell />
              </Badge>
                
              
            </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorMenu}
          open={open}
          onClose={this.closeMenu}
        >
          <MenuItem
            onClick={() => {
              console.log('Notification 01 clicked!')
              this.closeMenu();
            }}
          >
            Notification 01
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log('Notification 02 clicked!')
              this.closeMenu();
            }}
          >
            Notification 02
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

class MessagesMenu extends Component {
  state = {
    anchorMenu: null
  };

  componentDidMount(){
  }

  toggleMenu = event => {
    this.setState({ anchorMenu: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorMenu: null });
  };

  render() {
    const { anchorMenu } = this.state;
    const open = Boolean(anchorMenu);

    return (
      <React.Fragment>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.toggleMenu}
          color="inherit"
        >
          <Badge badgeContent={3} color="secondary">
                <MessageSquare />
              </Badge>
                
              
            </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorMenu}
          open={open}
          onClose={this.closeMenu}
        >
          <MenuItem
            onClick={() => {
              console.log('Message 01 clicked!')
              this.closeMenu();
            }}
          >
            Message 01
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log('Message 02 clicked!')
              this.closeMenu();
            }}
          >
            Message 02
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log('Message 03 clicked!')
              this.closeMenu();
            }}
          >
            Message 03
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}


const Header = ({ onDrawerToggle }) => (
  <React.Fragment>
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Grid container alignItems="center">
          <Hidden mdUp>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Hidden>
          <Grid item>
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Input placeholder="Search…" />
            </Search> */}
          </Grid>
          <Grid item xs />
          <Grid item>
            <MessagesMenu />
            <NotificationsMenu />
            <SettingsMenu />
            <UserMenu />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </React.Fragment>
);

export default connect()(Header);
