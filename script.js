async function fetchData() {
    console.log("el fetch se inicia");
    try {
        const response = await fetch('https://pythonserverwokwi-production.up.railway.app/get_data', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos: ' + response.statusText);
        }

        const data = await response.json();
        console.log("Datos obtenidos:", data);

        const tableBody = document.getElementById('ledData');
        tableBody.innerHTML = '';

        data.forEach(row => {
            const ledStatusText = row.led_status ? 'Encendido' : 'Apagado';
            const ledStatusColor = row.led_status ? 'led-on' : 'led-off'; // Clase para estado del LED
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.id}</td>
                <td>${new Date(row.timestamp).toLocaleString()}</td>
                <td class="${ledStatusColor}">${ledStatusText}</td> <!-- Aplicando la clase -->
            `;

            // Agregar evento de mouseover y mouseout para aplicar brillo
            tr.addEventListener('mouseover', () => {
                tr.querySelector('td').classList.add(ledStatusColor === 'led-on' ? 'blink-green' : 'blink-red');
            });
            tr.addEventListener('mouseout', () => {
                tr.querySelector('td').classList.remove('blink-green', 'blink-red');
            });

            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = fetchData;
