document.querySelector('#investor-signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData();
    const name = document.querySelector('[name="name"]').value;
    const email = document.querySelector('[name="email"]').value;
    const password = document.querySelector('[name="password"]').value;
    const cpassword = document.querySelector('[name="cpassword"]').value;
    const compname = document.querySelector('[name="compname"]').value;
    const site = document.querySelector('[name="site"]').value;
    const years = document.querySelector('[name="years"]').value;
    const companies = document.querySelector('[name="companies"]').value;
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
    formData.append('compname', compname);
    formData.append('site', site);
    formData.append('years', years);
    formData.append('companies', companies);
    if (profile_picture) formData.append('profile_picture', profile_picture);

    // Send the data to the backend
    try {
        const response = await fetch('/investor-signup', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            window.location.href = '/investor-dashboard'; // Redirect after successful signup
        } else {
            alert(result.error || 'Error occurred during signup');
        }
    } catch (error) {
        console.error('Error during submission:', error);
        alert('An error occurred, please try again later.');
    }
});
