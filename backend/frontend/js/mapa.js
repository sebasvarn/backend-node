document.addEventListener("DOMContentLoaded", () => {
  const pisoSelect = document.getElementById("pisoMapa");
  pisoSelect.addEventListener("change", () => {
    renderizarMapa(pisoSelect.value);
  });

  renderizarMapa(pisoSelect.value); // Carga inicial
});

async function renderizarMapa(piso) {
  const contenedor = document.getElementById("mapaHotel");
  contenedor.innerHTML = '';

  try {
    const res = await fetch(`http://localhost:3000/habitaciones/por-piso?hotelId=1&piso=${piso}`);
    const habitaciones = await res.json();

    habitaciones.forEach(h => {
      const div = document.createElement("div");
      div.className = "habitacion";
      div.style.gridColumn = h.posicionX;
      div.style.gridRow = h.posicionY;
      div.innerHTML = `
        <strong>${h.numero}</strong>
        <small>${h.capacidad} pax</small>
        <small>${h.caracteristicas || ''}</small>
      `;
      contenedor.appendChild(div);
    });

  } catch (error) {
    console.error("Error cargando habitaciones:", error);
    contenedor.innerHTML = '<div class="alert alert-danger">No se pudo cargar el mapa de habitaciones.</div>';
  }
}
