/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

// //Video 5.1:    Functions

// let circle  =   {
//     x:  0,
//     y:  250,
//     size:   100,
//     vx: 1,
//     vy: 0,
// }

// function preload() {

// }

// function setup() {
//     createCanvas(500, 500);
// }

// function draw() {
//     background(0);

//     move();
//     wrap();

//     display();
// }

//     //adding velocity
// function move() {
//     circle.x    +=  circle.vx;
//     circle.y    +=  circle.vy;
// }

//     //wraping the circle around the screen
// function wrap() {
//     if  (circle.x > width)  {
//         reset();
//     }
// }

//     //drawing circle
// function display()  {
    
//     fill(255, 0, 0);
//     ellipse(circle.x, circle.y, circle.size);
// }

//     //Creating man-made function:  reset
// function reset()    {
//     circle.x    =   0;
//     circle.vx   +=  2;
//     circle.vy   +=  random(-0.25, 0.25);
//     circle.size +=  5;
// }

// function mousePressed() {
//     reset();
// }


// //Video 5.2:  Functions with parameters [in ()]

// function setup()    {
//     createCanvas(500, 500);
// }

// function draw() {
//     background(0);

//     parallels(50,   50,         25, 10,  0.5,  20);
//     parallels(200,  height/2,   10, 17, 7,  40);
//     parallels(114,  2*height/3, 14, 20,  15, 3);
// }

// function parallels(x, y, lineNb, lineSpace, lineW, lineH)    {
//     for (let i = 0; i < lineNb; i++)  {
//         noStroke();
//         fill(0, 255, 0);
//         rectMode(CENTER);
//         rect(x, y, lineW, lineH);      //make a line
//         x   +=  lineSpace;

//     }
// }


// //Video 5.3:    Functions with return values

// let circle  =   {
//     x:  250,
//     y:  250,
//     size:   100,
//     vx: 0,
//     vy: 0,
// }

// function setup()    {
//     createCanvas(500, 500);
//     reset();

//     //hotCelsius is toCelsius * 100 degrees
//     let hotCelsius  =   toCelsius(100);
//     console.log(`100 degrees fahrenheit ${hotCelsius} degrees celsius`);

//     let coldCelsius =   toCelsius(10);
//     console.log(`10 degrees fahrenheit ${coldCelsius} degrees celsius`);
// }

// function draw() {
//     background(0);

//     move();
//     checkOffscreen();
//     display();

//     // let x   =   random(0, width);
//     // let y   =   random(0, height);
//     // ellipse(x, y, 100);
// }
//     //Converting fahrenheit to Celsius
// function toCelsius(fahrenheit)    {
//     let celsius =   (fahrenheit - 32) * 5/9;
//     return celsius;
// }

// function move() {
//     circle.x    +=  circle.vx;
//     circle.y    +=  circle.vy;
// }

// function checkOffscreen()   {
//     let offscreen   =   circleOffscreen();
//     if  (offscreen) {
//         reset();
//     }
// }

// function circleOffscreen()  {
//     if  (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
//         return true;
//     }   else    {
//         return false;
//     }
// }

// function display()  {
//     ellipse(circle.x, circle.y, circle.size);
// }

// function reset()    {
//     circle.x    =   250;
//     circle.y    =   250;
//     circle.vx   =   random(-10, 10);
//     circle.vy   =   random(-10, 10);
// }


// //Video 5.4:    Text    [strings]

// // //3 different ways to do it:
// //     //Problem:  Cannot do double quotes in string, unless use /"[...]""/
// // let hamlet1 =   "To be or not to be";
// //     //Problem:  Cannot do single quotes in string, unless...    [see above]
// // let hamlet2 =   'That is the question';
// //     //
// // let hamlet3 =   `Whether 'tis nobler in the mind`;

// // let name    =   "Hamlet";
// // let title   =   "Prince";
// // let country =   "Denmark";


// // let string1 =   "Hi, my name is" + name + ', ' + title + " of " + country +"!";
// //     //${...} for `` txt
// // let string3  =   `Hi, my name is ${name}, ${title} of ${country}!`;

// let hello   =   {
//     string: `Hello, world!`,
//     x:  250,
//     y:  250,
//     vx: 5,
//     vy: 1,
//     size:   40,
// }

