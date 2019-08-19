export default function getTransactions(access) {

    const URL = 'http://localhost:8000/api/v1/transactions/';
    // //console.log(URL);
    return fetch(URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access
      }
    })
      .then(response => response.json())
      .catch(function(error) {
        console.log('Fetch operation error: ' + error.message);
        throw error;
      });
  }
  