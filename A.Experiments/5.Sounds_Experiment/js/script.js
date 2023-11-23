
//Video 1:  Basic Sounds

let barkSFX;
function preload()  {
    barkSFX =   loadSound(`assets/sounds/bark.wav`);
}
function setup() {
    createCanvas(500, 500);
}
function draw() {
    background(0);
}

function mousePressed() {
    barkSFX.play();         //Plays SFX once when mouse pressed
}

function keyPressed() {
    if (!barkSFX.isPlaying())   {
        barkSFX.loop();         //Plays SFX in loop when key pressed
    }                           //if statement makes it on/off
}


// //Video 2:  "use strict"
//     /**"use strict" prevents accidental variable creation*/

// "use strict";

// let circle  =   {
//     x:  0,
//     y:  0,
//     size:   100,
// };

// function setup()    {
//     createCanvas(500, 500);
// }

// function draw() {
//     background(0);

//     circle.x    =   mouseX;
//     circley     =   mouseY;         //error does not appear in console because it is considered as a new variable
//                                     //with "use strict", it does appear as error

//     ellipse(circle.x, circle.y, circle.size);
// }