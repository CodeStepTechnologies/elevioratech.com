/* =========================================================
   ELEVIORA ELITE GRADIENT MESH ENGINE
   Production Optimized Version
   GPU Safe + Mobile Optimized
========================================================= */

(function(){

"use strict";

/* =========================
   SAFE CANVAS INITIALIZATION
========================= */

let canvas = document.getElementById("eleviora-mesh");

if(!canvas){

canvas = document.createElement("canvas");
canvas.id = "eleviora-mesh";
document.body.appendChild(canvas);

}

const ctx = canvas.getContext("2d", { alpha:true });


/* =========================
   SIZE SYSTEM
========================= */

let width = 0;
let height = 0;

function resize(){

width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize", resize, { passive:true });


/* =========================
   PERFORMANCE MODE
========================= */

const isMobile = window.innerWidth < 768;

const BLOBS = isMobile ? 3 : 5;

const colors = [
"rgba(37,99,235,0.22)",
"rgba(6,182,212,0.22)",
"rgba(99,102,241,0.18)"
];


/* =========================
   CREATE BLOBS
========================= */

const blobs = [];

function initBlobs(){

blobs.length = 0;

for(let i=0;i<BLOBS;i++){

blobs.push({

x: Math.random()*width,
y: Math.random()*height,

r: Math.random()*260 + 180,

vx:(Math.random()-0.5)*0.12,
vy:(Math.random()-0.5)*0.12,

color: colors[i % colors.length]

});

}

}

initBlobs();


/* =========================
   SCROLL REACTION
========================= */

let scrollOffset = 0;

window.addEventListener("scroll", ()=>{

scrollOffset = window.scrollY * 0.08;

},{ passive:true });



/* =========================
   DRAW BLOBS
========================= */

function drawBlobs(){

ctx.filter = "blur(100px)";

blobs.forEach(b=>{

const gradient =
ctx.createRadialGradient(

b.x,
b.y + scrollOffset,
0,

b.x,
b.y + scrollOffset,
b.r

);

gradient.addColorStop(0, b.color);

gradient.addColorStop(1, "transparent");

ctx.fillStyle = gradient;

ctx.beginPath();

ctx.arc(
b.x,
b.y + scrollOffset,
b.r,
0,
Math.PI*2
);

ctx.fill();


/* MOVE */

b.x += b.vx;
b.y += b.vy;


/* WRAP EDGES (better than bounce) */

if(b.x < -300) b.x = width + 300;
if(b.x > width + 300) b.x = -300;

if(b.y < -300) b.y = height + 300;
if(b.y > height + 300) b.y = -300;

});

}


/* =========================
   MAIN DRAW LOOP
========================= */

let animationId;

function draw(){

ctx.clearRect(0,0,width,height);

drawBlobs();

animationId =
requestAnimationFrame(draw);

}


/* =========================
   VISIBILITY PERFORMANCE CONTROL
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