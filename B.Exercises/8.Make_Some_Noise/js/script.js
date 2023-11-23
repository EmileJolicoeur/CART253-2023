/**
 * Make Some Noise!
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let balls   =   [];

/** */
function preload() {

}


/** Creates Canvas*/
function setup() {
    createCanvas(window.innerWidth, windowHeight);

    userStartAudio();
}


/** */
function draw() {
    background(30);

    for (let i = 0; i < balls.length; i++)  {
        let ball    =   balls[i];
        ball.move();
        ball.bounce();
        ball.display();

    }
}

function mousePressed() {
    createBall(mouseX, mouseY);
}

function createBall(x, y)   {
    let ball    =   new Ball(x, y);
    balls.push(ball);
}