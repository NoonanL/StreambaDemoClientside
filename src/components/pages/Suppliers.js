import React, { Component } from 'react';
import styled from 'styled-components';
import getSuppliers from '../../services/Suppliers/getSuppliers';
import CreateSupplier from '../CreateSupplier';

import { NavLink as RouterNavLink } from 'react-router-dom';

import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';

import { spacing } from '@material-ui/system';

import { withStyles } from '@material-ui/core/styles';

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

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


const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Suppliers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: '',
      access: '',
      results: [],
      data: []
    };
  }

  //On component mount get acces key from main
  componentDidMount() {
    //   this.setState({access: ipcRenderer.sendSync('fetch-access')})
      getSuppliers().then(response => {
        this.setState({
          data: response,
          results: response.results,
          loading: false
        });
    })
      //console.log(ipcRenderer.sendSync('fetch-access'));
    //get access key
    // ipcRenderer.send('fetch-refresh');
    // ipcRenderer.on('supplierUpdate', (event, arg) => this.handler(arg));
    // ipcRenderer.send('fetch-access', 'supplierUpdate');
    // console.log("Supplier Component mounted!");
  }


  customizedTable() {
    return (
      <Card mb={6}>
        <CardContent pb={1}>
          <Typography variant="h6" gutterBottom>
            Suppliers
          </Typography>
        </CardContent>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <CustomTableCell>ID</CustomTableCell>
                <CustomTableCell align="left">Name</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.results.map(row => (
                <CustomTableRow key={row.id}>
                  <CustomTableCell component="th" scope="row">
                    {row.id}
                  </CustomTableCell>
                  <CustomTableCell align="left">{row.name}</CustomTableCell>
                </CustomTableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Card>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom display="inline">
          Suppliers
        </Typography>

        <Breadcrumbs aria-label="Breadcrumb" mt={2}>
          <Link component={NavLink} exact to="/">
            Dashboard
          </Link>
          <Link component={NavLink} exact to="/">
            Suppliers
          </Link>
        </Breadcrumbs>

        <Divider my={6} />

        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            {this.customizedTable()}
            <CreateSupplier />
          </Grid>
        </Grid>
        <Typography>Creating a new supplier works but does not update the table, try Ctl+R to update.</Typography>
      </React.Fragment>
    );
  }
}

export default Suppliers;
