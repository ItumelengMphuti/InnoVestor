document.addEventListener("DOMContentLoaded", () => {
    async function loadMentors() {
        try {
            const response = await fetch('http://localhost:3000/mentor-signup');

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch mentor profiles');
            }

            const mentors = await response.json();

            const profilesContainer = document.getElementById('mentor-profiles');
            profilesContainer.innerHTML = ''; // Clear the container before adding new profiles

            mentors.forEach(mentor => {
                // Create a new div to hold the mentor's profile
                const profile = document.createElement('div');
                profile.classList.add('mentor-profile'); // Adding a class for styling purposes
                
                // Check if the profile picture exists and set a default if not
                const profilePicture = mentor.profile_picture ? mentor.profile_picture : 'default-profile.jpg';

                // Insert the mentor's details into the profile div
                profile.innerHTML = `
                    <h3>${mentor.name}</h3>
                    <p><strong>Company name:</strong> ${mentor.company_name}</p>
                    <p><strong>Position:</strong> ${mentor.position}</p>
                    <p><strong>LinkedIn Profile:</strong> <a href="${mentor.linkedin}" target="_blank">View Profile</a></p>
                    <img src="${profilePicture}" alt="${mentor.name}'s profile picture" class="profile-img" />
                `;

                // Append the profile div to the profiles container
                profilesContainer.appendChild(profile);
            });
        } catch (error) {
            console.error('Error loading mentor profiles:', error);
            const profilesContainer = document.getElementById('mentor-profiles');
            profilesContainer.innerHTML = '<p>There was an error loading mentor profiles. Please try again later.</p>';
        }
    }

    // Call the loadMentors function to populate the dashboard
    loadMentors();
});
