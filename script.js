// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Mode Sombre
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    darkModeToggle.querySelector('i').classList.toggle('fa-sun');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').classList.add('fa-sun');
}

// Navigation
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const burger = document.querySelector('.burger');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(30, 30, 44, 0.9)';
    } else {
        navbar.style.background = 'transparent';
    }

    // Active link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Burger Menu
burger.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
    burger.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        burger.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Animation Sections
const sections = document.querySelectorAll('section');

function animateOnScroll() {
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + window.innerHeight;

        if (scrollPosition > sectionTop + sectionHeight / 2) {
            const cards = section.querySelectorAll('.parcours-card');
            cards.forEach(card => {
                card.classList.add('animate');
            });
        }
    });
}

// Gestion des Modals Parcours
document.querySelectorAll('.parcours-img-box').forEach(box => {
    box.addEventListener('click', function() {
        const descId = this.getAttribute('data-desc');
        document.getElementById(descId).classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.parcours-modal').classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Initialisation
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);




// Animation des cartes de compétences
function animateCompetences() {
    const competencesSection = document.getElementById('competences');
    const competencesCards = document.querySelectorAll('.competence-card');
    const screenPosition = window.innerHeight / 1.2;
    
    if (competencesSection.getBoundingClientRect().top < screenPosition) {
        competencesCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 100);
        });
    }
}

// Initialisation
window.addEventListener('load', () => {
    animateCompetences();
});

window.addEventListener('scroll', () => {
    animateCompetences();
});




// Animation des projets stage
document.addEventListener('DOMContentLoaded', function() {
    // Gestion des onglets de code
    const codeTabs = document.querySelectorAll('.code-tab');
    
    codeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Désactive tous les onglets et contenus
            document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.code-content').forEach(c => c.classList.remove('active'));
            
            // Active l'onglet cliqué
            this.classList.add('active');
            
            // Affiche le contenu correspondant
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Animation des statistiques
    const stats = document.querySelectorAll('.result-number');
    const options = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target, 0, parseInt(entry.target.textContent), 1000);
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    stats.forEach(stat => observer.observe(stat));
    
    // Fonction d'animation des valeurs
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Highlight.js pour la coloration syntaxique
    hljs.highlightAll();
});



// Animation des projets accadémique
document.addEventListener('DOMContentLoaded', function() {
    // Onglets de code
    const codeTabs = document.querySelectorAll('.code-tab');
    
    codeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Désactiver tous les onglets et contenus
            document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.code-content').forEach(c => c.classList.remove('active'));
            
            // Activer l'onglet cliqué
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });






    
    // Animation des compétences
    const skillMeters = document.querySelectorAll('.skill-meter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = level + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillMeters.forEach(meter => observer.observe(meter));
    
    // Lightbox pour la galerie (simplifiée)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('href');
            
            // Créer une lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${imgSrc}" alt="Project screenshot">
                    <button class="close-lightbox">&times;</button>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Fermer la lightbox
            lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
                lightbox.remove();
            });
        });
    });
    
    // Highlight.js
    hljs.highlightAll();
});





// Animation BTS SIO
function animateBts() {
    const btsSection = document.getElementById('bts-sio');
    const btsCards = document.querySelectorAll('.bts-card');
    const screenPosition = window.innerHeight / 1.3;
    
    if (btsSection.getBoundingClientRect().top < screenPosition) {
        btsCards.forEach(card => {
            card.classList.add('animate');
        });
    }
}

// Gestion des modals BTS
document.querySelectorAll('.bts-overlay').forEach(overlay => {
    overlay.addEventListener('click', function() {
        const descId = this.getAttribute('data-desc');
        document.getElementById(descId).classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Initialisation
window.addEventListener('load', () => {
    animateBts();
});

window.addEventListener('scroll', () => {
    animateBts();
});






// Animation Veille Techno - Pare-feux
function animateDissertation() {
    const veilleSection = document.getElementById('veille');
    const parts = document.querySelectorAll('.dissertation-part, .references-section');
    const screenPosition = window.innerHeight / 1.3;
    
    if (veilleSection.getBoundingClientRect().top < screenPosition) {
        parts.forEach((part, index) => {
            setTimeout(() => {
                part.style.opacity = '1';
                part.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
}

// Initialisation
window.addEventListener('load', () => {
    // Initial styles for animations
    const parts = document.querySelectorAll('.dissertation-part, .references-section');
    parts.forEach(part => {
        part.style.opacity = '0';
        part.style.transform = 'translateY(30px)';
        part.style.transition = 'all 0.5s ease';
    });
    
    animateDissertation();
});

window.addEventListener('scroll', () => {
    animateDissertation();
});

// Smooth scrolling for academic references
document.querySelectorAll('.reference-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.backgroundColor = 'rgba(108, 99, 255, 0.1)';
        setTimeout(() => {
            this.style.backgroundColor = '';
        }, 300);
    });
});





// Animation Contact
function animateContact() {
    const contactSection = document.getElementById('contact');
    const contactCards = document.querySelectorAll('.contact-card, .cv-card');
    const screenPosition = window.innerHeight / 1.3;
    
    if (contactSection.getBoundingClientRect().top < screenPosition) {
        contactCards.forEach(card => {
            card.classList.add('animate');
        });
    }
}

// Initialisation
window.addEventListener('load', () => {
    animateContact();
});

window.addEventListener('scroll', () => {
    animateContact();
});