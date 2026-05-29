document.addEventListener("DOMContentLoaded", () => {
    // 1. Smooth scrolling for internal anchor links and simple offset for header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {

            // Allow linking to the same page if it includes an anchor e.g. index.html#about
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // 2. Intersection Observer for Fade In Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: stop observing once faded in
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("personaLightbox");
    const lightboxImage = document.getElementById("personaLightboxImage");
    const previewButtons = document.querySelectorAll(".persona-preview-button");
    const closeTriggers = document.querySelectorAll("[data-close-persona-lightbox]");

    if (!lightbox || !lightboxImage || previewButtons.length === 0) return;

    const openLightbox = (src, alt) => {
        lightboxImage.src = src;
        lightboxImage.alt = alt || "";
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("persona-lightbox-open");
    };

    const closeLightbox = () => {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImage.src = "";
        lightboxImage.alt = "";
        document.body.classList.remove("persona-lightbox-open");
    };

    previewButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const src = button.dataset.personaSrc;
            const alt = button.dataset.personaAlt;
            openLightbox(src, alt);
        });
    });

    closeTriggers.forEach((trigger) => {
        trigger.addEventListener("click", closeLightbox);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
            closeLightbox();
        }
    });
});

// --- PERSONA LIGHTBOX ---
const personaButtons = document.querySelectorAll('.persona-preview-button');
const lightbox = document.getElementById('personaLightbox');
const lightboxImg = document.getElementById('personaLightboxImage');
const closeTriggers = document.querySelectorAll('[data-close-persona-lightbox]');

personaButtons.forEach(button => {
    button.addEventListener('click', () => {
        const src = button.dataset.personaSrc;
        const alt = button.dataset.personaAlt;

        lightboxImg.src = src;
        lightboxImg.alt = alt;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// cerrar lightbox
closeTriggers.forEach(el => {
    el.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// cerrar con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});