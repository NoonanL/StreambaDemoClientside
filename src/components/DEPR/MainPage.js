import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ProductList from './ProductList';
import CustomerList from './CustomerList';
import Header from './Header';
import NavBar from './NavBar';
import Home from './Home';
import Container from '@material-ui/core/Container';
import Footer from './Footer';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      selectedPage: 'Home',
      error: ''
    };
  }

  componentDidMount() {
    //set eventListener for page updates
    ipcRenderer.on('page-change', (event, page) => this.setPage(page));
  }

  setPage(page) {
    this.setState({ selectedPage: page });
    console.log('Page change detected! ' + page);
  }

  showPage() {
    if (this.state.selectedPage === 'Home') {
      console.log('Home page should show!');
      return <Home />;
    }
    if (this.state.selectedPage === 'Products') {
      console.log('Product page should show!');
      return <ProductList />;
    }
    if (this.state.selectedPage === 'Customers') {
      console.log('Customer page should show!');
      return <CustomerList />;
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <NavBar />
        <Typography paragraph>
          Welcome to TEmPoS Desktop application!
        </Typography>
        {/* <ProductList />
        <CustomerList/> */}
        {this.showPage()}
        <Footer />
      </Container>
    );
  }
}

export default MainPage;
