import React, { Component } from 'react';
import styled from 'styled-components';
import getProducts from '../services/Products/getProducts';
import createProduct from '../services/Products/createProduct';
import editProduct from '../services/Products/editProduct';
import deleteProduct from '../services/Products/deleteProduct';
import getBrands from '../services/Brands/getBrands';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import { NavLink as RouterNavLink } from 'react-router-dom';

import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core';

import {
  AddBox,
  ArrowUpward,
  Check,
  ChevronRight,
  ChevronLeft,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
  BrandingWatermark
} from '@material-ui/icons';

import { spacing } from '@material-ui/system';

import { withStyles } from '@material-ui/core/styles';
import { thisExpression } from '@babel/types';

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const CustomTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.025);
  }
`;

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: '',
      access: '',
      results: [],
      brands: [],
      data: [],
      columns: [
        { title: 'Id', field: 'id', editable: 'never' },
        { title: 'SKU', field: 'sku' },
        { title: 'Name', field: 'name' },
        { title: 'Brand', field: 'brand' },
        { title: 'Department', field: 'department' }
        //Setting lookup allows you to pick from a list of objects but the table uses the key to send the value which is not what the API wants.
        //This will need some looking into, can't quite figure out the correct way to serve the list of brands/departments
      ]
    };
  }

  //On component mount get acces key from main
  componentDidMount() {
    //   this.setState({access: ipcRenderer.sendSync('fetch-access')})
    getProducts().then(response => {
      this.setState({
        data: response,
        results: response.results,
        loading: false
      });
    });
  }

  editableTable() {
    return (
      <Card mb={6}>
        <CardContent pb={1}>
          <Typography variant="h6" gutterBottom>
            Products
          </Typography>
        </CardContent>
        <Paper>
          <MaterialTable
            title=""
            icons={tableIcons}
            columns={this.state.columns}
            data={this.state.results}
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      const data = this.state.results;
                      data.push(newData);
                      createProduct(newData);
                      this.setState({ data }, () => resolve());
                    }
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      const data = this.state.results;
                      const index = data.indexOf(oldData);
                      //   console.log(newData);
                      //   console.log(oldData);
                      editProduct(newData, oldData);
                      data[index] = newData;
                      this.setState({ data }, () => resolve());
                    }
                    resolve();
                  }, 1000);
                }),
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      let data = this.state.results;
                      const index = data.indexOf(oldData);
                      deleteProduct(oldData);
                      data.splice(index, 1);
                      this.setState({ data }, () => resolve());
                    }
                    resolve();
                  }, 1000);
                })
            }}
          />
        </Paper>
      </Card>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom display="inline">
          Products
        </Typography>

        <Breadcrumbs aria-label="Breadcrumb" mt={2}>
          <Link component={NavLink} exact to="/">
            Dashboard
          </Link>
          <Typography>Products</Typography>
        </Breadcrumbs>

        <Divider my={6} />

        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            {this.editableTable()}
          </Grid>
          <Typography>
            Dev note: When editing Brand or Department, the string must exactly
            match an existing Brand or Department. This is due to the API
            expecting a String (foreignKey-Name) while the table when using a
            dropdown list uses the key of the selected item. Fix in progress.
            See the "Add New" page for dropdowns that work. 
          </Typography>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Products;
