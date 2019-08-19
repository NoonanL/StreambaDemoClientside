import React, { Component } from 'react';
import styled from 'styled-components';
//import Loader from './Loader';
import createBrand from '../services/Brands/createBrand';
import getSuppliers from '../services/Suppliers/getSuppliers';

import {
  CardContent,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography,
  Button as MuiButton,
  InputLabel,
  // FormHelperText,
  MenuItem,
  Divider as MuiDivider,
  Select as MuiSelect,
  FormControl as MuiFormControl
} from '@material-ui/core';
import { spacing } from '@material-ui/system';

import { Add as AddIcon } from '@material-ui/icons';

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const TextFieldSpacing = styled(MuiTextField)(spacing);
const TextField = styled(TextFieldSpacing)`
  width: 200px;
`;
const FormControlSpacing = styled(MuiFormControl)(spacing);
const FormControl = styled(FormControlSpacing)`
  min-width: 148px;
`;
const Button = styled(MuiButton)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Select = styled(MuiSelect)(spacing);

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class CreateSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: '',
      name: '',
      supplier: '',
      data: [],
      results: []
    };
  }
  componentDidMount() {
    getSuppliers(ipcRenderer.sendSync('fetch-access')).then(response => {
      this.setState({
        data: response,
        results: response.results,
        loading: false
      });
      //console.log(response);
    });
  }

  submitClicked() {
    console.log('Submit Clicked!');
    createBrand(ipcRenderer.sendSync('fetch-access'), this.state.name, this.state.supplier);
  }

  supplierSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.brand)
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Create New Brand
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

            <FormControl m={2} required>
              <InputLabel htmlFor="supplier-required">Supplier</InputLabel>
              <Select
                value={this.state.supplier}
                onChange={this.supplierSelect}
                name="supplier"
                inputProps={{
                  id: 'supplier'
                }}
                mt={4}
              >
                {this.state.results.map(function(item, key) {
                  return (
                    <MenuItem name="supplier" key={key} value={item.name}>
                      {item.name}
                    </MenuItem>
                  );
                })}
                {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
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
