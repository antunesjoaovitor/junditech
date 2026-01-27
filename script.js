window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});



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

    setTimeout(typeEffect, 400);
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        

        if (href === "#") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();

            navMenu.classList.remove('active');
            
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

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








//----------------------------- REQUISIÇÕES HTTP --------------------------------//



const botaoEnviar = document.getElementById("enviarDemo");
const feedback = document.getElementById("feedback");

botaoEnviar.addEventListener("click", async () => {
  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const problema = document.getElementById("problema").value;

  feedback.textContent = "Enviando...";
  feedback.style.color = "#cbd5f5";

  try {
    const resposta = await fetch("https://examination-mhz-latitude-corps.trycloudflare.com/webhook/e9ca83ba-8966-4b95-bc42-203c31b4324a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, telefone, problema })
    });

    if (!resposta.ok) {
      throw new Error("Erro no envio");
    }

    feedback.style.color = "#22c55e";
    feedback.textContent = "✅ Recebido! Em breve entrarei em contato.";
  } catch (erro) {
    feedback.style.color = "#ef4444";
    feedback.textContent = "❌ Erro ao enviar. Tente novamente.";
    console.error(erro);
  }
});

//---- hihihihi ----- ///
