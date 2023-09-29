/**
 * Exercise: Dodge-em
 * Emile Jolicoeur
 * 
 * Objectives: Understanding following script conditions:
 * if-statements, loops(drawing), mouse interaction, displaying images
 */

"use strict";

//Values of the obstacles
let asteroid    =   {
    x:  0,
    y:  0,
    size:   100,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    acceleration:   0.01,
    maxSpeed:   10,
    fill:   {
        r:  255,
        g:  0,
        b:  0,
    }
};

//Values of the player
let ship    =   {
    x:  undefined,
    y:  undefined,
    size:   100,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    acceleration:   0.05,
    maxSpeed:   10,
    fill:   {
        r:  0,
        g:  255,
        b:  100,
    }
};

let angle   =   0;

//Hud values
let score   =   0;

//
function preload()  {

}

//setting  starting variables
function setup() {
    createCanvas(windowWidth, windowHeight);

    noCursor();

    //Hud
        //StopWatch [millis = nbSec relative to refreshPage]    [WIP]
    let currentTimeSeconds = round(millis()/1000);
    console.log(`Time: ${currentTimeSeconds}`);

    //Asteroid location + size
    asteroid.y  =   random(0, height);
    asteroid.size   =   random(100, 175);
    asteroid.vx =   asteroid.maxSpeed;

    //Ship starting location
    ship.x  =   width/2;
    ship.y  =   height/2;

    //Ship direction    [WIP]
    //angle.x =   mouseX;
    //angle.y =   mouseY;
}

//
function draw() {
    background(0);

    //Displaying static
    for (let i = 0; i < 1000; i ++)  {
        let x   =   random(0, width);
        let y   =   random(0, height);
        stroke(200, 200, 255);
        point(x, y);
    }
    
    //The asteroid's speed
    asteroid.x  +=  asteroid.vx;
    asteroid.y  +=  asteroid.vy;

    //Resetting the asteroid
    if  (asteroid.x > width)    {
        asteroid.x  =   0;
        asteroid.y  =   random(0, height);
        asteroid.size   =   random(100, 175);
        asteroid.vx +=  0.01;
        score += 1;
        console.log(`Score: ${score}`);
    }

    //Creating the asteroid
    fill(asteroid.fill.r, asteroid.fill.g, asteroid.fill.b);
    ellipse(asteroid.x, asteroid.y, asteroid.size);

    //Ship controls
    //Movement mouseX
    if  (mouseX < ship.x)   {
        ship.ax =   -ship.acceleration;
        console.log(`Mouse:L`);
    }   else    {
        ship.ax =   ship.acceleration;
        console.log(`Mouse:R`);
    }
        //Movement mouseY
    if  (mouseY < ship.y)   {
        ship.ay =   -ship.acceleration;
    }   else    {
        ship.ay =   ship.acceleration;
    }
        //Velocity constraints
    ship.vx +=  ship.ax;
    ship.vx =   constrain(ship.vx, -ship.maxSpeed, ship.maxSpeed);
    ship.vy +=  ship.ay;
    ship.vy =   constrain(ship.vy, -ship.maxSpeed, ship.maxSpeed);

        //Ship position
    ship.x  +=  ship.vx;
    ship.x  =   constrain(ship.x, 0, width - ship.size);
    ship.y  +=  ship.vy;
    ship.y  =   constrain(ship.y, 0, height - ship.size);

    push();
    fill(ship.fill.r, ship.fill.g, ship.fill.b);
    rect(ship.x, ship.y, ship.size);
    //rotate(angle.y);
    pop();
    
    //Proximity sensors
    let d   =   dist(ship.x, ship.y, asteroid.x, asteroid.y);

    //if ship collides with asteroid: reset 
    if  (d < asteroid.size/2 + ship.size/2) {
        console.log(`HIT!`);
        noLoop();
    }

    //Hud
    textSize(32);
    fill(0, 0, 255);
    text('Score:' + score /**+ 'Time:' + currentTimeSeconds*/, 10, 30);
}