// function setup()    {
//     createCanvas(500, 500);
// }

// function draw() {
//     background(100);

//     hello.x +=  hello.vx;
//     hello.y +=  hello.vy;
//     hello.size  ++;
    
//     textAlign(CENTER, CENTER);
//     textSize(hello.size);
//     textStyle(BOLD);

//     fill(20, 255, 30);
//     stroke(0, 0, 100);
//     strokeWeight(10);
//     text(hello.string, hello.x, hello.y);
// }


// //Video 5.5:    States

// let circle  =   {
//     x:  0,
//     y:  0,
//     size:   100,
//     vx: 0,
//     vy: 0,
//     speed:  2,
// };

// let state  =    `title`;    //possible states = title, animation, ending

// function setup()    {
//     createCanvas(500, 500);
//     circle.y    =   height/2;
//     circle.vx   =   circle.speed;
    
//     textSize(32);
//     textAlign(CENTER, CENTER);
// }

// function draw() {
//     background(0);

//     if (state === `title`)    {
//         title();
//     }   else if (state === `animation`) {
//         anim();
//     }   else if (state === `ending`)    {
//         end();
//     }
// }

//     //Title Txt
// function title()    {
//     fill(255);
//     text(`Life.`, width/2, height/2);
// }
//     //Animation
// function anim() {
//     circle.x    +=  circle.vx;
//     circle.y    +=  circle.vy;

//     if (circle.x > width)   {
//         state   =   `ending`;
//     }

//     ellipse(circle.x, circle.y, circle.size);
// }
//     //Ending Txt.
// function end()  {
//     fill(127);
//     text(`It's all over`, width/2, height/2);
// }

// function keyPressed()   {
//     if (state === `title`)  {
//         state   =   `animation`;
//     }  
// }


// //Video 5.6:    KeyboardInput

// let bg  =   0;

// function setup()    {
//     createCanvas(500, 500);
// }

// function draw() {
//     background(bg);

//     // textAlign(CENTER, CENTER);
//     // textSize(64);
//     // fill(255);
//     // text(keyCode, width/2, height/2);

//     if (keyIsDown(65))  {
//         rectMode(CENTER);
//         rect(250, 250, 100, 100)
//     }
// }

//     /**key  =   latest key pressed
//      * keyCode  =   ASCII nb        [keycode.info = great way to find ASCII nb]*/
// // function keyPressed()   {
// //     bg  =   random(0, 255);

// //     if  (key    === `a`)    {
// //         bg  =   0;
// //     }   else if (key === `s`)   {
// //         bg  =   100;
// //     }   else if (key === `d`)   {
// //         bg  =   255;
// //     }

// //         //keyPressed, keyReleased, keyTyped
// //     if (keyCode === 38  /**UP_ARROW*/)  {
// //         bg  +=  10;
// //         bg  =   constrain(bg, 0, 255);
// //     }   else if (keyCode === 40 /**DOWN_ARROW*/)    {
// //         bg  += -10;
// //         bg  =   constrain(bg, 0, 255);
// //     }
// // }


//Video 5.7:    Automated movement:

let circle  =   {
    x:  250,
    y:  250,
    size:   100,
    vx: 0,
    vy: 0,
    speed:  2,
};

function setup()    {
    createCanvas(500, 500);

    // circle.vx   =   circle.speed;
    // circle.vy   =   circle.speed;
}

function draw() {
    background(0);

    // //Using random for pathing:
    // let change  =   random();
    // if  (change <   0.01)   {
    //     circle.vx   =   random(-circle.speed, circle.speed);
    //     circle.vy   =   random(-circle.speed, circle.speed);
    // }

    let dx  =   circle.x    -   mouseX;   //dx = difference in x axis
    let dy  =   circle.y    -   mouseY;

    if (dx < 0) {
        circle.vx   =   circle.speed;
    }   else if (dx > 0)    {
        circle.vx   =   -circle.speed;
    }

    if (dy <0)  {
        circle.vy   =   circle.speed;
    }   else if (dy > 0)    {
        circle.vy   =   -circle.speed;
    }

    circle.x    +=  circle.vx;
    circle.y    +=  circle.vy;

    ellipse(circle.x, circle.y, circle.size);
}
