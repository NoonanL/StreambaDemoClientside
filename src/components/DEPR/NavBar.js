import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StoreMallDirectoryOutlinedIcon from '@material-ui/icons/StoreMallDirectoryOutlined';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import ShoppingCartOutlineIcon from '@material-ui/icons/ShoppingCartOutlined';
import styled from 'styled-components';
import { Layers } from 'react-feather';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import blue from '@material-ui/core/colors/blue';
import { ThemeProvider } from 'styled-components';
import { StylesProvider } from '@material-ui/styles';
import theme from '../theme';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const Brand = styled(ListItem)`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.typography.fontWeightMedium};
  color: ${theme.palette.common.white};
  background-color: ${theme.palette.primary.main};
  font-family: ${theme.typography.fontFamily};
  height: 56px;

  ${theme.breakpoints.up('sm')} {
    height: 64px;
  }
`;

const BrandIcon = styled(Layers)`
  margin-right: ${theme.spacing(2)}px;
`;

class NavBar extends Component {
  state = {
    loading: false,
    error: ''
  };

  homeClicked() {
    ipcRenderer.send('update-page', 'Home');
  }
  tillClicked() {
    ipcRenderer.send('update-page', 'Till');
  }
  transactionsClicked() {
    ipcRenderer.send('update-page', 'Transactions');
  }
  productsClicked() {
    ipcRenderer.send('update-page', 'Products');
  }
  customersClicked() {
    ipcRenderer.send('update-page', 'Customers');
  }
  settingsClicked() {
    ipcRenderer.send('update-page', 'Settings');
  }

  render() {
    return (
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Drawer variant="permanent">
              <Brand>
                <BrandIcon /> TEmPoS
              </Brand>
              <Divider />
              <List>
                <ListItem button onClick={this.homeClicked.bind(this)}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText>Home</ListItemText>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button onClick={this.tillClicked.bind(this)}>
                  <ListItemIcon>
                    <ShoppingCartOutlineIcon />
                  </ListItemIcon>
                  <ListItemText>Till</ListItemText>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button onClick={this.transactionsClicked.bind(this)}>
                  <ListItemIcon>
                    <LibraryBooksOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>Transactions</ListItemText>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button onClick={this.productsClicked.bind(this)}>
                  <ListItemIcon>
                    <StoreMallDirectoryOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>Products</ListItemText>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button onClick={this.customersClicked.bind(this)}>
                  <ListItemIcon>
                    <PeopleOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>Customers</ListItemText>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button onClick={this.settingsClicked.bind(this)}>
                  <ListItemIcon>
                    <SettingsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>Settings</ListItemText>
                </ListItem>
              </List>
              <Divider />
            </Drawer>
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    );
  }
}
export default NavBar;
