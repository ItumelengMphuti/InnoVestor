// Function to display the selected login form and hide others
function showLoginForm(userType) {
    // Hide all login forms
    const forms = document.querySelectorAll('.login-form');
    forms.forEach(form => {
        form.style.display = 'none';
    });

    // Show the selected login form
    const selectedForm = document.getElementById(`${userType}-login`);
    if (selectedForm) { 
        selectedForm.style.display = 'block';
    }
}
// Function to handle login
async function handleLogin(event, userType) {
    event.preventDefault();  // Prevent the default form submission
    
    // Get form data based on the user type
    const email = document.getElementById(`${userType}Email`).value;
    const password = document.getElementById(`${userType}Password`).value;
    
    try {
        // Send login request to the server
        const response = await fetch(`/login_${userType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        // Check if the login was successful
        if (response.ok) {
            const data = await response.json();
            // Redirect to the appropriate dashboard
            window.location.href = `/${userType}_dashboard`;
        } else {
            // Handle error (e.g., show an error message)
            alert('Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred. Please try again later.');
    }
}

async function handleLogin(event, userType) {
    event.preventDefault();  // Prevent default form submission

    const email = document.getElementById(`${userType}Email`).value;
    const password = document.getElementById(`${userType}Password`).value;

    try {
        const response = await fetch(`/login_${userType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            // Store the token (you can use localStorage or sessionStorage)
            localStorage.setItem('token', data.token);

            // Redirect to the appropriate dashboard
            window.location.href = `/${userType}_dashboard`;
        } else {
            alert('Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
}


// Optional: Automatically select a form based on the URL or other logic
window.onload = function() {
    // Check if a user type is specified in the URL (e.g., ?user=mentor)
    const params = new URLSearchParams(window.location.search);
    const userType = params.get('user');
    if (userType) {
        showLoginForm(userType);
    }
};
