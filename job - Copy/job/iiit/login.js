document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    // Mock credentials for demonstration
    const validCredentials = {
        username: 'admin',
        password: 'admin123'
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Check credentials
        if (username === validCredentials.username && password === validCredentials.password) {
            // Store login status in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            
            // Redirect to index.html
            window.location.href = 'index.html';
        } else {
            // Show error message
            errorMessage.style.display = 'block';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    });
}); 