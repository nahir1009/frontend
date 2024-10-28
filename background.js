const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const shapes = [];
const shapeCount = 50; 

// Crear figuras aleatorias
for (let i = 0; i < shapeCount; i++) {
    const shapeType = Math.floor(Math.random() * 3); // 0: círculo, 1: cuadrado, 2: triángulo
    shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 5, 
        speedX: Math.random() * 3 - 1.5, 
        speedY: Math.random() * 3 - 1.5, 
        color: `hsl(${Math.random() * 360}, 100%, 50%)`, 
        type: shapeType // Guardar el tipo de figura
    });
}

function drawShape(shape) {
    ctx.fillStyle = shape.color;

    switch (shape.type) {
        case 0: // Círculo
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 1: // Cuadrado
            ctx.fillRect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
            break;
        case 2: // Triángulo
            ctx.beginPath();
            ctx.moveTo(shape.x, shape.y - shape.size);
            ctx.lineTo(shape.x - shape.size, shape.y + shape.size);
            ctx.lineTo(shape.x + shape.size, shape.y + shape.size);
            ctx.closePath();
            ctx.fill();
            break;
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    shapes.forEach(shape => {
        drawShape(shape); // Dibuja la figura
        shape.x += shape.speedX;
        shape.y += shape.speedY;

        if (shape.x + shape.size > canvas.width || shape.x - shape.size < 0) {
            shape.speedX *= -1;
        }
        if (shape.y + shape.size > canvas.height || shape.y - shape.size < 0) {
            shape.speedY *= -1;
        }
    });

    requestAnimationFrame(animate); // Llamar a la función de animación nuevamente
}

animate(); // Iniciar la animación

// Ajustar el canvas al redimensionar la ventana
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
