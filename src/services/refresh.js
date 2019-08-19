export default function refresh() {

  const electron = window.require('electron');
  const ipcRenderer = electron.ipcRenderer;

  const URL = 'http://localhost:8000/api/v1/token/refresh/';


  function test(){
    return fetch(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refresh: ipcRenderer.sendSync('fetch-refresh')
      })
    })
      .then(response => response.json())
      .catch(function(error) {
        console.log('Fetch operation error: ' + error.message);
        throw error;
      });
  }

  test().then(response => {if(response.access){
    ipcRenderer.send('set-settings', {
      key: 'access',
      val: response.access
    });
    //console.log("New access token is: " + response.access);
  }
  else{
    ipcRenderer.send('logged-in', false);
  }})
}
