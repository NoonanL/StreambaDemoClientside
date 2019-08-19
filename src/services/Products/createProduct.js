import refresh from '../refresh';

export default function createProduct(newProduct) {
    // console.log(name,sku,brand);
    //console.log("access code is: " + access);

const electron = window.require('electron');
  const ipcRenderer = electron.ipcRenderer;
  refresh();
  
    const URL = 'http://localhost:8000/api/v1/products/';
  
    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ipcRenderer.sendSync('fetch-access')
      },
      body: JSON.stringify({
        sku: newProduct.sku,
        name: newProduct.name,
        brand:newProduct.brand,
        mainImage:null,
        department: newProduct.department
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
  