import refresh from '../refresh';

export default function deleteDepartment(department) {
    // console.log(name,sku,brand);
    //console.log("access code is: " + access);

const electron = window.require('electron');
  const ipcRenderer = electron.ipcRenderer;
  refresh();
  
    const URL = 'http://localhost:8000/api/v1/departments/' + department.id + '/';
  
    const request = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ipcRenderer.sendSync('fetch-access')
      },
      body: JSON.stringify({
          id: department.id,
            name: department.name,
            url: department.url
      })
    };
    // //console.log(URL);
    return fetch(URL, request )
      .catch(function(error) {
        console.log('Fetch operation error: ' + error.message);
        throw error;
      });
  }
  