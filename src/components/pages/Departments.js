import React, { Component } from 'react';
import styled from 'styled-components';
import getDepartments from '../../services/Departments/getDepartments';
import createDepartment from '../../services/Departments/createDepartment';
import deleteDepartment from '../../services/Departments/deleteDepartment';
import editDepartment from '../../services/Departments/editDepartment';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
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
ViewColumn
} from '@material-ui/icons'


import { spacing } from '@material-ui/system';

import { withStyles } from '@material-ui/core/styles';

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
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


class Departments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: '',
      access: '',
      results: [],
      data: [],
      columns:[
        { title: 'Id', field: 'id' , editable:"never"},
        { title: 'Name', field: 'name' },
      ]
    };
  }

  //On component mount get acces key from main
  componentDidMount() {
    //   this.setState({access: ipcRenderer.sendSync('fetch-access')})
      getDepartments().then(response => {
        this.setState({
          data: response,
          results: response.results,
          loading: false
        });
    })
  }
  
  editableTable() {
    return (
      <Card mb={6}>
        <CardContent pb={1}>
          <Typography variant="h6" gutterBottom>
            Departments
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
                  console.log(newData);
                  createDepartment(newData)
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.results;
                  const index = data.indexOf(oldData);
                  console.log(newData);
                  console.log(oldData);
                  editDepartment(newData, oldData);
                  data[index] = newData;
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = this.state.results;
                  const index = data.indexOf(oldData);
                  console.log(oldData);
                  deleteDepartment(oldData);
                  data.splice(index, 1);
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
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
        Departments
      </Typography>

        <Breadcrumbs aria-label="Breadcrumb" mt={2}>
          <Link component={NavLink} exact to="/">
            Dashboard
          </Link>
          <Typography>Departments</Typography>
        </Breadcrumbs>

        <Divider my={6} />

        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            {this.editableTable()}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Departments;
