document.getElementById('startup-signup-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Retrieve form fields
    const fields = {
        name: document.getElementById('startup-name').value,
        founder_name: document.getElementById('founder_name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirm-password').value,
        profile_picture: document.getElementById('profile_picture').files[0],
        industry: document.getElementById('industry').value,
        location: document.getElementById('location').value,
        date_founded: document.getElementById('datefounded').value,
        stage: document.getElementById('stage').value,
        number_of_employees: document.getElementById('employee-count').value,
        mission: document.getElementById('mission').value,
        pitch_deck: document.getElementById('pitch-deck').files[0],
        financial_stage: document.getElementById('financial_stage').value,
        funding_amount: document.getElementById('funding_amount').value,
    };

    // Validate password match
    if (fields.password !== fields.confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Validate profile picture
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (fields.profile_picture && !allowedImageTypes.includes(fields.profile_picture.type)) {
        alert('Please upload a valid image for the profile picture (JPEG, PNG, or JPG).');
        return;
    }

    // Validate pitch deck
    if (fields.pitch_deck && fields.pitch_deck.type !== 'application/pdf') {
        alert('Please upload a valid PDF file for the pitch deck.');
        return;
    }

    // Prepare form data for submission
    const formData = new FormData();
    for (const key in fields) {
        if (fields[key]) {
            formData.append(key, fields[key]);
        }
    }

    try {
        // Send signup request to the server
        const response = await fetch('http://localhost:3000/startups', {
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
            alert(`Signup failed. Status: ${response.status} ${response.statusText}`);
            console.error('Server response:', await response.text());
        }
    } catch (error) {
        console.error('Error signing up:', error);
        alert('An error occurred. Please try again later.');
    }
});
