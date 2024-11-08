const form = document.getElementById('startup-signup');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    try {
        const formData = new FormData();
        
        const name = document.querySelector('[name="name"]').value;
        const founder_name = document.querySelector('[name="foundername"]').value;
        const email = document.querySelector('[name="email"]').value;
        const password = document.querySelector('[name="password"]').value;
        const confirmPassword = document.querySelector('[name="cpassword"]').value; // Updated
        const profile_picture = document.querySelector('[name="profile_picture"]').files[0];
        const industry = document.querySelector('[name="industry"]').value;
        const location = document.querySelector('[name="location"]').value;
        const date_founded = document.querySelector('[name="datefounded"]').value;
        const stage = document.querySelector('[name="stage"]').value;
        const number_of_employees = document.querySelector('[name="employee_count"]').value; // Updated
        const mission = document.querySelector('[name="mission"]').value;
        const pitch_deck = document.querySelector('[name="pitch_deck"]').files[0];
        const financial_stage = document.querySelector('[name="financial_stage"]').value;
        const funding_amount = document.querySelector('[name="funding_amount"]').value;
        
        // Ensure correct appending to FormData without unnecessary quotes
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


        // Match Postman's request options exactly
        const requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow"
        };

        // Make sure you're using the correct port (3001 not 3000)
        const response = await fetch("http://localhost:3000/startups", requestOptions);
        
        // Handle the response
        if (response.ok) {
            const result = await response.text();
            console.log('Success:', result);
            alert('Signup successful!');
            window.location.href = '/startup_dashboard.html';
        } else {
            const errorText = await response.text();
            console.error('Server response:', errorText);
            throw new Error(`Signup failed: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Signup failed. Please try again later.');
    }
});