document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const revealElements = document.querySelectorAll(".reveal");
    const sections = document.querySelectorAll("section[id]");
    const ctaButton = document.querySelector(".hero-main-cta");

    const form = document.getElementById("demoForm");
    const botaoEnviar = document.getElementById("enviarDemo");
    const feedback = document.getElementById("feedback");
    const telefoneInput = document.getElementById("telefone");
    const nomeInput = document.getElementById("nome");
    const problemaInput = document.getElementById("problema");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isActive = navMenu.classList.toggle("active");
            navToggle.setAttribute("aria-expanded", String(isActive));
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (!href || href === "#") return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (navToggle) {
                navToggle.setAttribute("aria-expanded", "false");
            }

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    const typingElement = document.querySelector(".typing");
    if (typingElement) {
        const text = typingElement.textContent.trim();
        typingElement.textContent = "";
        let index = 0;

        function typeEffect() {
            if (index < text.length) {
                typingElement.textContent += text[index];
                index++;
                setTimeout(typeEffect, 38);
            }
        }

        setTimeout(typeEffect, 350);
    }

    if (telefoneInput) {
        telefoneInput.addEventListener("input", function () {
            let numero = this.value.replace(/\D/g, "");

            if (numero.length > 11) {
                numero = numero.slice(0, 11);
            }

            if (numero.length > 6) {
                this.value = numero.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
            } else if (numero.length > 2) {
                this.value = numero.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
            } else {
                this.value = numero;
            }
        });
    }

    function revealOnScroll() {
        const triggerBottom = window.innerHeight * 0.88;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                el.classList.add("active");
            }
        });
    }

    function updateNavbar() {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    function updateActiveSection() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const id = section.getAttribute("id");
            const link = document.querySelector(`.nav-menu a[href="#${id}"]`);
            if (!link) return;

            if (
                scrollPos >= section.offsetTop &&
                scrollPos < section.offsetTop + section.offsetHeight
            ) {
                document.querySelectorAll(".nav-menu a").forEach(a => a.classList.remove("active"));
                link.classList.add("active");
            }
        });
    }

    function updateHeroButtonText() {
        if (!ctaButton) return;

        if (window.scrollY > 320) {
            ctaButton.textContent = "💬 Vamos conversar";
        } else {
            ctaButton.textContent = "💬 Falar comigo";
        }
    }

    function handleScrollEffects() {
        revealOnScroll();
        updateNavbar();
        updateActiveSection();
        updateHeroButtonText();
    }

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScrollEffects();
                ticking = false;
            });
            ticking = true;
        }
    });

    handleScrollEffects();

    function setFeedback(message, type = "default") {
        if (!feedback) return;

        feedback.textContent = message;

        if (type === "success") {
            feedback.style.color = "#22c55e";
        } else if (type === "error") {
            feedback.style.color = "#ef4444";
        } else {
            feedback.style.color = "#cbd5e1";
        }
    }

    if (form && botaoEnviar && nomeInput && telefoneInput && problemaInput) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nome = nomeInput.value.trim();
            const telefone = telefoneInput.value.replace(/\D/g, "");
            const problema = problemaInput.value.trim();

            const regexNome = /^[A-Za-zÀ-ÿ\s'-]{3,}$/;
            const regexTelefone = /^[0-9]{10,11}$/;

            if (!regexNome.test(nome)) {
                setFeedback("❌ Digite um nome válido com pelo menos 3 letras.", "error");
                return;
            }

            if (!regexTelefone.test(telefone)) {
                setFeedback("❌ Telefone inválido. Use DDD + número com 10 ou 11 dígitos.", "error");
                return;
            }

            if (problema.length < 10) {
                setFeedback("❌ Descreva melhor o problema com pelo menos 10 caracteres.", "error");
                return;
            }

            botaoEnviar.disabled = true;
            botaoEnviar.textContent = "Enviando...";
            setFeedback("Enviando sua solicitação...", "default");

            try {
                const resposta = await fetch("https://n8n.junditech.com.br/webhook/e9ca83ba-8966-4b95-bc42-203c31b4324a", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nome,
                        telefone,
                        problema
                    })
                });

                if (!resposta.ok) {
                    const erroTexto = await resposta.text();
                    throw new Error(`Erro ${resposta.status}: ${erroTexto}`);
                }

                setFeedback("✅ Recebido! Em breve entrarei em contato.", "success");
                form.reset();
            } catch (erro) {
                console.error("Erro ao enviar formulário:", erro);
                setFeedback("❌ Erro ao enviar. Tente novamente em instantes.", "error");
            } finally {
                botaoEnviar.disabled = false;
                botaoEnviar.textContent = "Enviar";
            }
        });
    }

    const showcase = document.getElementById("serviceShowcase");
    const prevBtn = document.getElementById("showcasePrev");
    const nextBtn = document.getElementById("showcaseNext");
    const slides = document.querySelectorAll(".showcase-slide");
    const texts = document.querySelectorAll(".showcase-text");
    const dotsContainer = document.getElementById("showcaseDots");

    if (showcase && prevBtn && nextBtn && slides.length && texts.length && dotsContainer) {
        let currentIndex = 0;
        let interval = null;

        slides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.classList.add("showcase-dot");
            dot.type = "button";
            dot.setAttribute("aria-label", `Ir para o serviço ${index + 1}`);

            if (index === 0) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {
                goToSlide(index);
                restartAutoplay();
            });

            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll(".showcase-dot");

        function updateSlides() {
            slides.forEach((slide, index) => {
                slide.classList.toggle("active", index === currentIndex);

                const video = slide.querySelector("video");
                if (video) {
                    if (index === currentIndex) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                        video.currentTime = 0;
                    }
                }
            });

            texts.forEach((text, index) => {
                text.classList.toggle("active", index === currentIndex);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle("active", index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = (index + slides.length) % slides.length;
            updateSlides();
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startAutoplay() {
            stopAutoplay();
            interval = setInterval(nextSlide, 6000);
        }

        function stopAutoplay() {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        }

        function restartAutoplay() {
            startAutoplay();
        }

        prevBtn.addEventListener("click", () => {
            prevSlide();
            restartAutoplay();
        });

        nextBtn.addEventListener("click", () => {
            nextSlide();
            restartAutoplay();
        });

        showcase.addEventListener("mouseenter", stopAutoplay);
        showcase.addEventListener("mouseleave", startAutoplay);

        updateSlides();
        startAutoplay();
    }
});