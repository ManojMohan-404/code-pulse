document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.querySelector('.signup-form form');
  
  if (signupForm) {
    signupForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const reenterPassword = document.getElementById('reenterPassword').value;
      
      // Client-side validation
      if (password !== reenterPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      if (password.length < 8) {
        alert('Password must be at least 8 characters long!');
        return;
      }
      
      try {
        const response = await fetch('/api/v1/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
            passwordConfirm: reenterPassword
          })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Store the token in localStorage
          localStorage.setItem('token', data.token);
          
          // Redirect to dashboard or home page
          window.location.href = '/dashboard.html';
        } else {
          throw new Error(data.message || 'Signup failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    });
  }
});