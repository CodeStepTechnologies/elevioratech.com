/* ======================================================
   ELEVIORA CONNECTING DOTS ENGINE
   Ultra premium animated network system
====================================================== */


(function(){

const canvas = document.getElementById("premiumDots");

if(!canvas) return;

const ctx = canvas.getContext("2d");

let width = canvas.width = canvas.offsetWidth;
let height = canvas.height = window.innerHeight;


/* ===============================
   CONFIG
=============================== */

const DOT_COUNT = 32;

const MAX_DIST = 140;

const dots = [];


/* ===============================
   CREATE DOTS
=============================== */

for(let i=0;i<DOT_COUNT;i++){

dots.push({

x: Math.random() * width,

y: Math.random() * height,

vx: (Math.random()-0.5) * 0.4,

vy: (Math.random()-0.5) * 0.4

});

}


/* ===============================
   SCROLL OFFSET
=============================== */

let scrollOffset = 0;

window.addEventListener("scroll", () => {

scrollOffset = window.scrollY * 0.15;

});


/* ===============================
   DRAW ENGINE
=============================== */

function draw(){

ctx.clearRect(0,0,width,height);


/* DRAW CONNECTIONS */

for(let i=0;i<dots.length;i++){

for(let j=i+1;j<dots.length;j++){

let dx = dots[i].x - dots[j].x;

let dy = dots[i].y - dots[j].y;

let dist = Math.sqrt(dx*dx + dy*dy);

if(dist < MAX_DIST){

ctx.strokeStyle =
`rgba(37,99,235,${(1 - dist/MAX_DIST) * 0.4})`;

ctx.lineWidth = 1;

ctx.beginPath();

ctx.moveTo(dots[i].x, dots[i].y + scrollOffset);

ctx.lineTo(dots[j].x, dots[j].y + scrollOffset);

ctx.stroke();

}

}

}


/* DRAW DOTS */

dots.forEach(dot => {

ctx.beginPath();

ctx.arc(dot.x, dot.y + scrollOffset, 2, 0, Math.PI*2);

ctx.fillStyle = "#2563eb";

ctx.fill();


/* MOVE */

dot.x += dot.vx;

dot.y += dot.vy;


/* BOUNDS */

if(dot.x < 0 || dot.x > width){

dot.vx *= -1;

}

if(dot.y < 0 || dot.y > height){

dot.vy *= -1;

}

});


requestAnimationFrame(draw);

}


/* START */

draw();


/* ===============================
   RESIZE HANDLER
=============================== */

window.addEventListener("resize", () => {

width = canvas.width = canvas.offsetWidth;

height = canvas.height = window.innerHeight;

});

})();