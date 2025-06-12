document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.querySelector('.login-form form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        const response = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Store the token in localStorage
          localStorage.setItem('token', data.token);
          
          // Redirect to dashboard or home page
          window.location.href = '/dashboard.html';
        } else {
          throw new Error(data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    });
  }
});