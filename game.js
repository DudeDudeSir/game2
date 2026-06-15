const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* IMAGES */

const bg = new Image();
bg.src = "assets/bg.png";

const monkey = new Image();
monkey.src = "assets/monkey.png";

const lion = new Image();
lion.src = "assets/lion.png";

const rockImg = new Image();
rockImg.src = "assets/rock.png";

/* GAME */

let scroll = 0;

let monkeyFrame = 0;
let lionFrame = 0;

let score = 0;

let distance = 0;

let boost = false;
let boostTimer = 0;

let jumps = 0;

let player = {
x:180,
y:350,
vy:0,
jump:false
};

let lionX = 20;

let bananas = [
{x:900,y:280},
{x:1500,y:260},
{x:2200,y:320}
];

let rocks = [
{x:1200},
{x:2200},
{x:3200}
];

/* INPUT */

function jump(){

if(jumps<2){

player.vy=-22;

player.jump=true;

jumps++;

}

}

document.addEventListener(
"keydown",
e=>{

if(
e.code==="Space"
||
e.key==="ArrowUp"
){

jump();

}

}
);

const btn =
document.getElementById(
"jump"
);

if(btn){

btn.onclick=jump;

}

/* COLLISION */

function hitRock(r){

return(

player.x+80>r.x

&&

player.x<r.x+60

&&

player.y>300

);

}

/* MAIN */

function draw(){

requestAnimationFrame(
draw
);

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

/* BG */

scroll-=boost?12:6;

if(
scroll<
-canvas.width
)
scroll=0;

ctx.drawImage(
bg,
scroll,
0,
canvas.width,
canvas.height
);

ctx.drawImage(
bg,
scroll+
canvas.width,
0,
canvas.width,
canvas.height
);

/* PLAYER */

player.vy+=1;

player.y+=player.vy;

if(
player.y>350
){

player.y=350;

player.vy=0;

player.jump=false;

jumps=0;

}

/* ANIMATION */

monkeyFrame+=0.25;

lionFrame+=0.15;

let m=
Math.floor(
monkeyFrame
)%4;

let l=
Math.floor(
lionFrame
)%4;

/* MONKEY */

ctx.drawImage(

monkey,

m*400,
0,
400,
400,

player.x,
player.y,

130,
130

);

/* LION */

lionX+=boost?0.01:0.03;

ctx.drawImage(

lion,

l*400,
0,
400,
400,

lionX,
360,

150,
150

);

/* BANANAS */

bananas.forEach(

b=>{

b.x-=boost?12:6;

ctx.font="50px serif";

ctx.fillText(
"🍌",
b.x,
b.y
);

if(

Math.abs(
player.x-
b.x
)<50

){

score+=10;

boost=true;

boostTimer=180;

b.x+=2500;

}

}

/* ROCK */

);

rocks.forEach(

r=>{

r.x-=boost?12:6;

ctx.drawImage(

rockImg,

r.x,

390,

90,

90

);

if(
hitRock(
r
)
){

alert(
"🪨 GAME OVER\nScore: "+score
);

location.reload();

}

});

/* BOOST */

if(boost){

boostTimer--;

distance+=10;

if(
boostTimer<0
){

boost=false;

}

}
else{

distance+=5;

}

/* WIN */

if(
distance>
1000
){

alert(
"🏆 YOU ESCAPED!"
);

location.reload();

}

/* LION */

if(
lionX>
player.x-40
){

alert(
"🦁 LION CAUGHT YOU"
);

location.reload();

}

/* UI */

/* GAME OVER */

if(
lionX>
player.x-40
){

localStorage.setItem(
"best",
Math.max(
score,
localStorage.getItem(
"best"
)||0
)
);

showGameOver();

return;

}

/* UI */

ctx.fillStyle="white";

ctx.font="35px Arial";

ctx.fillText(
"🍌 "+score,
20,
50
);

ctx.fillText(
"🏃 "+distance+"m",
20,
100
);

ctx.fillText(
"🏆 "+
(
localStorage.getItem(
"best"
)||0
),
20,
150
);

/* NIGHT */

if(
distance>500
){

ctx.fillStyle=
"rgba(0,0,40,.3)";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

}

/* GAME OVER */

function showGameOver(){

ctx.fillStyle=
"rgba(0,0,0,.8)";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

ctx.fillStyle=
"red";

ctx.font=
"80px Arial";

ctx.fillText(

"💀 DEAD",

canvas.width/2-180,

200

);

ctx.fillStyle=
"white";

ctx.font=
"40px Arial";

ctx.fillText(

"Score: "+score,

canvas.width/2-100,

320

);

ctx.fillText(

"Distance: "+distance,

canvas.width/2-120,

400

);

ctx.fillText(

"Tap Refresh",

canvas.width/2-120,

500

);

}

/* START */

monkey.onload=
()=>{

draw();

};
