var scale = 50; // Skala awal
var zoomLevel = 0.5; // Tingkat zoom awal
var previousCoordinates = { real: 0, imaginary: 0 }; // Koordinat diagram sebelumnya

function calculate() {
    var real1 = parseFloat(document.getElementById('real1').value);
    var imaginary1 = parseFloat(document.getElementById('imaginary1').value);
    var real2 = parseFloat(document.getElementById('real2').value);
    var imaginary2 = parseFloat(document.getElementById('imaginary2').value);
    var operation = document.getElementById('operation').value;
    var result;

    switch(operation) {
        case 'add':
            result = {
                real: real1 + real2,
                imaginary: imaginary1 + imaginary2
            };
            break;
        case 'subtract':
            result = {
                real: real1 - real2,
                imaginary: imaginary1 - imaginary2
            };
            break;
        case 'multiply':
            result = {
                real: (real1 * real2) - (imaginary1 * imaginary2),
                imaginary: (real1 * imaginary2) + (real2 * imaginary1)
            };
            break;
        case 'divide':
            var divisor = real2 * real2 + imaginary2 * imaginary2;
            result = {
                real: ((real1 * real2) + (imaginary1 * imaginary2)) / divisor,
                imaginary: ((real2 * imaginary1) - (real1 * imaginary2)) / divisor
            };
            break;
    }

    document.getElementById('result').innerText = 'Hasil: ' + result.real + ' + ' + result.imaginary + 'i';

    // Update previousCoordinates only when the calculation is performed
    previousCoordinates = result;

    drawArgandDiagram(result.real, result.imaginary);
}

function drawArgandDiagram(real, imaginary) {
    var canvas = document.getElementById('argandCanvas');
    var ctx = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Draw point representing complex number
    var x = centerX + real * scale * zoomLevel;
    var y = centerY - imaginary * scale * zoomLevel;

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Draw vector representing complex number
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    // Draw line from Y to XY
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - imaginary * scale * zoomLevel);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'green'; // You can change color here
    ctx.stroke();

    // Draw line from X to XY
    ctx.beginPath();
    ctx.moveTo(centerX + real * scale * zoomLevel, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'orange'; // You can change color here
    ctx.stroke();

    // Draw labels for axes
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('0', centerX, centerY + 15); // Label for origin (0, 0)
    ctx.fillText('Real', canvas.width - 10, centerY + 15); // Label for x-axis
    ctx.fillText('Imaginary', centerX, 15); // Label for y-axis

    // Draw labels for coordinates
    ctx.fillText('(' + real + ', ' + imaginary + ')', x, y - 10); // Label for complex number

    // Draw gridlines and labels
    var maxGrid = Math.ceil(10 / zoomLevel); // Menghitung jumlah garis grid yang harus digambar
    for (var i = 1; i <= maxGrid; i++) {
        // Draw gridlines on positive x-axis
        ctx.beginPath();
        ctx.moveTo(centerX + i * scale * zoomLevel, centerY - 5);
        ctx.lineTo(centerX + i * scale * zoomLevel, centerY + 5);
        ctx.strokeStyle = 'black';
        ctx.stroke();
       
        ctx.fillText(i, centerX + i * scale * zoomLevel, centerY + 15);
        
        ctx.beginPath();
        ctx.moveTo(centerX - i * scale * zoomLevel, centerY - 5);
        ctx.lineTo(centerX - i * scale * zoomLevel, centerY + 5);
        ctx.strokeStyle = 'black';
        ctx.stroke();
       
        ctx.fillText(-i, centerX - i * scale * zoomLevel, centerY + 15);
        
        ctx.beginPath();
        ctx.moveTo(centerX - 5, centerY - i * scale * zoomLevel);
        ctx.lineTo(centerX + 5, centerY - i * scale * zoomLevel);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        
        ctx.fillText(i, centerX + 15, centerY - i * scale * zoomLevel + 5);
       
        ctx.beginPath();
        ctx.moveTo(centerX - 5, centerY + i * scale * zoomLevel);
        ctx.lineTo(centerX + 5, centerY + i * scale * zoomLevel);
        ctx.strokeStyle = 'black';
        ctx.stroke();
       
        ctx.fillText(-i, centerX + 15, centerY + i * scale * zoomLevel + 5);
    }
}

function updateDiagram() {
    var real = parseFloat(document.getElementById('real1').value);
    var imaginary = parseFloat(document.getElementById('imaginary1').value);
    // drawArgandDiagram(real, imaginary); // Uncomment this line if real-time refresh is needed
}

function zoomIn() {
    zoomLevel *= 1.2; // Menambahkan zoom sebesar 10%
    var real = previousCoordinates.real;
    var imaginary = previousCoordinates.imaginary;
    drawArgandDiagram(real, imaginary);
}

function zoomOut() {
    zoomLevel /= 1.2; // Mengurangi zoom sebesar 10%
    var real = previousCoordinates.real;
    var imaginary = previousCoordinates.imaginary;
    drawArgandDiagram(real, imaginary);
}

function calculateAndDraw() {
    calculate();
    var real = previousCoordinates.real;
    var imaginary = previousCoordinates.imaginary;
    drawArgandDiagram(real, imaginary);
}

// Mendaftarkan event listener untuk tombol hitung, tombol zoom, dan input bilangan kompleks
document.getElementById('calculateBtn').addEventListener('click', calculateAndDraw);
document.getElementById('zoomInBtn').addEventListener('click', function() {
    zoomIn();
    var real = previousCoordinates.real;
    var imaginary = previousCoordinates.imaginary;
    drawArgandDiagram(real, imaginary);
});
document.getElementById('zoomOutBtn').addEventListener('click', function() {
    zoomOut();
    var real = previousCoordinates.real;
    var imaginary = previousCoordinates.imaginary;
    drawArgandDiagram(real, imaginary);
});
document.getElementById('real1').addEventListener('input', updateDiagram);
document.getElementById('imaginary1').addEventListener('input', updateDiagram);

const calculateBtn = document.getElementById('calculateBtn');

calculateBtn.addEventListener('click', (event) => {
  event.preventDefault();
  // Calculate the result here
});
