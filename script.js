const BASE_URL = 'https://serverwokwi.onrender.com';
const GET_DATA_PATH = '/get_data';
const tableBody = document.getElementById('ledData');
const refreshButton = document.getElementById('refreshButton');
const ledStatusChartCanvas = document.getElementById('ledStatusChart').getContext('2d');

let ledStatusChart;

// Configuración inicial del gráfico de estado de LEDs
const setupChart = () => {
    const data = {
        labels: ['Encendido', 'Apagado'],
        datasets: [{
            data: [0, 0],
            backgroundColor: ['rgb(0, 255, 0)', 'rgb(255, 0, 0)'], 
            hoverOffset: 4
        }]
    };

    ledStatusChart = new Chart(ledStatusChartCanvas, {
        type: 'doughnut',
        data: data
    });
};


const updateChart = (data) => {
    const onCount = data.filter(row => row.led_status).length;
    const offCount = data.length - onCount;

    ledStatusChart.data.datasets[0].data = [onCount, offCount];
    ledStatusChart.update();
};


const fetchLedData = async () => {
    const API_URL = `${BASE_URL}${GET_DATA_PATH}`;
    const FETCH_OPTIONS = { method: 'GET' };

    console.log("El fetch se inicia");
    try {
        const response = await fetch(API_URL, FETCH_OPTIONS);

        if (!response.ok) {
            throw new Error('Error al obtener los datos: ' + response.statusText);
        }

        const data = await response.json();
        console.log("Datos obtenidos:", data);

        renderTable(data);
        updateChart(data); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Función para renderizar la tabla de datos de LEDs
const renderTable = (data) => {
    tableBody.innerHTML = '';

    data.forEach(row => {
        const ledStatusText = row.led_status ? 'Encendido' : 'Apagado';
        const ledStatusColor = row.led_status ? 'led-on' : 'led-off';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${new Date(row.timestamp).toLocaleString()}</td>
            <td class="${ledStatusColor}">${ledStatusText}</td>
        `;

        tr.addEventListener('mouseover', () => {
            tr.querySelector('td').classList.add(ledStatusColor === 'led-on' ? 'blink-green' : 'blink-red');
        });

        tr.addEventListener('mouseout', () => {
            tr.querySelector('td').classList.remove('blink-green', 'blink-red');
        });

        tableBody.appendChild(tr);
    });
};


const main = () => {
    setupChart();
    window.onload = fetchLedData;
    refreshButton.addEventListener('click', (event) => {
        event.preventDefault();
        fetchLedData();
    });
};

main();
