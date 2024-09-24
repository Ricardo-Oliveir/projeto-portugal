document.addEventListener('DOMContentLoaded', function () {
    // Alternar modo escuro
    document.getElementById('darkModeToggle').addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Botão voltar para cima
    const backToTopBtn = document.getElementById("backToTopBtn");

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

    // Função para revelar elementos
    const observer = new IntersectionObserver((entries) => {
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
    hiddenElements.forEach((el) => observer.observe(el));

    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right');

    function reveal() {
        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 150) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal(); 

    function initAnimations() {
        const observer = new IntersectionObserver((entries) => {
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
            observer.observe(row);
        });
    }

    initAnimations();
});

// Inicializando o mapa com Leaflet.js
document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([38.736946, -9.142685], 13); // Lisboa, Portugal como ponto inicial

    // Adicionando o tile layer (camada visual) do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adicionando marcadores no mapa
    var markers = {
        'Lisboa': L.marker([38.736946, -9.142685]).bindPopup('Lisboa, Portugal').addTo(map),
        'Porto': L.marker([41.157944, -8.629105]).bindPopup('Porto, Portugal'),
        'Faro': L.marker([37.017963, -7.930834]).bindPopup('Faro, Portugal'),
        'Funchal': L.marker([32.666992, -16.924055]).bindPopup('Funchal, Madeira, Portugal')
    };

    // Adicionar evento de clique para os lugares da lista
    document.querySelectorAll('#place-list .list-group-item').forEach(function (item) {
        item.addEventListener('click', function () {
            var lat = parseFloat(this.getAttribute('data-lat'));
            var lng = parseFloat(this.getAttribute('data-lng'));

            map.setView([lat, lng], 13); // Centraliza o mapa no local clicado
            markers[this.textContent.trim()].addTo(map).openPopup(); // Mostra o marcador e o popup
        });
    });
});