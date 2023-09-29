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
    acceleration:   0.01,
    speed:   10,
    fill:   {
        r:  255,
        g:  0,
        b:  0,
    },

    // nb: {
    //     current:    undefined,
    //     max:    undefined,
    //     constr: 20,
    //}
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

//visual values
let asteroidImage;
let shipImage;

//Hud values
let score   =   0;
let currentTimeSeconds  =   undefined;


//Loading Images
function preload()  {
    shipImage   =   loadImage('assets/images/Dodge-em_Ship.png');
    asteroidImage   =   loadImage('assets/images/asteroid_1.png');
}

//setting  starting variables
function setup() {
    createCanvas(windowWidth, windowHeight);

    
    //Asteroid location + size
    asteroid.y  =   random(0, height);
    asteroid.size   =   random(100, 175);
    asteroid.vx =   asteroid.speed;
    //asteroid.speed  =   random(2, 10);

    //Ship starting location
    ship.x  =   width/2;
    ship.y  =   height/2;
}

//
function draw() {
    background(0);

    //noCursor();

    //Hud
        //StopWatch [millis = nbSec relative to refreshPage]    [WIP]
    currentTimeSeconds = round(millis()/1000);
    console.log(`Time: ${currentTimeSeconds}`);

    //Displaying backgroundStars
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
        //Next asteroid's properties
        asteroid.x  =   0;
        asteroid.y  =   random(0, height);
        asteroid.size   =   random(100, 175);
        asteroid.vx +=  asteroid.acceleration;
            
        //Hud values
        score += 1;
        
        //Debugging
        console.log(`[Score: ${score}]`);
        //console.log(`[Nb.Asteroid: ${asteroid.nb.current}]`);
    }

    //Creating the asteroid
    
    push();
    //     //Basic circle placeholder
    // fill(asteroid.fill.r, asteroid.fill.g, asteroid.fill.b);
    // ellipseMode(CENTER);
    // ellipse(asteroid.x, asteroid.y, asteroid.size);
    imageMode(CENTER);
    angleMode(DEGREES);
    image(asteroidImage, asteroid.x, asteroid.y, asteroid.size, asteroid.size);
    pop();



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
    let constraintEdges =   ship.size/2;

    ship.x  +=  ship.vx;
    ship.x  =   constrain(ship.x, constraintEdges, width - constraintEdges);
    ship.y  +=  ship.vy;
    ship.y  =   constrain(ship.y, constraintEdges, height - constraintEdges);

    //Creating the ship
    push();
    //     //Basic square placeholder
    // fill(ship.fill.r, ship.fill.g, ship.fill.b);
    // rectMode(CENTER);
    // rect(ship.x, ship.y, ship.size);
    imageMode(CENTER);
    image(shipImage, ship.x, ship.y, ship.size, ship.size);
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
    text('Score: ' + score + '  Time: ' + currentTimeSeconds, 10, 30);

    //Debugging: mouse location
    console.log(`mouse x: ${mouseX} mouse y: ${mouseY}`);
    if (mouseIsPressed === true)  {
        cursor(CROSS);
    }   else    {
        noCursor();
    }
}