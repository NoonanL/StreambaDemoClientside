import refresh from '../refresh';

export default function deleteProduct(product) {

const electron = window.require('electron');
  const ipcRenderer = electron.ipcRenderer;
  refresh();
  
    const URL = 'http://localhost:8000/api/v1/products/' + product.id + '/';
  
    const request = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ipcRenderer.sendSync('fetch-access')
      },
      body: JSON.stringify({
          id: product.id,
          sku: product.sku,
          name: product.name,
          mainImage: null,
          department: product.department
      })
    };
    // //console.log(URL);
    return fetch(URL, request )
      .catch(function(error) {
        console.log('Fetch operation error: ' + error.message);
        throw error;
      });
  }
  