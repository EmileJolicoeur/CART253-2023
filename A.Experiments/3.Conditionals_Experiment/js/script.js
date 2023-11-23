/**
 * Conditionals_Experiments
 * Emile Jolicoeur
 */

"use strict";


    //Outside of functions: sets values before start of P5  [Occurs as soon as file is loaded]
let clown   =   {
    x:  250,
    y:  250,
    size:   100,
    image:  undefined,
};

    //1st thing called automatically by P5  [Function ends only once all is loaded]
function preload()  {
    clown.image =   loadImage("assets/images/clown.png");
}

    //Called only once, when P5 is loaded
function setup()    {
    createCanvas(500, 500);
}

    //Called every 60th of sec. [Function happens over time]
function draw() {
    background(0);

    clown.x =   mouseX;
    clown.y =   mouseY;

    imageMode(CENTER);
    image(clown.image, clown.x, clown.y, clown.size, clown.size);
}

    //Called when event occurs
function mousePressed() {
    clown.size  +=  50;
}