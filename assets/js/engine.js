/* =========================================================
   ELEVIORA ELITE ENGINE
   Neural + Mesh + Glass Animation System
   Production Optimized Version
========================================================= */

(function(){

"use strict";

/* =========================
   SAFE CANVAS INITIALIZATION
========================= */

let canvas = document.getElementById("eleviora-engine");

if(!canvas){

canvas = document.createElement("canvas");
canvas.id = "eleviora-engine";
document.body.appendChild(canvas);

}

const ctx = canvas.getContext("2d", { alpha:true });

let width = 0;
let height = 0;


/* =========================
   RESIZE SYSTEM
========================= */

function resize(){

width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize", resize, { passive:true });



/* =========================
   PERFORMANCE ADAPTATION
========================= */

const isMobile = window.innerWidth < 768;

const DOT_COUNT   = isMobile ? 24 : 55;
const GLASS_COUNT = isMobile ? 5  : 10;

const MAX_DISTANCE = 140;



/* =========================
   MOUSE SYSTEM
========================= */

const mouse = {
x: width / 2,
y: height / 2
};

window.addEventListener("mousemove", (e)=>{

mouse.x = e.clientX;
mouse.y = e.clientY;

}, { passive:true });



/* =========================
   SCROLL SYSTEM
========================= */

let scrollOffset = 0;

window.addEventListener("scroll", ()=>{

scrollOffset = window.scrollY * 0.15;

},{ passive:true });



/* =========================
   DOT SYSTEM
========================= */

const dots = [];

function initDots(){

dots.length = 0;

for(let i=0;i<DOT_COUNT;i++){

dots.push({

x: Math.random()*width,
y: Math.random()*height,

vx: (Math.random()-0.5)*0.25,
vy: (Math.random()-0.5)*0.25

});

}

}

initDots();



/* =========================
   GLASS PARTICLES
========================= */

const glass = [];

function initGlass(){

glass.length = 0;

for(let i=0;i<GLASS_COUNT;i++){

glass.push({

x: Math.random()*width,
y: Math.random()*height,

size: Math.random()*100+60,

vx: (Math.random()-0.5)*0.15,
vy: (Math.random()-0.5)*0.15,

alpha: Math.random()*0.06 + 0.02

});

}

}

initGlass();



/* =========================
   DRAW GLASS LAYER
========================= */

function drawGlass(){

glass.forEach(g=>{

ctx.beginPath();

ctx.arc(
g.x,
g.y + scrollOffset,
g.size,
0,
Math.PI*2
);

ctx.fillStyle =
`rgba(37,99,235,${g.alpha})`;

ctx.fill();


/* MOVE */

g.x += g.vx;
g.y += g.vy;


/* BOUNDS */

if(g.x < -200) g.x = width+200;
if(g.x > width+200) g.x = -200;

if(g.y < -200) g.y = height+200;
if(g.y > height+200) g.y = -200;

});

}



/* =========================
   DRAW DOT NETWORK
========================= */

function drawDots(){

for(let i=0;i<dots.length;i++){

const d1 = dots[i];


/* CONNECTIONS */

for(let j=i+1;j<dots.length;j++){

const d2 = dots[j];

const dx = d1.x - d2.x;
const dy = d1.y - d2.y;

const dist =
Math.sqrt(dx*dx + dy*dy);

if(dist < MAX_DISTANCE){

ctx.strokeStyle =
`rgba(37,99,235,${
(1 - dist/MAX_DISTANCE)*0.22
})`;

ctx.lineWidth = 1;

ctx.beginPath();

ctx.moveTo(
d1.x,
d1.y + scrollOffset
);

ctx.lineTo(
d2.x,
d2.y + scrollOffset
);

ctx.stroke();

}

}


/* DOT */

ctx.beginPath();

ctx.arc(
d1.x,
d1.y + scrollOffset,
1.8,
0,
Math.PI*2
);

ctx.fillStyle =
"rgba(37,99,235,0.9)";

ctx.fill();



/* MOUSE INTERACTION */

const dx =
d1.x - mouse.x;

const dy =
d1.y - mouse.y;

const dist =
Math.sqrt(dx*dx + dy*dy);

if(dist < 120){

d1.vx += dx * -0.00004;
d1.vy += dy * -0.00004;

}


/* MOVE */

d1.x += d1.vx;
d1.y += d1.vy;


/* BOUNDS */

if(d1.x < 0 || d1.x > width)
d1.vx *= -1;

if(d1.y < 0 || d1.y > height)
d1.vy *= -1;

}

}



/* =========================
   MAIN DRAW LOOP
========================= */

let animationId;

function draw(){

ctx.clearRect(0,0,width,height);

drawGlass();
drawDots();

animationId =
requestAnimationFrame(draw);

}



/* =========================
   VISIBILITY PERFORMANCE
========================= */

document.addEventListener(

"visibilitychange",

()=>{

if(document.hidden){

cancelAnimationFrame(animationId);

}else{

draw();

}

}

);



/* =========================
   START ENGINE
========================= */

draw();


})();

/* ============================================
   ECOSYSTEM LOGO HORIZONTAL SCROLL ENGINE
============================================ */

(function(){

const track = document.querySelector(".ecosystem-track");

if(!track) return;

track.innerHTML += track.innerHTML;

let position = 0;

const speed = 0.4;

function animate(){

position -= speed;

if(Math.abs(position) >= track.scrollWidth / 2){

position = 0;

}

track.style.transform =
`translateX(${position}px)`;

requestAnimationFrame(animate);

}

animate();

})();