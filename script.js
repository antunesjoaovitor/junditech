/* ==================================================
   PAGE LOAD
================================================== */
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});


/* ==================================================
   REVEAL ON SCROLL (INTELIGENTE)
================================================== */
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            el.classList.add("active");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* ==================================================
   SMOOTH SCROLL (ÂNCORAS)
================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


/* ==================================================
   HERO TYPING EFFECT (CORRIGIDO)
================================================== */
const typingElement = document.querySelector('.typing');
if (typingElement) {
    const text = typingElement.textContent.trim();
    typingElement.textContent = '';
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            typingElement.textContent += text[index];
            index++;
            setTimeout(typeEffect, 50);
        }
    }
    // Inicia após um pequeno delay
    setTimeout(typeEffect, 400);
}

/* ==================================================
   SMOOTH SCROLL (MELHORADO)
================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        
        // Se for apenas "#", sobe para o topo
        if (href === "#") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            // Fecha o menu mobile ao clicar (se estiver aberto)
            navMenu.classList.remove('active');
            
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
/* ==================================================
   BUTTON INTERACTION (FEEDBACK REAL)
================================================== */
const interactiveButtons = document.querySelectorAll(
    ".btn-primary, .btn-secondary"
);

interactiveButtons.forEach(btn => {
    btn.addEventListener("mousedown", () => {
        btn.style.transform = "scale(0.95)";
    });

    btn.addEventListener("mouseup", () => {
        btn.style.transform = "scale(1)";
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1)";
    });
});


/* ==================================================
   SECTION FOCUS (SUTIL, SEM POLUIR)
================================================== */
const sections = document.querySelectorAll("section");

const focusSection = () => {
    let scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
        ) {
            section.classList.add("section-active");
        } else {
            section.classList.remove("section-active");
        }
    });
};

window.addEventListener("scroll", focusSection);


/* ==================================================
   CTA DINÂMICO (INTELIGENTE)
================================================== */
const ctaButton = document.querySelector('.hero-actions .btn-primary');

if (ctaButton) {
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        if (scrollY > 300) {
            ctaButton.innerText = "💬 Falar no WhatsApp";
        } else {
            ctaButton.innerText = "💬 Falar comigo";
        }
    });
}


/* ==================================================
   MICRO DELAY PARA UX SUAVE
================================================== */
let isTicking = false;

window.addEventListener("scroll", () => {
    if (!isTicking) {
        window.requestAnimationFrame(() => {
            revealOnScroll();
            focusSection();
            isTicking = false;
        });
        isTicking = true;
    }
});
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
