document.addEventListener('DOMContentLoaded', () => {
    const startDiv = document.querySelector('.start');
    const buttons = document.querySelectorAll('.btn-hide');
    const allCards = document.querySelectorAll('.div-card');
    const outputDiv = document.querySelector('.content-output'); // La div où les infos iront

    // Animation de la div "start" et affichage progressif des boutons
    startDiv.addEventListener('click', () => {
        startDiv.classList.add('move-left');
        buttons.forEach((button, index) => {
            setTimeout(() => {
                button.style.display = 'block'; // Afficher chaque bouton progressivement
            }, index * 500);
        });
    });

    // Fonction pour récupérer les informations du monument via l'API Wikipedia
    function fetchMonumentInfo(monument, monumentLeaflet) {
        const apiUrl = `https://fr.wikipedia.org/api/rest_v1/page/summary/${monument}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const title = data.title;
                const summary = data.extract;

                // Vider la div .content-output et y ajouter les infos du monument
                outputDiv.innerHTML = ''; 

                const infoDiv = document.createElement('div');
                infoDiv.classList.add('info-card');
                infoDiv.innerHTML = `
                    <h2>${title}</h2>
                    <p>${summary}</p>
                `;
                outputDiv.appendChild(infoDiv);

                // Appeler la fonction pour afficher la carte dans la div .start
                addLeafletMap(monumentLeaflet, title);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
    }

    // Fonction pour ajouter une carte Leaflet avec la localisation du monument
    function addLeafletMap(monument, title) {
        const locationData = {
            'Tour_Eiffel': { lat: 48.8584, lng: 2.2945 },
            'Arc_de_Triomphe': { lat: 48.8738, lng: 2.295 },
            'Mont_Saint_Michel': { lat: 48.636, lng: -1.5115 },
            'Château_de_Versailles': { lat: 48.8049, lng: 2.1204 },
            'Notre_Dame_de_Paris': { lat: 48.8529, lng: 2.3499 }
        };

        const location = locationData[monument];
        if (location) {
            // Initialiser la carte dans la div #leaflet-map
            startDiv.innerHTML = ''; // Vider la div start
            const mapDiv = document.createElement('div');
            mapDiv.id = 'leaflet-map';
            mapDiv.style.width = '100%';
            mapDiv.style.height = '150px';
            startDiv.appendChild(mapDiv);

            // Initialisation de Leaflet
            const map = L.map('leaflet-map').setView([location.lat, location.lng], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([location.lat, location.lng]).addTo(map)
                // .bindPopup(`<b>${title}</b><br>Latitude: ${location.lat}, Longitude: ${location.lng}`)
                .openPopup();
        }
    }

    // Ajout d'événement de clic pour chaque bouton afin d'afficher les infos dans .content-output et la carte dans .start
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            allCards.forEach(card => {
                card.classList.add('filter');
            });

            const correspondingCard = document.querySelector(`.${button.classList[1].split('-')[1]}`);
            if (correspondingCard) {
                correspondingCard.classList.remove('filter');
            }

            // Récupérer le nom du monument pour l'API Wikipedia et Leaflet
            const monumentNameForWikipedia = button.textContent.trim();
            const monumentNameForLeaflet = button.getAttribute('data-monument');

            // Appeler la fonction pour récupérer les informations du monument et afficher la carte
            fetchMonumentInfo(monumentNameForWikipedia, monumentNameForLeaflet);
        });
    });
});
