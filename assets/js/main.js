/* =========================================================
   ELEVIORA ELITE INTERACTION ENGINE
   Final Production Version — Enterprise Stable
========================================================= */

(function(){

"use strict";

/* =========================
   SAFE INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", init);

function init(){

initHeader();
initNavigation();
initRevealSystem();
initBrandStory();
initRoadmap();
initScrollEffects();
initPerformance();
initParallaxLogos();

}



/* =========================
   FLOATING HEADER SYSTEM
========================= */

function initHeader(){

const header = document.querySelector(".ultra-header");

if(!header) return;

let lastScroll = 0;

window.addEventListener("scroll", ()=>{

const currentScroll = window.scrollY;

if(currentScroll > 40){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

lastScroll = currentScroll;

},{ passive:true });

}



/* =========================
   ACTIVE NAVIGATION SYSTEM
========================= */

function initNavigation(){

const links =
document.querySelectorAll(".ultra-nav a");

if(!links.length) return;

const current =
window.location.pathname.split("/").pop() || "index.html";

links.forEach(link=>{

const href = link.getAttribute("href");

if(href === current){

link.classList.add("active");

}

});

}



/* =========================
   GLOBAL REVEAL SYSTEM
========================= */

function initRevealSystem(){

const elements =
document.querySelectorAll(

".section, .glass-card, .section-header, .ecosystem-platform"

);

if(!elements.length) return;

const observer =
new IntersectionObserver(

(entries, observer)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

observer.unobserve(entry.target);

}

});

},

{
threshold: 0.12,
rootMargin: "0px 0px -60px 0px"
}

);

elements.forEach(el=>{

el.classList.add("reveal");

observer.observe(el);

});

}



/* =========================
   BRAND STORY ACTIVATION
========================= */

function initBrandStory(){

const stories =
document.querySelectorAll(".brand-story");

if(!stories.length) return;

const observer =
new IntersectionObserver(

(entries, observer)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

observer.unobserve(entry.target);

}

});

},

{ threshold: 0.2 }

);

stories.forEach(story=>{

observer.observe(story);

});

}



/* =========================
   ROADMAP SCROLL EFFECT
========================= */

function initRoadmap(){

const roadmap =
document.querySelector(".roadmap-horizontal");

if(!roadmap) return;

roadmap.addEventListener(

"scroll",

()=>{

roadmap.style.setProperty(
"--scroll",
roadmap.scrollLeft
);

},

{ passive:true }

);

}



/* =========================
   GLOBAL SCROLL VARIABLE
========================= */

function initScrollEffects(){

let ticking = false;

window.addEventListener("scroll", ()=>{

if(!ticking){

requestAnimationFrame(()=>{

document.body.style.setProperty(
"--scroll",
window.scrollY
);

ticking = false;

});

ticking = true;

}

},{ passive:true });

}



/* =========================
   PERFORMANCE OPTIMIZATION
========================= */

function initPerformance(){

document.addEventListener(

"visibilitychange",

()=>{

if(document.hidden){

document.body.classList.add("paused");

}else{

document.body.classList.remove("paused");

}

}

);

}



/* =========================
   PARALLAX ECOSYSTEM LOGOS
========================= */

function initParallaxLogos(){

const logos =
document.querySelectorAll(".ecosystem-logo");

if(!logos.length) return;


/* SCROLL FLOAT */

window.addEventListener("scroll", ()=>{

const scroll = window.scrollY;

logos.forEach((logo,index)=>{

const speed =
(index + 1) * 0.06;

logo.style.transform =
`translateY(${scroll * speed * 0.15}px)`;

});

},{ passive:true });


/* MOUSE DEPTH */

document.addEventListener("mousemove",(e)=>{

const x =
(e.clientX / window.innerWidth) - 0.5;

const y =
(e.clientY / window.innerHeight) - 0.5;

logos.forEach((logo,index)=>{

const depth =
(index + 1) * 10;

logo.style.transform +=
` rotateY(${x * depth}deg)
  rotateX(${-y * depth}deg)`;

});

});

}



/* =========================
   GLOBAL NAVIGATION ENGINE
========================= */

window.Eleviora = {

navigate(url){

document.body.style.transition =
"opacity 0.3s ease";

document.body.style.opacity = "0";

setTimeout(()=>{

window.location.href = url;

}, 300);

}

};


})();