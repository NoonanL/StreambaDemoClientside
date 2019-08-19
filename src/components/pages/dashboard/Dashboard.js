import React, { Component } from 'react';
import Loader from '../../Loader';
import Container from '@material-ui/core/Container';
import TasksTable from './TasksChart';
import DoughnutChart from './SalesChart';
import styled, { withTheme } from 'styled-components';
import { getCurrentDate } from '../../../utils/dateUtil';
import getSalesToday from '../../../services/getSalesToday';

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography
} from '@material-ui/core';

import { spacing } from '@material-ui/system';

import Stats from './Stats';

import { DollarSign, ShoppingBag, ShoppingCart, Users } from 'react-feather';

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: '',
      salesToday: 0,
      newCustomers: 0,
      earningsToday: 212.39,
      pendingOrders: 2
    };
  }

  componentDidMount() {
    getSalesToday().then(results => {
      this.setState({ salesToday: results.count });
    });
  }

  renderLoader() {
    console.log("Hi, I'm the home  page!");
    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <React.Fragment>
          <Grid justify="space-between" container spacing={6}>
            <Typography variant="h3" display="inline">
              Dashboard
            </Typography>
            <Grid item>
              <Typography variant="body2" ml={2} display="inline">
                {getCurrentDate()}
              </Typography>
            </Grid>
          </Grid>

          <Divider my={6} />

          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={6} lg={3} xl>
              <Stats
                title="Sales Today"
                amount={this.state.salesToday}
                value={75}
                icon={ShoppingBag}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3} xl>
              <Stats title="New Customers" amount="3" value={25} icon={Users} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3} xl>
              <Stats
                title="Total Earnings"
                amount={this.state.earningsToday}
                value={85}
                icon={DollarSign}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3} xl>
              <Stats
                title="Pending Orders"
                amount={this.state.pendingOrders}
                value={30}
                icon={ShoppingCart}
              />
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={8}>
              <TasksTable />
            </Grid>
            <Grid item xs={12} lg={4}>
              <DoughnutChart />
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
  }

  render() {
    return <Container>{this.renderLoader()}</Container>;
  }
}

export default Home;
