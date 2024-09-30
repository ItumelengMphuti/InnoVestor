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

