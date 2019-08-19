import refresh from '../services/refresh';

export default function getSalesToday() {

    const electron = window.require('electron');
    const ipcRenderer = electron.ipcRenderer;
    refresh();

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    const URL = 'http://localhost:8000/api/v1/transactions/?created_gte' + year + '-' + month + '-' + date + 'T00:00:00:00Z';
    // //console.log(URL);
    return fetch(URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ipcRenderer.sendSync('fetch-access')
      }
    })
      .then(response => response.json())
      .catch(function(error) {
        console.log('Fetch operation error: ' + error.message);
        throw error;
      });
  }
  