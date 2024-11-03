
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
