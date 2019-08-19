import React, { Component } from 'react';
import styled from 'styled-components';
//import Loader from './Loader';
import getBrands from '../services/Brands/getBrands';
import getDepartments from '../services/Departments/getDepartments';
import createProduct from '../services/Products/createProduct';

import {
  CardContent,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography,
  Button as MuiButton,
  InputLabel,
  Snackbar,
  IconButton,
  MenuItem,
  Divider as MuiDivider,
  Select as MuiSelect,
  FormControl as MuiFormControl
} from '@material-ui/core';
import { spacing } from '@material-ui/system';

import { Add as AddIcon } from '@material-ui/icons';
import { Close as CloseIcon } from '@material-ui/icons';

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

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar: false,
      loading: false,
      error: '',
      sku: '',
      name: '',
      brand: '',
      department: '',
      brands: [],
      departments: [],
      data: [],
      results: []
    };
  }

  componentDidMount() {
    getBrands().then(response => {
      this.setState({
        brands: response.results,
        loading: false
      });
      //console.log(response);
    });

    getDepartments().then(response => {
      this.setState({
        departments: response.results,
        loading: false
      });
      console.log(response);
    });
  }

  reset(response) {
    console.log(response)
    if (response.url) {
      this.setState({
        snackMessage: "New product created",
        snackbar: true,
        sku: '',
        name: '',
        brand: '',
        department: ''
      });
    }else{
      this.setState({
        snackMessage:"Failed to create new product",
        snackbar: true
      })
    }
  }

  submitClicked() {
    console.log('Submit Clicked!');
    let product = {
      sku: this.state.sku,
      name: this.state.name,
      brand: this.state.brand,
      department: this.state.department
    };
    createProduct(product).then(response => this.reset(response));
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackbar: false });
  };

  pickerSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
    //console.log(this.state.brand)
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Create New Product
          </Typography>
          <Paper mt={3}>
            <TextField
              required
              id="sku"
              label="SKU"
              defaultValue=""
              value={this.state.sku}
              onChange={event => this.setState({ sku: event.target.value })}
              m={2}
            />
            <TextField
              required
              id="name"
              label="Name"
              defaultValue=""
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
              m={2}
            />
            <br />
            <FormControl m={2} required>
              <InputLabel htmlFor="brand-required">Brand</InputLabel>
              <Select
                value={this.state.brand}
                onChange={this.pickerSelect}
                name="brand"
                inputProps={{
                  id: 'brand'
                }}
                mt={4}
              >
                {this.state.brands.map(function(item, key) {
                  return (
                    <MenuItem name="brand" key={key} value={item.name}>
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
            <FormControl m={2} required>
              <InputLabel htmlFor="department-required">Department</InputLabel>
              <Select
                value={this.state.department}
                onChange={this.pickerSelect}
                name="department"
                inputProps={{
                  id: 'department'
                }}
                mt={4}
              >
                {this.state.departments.map(function(item, key) {
                  return (
                    <MenuItem name="department" key={key} value={item.name}>
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
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.snackbar}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{this.state.snackMessage}</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleClose}
            >
              UNDO (I don't work...yet!)
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Card>
    );
  }
}

export default CreateProduct;
