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

const rock = new Image();
rock.src = "assets/rock.png";

/* GAME */

let bgX = 0;

let monkeyFrame = 0;
let lionFrame = 0;

let score = 0;
let distance = 0;

let gameOver = false;

let player = {

x:180,
y:350,

vy:0,

jumps:0

};

let lionX = 10;

let bananas = [
{x:900,y:300},
{x:1700,y:260},
{x:2400,y:320}
];

let rocks = [
{x:1200},
{x:2200},
{x:3200}
];

/* INPUT */

function jump(){

if(
player.jumps<2
){

player.vy=-22;

player.jumps++;

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

const jumpBtn =
document.getElementById(
"jump"
);

if(
jumpBtn
){

jumpBtn.onclick=
jump;

}

/* HIT */

function rockHit(r){

return(

player.x+80>r.x &&

player.x<r.x+70 &&

player.y>300

);

}

/* DRAW */

function draw(){

if(
gameOver
)
return;

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

bgX-=6;

if(
bgX<
-canvas.width
)
bgX=0;

ctx.drawImage(
bg,
bgX,
0,
canvas.width,
canvas.height
);

ctx.drawImage(
bg,
bgX+
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

player.jumps=0;

}

/* FRAMES */

monkeyFrame+=0.2;

lionFrame+=0.1;

let mf=
Math.floor(
monkeyFrame
)%4;

let lf=
Math.floor(
lionFrame
)%4;

/* MONKEY */

ctx.drawImage(

monkey,

mf*400,
0,
400,
400,

player.x,
player.y,

130,
130

);

/* LION */

lionX+=0.03;

ctx.drawImage(

lion,

lf*400,
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

b.x-=6;

ctx.font="45px serif";

ctx.fillText(
"🍌",
b.x,
b.y
);

if(

Math.abs(
b.x-player.x
)<50

){

score+=10;

b.x+=2500;

}

}

);

/* ROCK */

rocks.forEach(

r=>{

r.x-=6;

ctx.drawImage(
rock,
r.x,
390,
90,
90
);

if(
rockHit(
r
)
){

gameOver=true;

setTimeout(
()=>{

alert(
"💀 GAME OVER\nScore: "+score
);

location.reload();

},
100
);

}

}

/* DISTANCE */

);

distance+=0.2;

/* LION */

if(
lionX>
player.x-30
){

gameOver=true;

setTimeout(
()=>{

alert(
"🦁 LION CAUGHT YOU\nScore: "+score
);

location.reload();

},
100
);

}

/* WIN */

if(
distance>
1000
){

gameOver=true;

setTimeout(
()=>{

alert(
"🏆 YOU ESCAPED!"
);

location.reload();

},
100
);

}

/* UI */

ctx.fillStyle=
"white";

ctx.font=
"35px Arial";

ctx.fillText(
"🍌 "+score,
20,
50
);

ctx.fillText(
"🏃 "+
Math.floor(
distance
)+"m",
20,
100
);

ctx.fillText(
"⬆️ Double Jump",
20,
150
);

}

/* START */

monkey.onload=
()=>{

draw();

};
