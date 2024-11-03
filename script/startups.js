document.getElementById('startup-signup-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Retrieve form fields
    const name = document.getElementById('startup-name').value;
    const founderName = document.getElementById('founder_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const profilePicture = document.getElementById('profile_picture').files[0];
    const industry = document.getElementById('industry').value;
    const location = document.getElementById('location').value;
    const dateFounded = document.getElementById('datefounded').value;
    const stage = document.getElementById('stage').value;
    const employeeCount = document.getElementById('employee-count').value;
    const mission = document.getElementById('mission').value;
    const pitchDeck = document.getElementById('pitch-deck').files[0];
    const financialStage = document.getElementById('financial_stage').value;
    const fundingAmount = document.getElementById('funding_amount').value;

    // Validate password match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Validate profile picture
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (profilePicture && !allowedImageTypes.includes(profilePicture.type)) {
        alert('Please upload a valid image for the profile picture (JPEG, PNG, or JPG).');
        return;
    }

    // Validate pitch deck
    if (pitchDeck && pitchDeck.type !== 'application/pdf') {
        alert('Please upload a valid PDF file for the pitch deck.');
        return;
    }

    // Prepare form data for submission
    const formData = new FormData();
    formData.append('name', name);
    formData.append('founder_name', founderName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profile_picture', profilePicture);
    formData.append('industry', industry);
    formData.append('location', location);
    formData.append('date_founded', dateFounded);
    formData.append('stage', stage);
    formData.append('number_of_employees', employeeCount);
    formData.append('mission', mission);
    formData.append('pitch_deck', pitchDeck);
    formData.append('financial_stage', financialStage);
    formData.append('funding_amount', fundingAmount);

    try {
        // Send signup request to the server
        const response = await fetch('/startups', {
            method: 'POST',
            body: formData
        });

        // Check if the signup was successful
        if (response.ok) {
            const data = await response.json();
            alert('Signup successful!');

            // Save profile data to localStorage for the dashboard
            localStorage.setItem('startupProfile', JSON.stringify(data));

            // Redirect to the startup dashboard after successful signup
            window.location.href = '/startup_dashboard';
        } else {
            alert('Signup failed. Please try again.');
        }
    } catch (error) {
        console.error('Error signing up:', error);
        alert('An error occurred. Please try again later.');
    }
});
