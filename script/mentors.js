document.querySelector('#mentor-signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData();
    const name = document.querySelector('[name="name"]').value;
    const email = document.querySelector('[name="email"]').value;
    const password = document.querySelector('[name="password"]').value;
    const cpassword = document.querySelector('[name="cpassword"]').value;
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
    if (password !== cpassword) {
        alert('Passwords do not match!');
        return;
    }

    // Append form data
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('cpassword', cpassword);
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

    // Send the data to the backend
    try {
        const response = await fetch('/mentor-signup', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            window.location.href = '/mentor-dashboard'; // Redirect after successful signup
        } else {
            alert(result.error || 'Error occurred during signup');
        }
    } catch (error) {
        console.error('Error during submission:', error);
        alert('An error occurred, please try again later.');
    }
});
