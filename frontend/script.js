document.addEventListener('DOMContentLoaded', (event) => {

    getVisitCount();

    const content = document.getElementById('main-content');
    const cursorLight = document.getElementById('cursor-light');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content');

    // Cursor light effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        cursorLight.style.setProperty('--mouse-x', `${x}px`);
        cursorLight.style.setProperty('--mouse-y', `${y}px`);
        cursorLight.style.opacity = '1';
    });

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            showSection(targetSection);
        });
    });

    function showSection(sectionId) {
        sections.forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(sectionId).style.display = 'block';
        
        const mainNavLinks = document.querySelectorAll('.nav-links .nav-link');
        mainNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });

        // Trigger fade-in animation
        setTimeout(() => {
            document.getElementById(sectionId).style.opacity = '1';
            document.getElementById(sectionId).style.transform = 'translateY(0)';
        }, 50);
    }

    showSection('home');

    // Project card click handlers
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const githubUrl = card.getAttribute('data-github');
            if (githubUrl) {
                window.open(githubUrl, '_blank');
            }
        });
    });
});

const functionApiUrl = 'https://fa-rg-aleem-az-resume-python-api-prod-001.azurewebsites.net/api/AzureResumeCounter?code=ubn32MSHfCJ3wlEDwiE3Djoceh-WME-YV-CaQIdikuGsAzFuSrMqtQ==';
const localfunctionApi= 'http://localhost:7071/api/AzureResumeCounter';

// Function to fetch and display the visit count
const getVisitCount = () => {
    fetch(functionApiUrl)
        .then(response => response.json())
        .then(response => {
            console.log("Website called function API.");
            const count = response.count;
            document.getElementById("counter").innerText = count;
        })
        .catch(function(error) {
            console.log(error);
        });
};