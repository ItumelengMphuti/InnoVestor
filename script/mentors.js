const mentorForm = document.getElementById('mentor-signup-form');

mentorForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const formData = new FormData();
    
        // Collect data from form inputs
        const mentorName = document.querySelector('[name="mentor_name"]').value;
        const email = document.querySelector('[name="email"]').value;
        const password = document.querySelector('[name="password"]').value;
        const confirmPassword = document.querySelector('[name="cpassword"]').value;
        const companyName = document.querySelector('[name="company_name"]').value;
        const position = document.querySelector('[name="position"]').value;
        const linkedin = document.querySelector('[name="linkedin"]').value;
        const expertise = document.querySelector('[name="expertise"]').value;
        const experience = document.querySelector('[name="experience"]').value;
        const availability = document.querySelector('[name="availability"]').value;
        const preferredStage = document.querySelector('[name="preferred_stage"]').value;
        const mentorship = document.querySelector('[name="mentorship"]').value;
        const location = document.querySelector('[name="location"]').value;
        const profilePicture = document.querySelector('[name="profile_picture"]').files[0];
    
        // Password confirmation check
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
    
        // Append fields to FormData
        formData.append('mentor_name', mentorName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('company_name', companyName);
        formData.append('position', position);
        formData.append('linkedin', linkedin);
        formData.append('expertise', expertise);
        formData.append('experience', experience);
        formData.append('availability', availability);
        formData.append('preferred_stage', preferredStage);
        formData.append('mentorship', mentorship);
        formData.append('location', location);
        if (profilePicture) formData.append('profile_picture', profilePicture);
    
        const requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow',
        };
    
        // Send form data to the backend
        const response = await fetch('http://localhost:3000/mentor_signup', requestOptions);
    
        if (response.ok) {
            const result = await response.json();
            console.log('Success:', result);
            alert('Signup successful!');
            window.location.href = '/mentor_dashboard.html';
        } else {
            const errorText = await response.text();
            console.error('Error from server:', errorText);
            throw new Error(`Signup failed: ${response.status} ${response.statusText} - ${errorText}`);
        }
    
    } catch (error) {
        console.error('Error during form submission:', error);
        alert('Signup failed. Please try again later.');
    }
    
});
