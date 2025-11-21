// =============================
// Swiper do Header (banner principal)
// =============================
const headerSwiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    navigation: {
        nextEl: '.mySwiper .swiper-button-next',
        prevEl: '.mySwiper .swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    effect: 'slide',
});

// =============================
// Scroll entre seções com setas existentes no HTML
// =============================
const sections = [
    document.querySelector("header"),
    document.getElementById("sobre-nos"),
    document.getElementById("servicos"),
    document.getElementById("beneficios"),
    document.getElementById("clientes"),
    document.getElementById("contate-nos"),
    document.querySelector("footer")
];

let currentIndex = 0;
const navbarHeight = 70;

function scrollToSection(index) {
    if (index < 0) index = 0;
    if (index >= sections.length) index = sections.length - 1;
    const targetSection = sections[index];
    let targetY = targetSection.offsetTop - navbarHeight;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 600;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
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

const arrowUp = document.getElementById("up-btn");
const arrowDown = document.getElementById("down-btn");

if (arrowUp && arrowDown) {
    arrowUp.addEventListener("click", () => scrollToSection(currentIndex - 1));
    arrowDown.addEventListener("click", () => scrollToSection(currentIndex + 1));
}

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
            if (entry.isIntersecting)
                entry.target.classList.add("animate-line");
            else
                entry.target.classList.remove("animate-line");
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
        const nextButton = swiperEl.querySelector(".swiper-button-next");
        const prevButton = swiperEl.querySelector(".swiper-button-prev");
        new Swiper(swiperEl, {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: nextButton && prevButton ? {
                nextEl: nextButton,
                prevEl: prevButton,
            } : {},
            effect: 'slide',
            allowTouchMove: true,
            autoplay: false
        });
    });
});

// =============================
// Swiper de Benefícios
// =============================
const beneficiosSwiper = new Swiper('.beneficios-slider', {
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false
  },
  speed: 3000,
  effect: 'slide',
  navigation: false,
  pagination: false
});

// =============================
// Animação da setinha entre itens de benefício
// =============================
const beneficioItems = document.querySelectorAll('.beneficio-item');
const container = document.querySelector('.beneficios-text-content');

if (beneficioItems.length > 0) {
  const seta = document.createElement('span');
  seta.classList.add('seta-animada');
  seta.textContent = '>';
  container.appendChild(seta);

  let activeIndex = 0;

  function moverSeta() {
    beneficioItems.forEach(item => item.classList.remove('active'));

    const currentItem = beneficioItems[activeIndex];
    currentItem.classList.add('active');

    const topPos = currentItem.offsetTop;
    seta.style.top = `${topPos}px`;

    activeIndex = (activeIndex + 1) % beneficioItems.length;
  }

  moverSeta();
  delay = 300;
  setInterval(moverSeta, 3000);
}

// =============================
// Esteira contínua de logos (clientes/parceiros)
// =============================
document.addEventListener("DOMContentLoaded", () => {
    const swiperEl = document.querySelector('.clientesSwiper .swiper-wrapper');
    const slides = swiperEl.children;

    const minSlides = 20;
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
            disableOnInteraction: true,
        },
        allowTouchMove: true,
    });
});

// =============================
// Scroll com offset para botões "Mais" e WhatsApp
// =============================
document.addEventListener("DOMContentLoaded", () => {
    const contateNosSection = document.getElementById("contate-nos");
    const whatsappBtn = document.querySelector(".navbar-end a[href='#contate-nos']");
    const maisBtn = document.querySelector("#servicos .w3-third:last-child a[href='#contate-nos']");

    [whatsappBtn, maisBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                scrollToSectionOffset(contateNosSection);
            });
        }
    });

    function scrollToSectionOffset(targetElement) {
        const targetY = targetElement.offsetTop - navbarHeight;
        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = 600;
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;
            window.scrollTo(0, startY + distance * ease);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        requestAnimationFrame(animation);
    }
});
