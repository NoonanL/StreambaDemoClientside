export default function authenticate(username, password) {
    //console.log(username);
    //console.log(password);
    const URL = 'http://localhost:8000/api/v1/token/';
    //console.log(URL);
    return fetch(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => response.json())
      .catch(function(error) {
        console.log('Fetch operation error: ' + error.message);
        throw error;
      });
  };
