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

/* GAME */

let scroll = 0;

let monkeyFrame = 0;
let lionFrame = 0;

let score = 0;

let player = {
x:180,
y:350,
vy:0,
jump:false
};

let lionX = 20;

let bananas = [
{x:900,y:280},
{x:1600,y:320},
{x:2200,y:260}
];

let rocks = [
{x:1200},
{x:1900},
{x:2800}
];

/* INPUT */

function jump(){

if(!player.jump){

player.vy = -22;

player.jump = true;

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

if(jumpBtn){

jumpBtn.onclick =
jump;

}

/* COLLISION */

function hitRock(r){

return (

player.x+80>r.x

&&

player.x<r.x+60

&&

player.y>300

);

}

/* DRAW */

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

/* BACKGROUND */

scroll-=6;

if(
scroll<
-canvas.width
){

scroll=0;

}

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

/* JUMP */

player.vy+=1;

player.y+=player.vy;

if(
player.y>350
){

player.y=350;

player.vy=0;

player.jump=false;

}

/* ANIMATION */

monkeyFrame+=0.2;

lionFrame+=0.1;

let m =
Math.floor(
monkeyFrame
)%4;

let l =
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

lionX+=0.03;

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

b.x-=6;

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

b.x+=2500;

}

}

);

/* ROCKS */

rocks.forEach(

r=>{

r.x-=6;

ctx.fillStyle=
"#6d4c41";

ctx.fillRect(
r.x,
430,
60,
40
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

/* LION CATCH */

if(
lionX>
player.x-40
){

alert(
"🦁 LION CAUGHT YOU\nScore: "+score
);

location.reload();

}

/* SCORE */

ctx.fillStyle=
"white";

ctx.font=
"40px Arial";

ctx.fillText(

"Score: "+score,

20,

60

);

}

/* START */

monkey.onload =
()=>{

draw();

};
