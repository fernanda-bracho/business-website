document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.getElementById("mapa-servicenter");
  if (!mapElement) return;

  const coordsGuadalajara =[20.666723011034293, -103.37468626218768];

  const centro = coordsGuadalajara;

  const mapa = L.map("mapa-servicenter", {
    center: centro,
    zoom: 14,           
    scrollWheelZoom: false
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapa);

  const ubicaciones = [
    {
      nombre: "Sucursal Guadalajara",
      coords: coordsGuadalajara,
      direccion: "Av. Niños Héroes No. 2285 int. 302, Col. Americana, Guadalajara, Jal.",
      googleLink:
        "https://www.google.com/maps/dir/?api=1&destination=20.66679328,-103.37469699"
    }
  ];

  ubicaciones.forEach((sucursal) => {
    const popupHTML = `
      <strong>${sucursal.nombre}</strong><br>
      <small>${sucursal.direccion}</small><br>
      <a href="${sucursal.googleLink}"
         target="_blank"
         rel="noopener noreferrer"
         class="popup-btn">
         Cómo llegar
      </a>
    `;

    L.marker(sucursal.coords)
      .addTo(mapa)
      .bindPopup(popupHTML);
  });

  const wrapper = document.getElementById("mapa-wrapper");

  if (wrapper) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Clase para animación CSS (fade/slide)
            wrapper.classList.add("mapa-visible");

            mapa.flyTo(centro, 14, {
              duration: 1.2
            });

            setTimeout(() => mapa.invalidateSize(), 500);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(wrapper);
  }
});
