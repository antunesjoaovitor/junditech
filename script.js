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







//----------------------------- REQUISIÇÕES HTTP (DEBUG MODE) --------------------------------//

const botaoEnviar = document.getElementById("enviarDemo");
const feedback = document.getElementById("feedback");

if (!botaoEnviar) {
  console.error("❌ ERRO: O botão com ID 'enviarDemo' não foi encontrado no HTML!");
} else {
  console.log("✅ Script carregado: Botão 'enviarDemo' encontrado e pronto.");
}
// 1) MÁSCARA AUTOMÁTICA NO INPUT (xx) xxxxx-xxxx
const telefoneInput = document.getElementById("telefone");

telefoneInput.addEventListener("input", function () {
  let numero = this.value.replace(/\D/g, "");

  // limita a 11 dígitos (DDD + 9 dígitos)
  if (numero.length > 11) numero = numero.slice(0, 11);

  // aplica máscara progressiva
  if (numero.length > 6) {
    this.value = numero.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
  } else if (numero.length > 2) {
    this.value = numero.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
  } else {
    this.value = numero;
  }
});


// 2) CLICK DO BOTÃO COM VALIDAÇÃO + ENVIO (telefone vai como xxxxxxxxxxx)
botaoEnviar.addEventListener("click", async () => {
  console.log("🚀 Botão clicado! Iniciando processo...");

  const nome = document.getElementById("nome").value.trim();
  const telefoneDigitado = document.getElementById("telefone").value.trim(); // com máscara
  const problema = document.getElementById("problema").value.trim();

  // limpa para enviar só números
  const telefone = telefoneDigitado.replace(/\D/g, "");

  console.log("📦 Dados capturados:", { nome, telefone, problema });

  // Regex / validações
  const regexNome = /^[A-Za-zÀ-ÿ\s]{3,}$/;
  const regexTelefone = /^[0-9]{10,11}$/; // 10 ou 11 dígitos

  // VALIDAÇÃO
  if (!regexNome.test(nome)) {
    feedback.style.color = "#ef4444";
    feedback.textContent = "❌ Digite um nome válido (mínimo 3 letras).";
    return;
  }

  if (!regexTelefone.test(telefone)) {
    feedback.style.color = "#ef4444";
    feedback.textContent = "❌ Telefone inválido. Use DDD + número (10 ou 11 dígitos).";
    return;
  }

  if (problema.length < 10) {
    feedback.style.color = "#ef4444";
    feedback.textContent = "❌ Descreva melhor o problema (mínimo 10 caracteres).";
    return;
  }

  feedback.textContent = "Enviando...";
  feedback.style.color = "#cbd5f5";

  try {
    console.log("🌐 Enviando fetch para o n8n...");
    const resposta = await fetch("https://n8n.junditech.com.br/webhook/e9ca83ba-8966-4b95-bc42-203c31b4324a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, telefone, problema }) // telefone = só números
    });

    console.log("resposta do servidor (status):", resposta.status);

    if (!resposta.ok) {
      throw new Error(`Erro no servidor: ${resposta.status}`);
    }

    console.log("✅ Sucesso! n8n recebeu os dados.");
    feedback.style.color = "#22c55e";
    feedback.textContent = "✅ Recebido! Em breve entrarei em contato.";
  } catch (erro) {
    console.error("❌ Erro na requisição:", erro);
    feedback.style.color = "#ef4444";
    feedback.textContent = "❌ Erro ao enviar. Tente novamente.";
  }
});