const form = document.getElementById('mentor-signup-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const formData = new FormData();
        
        const name = document.querySelector('[name="name"]').value;
        const email = document.querySelector('[name="email"]').value;
        const password = document.querySelector('[name="password"]').value;
        const confirmPassword = document.querySelector('[name="cpassword"]').value;
        const company_name = document.querySelector('[name="company_name"]').value;
        const position = document.querySelector('[name="position"]').value;
        const linkedin = document.querySelector('[name="linkedin"]').value;
        const expertise = document.querySelector('[name="expertise"]').value;
        const experience = document.querySelector('[name="experience"]').value;
        const availability = document.querySelector('[name="availability"]').value;
        const preferred_stage = document.querySelector('[name="preferred_stage"]').value;
        const mentorship = document.querySelector('[name="mentorship"]').value;
        const location = document.querySelector('[name="location"]').value;
        const profile_picture = document.querySelector('[name="profile_picture"]').files[0];

        // Check for password match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Populate FormData
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirm_password', confirmPassword);
        formData.append('company_name', company_name);
        formData.append('position', position);
        formData.append('linkedin', linkedin);
        formData.append('expertise', expertise);
        formData.append('experience', experience);
        formData.append('availability', availability);
        formData.append('preferred_stage', preferred_stage);
        formData.append('mentorship', mentorship);
        formData.append('location', location);
        if (profile_picture) formData.append('profile_picture', profile_picture);

        // Log FormData contents
        console.log('Form Data:', formData);
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        // Log file data separately to confirm uploads
        console.log('Profile Picture:', profile_picture);

        const requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow',
        };

        // Send the form data to the backend
        const response = await fetch('http://localhost:3000/mentor_signup', requestOptions);

        if (response.ok) {
            const result = await response.json();  // Or response.text() depending on server response format
            console.log('Success:', result);
            alert('Signup successful!');
            window.location.href = '/mentor_dashboard.html';
        } else {
            const errorText = await response.text();  // Retrieve the text error from the response
            console.error('Error from server:', errorText);
            throw new Error(`Signup failed: ${response.status} ${response.statusText} - ${errorText}`);
        }
        
    } catch (error) {
        console.error('Error during form submission:', error);
        alert('Signup failed. Please try again later.');
    }
});
