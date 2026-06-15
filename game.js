const canvas=
document.getElementById("game");

const ctx=
canvas.getContext("2d");

canvas.width=
innerWidth;

canvas.height=
innerHeight;

let score=0;

const bg=
new Image();

bg.src=
"assets/bg.png";

const monkey=
new Image();

monkey.src=
"assets/monkey.png";

const lion=
new Image();

lion.src=
"assets/lion.png";

const banana=
new Image();

banana.src=
"assets/banana.png";

const rock=
new Image();

rock.src=
"assets/rock.png";

let player={

x:180,

y:350,

vy:0,

jump:false

};

let lionX=20;

let scroll=0;

let bananas=[];

let rocks=[];

for(
let i=0;
i<6;
i++
){

bananas.push({

x:700+i*400,

y:320

});

}

for(
let i=0;
i<4;
i++
){

rocks.push({

x:1000+i*800,

y:390

});

}

function jump(){

if(
!player.jump
){

player.vy=-22;

player.jump=true;

}

}

jump.onclick=
jump;

addEventListener(
"keydown",

e=>{

if(
e.code==="Space"
)

jump();

}

);

function draw(){

scroll-=5;

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

ctx.drawImage(

lion,

lionX,

360,

150,

150

);

lionX+=0.1;

ctx.drawImage(

monkey,

player.x,

player.y,

120,

120

);

bananas.forEach(

b=>{

b.x-=5;

ctx.drawImage(

banana,

b.x,

b.y,

50,

50

);

if(

Math.abs(

b.x-player.x

)<50

){

score++;

document
.getElementById(
"score"
)
.innerText=
score;

b.x+=2500;

}

}

);

rocks.forEach(

r=>{

r.x-=5;

ctx.drawImage(

rock,

r.x,

390,

80,

80

);

if(

r.x<
player.x+50

&&

r.x>
player.x

&&

player.y>300

){

alert(
"🦁 GAME OVER"
);

location.reload();

}

}

);

requestAnimationFrame(
draw
);

}

draw();
