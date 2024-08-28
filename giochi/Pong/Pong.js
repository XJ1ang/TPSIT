const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let posx=0,posy=0, pallina_x=0, pallina_y=-1;
let p1 = 0;
let isDragging = false;
let lastX = 0;
let velocity = 0;

function resizeCanvas() {
    if( window.innerWidth < 500 && window.innerHeight<900 )
    {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
    }
    else{
        canvas.width = 500;
        canvas.height = 900;
    }

}

window.addEventListener('resize', resizeCanvas); // resize viene attivato ogni volta che windows viene ridimensionato

resizeCanvas();

const cellSize = 10; // Dimensione di ogni cella della griglia


const checkRimbalzo = () => {
    if (pallina.some(item => barraBlue.includes(item))) {
        pallina_x = Math.random() * 10 - 5 ;
        pallina_y = 1;
    }
    if (pallina.some(item => barraSU.includes(item))) {
        pallina_x = Math.random() * 10 - 5;
        pallina_y = -1;
    }
    if (pallina.some(item => barraDestra.includes(item))) {
        pallina_x = -pallina_x

    }
    if (pallina.some(item => barraSinistra.includes(item))) {
        pallina_x = -pallina_x

    }

    if (pallina.some(item => barraGiu.includes(item))) {
        // Reset ball position and velocity
        posx = 0;
        posy = 0;
        pallina_x = 0;
        pallina_y = -1;
        p1=0;
    }
}


const idxToCoords = (idx) => {
    const cols = Math.floor(canvas.width / cellSize);
    return { r: cellSize * Math.floor(idx / cols), c: cellSize * (idx % cols) };
}

const coordsToIdx = (r, c) => {
    const cols = Math.floor(canvas.width / cellSize);
    return Math.floor(r / cellSize) * cols + Math.floor(c / cellSize);
}

const getOccupiedCells = (x, y, width, height) => {
    const occupiedCells = [];
    for (let i = x; i < x + width; i += cellSize) {
        for (let j = y; j < y + height; j += cellSize) {
            occupiedCells.push(coordsToIdx(j, i));
        }
    }
    return occupiedCells;
}

const isInsideRect = (x, y, rectX, rectY, rectWidth, rectHeight) => {
    return x >= rectX && x <= rectX + rectWidth && y >= rectY && y <= rectY + rectHeight;
}

const posizione_pallina=(x,y)=>{
    let px=x;
    let py=y;


    posx+=px;
    posy+=py;
}



const topBar = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: 10,
    color: 'white'
};

const bottomBar = {
    x: 0,
    y: canvas.height - 30,
    width: canvas.width,
    height: 30,
    color: 'white'
};

const leftBar = {
    x: 0,
    y: 10,
    width: 10,
    height: canvas.height - 40,
    color: 'white'
};

const rightBar = {
    x: canvas.width - 10,
    y: 10,
    width: 10,
    height: canvas.height - 40,
    color: 'white'
};





const drawBar = (bar) => {
    ctx.fillStyle = bar.color;
    ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
}


//cordinate delle celle in div
let barraBlue;
let barraSU;
let pallina;
let barraDestra;
let barraSinistra;
let barraGiu;
const show = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const griglia = Array.from({ length: (canvas.width * canvas.height) / (cellSize * cellSize) }, (v, i) => i);

    //griglia.forEach((idx) => {
    //   const { r, c } = idxToCoords(idx);
     // ctx.strokeStyle = 'grey';
     //  ctx.strokeRect(c, r, cellSize, cellSize); // Disegna il contorno della cella
   //});
   const rectX = ((canvas.width / 2) - 40) - p1;
   const rectY = canvas.height - (canvas.height * 0.15);
   const rectWidth = 80;
   const rectHeight = 10;

   const blueBar = {
       x: rectX,
       y: rectY,
       width: rectWidth,
       height: rectHeight,
       color: 'white'
   };

   drawBar(blueBar);
   
    ctx.fillStyle = 'white';
    ctx.fillRect((canvas.width/2)-posx, (canvas.height/2)-posy, 10, 10);
    posizione_pallina(pallina_x,pallina_y)
   
    drawBar(topBar);
    drawBar(bottomBar);
    drawBar(leftBar);
    drawBar(rightBar);
   

    
    barraBlue = getOccupiedCells(rectX, rectY, rectWidth, rectHeight);
    barraSU= getOccupiedCells(0, 0, canvas.width, 10);
    pallina=getOccupiedCells((canvas.width/2)-posx, (canvas.height/2)-posy, 10, 10);
    barraDestra=getOccupiedCells(canvas.width - 10, 10, 10, canvas.height-40);
    barraSinistra=getOccupiedCells(0, 10, 10, canvas.height-40);
    barraGiu=getOccupiedCells(0, canvas.height-30, canvas.width, 30);
    checkRimbalzo()
    

    requestAnimationFrame(show);
}
show();



canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect(); //Ottiene la posizione del canvas rispetto alla finestra del browser.
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    console.log('mousedown', mouseX, mouseY);
    const rectX = ((canvas.width / 2) - 40) - p1;
    const rectY = canvas.height - (canvas.height * 0.15);
    const rectWidth = 80;
    const rectHeight = 10;

    console.log(rectX, rectY);

    if (isInsideRect(mouseX, mouseY, rectX, rectY, rectWidth, rectHeight)) {
        isDragging = true;
        lastX = mouseX;
        console.log('isDragging set to true');
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const rect = canvas.getBoundingClientRect();//Ottiene la posizione del canvas rispetto alla finestra del browser.
        const mouseX = e.clientX - rect.left;
        const deltaX = mouseX - lastX;
        p1 -= deltaX;
        lastX = mouseX;
        console.log(`p1: ${p1}, lastX: ${lastX}, deltaX: ${deltaX}`);
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});



canvas.addEventListener('touchstart', (e) => {
 
    const rectX = ((canvas.width / 2) - 40) - p1;
    const rectY = canvas.height - (canvas.height * 0.15);
    const rectWidth = 80;
    const rectHeight = 10;

    if (isInsideRect(e.touches[0].clientX, e.touches[0].clientY, rectX, rectY, rectWidth, rectHeight)) {
        isDragging = true;
        lastX = e.touches[0].clientX;
    }
});

canvas.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const deltaX = e.touches[0].clientX - lastX;
        p1 -= deltaX;
        lastX = e.touches[0].clientX;
    }
});

canvas.addEventListener('touchend', () => {
    isDragging = false;
});


//eventi per impedire lo scrolling
document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, { passive: false });

document.body.addEventListener('touchstart', function(event) {
    event.preventDefault();
}, { passive: false });
