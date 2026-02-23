/* =========================================================
   ELEVIORA ELITE PAGE TRANSITION ENGINE
   Production Stable Version
   GPU Optimized + Safe Navigation
========================================================= */

(function(){

"use strict";


/* =========================
   SAFE INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", init);

function init(){

createOverlay();
injectCSS();
handlePageLoad();
interceptLinks();

}


/* =========================
   CREATE OVERLAY SAFELY
========================= */

let overlay;

function createOverlay(){

overlay = document.getElementById("eleviora-transition");

if(overlay) return;

overlay = document.createElement("div");

overlay.id = "eleviora-transition";

document.body.appendChild(overlay);

}


/* =========================
   CSS INJECTION
========================= */

function injectCSS(){

if(document.getElementById("eleviora-transition-style"))
return;

const style = document.createElement("style");

style.id = "eleviora-transition-style";

style.innerHTML = `

#eleviora-transition{

position:fixed;
top:0;
left:0;

width:100%;
height:100%;

background:
linear-gradient(
135deg,
rgba(255,255,255,0.92),
rgba(255,255,255,0.75)
);

backdrop-filter:blur(30px);
-webkit-backdrop-filter:blur(30px);

z-index:20000;

opacity:0;

pointer-events:none;

transition:
opacity 0.45s cubic-bezier(.16,1,.3,1);

will-change:opacity;

}

body.transitioning #eleviora-transition{

opacity:1;

pointer-events:auto;

}

body.loaded #eleviora-transition{

opacity:0;

pointer-events:none;

}

`;

document.head.appendChild(style);

}


/* =========================
   PAGE LOAD FADE IN
========================= */

function handlePageLoad(){

window.addEventListener("load", ()=>{

document.body.classList.add("loaded");

});

}


/* =========================
   SAFE LINK INTERCEPTION
========================= */

function interceptLinks(){

document.addEventListener("click",(e)=>{

const link = e.target.closest("a");

if(!link) return;


/* Ignore special links */

if(

link.hasAttribute("download") ||
link.target === "_blank" ||
link.href.includes("mailto:") ||
link.href.includes("tel:") ||
link.href.includes("#")

) return;


/* Ignore external links */

const url = new URL(link.href);

if(url.origin !== window.location.origin)
return;


/* Ignore same page */

if(url.pathname === window.location.pathname)
return;


/* Navigate */

e.preventDefault();

navigate(url.href);

});

}


/* =========================
   NAVIGATION FUNCTION
========================= */

let navigating = false;

function navigate(url){

if(navigating) return;

navigating = true;

document.body.classList.add("transitioning");


/* GPU flush */

requestAnimationFrame(()=>{

setTimeout(()=>{

window.location.href = url;

}, 420);

});

}


/* =========================
   GLOBAL ACCESS
========================= */

window.ElevioraTransition = {

navigate

};


/* =========================
   BACK/FORWARD CACHE FIX
========================= */

window.addEventListener("pageshow", (event)=>{

if(event.persisted){

document.body.classList.remove("transitioning");

document.body.classList.add("loaded");

navigating = false;

}

});


})();