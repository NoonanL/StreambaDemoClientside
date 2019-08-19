class Access {
  constructor() {
    const URL = 'http://localhost:8000/api/v1/token/refresh/';
  }
  
  // This will just return the property on the `data` object
  refresh(key) {
    const URL = 'http://localhost:8000/api/v1/token/refresh/';
    return fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refresh: refreshToken
        })
      })
        .then(response => response.json())
        .catch(function(error) {
          console.log('Fetch operation error: ' + error.message);
          throw error;
        });
  }
}
 

// expose the class
module.exports = Access;

 