document.addEventListener('DOMContentLoaded', function () {
    const profileInfo = document.getElementById('profile-info');
    
    // Retrieve the saved profile data from localStorage
    const profileData = JSON.parse(localStorage.getItem('startupProfile'));

    if (profileData) {
        // Display profile data
        profileInfo.innerHTML = `
            <h2>${profileData.name}</h2>
            <p><strong>Founder(s):</strong> ${profileData.founder_name}</p>
            <p><strong>Email:</strong> ${profileData.email}</p>
            <p><strong>Industry:</strong> ${profileData.industry}</p>
            <p><strong>Location:</strong> ${profileData.location}</p>
            <p><strong>Date Founded:</strong> ${profileData.date_founded}</p>
            <p><strong>Stage:</strong> ${profileData.stage}</p>
            <p><strong>Employees:</strong> ${profileData.number_of_employees}</p>
            <p><strong>Mission:</strong> ${profileData.mission}</p>
            <p><strong>Financial Stage:</strong> ${profileData.financial_stage}</p>
            <p><strong>Funding Amount Sought:</strong> ZAR ${profileData.funding_amount}</p>
        `;
    } else {
        profileInfo.innerHTML = '<p>No profile data available. Please sign up first.</p>';
    }
});
