document.getElementById('busquedaForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const ingreso = document.getElementById('fechaIngreso').value;
  const salida = document.getElementById('fechaSalida').value;
  const capacidad = document.getElementById('capacidad').value;

  let query = `?fecha_ingreso=${ingreso}&fecha_salida=${salida}`;
  if (capacidad) query += `&capacidad=${capacidad}`;

  const response = await fetch(`http://localhost:3000/reservas/disponibles${query}`);
  const habitaciones = await response.json();

  const resultados = document.getElementById('resultados');
  resultados.innerHTML = '';

  if (!habitaciones.length) {
    resultados.innerHTML = '<div class="alert alert-warning">No se encontraron habitaciones disponibles.</div>';
    return;
  }

  habitaciones.forEach(h => {
    const div = document.createElement('div');
    div.className = 'col-md-4 mb-3';
    div.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Hotel: ${h.hotel.nombre}</h5>
          <p>Habitación ${h.numero} - Piso: ${h.piso}</p>
          <p>Capacidad: ${h.capacidad}</p>
          <p>${h.caracteristicas}</p>
          <button class="btn btn-success reservar-btn" data-id="${h.id}" data-hotel-id="${h.hotelId}">Reservar</button>
        </div>
      </div>
    `;
    resultados.appendChild(div);
  });
});

document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('reservar-btn')) {
    const idHabitacion = e.target.dataset.id;
    const hotelId = e.target.dataset.hotelId;
    const fechaIngreso = document.getElementById('fechaIngreso').value;
    const fechaSalida = document.getElementById('fechaSalida').value;
    const capacidad = document.getElementById('capacidad').value;

    document.getElementById('habitacionId').value = idHabitacion;
    document.getElementById('hotelId').value = hotelId;
    document.getElementById('fechaIngresoModal').value = fechaIngreso;
    document.getElementById('fechaSalidaModal').value = fechaSalida;
    document.getElementById('capacidadModal').value = capacidad;

    document.getElementById('cedula').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('datosCliente').style.display = 'none';

    const modal = new bootstrap.Modal(document.getElementById('modalReserva'));
    modal.show();
  }
});

document.getElementById('cedula').addEventListener('blur', async () => {
  const cedula = document.getElementById('cedula').value;
  if (!cedula) return;

  const res = await fetch(`http://localhost:3000/clientes/${cedula}`);
  const datos = await res.json();

  const datosDiv = document.getElementById('datosCliente');

  if (res.status === 200) {
    document.getElementById('nombre').value = datos.nombre;
    document.getElementById('apellido').value = datos.apellido;
    datosDiv.style.display = 'none';
  } else {
    datosDiv.style.display = 'block';
  }
});

document.getElementById('formReserva').addEventListener('submit', async (e) => {
  e.preventDefault();

  const cedula = document.getElementById('cedula').value;
  let cliente = await fetch(`http://localhost:3000/clientes/${cedula}`);
  let clienteData;

  if (cliente.status === 200) {
    clienteData = await cliente.json();
  } else {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const nuevoCliente = await fetch('http://localhost:3000/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cedula, nombre, apellido })
    });
    clienteData = await nuevoCliente.json();
  }

  const reserva = {
    hotelId: document.getElementById('hotelId').value,
    habitacionId: document.getElementById('habitacionId').value,
    clienteId: clienteData.id,
    fechaIngreso: document.getElementById('fechaIngresoModal').value,
    fechaSalida: document.getElementById('fechaSalidaModal').value,
    cantidadPersonas: document.getElementById('capacidadModal').value || null
  };

  await fetch('http://localhost:3000/reservas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reserva)
  });

  alert('Reserva realizada con éxito');
  bootstrap.Modal.getInstance(document.getElementById('modalReserva')).hide();
});
