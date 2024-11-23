// Function to show the selected signup form and hide others
function showSignupForm(userType) {
    const forms = document.querySelectorAll('.signup-form');
    forms.forEach(form => {
        form.style.display = 'none';
    });

    const selectedForm = document.getElementById(`${userType}-signup`);
    if (selectedForm) {
        selectedForm.style.display = 'block';
    }
}

// Function to handle form submission
async function handleSignup(event, userType) {
    event.preventDefault();

    // Disable submit button
    const submitButton = event.target.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
    }

    const form = event.target;
    const formData = new FormData(form);

    // Debug: Log form data
    console.log('Form submission data:');
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    // Password validation
    const password = form.querySelector('[name="password"]').value;
    const confirmPassword = form.querySelector('[name="cpassword"]').value;
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        if (submitButton) submitButton.disabled = false;
        return;
    }

    try {
        // Log the request URL
        const url = `http://localhost:3000/${userType}s`;
        console.log('Sending request to:', url);

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            // Add headers for debugging
            headers: {
                'Accept': 'application/json'
            }
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', [...response.headers.entries()]);

        // Try to get the response body regardless of content type
        let responseBody;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            responseBody = await response.json();
        } else {
            responseBody = await response.text();
        }
        console.log('Response body:', responseBody);

        if (!response.ok) {
            throw new Error(`Signup failed: ${response.status} ${response.statusText}\nResponse: ${JSON.stringify(responseBody)}`);
        }

        alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} signup successful!`);
        window.location.href = `/${userType}_dashboard.html`;

    } catch (error) {
        console.error('Detailed error information:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        alert(`Signup failed. Error: ${error.message}`);
        if (submitButton) submitButton.disabled = false;
    }
}

// Attach event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all signup forms
    const forms = document.querySelectorAll('#startup-signup-form, #mentor-signup-form, #investor-signup-form');
    
    forms.forEach(form => {
        const userType = form.id.split('-')[0];
        // Remove any existing listeners
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        newForm.addEventListener('submit', (event) => handleSignup(event, userType));
    });
});