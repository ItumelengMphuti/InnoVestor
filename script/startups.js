const form = document.getElementById('startup-signup');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const formData = new FormData();
        
        const name = document.querySelector('[name="name"]').value;
        const founder_name = document.querySelector('[name="foundername"]').value;
        const email = document.querySelector('[name="email"]').value;
        const password = document.querySelector('[name="password"]').value;
        const confirmPassword = document.querySelector('[name="cpassword"]').value;
        const profile_picture = document.querySelector('[name="profile_picture"]').files[0];
        const industry = document.querySelector('[name="industry"]').value;
        const location = document.querySelector('[name="location"]').value;
        const date_founded = document.querySelector('[name="datefounded"]').value;
        const stage = document.querySelector('[name="stage"]').value;
        const number_of_employees = document.querySelector('[name="employee_count"]').value;
        const mission = document.querySelector('[name="mission"]').value;
        const pitch_deck = document.querySelector('[name="pitch_deck"]').files[0];
        const financial_stage = document.querySelector('[name="financial_stage"]').value;
        const funding_amount = document.querySelector('[name="funding_amount"]').value;

        // Populate FormData
        formData.append("startup_name", name);
        formData.append("founder_name", founder_name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirm_password", confirmPassword);
        formData.append("profile_picture", profile_picture);
        formData.append("industry", industry);
        formData.append("location", location);
        formData.append("datefounded", date_founded);
        formData.append("stage", stage);
        formData.append("employee_count", number_of_employees);
        formData.append("mission", mission);
        formData.append("pitch_deck", pitch_deck);
        formData.append("financial_stage", financial_stage);
        formData.append("funding_amount", funding_amount);

        // Log FormData contents
        console.log('Form Data:', formData);
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        // Log file data separately to confirm uploads
        console.log('Profile Picture:', profile_picture);
        console.log('Pitch Deck:', pitch_deck);

        const requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow"
        };

        // Send the form data to the backend
        const response = await fetch("http://localhost:3000/startups", requestOptions);

        if (response.ok) {
            const result = await response.json();  // Or response.text() depending on server response format
            console.log('Success:', result);
            alert('Signup successful!');
            window.location.href = '/startup_dashboard.html';
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
