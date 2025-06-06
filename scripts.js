document.addEventListener('DOMContentLoaded', function () {
    // Alternar modo escuro
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon');
                icon.classList.toggle('fa-sun');
            }
        });
    }

    // Botão voltar para cima
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 100) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        backToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Função para revelar elementos com IntersectionObserver (para .hidden)
    const hiddenElementsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, {
        threshold: 0.1
    });
    
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => hiddenElementsObserver.observe(el));

    // Função para revelar elementos com scroll event (para .reveal-left, .reveal-right)
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right');
    function revealOnScroll() {
        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 150) {
                element.classList.add('active');
            }
        });
    }

    if (revealElements.length > 0) {
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Initial check
    }

    // Função para animar elementos .historia-row
    function initAnimations() {
        const historiaRowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.historia-row').forEach(row => {
            historiaRowObserver.observe(row);
        });
    }

    initAnimations(); // Call animation initialization

    // Inicializando o mapa com Leaflet.js (condicional)
    const mapElement = document.getElementById('map');
    if (mapElement) {
        var map = L.map('map').setView([38.736946, -9.142685], 13); // Lisboa as initial

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var markers = {}; // Initialize an empty markers object

        const placeListItems = document.querySelectorAll('#place-list .list-group-item');

        placeListItems.forEach(function (item) {
            const name = item.textContent.trim();
            const lat = parseFloat(item.getAttribute('data-lat'));
            const lng = parseFloat(item.getAttribute('data-lng'));

            if (!isNaN(lat) && !isNaN(lng)) { // Ensure lat/lng are valid numbers
                const marker = L.marker([lat, lng]).bindPopup(name + ', Portugal');
                marker.addTo(map); // Add marker to map immediately
                markers[name] = marker; // Store marker
            }
        });

        // Add event listener for clicking on place list items
        placeListItems.forEach(function (item) {
            item.addEventListener('click', function () {
                const name = this.textContent.trim();
                const lat = parseFloat(this.getAttribute('data-lat'));
                const lng = parseFloat(this.getAttribute('data-lng'));

                if (!isNaN(lat) && !isNaN(lng)) {
                    map.setView([lat, lng], 13); // Centraliza o mapa no local clicado
                    if (markers[name]) {
                        markers[name].openPopup(); // Mostra o popup do marcador existente
                    }
                }
            });
        });
    }
});