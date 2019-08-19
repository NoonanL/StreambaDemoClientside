import refresh from '../refresh';

export default function deleteCustomer(customer) {
    // console.log(name,sku,brand);
    //console.log("access code is: " + access);

const electron = window.require('electron');
  const ipcRenderer = electron.ipcRenderer;
  refresh();
  
    const URL = 'http://localhost:8000/api/v1/customers/' + customer.id + '/';
  
    const request = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ipcRenderer.sendSync('fetch-access')
      },
      body: JSON.stringify({
          id: customer.id,
            firstname: customer.firstname,
            surname: customer.surname,
            url: customer.url
      })
    };
    // //console.log(URL);
    return fetch(URL, request )
      .catch(function(error) {
        console.log('Fetch operation error: ' + error.message);
        throw error;
      });
  }
  