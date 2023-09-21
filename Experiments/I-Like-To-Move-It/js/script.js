/**
 I-Like-To-Move-It
 Emile Jolicoeur
 
 Exercise 1 Requirements:
 - Declaring and changing variables
 - Must have 3 shapes with movement, size and color change
 - Response to mouse position
 - Applying map () and constraint()
 */

"use strict";

let backgroundShade = 0;


//spotlight
let circle = {
    x:      0,
    y:      0,
    size:   150,
    speed:  5,
    fill:   255,
    hit:    0,
};


function preload() {

}


// Just a canvas taking the whole screen
function setup() {

    createCanvas(windowWidth, windowHeight);
    circle.x = 0;
    circle.y = height / 2;
}

//
function draw() {

    //Setting the Background
    background(backgroundShade, 0, 0);
    

    circle.x += circle.speed;
    /** to change*/circle.fill = map(mouseY, 0, height, 0, 255);

    //creating the Spotlight
    noStroke();
    ellipseMode(CENTER);
    fill(255, circle.fill, circle.fill);
    ellipse(circle.x, circle.y,circle.size);

    //Moving the Spotlight
    if (circle.x >= width) {
        circle.speed = 0;
        circle.size *= 1.03;
        circle.hit = circle.hit+1
        console.log(`CircleHit ${circle.hit}`)
    
        //Transition from Spotlight to GunBarrel
        if (circle.size >= height / 2) {
            circle.speed = -3;
            circle.x += circle.speed;
        }
    }

    //If the barrel is on it's way back, stop at the center of the screen
    if (circle.x <= width / 2 && circle.hit > 0) {
        circle.speed = 0;

        console.log(`Awaiting Input`);
        backgroundShade = 1;
    }

    //Shooting the shot
    if (mousePressed === true && circle.hit >0) {
        console.log(`Bang!`);
        backgroundShade *= 50;
    }


    /** looping through the wall
    if (circle.x > width)   {
        circle.x = 0;
    }   else    {
        console.log(`Wall Breach!`);
    }
    */

    //circle.size = constraint(mouseX, 0, width);
    //mapping mouseX from the width 255 to 200 
    //circle.fill = map(mouseX, 0, width, 255, 200);

//Casino icons
    //Diamonds:
/**
let quad ={
    x1: 50,
    y1: 62,
    x2: 86,
    y2: 50,
    x3: 50,
    y3: 38,
    x4: 14,
    y4: 50,


}
    quad(quad.x1, quad.y1, quad.x2, quad.y2, quad.x3, quad.y3, quad.x4, quad.y4);
*/


}