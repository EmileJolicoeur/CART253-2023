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

    //Restraint variables:
    let leftWall = width /3;
    let rightWall = 2*width /3;

    //rectangle
    let rectangle = {
        x: width / 2,
        y: height / 50,
        h: 20,
        fill: mouseX
    };
    let rectangleW = constrain(mouseX, leftWall, rightWall);

    //Randomized triangle
    let tri = {
        x: 0,
        y: 0,
        fill: 255,
    };

    //Setting the Background
    background(backgroundShade, 0, 0);

    //Making a randomized triangle
    tri.x = random(0, width);
    tri.y = random(0, height);

    fill(tri.fill, 0, tri.fill);
    triangle(tri.x, height / 3, 4*width / 7, 2*height / 5, 50, tri.y);
    
    //Rectangle
    fill(0, rectangle.fill, 0);
    rectMode(CENTER);
    rect(rectangle.x, rectangle.y, rectangleW, rectangle.h);

    circle.x += circle.speed;
    circle.fill = map(mouseY, 0, height, 0, 255);

    //creating the JamesBond Spotlight
    noStroke();
    ellipseMode(CENTER);
    fill(255, circle.fill, circle.fill);
    ellipse(circle.x, circle.y, circle.size);
    
    //Moving the Spotlight
    if (circle.x >= width) {
        circle.speed = 0;
        circle.size *= 1.03;
        circle.hit = circle.hit+1
        console.log(`CircleHit ${circle.hit}`);
    
        //Transition from Spotlight to GunBarrel
        if (circle.size >= height / 2) {
            circle.speed = -3;
            circle.x += circle.speed;
        }
    }

    //If the barrel is on it's way back, stop at the center of the screen
    if (circle.x <= width / 2 && circle.hit > 0) {
        circle.speed = 0;
    }
}