document.addEventListener('DOMContentLoaded', function () {
    const profileInfo = document.getElementById('profile-info');
    
    // Retrieve and parse the profile data from localStorage
    let profileData;
    try {
        profileData = JSON.parse(localStorage.getItem('startupProfile'));
    } catch (error) {
        console.error('Error parsing profile data:', error);
        profileInfo.innerHTML = '<p>Error loading profile data. Please try signing up again.</p>';
        return;
    }

    // Check if profile data exists
    if (profileData) {
        // Display profile data with default text for missing fields
        profileInfo.innerHTML = `
            <h2>${profileData.name || 'No name provided'}</h2>
            <p><strong>Founder(s):</strong> ${profileData.founder_name || 'N/A'}</p>
            <p><strong>Email:</strong> ${profileData.email || 'N/A'}</p>
            <p><strong>Industry:</strong> ${profileData.industry || 'N/A'}</p>
            <p><strong>Location:</strong> ${profileData.location || 'N/A'}</p>
            <p><strong>Date Founded:</strong> ${profileData.date_founded || 'N/A'}</p>
            <p><strong>Stage:</strong> ${profileData.stage || 'N/A'}</p>
            <p><strong>Employees:</strong> ${profileData.number_of_employees || 'N/A'}</p>
            <p><strong>Mission:</strong> ${profileData.mission || 'N/A'}</p>
            <p><strong>Financial Stage:</strong> ${profileData.financial_stage || 'N/A'}</p>
            <p><strong>Funding Amount Sought:</strong> ZAR ${profileData.funding_amount || 'N/A'}</p>
        `;
    } else {
        // Display a message if no data is found
        profileInfo.innerHTML = '<p>No profile data available. Please sign up first.</p>';
    }
});


