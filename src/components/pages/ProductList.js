import React, { Component } from 'react';
import Loader from './Loader';
import getProducts from '../services/getProducts';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      access: '',
      error: ''
    };
  }

  componentDidMount() {
    //get access key
    ipcRenderer.on('fetch-reply', (event, arg) => this.handler(arg));
    ipcRenderer.send('fetch-settings', 'access');
  }

  handler(arg) {
    this.setState({ access: arg, loading: true });
    getProducts(this.state.access).then(response => {
      this.setState({ data: response, loading: false });
    });
  }

  renderLoader() {
    // console.log('access key fetched from main is ' + this.state.access);
    // console.log(this.state.data);
    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <div style={{ marginLeft: 80, marginTop: 60 }}>
          <List>
            {this.state.data.results.map((product, index) => {
              return (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.name}
                    //secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      );
    }
  }

  render() {
    return <Container>{this.renderLoader()}</Container>;
  }
}

export default ProductList;
