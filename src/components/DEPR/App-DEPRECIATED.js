import React, { Component } from 'react';
//import SignIn from './SignIn';
import MainPage from './MainPage';

// const electron = window.require('electron');
// const ipcRenderer = electron.ipcRenderer;

class App extends Component {
  state = {
  };

  componentDidMount() {}

  render() {
    return (
      // <div>
      <MainPage />
      // </div>
      // <SignIn/>
    );
  }
}

export default App;
