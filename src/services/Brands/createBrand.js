import refresh from '../refresh';

export default function createBrand(access, name, supplier) {
  //console.log(username);
  //console.log("access code is: " + access);

  const electron = window.require('electron');
  const ipcRenderer = electron.ipcRenderer;
  refresh();
  

  const URL = 'http://localhost:8000/api/v1/brands/';

  const request = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + ipcRenderer.sendSync('fetch-access')
    },
    body: JSON.stringify({
      name: name,
      supplier: supplier
    })
  };
  // //console.log(URL);
  return fetch(URL, request)
    .then(response => response.json())
    .catch(function(error) {
      console.log('Fetch operation error: ' + error.message);
      throw error;
    });
}
