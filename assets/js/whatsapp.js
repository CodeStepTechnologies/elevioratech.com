/* =========================================================
   ELEVIORA WHATSAPP WIDGET
   Official WhatsApp Replica UI
   Production Version
========================================================= */

(function(){

"use strict";

/* =========================
   CONFIG
========================= */

const PHONE = "919964488440";

const COMPANY = "Eleviora Tech Innovations";

const AVATAR = "assets/images/whatsapp-icon.png";


/* =========================
   CREATE WIDGET
========================= */

const widget = document.createElement("div");

widget.id = "wa-widget";

widget.innerHTML = `

<div class="wa-float">

<svg viewBox="0 0 32 32">
<path fill="white"
d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.5 2.1 7.9L.5 31.5l7.8-2.1c2.3 1.2 4.9 1.8 7.7 1.8 8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5z"/>
</svg>

</div>


<div class="wa-window">

<div class="wa-top">

<img src="${AVATAR}" class="wa-avatar">

<div class="wa-title">
${COMPANY}
<span class="wa-status">Typically replies instantly</span>
</div>

<div class="wa-close">×</div>

</div>


<div class="wa-chat-area">

<div class="wa-bubble">
Hello 👋<br>
How can we assist you today?
</div>

<div class="wa-options">

<div data-msg="General Inquiry">General Inquiry</div>

<div data-msg="Business Partnership">Business Partnership</div>

<div data-msg="TASTR Platform Inquiry">TASTR Platform</div>

<div data-msg="CodeStep Technologies Inquiry">CodeStep Technologies</div>

<div data-msg="Vayuara Holidays Inquiry">Vayuara Holidays</div>

</div>

</div>


<div class="wa-input-area">

<input placeholder="Type a message">

<button>

<svg viewBox="0 0 24 24">
<path fill="white"
d="M2 21l21-9L2 3v7l15 2-15 2z"/>
</svg>

</button>

</div>

</div>

`;

document.body.appendChild(widget);


/* =========================
   CSS
========================= */

const style = document.createElement("style");

style.innerHTML = `

#wa-widget{

position:fixed;

bottom:24px;
right:24px;

z-index:9999;

font-family:
-apple-system,
BlinkMacSystemFont,
Segoe UI,
Roboto;

}


/* FLOAT BUTTON */

.wa-float{

width:60px;
height:60px;

border-radius:50%;

background:#25D366;

display:flex;
align-items:center;
justify-content:center;

cursor:pointer;

box-shadow:
0 10px 25px rgba(0,0,0,0.25);

transition:transform .2s;

}

.wa-float:hover{

transform:scale(1.1);

}

.wa-float svg{

width:30px;

}


/* WINDOW */

.wa-window{

position:absolute;

bottom:80px;
right:0;

width:340px;
height:460px;

background:#efeae2;

border-radius:14px;

box-shadow:
0 20px 60px rgba(0,0,0,0.3);

display:none;

flex-direction:column;

overflow:hidden;

animation:waOpen .25s ease;

}


/* OPEN ANIMATION */

@keyframes waOpen{

from{

opacity:0;
transform:translateY(20px);

}

to{

opacity:1;
transform:none;

}

}


/* HEADER */

.wa-top{

background:#075E54;

color:white;

padding:12px;

display:flex;
align-items:center;
gap:10px;

}

.wa-avatar{

width:38px;
height:38px;

border-radius:50%;

}

.wa-title{

flex:1;

font-size:14px;
font-weight:600;

}

.wa-status{

display:block;

font-size:11px;

opacity:.8;

}

.wa-close{

cursor:pointer;

font-size:20px;

}


/* CHAT AREA */

.wa-chat-area{

flex:1;

padding:16px;

overflow:auto;

}


/* MESSAGE */

.wa-bubble{

background:white;

padding:10px;

border-radius:8px;

max-width:240px;

font-size:14px;

margin-bottom:10px;

box-shadow:
0 1px 1px rgba(0,0,0,0.1);

}


/* OPTIONS */

.wa-options div{

background:#dcf8c6;

padding:8px;

margin-bottom:6px;

border-radius:8px;

cursor:pointer;

font-size:13px;

}

.wa-options div:hover{

background:#cdebb0;

}


/* INPUT */

.wa-input-area{

background:white;

padding:8px;

display:flex;
gap:6px;

}

.wa-input-area input{

flex:1;

border:none;

outline:none;

padding:8px;

font-size:14px;

}

.wa-input-area button{

background:#25D366;

border:none;

width:42px;

border-radius:6px;

cursor:pointer;

display:flex;
align-items:center;
justify-content:center;

}

.wa-input-area svg{

width:18px;

}


/* MOBILE */

@media(max-width:768px){

.wa-window{

width:92vw;
height:70vh;

right:4vw;

}

}

`;

document.head.appendChild(style);


/* =========================
   FUNCTIONALITY
========================= */

const floatBtn = widget.querySelector(".wa-float");

const windowBox = widget.querySelector(".wa-window");

const closeBtn = widget.querySelector(".wa-close");

const input = widget.querySelector("input");

const sendBtn = widget.querySelector("button");

const options = widget.querySelectorAll(".wa-options div");


floatBtn.onclick = ()=>{

windowBox.style.display =
windowBox.style.display === "flex"
? "none"
: "flex";

};


closeBtn.onclick = ()=>{

windowBox.style.display = "none";

};


sendBtn.onclick = sendMessage;

input.addEventListener("keypress",(e)=>{

if(e.key === "Enter") sendMessage();

});


options.forEach(opt=>{

opt.onclick = ()=>{

openWhatsApp(opt.dataset.msg);

};

});


function sendMessage(){

const msg = input.value.trim();

if(!msg) return;

openWhatsApp(msg);

}


function openWhatsApp(msg){

const url =
`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

window.open(url,"_blank");

input.value="";

}


})();