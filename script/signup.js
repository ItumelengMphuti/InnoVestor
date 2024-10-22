// Validate signup form on submission
document.getElementById('startup-signup-form').addEventListener('submit', function (event) {
    // Validate password match
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        event.preventDefault(); // Stop form submission
        return;
    }

    // Validate pitch deck upload (only allow PDF)
    const pitchDeck = document.getElementById('pitch-deck').files[0];
    if (pitchDeck && pitchDeck.type !== 'application/pdf') {
        alert('Please upload a valid PDF file for the pitch deck.');
        event.preventDefault(); // Stop form submission
        return;
    }
  
    // Validate profile picture (only allow image formats)
    const profilePic = document.getElementById('profile-pic').files[0];
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (profilePic && !allowedImageTypes.includes(profilePic.type)) {
        alert('Please upload a valid image for the profile picture (JPEG, PNG, or GIF).');
        event.preventDefault(); // Stop form submission
    }
});
//checkbox 
function openTermsModal() {
    document.getElementById('terms-modal').style.display = 'block';
}

function closeTermsModal() {
    document.getElementById('terms-modal').style.display = 'none';
}


// Function to display the value of the range slider dynamically
document.getElementById('funding_amount').addEventListener('input', function() {
    document.getElementById('amountOutput').value = this.value;
});

// Function to show the selected signup form and hide others
function showSignupForm(userType) {
    // Hide all signup forms
    const forms = document.querySelectorAll('.signup-form');
    forms.forEach(form => {
        form.style.display = 'none';
    });

    // Show the selected signup form
    const selectedForm = document.getElementById(`${userType}-signup`);
    if (selectedForm) {
        selectedForm.style.display = 'block';
    }
}

// Function to display the appropriate signup form
function showSignupForm(userType) {
    // Hide all signup forms
    document.getElementById('mentor-signup').style.display = 'none';
    document.getElementById('investor-signup').style.display = 'none';
    document.getElementById('startup-signup').style.display = 'none';

    // Show the selected signup form
    document.getElementById(`${userType}-signup`).style.display = 'block';
}

// Function to handle signup
async function handleSignup(event, userType) {
    event.preventDefault();  // Prevent the default form submission

    // Get form data based on the user type
    const name = document.getElementById(`${userType}Name`).value;
    const email = document.getElementById(`${userType}Email`).value;
    const password = document.getElementById(`${userType}Password`).value;

    try {
        // Send signup request to the server
        const response = await fetch(`/signup_${userType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        // Check if the signup was successful
        if (response.ok) {
            const data = await response.json();
            console.log("Sign Up successful");
            // Redirect to the appropriate dashboard after successful signup
            window.location.href = `/${userType}_dashboard`;
        } else {
            // Handle error (e.g., show an error message)
            alert('Signup failed. Please try again.');
            console.log("SignUp failed")
        }
    } catch (error) {
        console.error('Error signing up:', error);
        alert('An error occurred. Please try again later.');
    }
}

