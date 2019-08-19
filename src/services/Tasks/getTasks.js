import refresh from '../refresh';

export default function getTasks() {
  //console.log(username);
  //console.log("access code is: " + access);

  const electron = window.require('electron');
  const ipcRenderer = electron.ipcRenderer;
  refresh();
  //console.log(ipcRenderer.sendSync('fetch-access'))

  const URL = 'http://localhost:8000/api/v1/tasks/';

  const request = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + ipcRenderer.sendSync('fetch-access')
    }
  };

  // //console.log(URL);
  return fetch(URL, request)
    .then(response => response.json())
    .catch(function(error) {
      console.log('Fetch operation error: ' + error.message);
      throw error;
    });
}
