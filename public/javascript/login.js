async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        console.log('success');
        // page not updated with loddegIn result until refreshed.
        // TODO ask if it possible to do without doing it by hand.
        document.location.replace('/');
      } else {
        alert("Failed to log in: " + response.statusText);
      }
    }
  };
  
  document.querySelector('#login-form').addEventListener('submit', loginFormHandler);


