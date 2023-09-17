/**
 * Drawing_Experiment
 * Emile Jolicoeur
 * 
 * Making an alien out of shapes in JavaScript!
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {

    createCanvas(500, 500);
    background(0, 0, 0);
    let r = random(0, 255);

//Head Mantle Shape
    noStroke();
    fill(40, 40, 100);
    ellipse(250, 240, 450);
    ellipse(250, 240, 450);
    fill(0, 0, 0);
    rect(0, 250, 500, 260);

//Shoulders
    rectMode(CENTER);
    fill(200, 200, 200);
    triangle(200, 400, 250, 150, 300, 400);
    fill(50, 70, 100);
    rect(250, 430, 450, 140, 100, 100, 0, 0);

//Head
    ellipseMode(CENTER);
    ellipse(250, 220, 175);
    fill(0, 0, 0);
    ellipse(160, 290, 100);
    ellipse(340, 290, 100);
    noFill();
    strokeWeight(5);
    stroke(30, 0, 50);
    bezier(165, 200, 200, 190, 300, 190, 335, 200);
    
//FaceDetails
    noFill();
    strokeWeight(5);
    stroke(30, 0, 50);
    bezier(165, 200, 200, 190, 300, 190, 335, 200);
    strokeWeight(2);
    bezier(200, 260, 200, 190, 300, 190, 300, 260);

}


/**
 * Description of draw()
*/
function draw() {

 fill(random(0,255), random(0,255), random(0,255));
    ellipse(250, 200, 50);
    bezier(200, 75, 265, 45, 235, 45, 300, 75);
    bezier(200, 75, 265, 105, 235, 105, 300, 75);

//EyeMovement
    fill(0, 0, 0);
    noStroke();
    translate(mouseX*0.025, mouseY*0.025);
    circle(250, 200, 10);
    circle(250, 75, 10);

}