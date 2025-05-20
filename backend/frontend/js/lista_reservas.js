document.getElementById('filtroForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const hotelId = document.getElementById('hotelId').value;
  const fechaEntrada = document.getElementById('fechaEntrada').value;
  const fechaSalida = document.getElementById('fechaSalida').value;
  const clienteId = document.getElementById('clienteId').value;

  let query = `?hotelId=${hotelId}&fechaIngreso=${fechaEntrada}`;
  if (fechaSalida) query += `&fechaSalida=${fechaSalida}`;
  if (clienteId) query += `&clienteId=${clienteId}`;

  const res = await fetch(`http://localhost:3000/reservas${query}`);
  const reservas = await res.json();

  const div = document.getElementById('tablaReservas');
  div.innerHTML = '';

  if (!reservas.length) {
    div.innerHTML = '<div class="alert alert-warning">No se encontraron reservas.</div>';
    return;
  }

  const tabla = document.createElement('table');
  tabla.className = 'table table-bordered';
  tabla.innerHTML = `
    <thead>
      <tr>
        <th>Hotel</th>
        <th>Habitación</th>
        <th>Piso</th>
        <th>Cliente</th>
        <th>Fecha Ingreso</th>
        <th>Fecha Salida</th>
        <th>Cant. Personas</th>
      </tr>
    </thead>
    <tbody>
      ${reservas.map(r => `
        <tr>
          <td>${r.hotelReserva.nombre}</td>
          <td>${r.habitacion.numero}</td>
          <td>${r.habitacion.piso}</td>
          <td>${r.cliente.nombre} ${r.cliente.apellido}</td>
          <td>${r.fechaIngreso}</td>
          <td>${r.fechaSalida}</td>
          <td>${r.cantidadPersonas || '-'}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
  div.appendChild(tabla);
});
