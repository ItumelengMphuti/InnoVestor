document.addEventListener("DOMContentLoaded", () => {
    async function loadInvestors() {
        try {
            const response = await fetch('http://localhost:3000/investor-signup');

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch investor profiles');
            }

            const investors = await response.json();

            const profilesContainer = document.getElementById('investor-profiles');
            profilesContainer.innerHTML = ''; // Clear the container before adding new profiles

            investors.forEach(investor => {
                // Create a new div to hold the investor's profile
                const profile = document.createElement('div');
                profile.classList.add('investor-profile'); // Adding a class for styling purposes
                
                // Check if the profile picture exists and set a default if not
                const profilePicture = investor.profile_picture ? investor.profile_picture : 'default-profile.jpg';

                // Insert the investor's details into the profile div
                profile.innerHTML = `
                    <h3>${investor.name}</h3>
                    <p><strong>Company:</strong> ${investor.compname}</p>
                    <p><strong>Company site:</strong> <a href="${investor.site}" target="_blank">${investor.site}</a></p>
                    <p><strong>LinkedIn Profile:</strong> <a href="${investor.linkedin}" target="_blank">View Profile</a></p>
                    <img src="${profilePicture}" alt="${investor.name}'s profile picture" class="profile-img" />
                `;

                // Append the profile div to the profiles container
                profilesContainer.appendChild(profile);
            });
        } catch (error) {
            console.error('Error loading investor profiles:', error);
            const profilesContainer = document.getElementById('investor-profiles');
            profilesContainer.innerHTML = '<p>There was an error loading investor profiles. Please try again later.</p>';
        }
    }

    // Call the loadInvestors function to populate the dashboard
    loadInvestors();
});
