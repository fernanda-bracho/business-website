//control interno para desarrolladora
console.log("menu.js se cargó");

document.addEventListener("DOMContentLoaded", () => {
  console.log(" DOM listo");

  const burger = document.getElementById("burger");
  const navMobile = document.getElementById("nav-mobile");

  console.log("burger:", burger);
  console.log("navMobile:", navMobile);

  if (!burger || !navMobile) {
    console.warn(" No encontré #burger o #nav-mobile en este HTML");
    return;
  }

  // Estilos inline (prevee codigo repetido en css)
  navMobile.style.position = "fixed";
  navMobile.style.left = "16px";
  navMobile.style.right = "16px";
  navMobile.style.top = "96px"; 
  navMobile.style.zIndex = "999999";
  navMobile.style.padding = "14px";
  navMobile.style.borderRadius = "20px";
  navMobile.style.background = "rgba(11,15,23,.95)";
  navMobile.style.border = "1px solid rgba(255,255,255,.16)";
  navMobile.style.backdropFilter = "blur(12px)";
  navMobile.style.boxShadow = "0 18px 60px rgba(0,0,0,.55)";
  navMobile.style.gap = "10px";

  navMobile.style.display = "none";

  navMobile.querySelectorAll("a").forEach(a => {
    a.style.display = "flex";
    a.style.justifyContent = "center";
    a.style.padding = "14px";
    a.style.borderRadius = "16px";
    a.style.textDecoration = "none";
    a.style.color = "rgba(255,255,255,.92)";
    a.style.background = "rgba(255,255,255,.04)";
    a.style.border = "1px solid rgba(255,255,255,.12)";
  });

  burger.addEventListener("click", () => {
    const abrir = navMobile.style.display === "none";

    burger.classList.toggle("burger--open", abrir);
    navMobile.classList.toggle("nav-mobile--open", abrir);

    navMobile.style.display = abrir ? "grid" : "none";

    console.log("🍔 Click burger. Menú abierto?", abrir);
  });

  navMobile.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      burger.classList.remove("burger--open");
      navMobile.classList.remove("nav-mobile--open");
      navMobile.style.display = "none";
      console.log("🔒 Menú cerrado por click en enlace.");
    });
  });
});
