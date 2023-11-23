/**
 * Variables Experiment
 * Emile Jolicoeur
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

//Declaring & Assigning values to variables:
let backgroundShade = 0;

/**
let circleX;
let circleY;
let circleSize = 100;
let circleSpeed = 1;
*/

let circle = {
    x: 0,
    y: 0,
    size: 100,
    speed: 5,
    fill: 255,
};

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight);
    circle.x = 0;
    circle.y = height / 2;
}

function draw() {
/** Video 1
    background(0, 255, 0);
    rectMode(CENTER);
    rect(width / 2, height / 2, -mouseX, -mouseY);
*/

/** Video 2: */
    background(backgroundShade, 0, 0);
    ellipseMode(CENTER);

    circle.x += circle.speed;
    
    //translate(circle.speed, 0);
    circle.fill = map(mouseY, 0, height, 0, 255);
    fill(255, circle.fill, circle.fill);
    ellipse(circle.x, circle.y, circle.size);

    if (circle.x >= width) {
        circle.speed = 0;
        circle.size *= 1.03;
        console.log(`Hit 1`);
        
        if (circle.size >= height / 2) {
            circle.speed = -3;
            //circle.x += circle.speed;
            console.log(`Hit 2`);
        }
        
            if(circle.x < width / 2) {
             circle.speed = 0;
            console.log(`Hit 3`);    
        }
    }

/**Debugging
    console.log("circleX: " + circle.x);
    console.log("circleY: " + circle.y);
    */
//or...
    console.log(`circleX: ${circle.x}, circleY: ${circle.y}, circleSize: ${circle.size}, circleSpeed: ${circle.speed}`);

/**Random nb. variable:
let randomNumber = random();
console.log(randomNumber);
*/
}