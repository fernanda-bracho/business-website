const proyectos = [
  {
    titulo: "Mantenimiento eléctrico industrial",
    descripcion:
      "Modernización de tablero principal, canalizaciones y sistema de iluminación eficiente para naves industriales.",
    imagen: "img/mantenimiento-electrico.jpg"
  },
  {
    titulo: "Instalación de equipos de arranque para motores",
    descripcion:
      "Instalación y ajuste de contactores, arrancadores suaves y variadores de frecuencia para motores.",
    imagen: "img/arranque-motores.jpg"
  },
  {
    titulo: "Mantenimiento de control de motores",
    descripcion:
      "Diagnóstico y mantenimiento de circuitos de control, protecciones, sensores y cableado asociado.",
    imagen: "img/control-motores.jpg"
  },
  {
    titulo: "Embobinado, limpieza y pintura de motores",
    descripcion:
      "Reparación completa de motores eléctricos, embobinado, limpieza profunda y protección anticorrosiva.",
    imagen: "img/limpieza-motores.jpg"
  },
  {
    titulo: "Instalaciones eléctricas de media y baja tensión",
    descripcion:
      "Diseño e instalación de redes a 110V, 220V y 440V para industria, comercio y servicios.",
    imagen: "img/instalacion-electrica.jpeg"
  }
];


document.addEventListener("DOMContentLoaded", () => {
  const seccionServicios = document.querySelector(".seccion-servicios");
  if (!seccionServicios) return; // solo corre en servicios.html

  const img = document.getElementById("proyecto-imagen");
  const titulo = document.getElementById("proyecto-titulo");
  const descripcion = document.getElementById("proyecto-descripcion");
  const tabs = document.querySelectorAll(".tab-proyecto");
  const tabsContainer = document.querySelector(".proyectos-tabs");

  if (!img || !titulo || !descripcion || tabs.length === 0 || !tabsContainer) {
    return;
  }

  function actualizarBarraActiva(index) {
    const tabActiva = tabs[index];
    if (!tabActiva) return;

    const rectTabs = tabsContainer.getBoundingClientRect();
    const rectTab = tabActiva.getBoundingClientRect();

    const left = rectTab.left - rectTabs.left;
    const width = rectTab.width;

    tabsContainer.style.setProperty("--underline-left", `${left}px`);
    tabsContainer.style.setProperty("--underline-width", `${width}px`);
  }

  function mostrarProyecto(index) {
    const p = proyectos[index];
    if (!p) return;

    img.src = p.imagen;
    img.alt = p.titulo;
    titulo.textContent = p.titulo;
    descripcion.textContent = p.descripcion;

    // activar tab
    tabs.forEach(t => t.classList.remove("active"));
    if (tabs[index]) {
      tabs[index].classList.add("active");
    }

    // mover barra amarilla
    actualizarBarraActiva(index);
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const index = parseInt(tab.dataset.proyecto, 10);
      mostrarProyecto(index);
    });
  });

  window.addEventListener("resize", () => {
    const activeTab = document.querySelector(".tab-proyecto.active");
    if (!activeTab) return;
    const index = parseInt(activeTab.dataset.proyecto, 10);
    actualizarBarraActiva(index);
  });

  mostrarProyecto(0);
});