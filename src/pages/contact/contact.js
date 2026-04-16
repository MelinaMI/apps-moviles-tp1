import contactTemplate from './contact.html?raw'
import './contact.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LAT = -34.9215;
const LNG = -57.9536;

export function ContactPage() {
    const container = document.createElement('div');
    container.innerHTML = contactTemplate;
    requestAnimationFrame(initMap);
    return container;
}

function initMap() {
    const map = L.map('map').setView([LAT, LNG], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.marker([LAT, LNG])
        .addTo(map)
        .bindPopup('Catedral de La Plata')
        .openPopup();
}