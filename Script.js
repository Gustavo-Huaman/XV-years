/* =========================================================
   INVITACIÓN XV AÑOS - ZAÍRA BELÉN
   ========================================================= */

const EVENT_DATE = new Date('2026-10-10T14:00:00');

document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       CONTROL DE AUDIO
       ===================================================== */
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const volumeControl = document.getElementById('volumeControl');

    function playAudio() {
        if (!bgMusic) return;
        bgMusic.play().then(() => {
            if (musicIcon) musicIcon.textContent = '❚❚';
            if (musicToggle) musicToggle.classList.add('playing');
        }).catch(err => {
            console.log('Error o restricción al reproducir el audio:', err);
        });
    }

    function toggleAudio() {
        if (!bgMusic) return;
        if (bgMusic.paused) {
            playAudio();
        } else {
            bgMusic.pause();
            if (musicIcon) musicIcon.textContent = '▶';
            if (musicToggle) musicToggle.classList.remove('playing');
        }
    }

    if (musicToggle) {
        musicToggle.addEventListener('click', toggleAudio);
    }

    if (volumeControl && bgMusic) {
        bgMusic.volume = volumeControl.value;
        volumeControl.addEventListener('input', (e) => {
            bgMusic.volume = e.target.value;
        });
    }

    /* =====================================================
       PORTADA / CARTA DE BIENVENIDA (INTERACTIVA)
       ===================================================== */

    const welcomeScreen = document.getElementById('welcomeScreen');
    const welcomeCard = document.getElementById('welcomeCard');
    const openButton = document.getElementById('openButton');

    let invitationOpened = false;

    function openInvitation(){
        if(invitationOpened || !welcomeScreen) return;

        invitationOpened = true;

        // Inicia la música de fondo al abrir el contenido
        playAudio();

        welcomeScreen.classList.add('opening');
        document.body.classList.remove('cover-active');

        setTimeout(() => {
            welcomeScreen.style.display = 'none';

            // Lleva al inicio del contenido principal
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
        }, 800);
    }

    if(welcomeCard) {
        // Clic en la tarjeta, foto o bordes
        welcomeCard.addEventListener('click', openInvitation);
        welcomeCard.addEventListener('touchstart', openInvitation, {passive: true});

        // Interacción con teclado (Enter, Espacio, Escape)
        document.addEventListener('keydown', (event) => {
            if (!invitationOpened && (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape')) {
                event.preventDefault();
                openInvitation();
            }
        });
    }

    if(openButton) {
        openButton.addEventListener('click', (event) => {
            event.stopPropagation();
            openInvitation();
        });
    }


    /* =====================================================
       MENÚ MÓVIL
       ===================================================== */

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if(navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded','false');
            });
        });
    }


    /* =====================================================
       CUENTA REGRESIVA FLOTANTE
       ===================================================== */

    const countdownFollower = document.getElementById('countdownFollower');
    const heroSection = document.getElementById('inicio');

    function updateCountdown(){
        const now = new Date();
        const difference = EVENT_DATE - now;

        const fdDays = document.getElementById('fd-days');
        const fdHours = document.getElementById('fd-hours');
        const fdMin = document.getElementById('fd-min');
        const fdSec = document.getElementById('fd-sec');

        if(!fdDays) return;

        if(difference <= 0){
            fdDays.textContent = '00';
            fdHours.textContent = '00';
            fdMin.textContent = '00';
            fdSec.textContent = '00';
            if(countdownFollower) countdownFollower.querySelector('.follower-label').textContent = 'Hoy es el gran día';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        fdDays.textContent = String(days).padStart(2,'0');
        fdHours.textContent = String(hours).padStart(2,'0');
        fdMin.textContent = String(minutes).padStart(2,'0');
        fdSec.textContent = String(seconds).padStart(2,'0');
    }

    function updateFollowerVisibility(){
        if(!countdownFollower || !heroSection) return;

        if(document.body.classList.contains('cover-active')){
            countdownFollower.classList.remove('visible');
            return;
        }

        const threshold = Math.max(120, heroSection.offsetHeight * 0.35);
        countdownFollower.classList.toggle('visible', window.scrollY > threshold);
    }

    updateCountdown();
    setInterval(updateCountdown,1000);
    window.addEventListener('scroll', updateFollowerVisibility, {passive:true});
    updateFollowerVisibility();


    /* =====================================================
       ANIMACIÓN DE SECCIONES AL HACER SCROLL
       ===================================================== */

    const revealElements = document.querySelectorAll('.reveal');

    if('IntersectionObserver' in window){
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if(entry.isIntersecting){
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold:.15 }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add('visible');
        });
    }


    /* =====================================================
       PÉTALOS
       ===================================================== */

    function createPetal(){
        const container = document.getElementById('petals');
        if(!container) return;

        const petal = document.createElement('div');
        petal.className = 'petal';

        const size = 7 + Math.random() * 7;
        const duration = 9 + Math.random() * 9;
        const delay = Math.random() * 8;

        petal.style.left = Math.random() * 100 + '%';
        petal.style.width = size + 'px';
        petal.style.height = size * 1.35 + 'px';
        petal.style.opacity = document.body.classList.contains('cover-active') ? .22 + Math.random() * .25 : .13 + Math.random() * .18;
        petal.style.animationDuration = duration + 's';
        petal.style.animationDelay = delay + 's';

        container.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        },(duration + delay) * 1000 + 1000);
    }

    for(let i = 0; i < 28; i++){ createPetal(); }

    function schedulePetal(){
        createPetal();
        const frequency = document.body.classList.contains('cover-active') ? 230 : 600;
        setTimeout(schedulePetal, frequency);
    }
    schedulePetal();

});