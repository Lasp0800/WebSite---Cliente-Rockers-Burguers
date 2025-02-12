// Otimização de vídeo para mobile
function checkVideoSupport() {
    const video = document.getElementById('myVideo');
    
    // Verifica se é dispositivo móvel
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Em dispositivos móveis, carrega o vídeo apenas quando estiver visível
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            });
            
            observer.observe(video);
        }
    }
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Função para abrir o modal
function openMapModal() {
    const modal = document.getElementById('mapModal');
    if (modal) {
        modal.style.display = 'block';
        initMap(); // Inicializa o mapa quando o modal é aberto
    } else {
        console.error('Modal não encontrado.');
    }
}

// Função para fechar o modal
function closeMapModal() {
    const modal = document.getElementById('mapModal');
    if (modal) {
        modal.style.display = 'none';
    } else {
        console.error('Modal não encontrado.');
    }
}

// Adiciona evento de clique ao botão de localização
const localizacaoBtn = document.getElementById('localizacaoBtn');
if (localizacaoBtn) {
    localizacaoBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openMapModal();
    });
} else {
    console.error('Botão de localização não encontrado.');
}

// Adiciona evento de clique para fechar o modal
const closeBtn = document.querySelector('.close');
if (closeBtn) {
    closeBtn.addEventListener('click', closeMapModal);
} else {
    console.error('Botão de fechar modal não encontrado.');
}

// Função para inicializar o mapa
function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const storeLocation = {
                lat: -3.0333721890231664, // Latitude da loja
                lng: -59.96564597407367   // Longitude da loja
            };

            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: userLocation
            });

            // Marcador da localização do usuário
            new google.maps.Marker({
                position: userLocation,
                map: map,
                title: 'Sua Localização'
            });

            // Marcador da localização da loja
            new google.maps.Marker({
                position: storeLocation,
                map: map,
                title: 'Localização da Loja'
            });

            // Configuração da rota
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);

            const request = {
                origin: userLocation,
                destination: storeLocation,
                travelMode: 'DRIVING'
            };

            directionsService.route(request, function (result, status) {
                if (status === 'OK') {
                    directionsRenderer.setDirections(result);
                } else {
                    alert('Não foi possível calcular a rota.');
                }
            });
        }, function () {
            alert('Não foi possível obter sua localização.');
        });
    } else {
        alert('Geolocalização não é suportada pelo seu navegador.');
    }
}

// Carrega a API do Google Maps
function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8nFKyiW4h-HZeytS6mTSzqRT6SlUg8N8&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);
}

// Carrega o script do Google Maps quando a página é carregada
window.onload = function () {
    checkVideoSupport();
    loadGoogleMapsScript();
};