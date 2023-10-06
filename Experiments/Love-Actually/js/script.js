/**
 * Love, Actually
 * Emile Jolicoeur
 * 
 * Using Looking for Love add:
 * add my own if statements / working on loops for drawing
 */

"use strict";

//Components
let lover1  =   {   //player
    x:  undefined,
    y:  undefined,
    size:   100,
    vx: 0,
    vy: 0,
    speed:  6,
    fillR:  200,
};
let lover2  =   {   //ai
    x:  undefined,
    y:  undefined,
    size:   100,
    vx: 0,
    vy: 0,
    speed:  3,
    fillR:   255,
    ch: 0.01,
};
let loverOpp    =   {   //Opponent ai
    x:  undefined,
    y:  undefined,
    size:   120,
    vx: 0,
    vy: 0,
    speed:  10,
    fillB:   255,
    ch: 0.05,
};

//Game state
let state   =   `title`;  //Options:  title, sim, win, lose, broken
//states of lover2  [ai]
let aiState =   `shy`;  //Options:  shy, run


function setup() {
    createCanvas(windowWidth, windowHeight);

    //circles separated from each other
    setupLovers();
}
function setupLovers()   {
    //Lover1(P) startup values:
    lover1.x    =   width/3;
    lover1.y    =   2*height/3;
    //Lover2(A) startup values:
    lover2.x    =   2*width/3;
    lover2.y    =   2*height/3;
    //Opponent(O) startup values:
    loverOpp.x  =   width/2;
    loverOpp.y  =   height/3;

    //Lover2(A) movement values:
    lover2.vx   =   random(-lover2.speed, lover2.speed);
    lover2.vy   =   random(-lover2.speed, lover2.speed);
    //Opponent(O) movement values:
    loverOpp.vx   =   random(-loverOpp.speed, loverOpp.speed);
    loverOpp.vy   =   random(-loverOpp.speed, loverOpp.speed);
}


// Background color & differentiating States
function draw() {
    background(0);

    if  (state === `title`) {
        title();
    }   else if (state === `sim`)   {
        simulation();
    }   else if (state === `win`)   {
        win();
    }   else if (state === `lose`)  {
        lose();
    }   else if (state === `broken`)    {
        heartBroken();
    }
}
//Different states
function title()    {
    textSize(64);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`Love?`, width/2, height/2);
}
function simulation()   {
    move();
    proximity();
    offscreen();
    display();
}
function win()    {
    textSize(64);
    fill(255, 150, 150);
    textAlign(CENTER, CENTER);
    text(`Love!!`, width/2, height/2);
}
function lose()    {
    textSize(64);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`There's always tomorrow...`, width/2, height/2);
}
function heartBroken()    {
    textSize(64);
    fill(255);
    textAlign(CENTER, CENTER);
    text(`You lost your chance`, width/2, height/2);
}

//lovers movements
function move() {
    controlsLover1();   //lover1
    aiOpponent();   //opponent
    aiLover2(); //lover2
    
    console.log(`L1: [x= ${lover1.x}] [y= ${lover1.y}]
L2: [x= ${lover2.x}] [y= ${lover2.y}]`);
}

//Lovers velocity
function velocity(lover)    {
    lover.x    +=  lover.vx;
    lover.y    +=  lover.vy;
}
//Lover1 controls
function controlsLover1()   {
    axisMovementX();
    axisMovementY();
    velocity(lover1);

    
}
function axisMovementX()    {
    if  (keyIsDown(65)  ||  keyIsDown(37))  {   //`a` || LEFT_ARROW
        lover1.vx   =   -lover1.speed;
    }   else if (keyIsDown(68)  ||  keyIsDown(39)) {    //`d` || RIGHT_ARROW
        lover1.vx   =   lover1.speed;
    }   else    {
        lover1.vx   =   0;
    }
}
function axisMovementY()    {
    if (keyIsDown(87)  ||  keyIsDown(38))  {   //`w` || UP_ARROW
        lover1.vy   =   -lover1.speed;
    }   else if (keyIsDown(83)  ||  keyIsDown(40)) {    //`s` || DOWN_ARROW
        lover1.vy   =   lover1.speed;
    }   else    {
        lover1.vy   =   0;
    }
}
//Opponent automated movements
function aiOpponent() {
    shyState(loverOpp);
    velocity(loverOpp);
    loverOpp.x  =   constrain(loverOpp.x, 0, width);
    loverOpp.y  =   constrain(loverOpp.y, 0, height);
}
//Lover2 automated movements
function aiLover2() {
    if (aiState === `shy`)  {
        shyState(lover2);
    }   else if (aiState === `run`) {
        runState();        
    }
    velocity(lover2);
}
//Lover2 is shy near Lover1
function shyState(lover) {
    //shy state value
    let change  =   random();
    lover2.speed    =   6;

    if  (change < lover.ch) {
        lover.vx    =   random(-lover.speed, lover.speed);
        lover.vy    =   random(-lover.speed, lover.speed);
    }
}
//Lover2 runs away from imminent confession
function runState() {
    //run state values
    let dx  =   lover2.x - lover1.x;
    let dy  =   lover2.y - lover1.y;
    lover2.speed    =   4.5;
    
    if  (dx > 0)    {
        lover2.vx   =   lover2.speed;
    }   else if (dx < 0)    {
        lover2.vx   =   -lover2.speed;
    }

    if  (dy > 0)    {
        lover2.vy   =   lover2.speed;
    }   else if (dx < 0)    {
        lover2.vy   =   -lover2.speed;
    }
}


//Calculating the distance between the Lovers + appropriate conditions
function proximity()  {
    //check if lovers overlap
    let dL  =   dist(lover1.x, lover1.y, lover2.x, lover2.y);
    let dO  =   dist(loverOpp.x, loverOpp.y, lover2.x, lover2.y)
  
    if  (dL < lover1.size/2 + lover2.size/2) {   //If Lover1  = overlap
        state   =   `win`;
    }   else if (dO < loverOpp.size/2 + lover2.size/2){
        state   =   `broken`;
    }   else if (dL <= 1.5*lover1.size + 1.5*lover2.size)    {   //If Lover1 = close
        aiState =   `run`;
    }   else if (dL > 1.5*lover1.size + 1.5*lover2.size)  {  //If Lover1 = far
        aiState =   `shy`;
    }
}

//Lose conditions
function offscreen()    {
    //offscreen:
    if (isOffscreen(lover1) ||  isOffscreen(lover2))  {
        console.log(`Game Over`);
        state   =   `lose`;
    }
}
function isOffscreen(lover)  {
    if (lover.x <= 0 || lover.x >= width || lover.y <= 0 || lover.y >= height)    {
        return true;
    }   else    {
        return false;
    }
}

//Displaying circles
function display()  {
    //display lovers
        //lover1(player)
    push();
    fill(lover1.fillR, 100, 100);
    ellipseMode(CENTER);
    ellipse(lover1.x, lover1.y, lover1.size);
    pop();

        //lover2(ai)
    push();
    fill(lover2.fillR, 0, 0);
    ellipseMode(CENTER);
    ellipse(lover2.x, lover2.y, lover2.size);
    pop();

        //Opponent(ai)
    push();
    fill(0, 0, loverOpp.fillB);
    ellipseMode(CENTER);
    ellipse(loverOpp.x, loverOpp.y, loverOpp.size);
    pop();
}

//Start
function mousePressed() {
    if  (state === `title`) {
        state   =   `sim`;
    }

}