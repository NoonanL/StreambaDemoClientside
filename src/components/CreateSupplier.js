import React, { Component } from 'react';
import styled from 'styled-components';
//import Loader from './Loader';
import createProduct from '../services/Suppliers/createSupplier';

import {
  CardContent,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography,
  Button as MuiButton,
  Divider as MuiDivider
} from '@material-ui/core';
import { spacing } from '@material-ui/system';

import { Add as AddIcon } from '@material-ui/icons';

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const TextFieldSpacing = styled(MuiTextField)(spacing);
const TextField = styled(TextFieldSpacing)`
  width: 200px;
`;

const Button = styled(MuiButton)(spacing);
const Divider = styled(MuiDivider)(spacing);

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class CreateSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: '',
      sku: '',
      name: '',
      brand: '',
      data: [],
      results: []
    };
  }

  componentDidMount() {
   
  }

  /**
   * At the moment this works and a new supplier is created but it does
   * not update the table until the user hits refresh because its not the same
   * component. Need to figure that out.
   */
  submitClicked() {
    console.log('Submit Clicked!');
    createProduct(ipcRenderer.sendSync('fetch-access'), this.state.name);
  }

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Create New Supplier
          </Typography>
          <Paper mt={3}>
            <TextField
              required
              id="name"
              label="Name"
              defaultValue=""
              onChange={event => this.setState({ name: event.target.value })}
              m={2}
            />
          </Paper>
        </CardContent>
        <Divider mt={4} />
        <Button
          onClick={() => {
            this.submitClicked();
          }}
          m={2}
          variant="contained"
          color="primary"
          style={{ float: 'right' }}
        >
          Add
          <AddIcon />
        </Button>
      </Card>
    );
  }
}

export default CreateSupplier;
