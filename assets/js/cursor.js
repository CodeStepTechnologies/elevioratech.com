/* =========================================================
   ELEVIORA ELITE CURSOR ENGINE
   Version: Eleviora Elite 1.0
========================================================= */

(function(){

/* =========================
   DISABLE ON MOBILE
========================= */

if(window.innerWidth < 768) return;


/* =========================
   CREATE ELEMENTS
========================= */

const cursor = document.createElement("div");
const ring = document.createElement("div");

cursor.id = "eleviora-cursor";
ring.id = "eleviora-cursor-ring";

document.body.appendChild(cursor);
document.body.appendChild(ring);


/* =========================
   CSS
========================= */

const style = document.createElement("style");

style.innerHTML = `

#eleviora-cursor{

position:fixed;

width:8px;
height:8px;

background:linear-gradient(
135deg,#2563eb,#06b6d4);

border-radius:50%;

pointer-events:none;

z-index:10000;

transform:translate(-50%,-50%);

transition:
transform 0.15s ease;

}


#eleviora-cursor-ring{

position:fixed;

width:36px;
height:36px;

border-radius:50%;

border:1px solid rgba(37,99,235,0.4);

pointer-events:none;

z-index:9999;

transform:translate(-50%,-50%);

transition:
width 0.25s ease,
height 0.25s ease,
border 0.25s ease;

}

.cursor-hover{

width:60px !important;
height:60px !important;

border:1px solid rgba(6,182,212,0.6);

}

.cursor-click{

animation:cursorClick 0.4s ease;

}

@keyframes cursorClick{

0%{transform:translate(-50%,-50%) scale(1);}

50%{transform:translate(-50%,-50%) scale(0.7);}

100%{transform:translate(-50%,-50%) scale(1);}

}

`;

document.head.appendChild(style);


/* =========================
   TRACKING
========================= */

let mouseX = window.innerWidth/2;
let mouseY = window.innerHeight/2;

let ringX = mouseX;
let ringY = mouseY;


document.addEventListener("mousemove",(e)=>{

mouseX = e.clientX;
mouseY = e.clientY;

cursor.style.left = mouseX+"px";
cursor.style.top = mouseY+"px";

});


/* =========================
   SMOOTH RING FOLLOW
========================= */

function animate(){

ringX += (mouseX-ringX)*0.15;
ringY += (mouseY-ringY)*0.15;

ring.style.left = ringX+"px";
ring.style.top = ringY+"px";

requestAnimationFrame(animate);

}

animate();


/* =========================
   HOVER EFFECT
========================= */

const hoverTargets =
"button, a, .glass-card, .btn";

document.addEventListener("mouseover",(e)=>{

if(e.target.matches(hoverTargets)){

ring.classList.add("cursor-hover");

}

});


document.addEventListener("mouseout",(e)=>{

if(e.target.matches(hoverTargets)){

ring.classList.remove("cursor-hover");

}

});


/* =========================
   CLICK EFFECT
========================= */

document.addEventListener("mousedown",()=>{

cursor.classList.add("cursor-click");

});

document.addEventListener("mouseup",()=>{

setTimeout(()=>{

cursor.classList.remove("cursor-click");

},200);

});


})();