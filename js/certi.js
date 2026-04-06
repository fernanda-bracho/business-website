// ====== Certificaciones: filtros + búsqueda + modal ======

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const pills = Array.from(document.querySelectorAll(".pill"));
  const cards = Array.from(document.querySelectorAll(".card"));

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal__panel" role="dialog" aria-modal="true">
      <div class="modal__header">
        <p class="modal__title" id="modalTitle">Certificación</p>
        <button class="modal__close" id="closeModal" type="button">Cerrar ✕</button>
      </div>
      <div class="modal__body">
        <img id="modalImg" src="" alt="Certificación ampliada">
      </div>
      <div class="modal__desc" id="modalDesc"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("#modalImg");
  const modalTitle = modal.querySelector("#modalTitle");
  const modalDesc = modal.querySelector("#modalDesc");
  const closeModalBtn = modal.querySelector("#closeModal");

  function openModal({ img, title, desc }) {
    modalImg.src = img;
    modalTitle.textContent = title || "Certificación";
    modalDesc.textContent = desc || "";
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modalImg.src = "";
    document.body.style.overflow = "";
  }

  closeModalBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // ---------- FILTROS + BÚSQUEDA ----------
  let activeFilter = "all";

  function cardMatchesFilter(card) {
    if (activeFilter === "all") return true;
    const tags = (card.dataset.tags || "")
      .toLowerCase()
      .split(" ")
      .map(t => t.trim())
      .filter(Boolean);
    return tags.includes(activeFilter);
  }

  function cardMatchesSearch(card) {
    const q = (searchInput?.value || "").trim().toLowerCase();
    if (!q) return true;

    const title = (card.querySelector("h3")?.textContent || "").toLowerCase();
    const desc = (card.querySelector(".meta p")?.textContent || "").toLowerCase();
    const tags = (card.dataset.tags || "").toLowerCase();

    return title.includes(q) || desc.includes(q) || tags.includes(q);
  }

  function applyFilters() {
    cards.forEach(card => {
      const show = cardMatchesFilter(card) && cardMatchesSearch(card);
      card.style.display = show ? "" : "none";
    });
  }

  // Pills
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeFilter = (pill.dataset.filter || "all").toLowerCase();
      applyFilters();
    });
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  // ---------- CLICK EN TARJETA => ABRIR MODAL ----------
  cards.forEach(card => {
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      const imgEl = card.querySelector("img");
      const title = card.querySelector("h3")?.textContent?.trim() || "Certificación";
      const desc = card.querySelector(".meta p")?.textContent?.trim() || "";

      if (!imgEl || !imgEl.getAttribute("src")) return;

      openModal({
        img: imgEl.getAttribute("src"),
        title,
        desc
      });
    });
  });

  applyFilters();
});
