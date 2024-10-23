document.addEventListener("DOMContentLoaded", () => {
    async function loadMentors () {
        try {
                const response = await fetch('http://localhost:3000/api/mentors');
                const mentors = await response.json();

                const profilesContainer = document.getElementById('mentor-profiles');
                mentors.forEach(mentor => {
                    const profile = document.createElement('div');
                    profile.innerHTML = `
                        <h3>${mentor.name}</h3>
                        <p>Company name: ${mentor.company_name}</p>
                        <p>Position: ${mentor.position}</p>
                        <p>LinkedIn Profile: ${mentor.linkedin}</p>
                        <img src="${mentor.profile_picture}" alt="${mentor.name}" />
                    `;
                    profilesContainer.appendChild(profile);
                });
            } catch (error) {
                console.error('Error loading startup profiles:', error);
            }
    }

    loadMentors();

});