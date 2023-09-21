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
let circleX;
let circleY;
let circleSize = 100;


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
    circleX = width / 2;
    circleY = height / 2;
}


/**
 * Description of draw()
*/
function draw() {
/** Video 1
    background(0, 255, 0);
    rectMode(CENTER);
    rect(width / 2, height / 2, -mouseX, -mouseY);
*/

/** Video 2: */
    background(backgroundShade);
    ellipse(circleX, circleY, circleSize);

    
}