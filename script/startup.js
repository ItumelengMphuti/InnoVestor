document.addEventListener("DOMContentLoaded", () => {
    async function loadStartups() {
        try {
            const response = await fetch('http://localhost:3000/api/startups');
            const startups = await response.json();

            const profilesContainer = document.getElementById('startup-profiles');
            startups.forEach(startup => {
                const profile = document.createElement('div');
                profile.classList.add('profile'); // Optional: Add a CSS class for styling

                profile.innerHTML = `
                    <h3>${startup.name}</h3>
                    <p>Founder: ${startup.founder_name}</p>
                    <p>Industry: ${startup.industry}</p>
                    <p>Location: ${startup.location}</p>
                    <img src="${startup.profile_picture}" alt="${startup.name}" width="150" />
                `;
                profilesContainer.appendChild(profile);
            });
        } catch (error) {
            console.error('Error loading startup profiles:', error);
        }
    }
    
    loadStartups();
});
