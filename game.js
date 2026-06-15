const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

canvas.width=innerWidth;
canvas.height=innerHeight;

const bg=new Image();
bg.src="assets/bg.png";

const monkey=new Image();
monkey.src="assets/monkey.png";

const lion=new Image();
lion.src="assets/lion.png";

let scroll=0;

let monkeyFrame=0;
let lionFrame=0;

let player={
x:180,
y:350,
vy:0,
jump:false
};

let lionX=40;

function jump(){

if(!player.jump){

player.vy=-20;

player.jump=true;

}

}

document.addEventListener(
"keydown",
e=>{

if(
e.code==="Space"
||
e.key==="ArrowUp"
)
jump();

}
);

document.getElementById(
"jump"
).onclick=jump;

function draw(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

scroll-=6;

ctx.drawImage(
bg,
scroll,
0,
canvas.width,
canvas.height
);

ctx.drawImage(
bg,
scroll+canvas.width,
0,
canvas.width,
canvas.height
);

if(
scroll<
-canvas.width
)
scroll=0;

player.vy+=1;

player.y+=player.vy;

if(
player.y>350
){

player.y=350;

player.jump=false;

}

monkeyFrame+=0.20;

lionFrame+=0.15;

let m=
Math.floor(
monkeyFrame
)%4;

let l=
Math.floor(
lionFrame
)%4;

ctx.drawImage(

monkey,

m*400,
0,
400,
400,

player.x,
player.y,
120,
120

);

lionX+=0.15;

ctx.drawImage(

lion,

l*400,
0,
400,
400,

lionX,
360,
140,
140

);

requestAnimationFrame(
draw
);

}

monkey.onload=()=>{
draw();
};
