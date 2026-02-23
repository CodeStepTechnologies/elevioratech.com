/* THEME TOGGLE */

const toggle = document.getElementById("themeToggle");

if(toggle){

toggle.onclick = () => {

document.body.classList.toggle("dark");

};

}


/* LOADER */

window.addEventListener("load", () => {

const loader = document.getElementById("loader");

if(loader){

loader.style.opacity = "0";

setTimeout(()=>{

loader.style.display = "none";

},1000);

}

});


/* CURSOR GLOW */

const glow = document.createElement("div");

glow.className = "cursor-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove", e => {

glow.style.left = e.clientX - 150 + "px";

glow.style.top = e.clientY - 150 + "px";

});


/* SCROLL REVEAL */

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.style.opacity = 1;

entry.target.style.transform = "translateY(0)";

}

});

});

document.querySelectorAll(".card, h1, h2, p").forEach(el => {

el.style.opacity = 0;

el.style.transform = "translateY(30px)";

el.style.transition = "all 1s";

observer.observe(el);

});

