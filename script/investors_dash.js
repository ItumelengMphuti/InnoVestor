document.addEventListener("DOMContentLoaded", () => {
    async function loadInvestors() {
        try {
                const response = await fetch('http://localhost:3000/api/investors');
                const investors = await response.json();

                const profilesContainer = document.getElementById('investor-profiles');
                investors.forEach(investors => {
                    const profile = document.createElement('div');
                    profile.innerHTML = `
                        <h3>${investors.name}</h3>
                        <p>Company: ${investors.compname}</p>
                        <p>Company site: ${investors.site}</p>
                        <p>LinkedIn Profile: ${investors.linkedin}</p>
                        <img src="${investors.profile_picture}" alt="${investors.name}" />
                        `;
                        profilesContainer.appendChild(profile);
                    });
                } catch (error) {
                    console.error('Error loading startup profiles:', error);
                }
    }
    loadInvestors();
});