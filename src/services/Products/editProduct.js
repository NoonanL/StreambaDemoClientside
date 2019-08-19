import refresh from '../refresh';

export default function editProduct(newData, oldData) {

const electron = window.require('electron');
  const ipcRenderer = electron.ipcRenderer;
  refresh();
  
    const URL = 'http://localhost:8000/api/v1/products/' + oldData.id + '/';
  
    const request = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ipcRenderer.sendSync('fetch-access')
      },
      body: JSON.stringify({
        sku: newData.sku,
        name: newData.name,
        brand:newData.brand,
        mainImage:null,
        department: newData.department
      })
    };
    // //console.log(URL);
    return fetch(URL, request )
      .then(response => response.json())
      .catch(function(error) {
        console.log('Fetch operation error: ' + error.message);
        throw error;
      });
  }
  