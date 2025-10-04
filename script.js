// =============================
// Swiper do Header (banner principal)
// =============================
const swiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    pagination: { el: '.swiper-pagination', clickable: true },
    effect: 'slide',
});

// =============================
// Scroll entre seções com setas existentes no HTML
// =============================

// Seleciona todas as seções e elementos relevantes
const sections = [
    document.querySelector("body > div.w3-bar"), // Navbar
    document.querySelector("header"),
    document.getElementById("sobre-nos"),
    document.getElementById("servicos"),
    document.getElementById("clientes"),
    document.getElementById("contate-nos"),
    document.querySelector("footer") // Footer
];

let currentIndex = 0;

// Função de scroll suave com animação de deslizar
function scrollToSection(index) {
    if (index < 0) index = 0;
    if (index >= sections.length) index = sections.length - 1;

    let targetY;
    const targetSection = sections[index];

    // Se for navbar, vai para o topo
    if (targetSection.tagName.toLowerCase() === "div") {
        targetY = 0;
    } else {
        targetY = targetSection.offsetTop;
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 600; // duração em ms
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        // ease in-out
        const ease = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;
        window.scrollTo(0, startY + distance * ease);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
    currentIndex = index;
}

// Seleciona os botões existentes no HTML
const arrowUp = document.getElementById("up-btn");
const arrowDown = document.getElementById("down-btn");

// Adiciona eventos de clique
arrowUp.addEventListener("click", () => {
    scrollToSection(currentIndex - 1);
});

arrowDown.addEventListener("click", () => {
    scrollToSection(currentIndex + 1);
});

// Atualiza currentIndex ao fazer scroll manualmente
window.addEventListener("scroll", () => {
    let closestIndex = 0;
    let closestDistance = Infinity;
    sections.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
        }
    });
    currentIndex = closestIndex;
});

// =============================
// Animação dos títulos de seção
// =============================
document.addEventListener("DOMContentLoaded", function () {
    const titles = document.querySelectorAll(".section-title");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-line");
            } else {
                entry.target.classList.remove("animate-line");
            }
        });
    }, { threshold: 0.5 });

    titles.forEach(title => observer.observe(title));
});

// =============================
// Carrossel dos Serviços
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const servicos = document.querySelectorAll(".servicoSwiper");

  servicos.forEach(swiperEl => {
    new Swiper(swiperEl, {
      loop: false, // não fica girando infinito
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: swiperEl.querySelector(".swiper-button-next"),
        prevEl: swiperEl.querySelector(".swiper-button-prev"),
      },
      effect: 'slide',
      allowTouchMove: true, // arrastar no mouse/touch
      autoplay: false // NÃO passa sozinho
    });
  });
});

// =============================
// Esteira contínua de logos (clientes/parceiros)
// =============================
document.addEventListener("DOMContentLoaded", () => {
    const swiperEl = document.querySelector('.clientesSwiper .swiper-wrapper');
    const slides = swiperEl.children;

    // Clona slides até preencher bem a esteira
    const minSlides = 20; // número mínimo de repetições (pode ajustar)
    let count = slides.length;

    while (count < minSlides) {
        for (let i = 0; i < slides.length; i++) {
            const clone = slides[i].cloneNode(true);
            swiperEl.appendChild(clone);
            count++;
            if (count >= minSlides) break;
        }
    }

    new Swiper('.clientesSwiper', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 40,
        speed: 5000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        allowTouchMove: false,
    });
});
