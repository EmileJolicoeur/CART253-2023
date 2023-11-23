
"use strict";

/**Video 1: IntermediateFunctions */
// let user    =   {
//     x:  0,
//     y:  0,
//     size:   100,
// };
// let food1;
// let food2;
// let food3;
// let food4;
// let food5;
// let food6;
// function setup() {
//     createCanvas(windowWidth, windowHeight);
//     food1   =   createFood(250, height/2);
//     food2   =   createFood(350, height/2);
//     food3   =   createFood(450, height/2);
//     food4   =   createFood(550, height/2);
// }
// function createFood(x, y)   {
//     let food    =   {
//         x:  x,
//         y:  y,
//         size:   50,
//         eaten:  false,   //Tracking if eaten or not
//     };
//     return food;
// }
// function draw() {
//     background(0);

//     moveUser();

//     //If food is eaten or not
//     checkFood(food1);
//     checkFood(food2);
//     checkFood(food3);
//     checkFood(food4);

//     //Display
//     displayUser();
//     displayFood(food1);
//     displayFood(food2);
//     displayFood(food4);
// }
// //checks if food1 is eaten
// function checkFood(food)   {
//     //Checking for overlap:
//     if (!food.eaten)   {
//         let d   =   dist(user.x, user.y, food.x, food.y);
//         if (d < user.size/2 + food.size/2) {
//             food.eaten = true;
//         }
//     }
// }
// //Controls
// function moveUser() {
//     user.x  =   mouseX;
//     user.y  =   mouseY;
// }
// //Display
// function displayUser()  {
//     push();
//     fill(255);
//     ellipse(user.x, user.y, user.size);
//     pop();
// }
// function displayFood(food)  {
//     if (!food.eaten)   {
//         push();
//         fill(255, 100, 100);
//         ellipse(food.x, food.y, food.size);
//         pop();
//     }
// }


/**Video 2: Introduction Arrays*/
//     //creating an empty array:
// let school  =   [];
// let schoolSize  =   4;

// function setup()    {
//     createCanvas(1000, 1000);
//     //Creating array in box
//         //for loop
//     for (let i = 0; i < schoolSize; i++)    {
//     //Arrays hold property: push    =   adds variable to array variable
//         // let fish    =   createFish(random(0, width), random(0, height));
//         // school.push(fish);

//     //variableName["Index"]   =   "Elements"
//     //index = i = 0, 1, 2, 3
//         school[i]   =   createFish(random(0, width), random(0, height));
//     }
// }

// function createFish(x, y)   {
//     let fish    =   {
//         x:  x,
//         y:  y,
//         size:   50,
//         vx: 0,
//         vy: 0,
//         speed:  2,
//     };
//     return fish;
// }

// function draw() {
//     background(0);
//         //Arrays hold property: length  =   Holds total nb of Indexes in array
//     for (let i = 0; i < school.length; i++) {
//         moveFish(school[i]);
//     }
//     //Could move displayFish in previous loop. EXCEPTION:   if move All fish before display All fish
//     for (let i = 0; i < school.length; i++) {
//         displayFish(school[i]);
//     }    
// }

// function moveFish(fish) {
//     //If direction change
//     let change  =   random(0, 1);
//     if (change < 0.05)  {
//         fish.vx =   random(-fish.speed, fish.speed);
//         fish.vy =   random(-fish.speed, fish.speed);
//     }

//     //Move the fish
//     fish.x  +=  fish.vx;
//     fish.y  +=  fish.vy;

//     //Constrain fish location
//     fish.x  =   constrain(fish.x, 0, width);
//     fish.y  =   constrain(fish.y, 0, height);
// }

// function displayFish(fish)  {
//     push();
//     fill(200, 200, 100);
//     noStroke();
//     ellipse(fish.x, fish.y, fish.size);
//     pop();
// }

// function mousePressed() {
//     let fish    =   createFish(mouseX, mouseY);
//     school.push(fish);
// }


/**Video 3: More Arrays*/

/**Ex1:*/
// let fortunes    =   [
//     `Answer 1`,
//     `Answer 2`,
//     `Answer 3`,
//     `Answer 4`,
//     `...`,
// ];

// let chosenFortune   =   `Click to see your fortune`;

// function setup()    {
//     createCanvas(windowWidth, windowHeight);
//     textAlign(CENTER, CENTER);
//     textSize(32);
//     fill(255);
// }

// function draw() {
//     background(0);
//     text(chosenFortune, width/2, height/2);
// }

// function mousePressed() {
//     chosenFortune   =   random(fortunes);
// }

// let chosenFortune   =   `Click to see your fortune`;

/**Ex2:*/
// let soliloquy   =   [
//     `To be or not to be?`,              //Index 0
//     `That is the question.`,            //Index 1
//     `Whether 'tis nobler in the mind`,  //      2
//     `to suffer the slings and arrows`,  //  [...]
//     `of outrageous fortune`,   
//     `Or to take arms`,
//     `Against a sea of arrows`,
//     `And by opposing end them.`,
// ];

// let currentIndex    =   0;

// function setup()    {
//     createCanvas(windowWidth, windowHeight);
//     textAlign(CENTER, CENTER);
//     textSize(32);
//     fill(255);
// }

// function draw() {
//     background(0);
//     text(soliloquy[currentIndex], width/2, height/2);
// }

// function mousePressed() {
//     currentIndex    +=  1;

//     if (currentIndex === soliloquy.length)  {
//         //Stays at last line
//         currentIndex    =   soliloquy.length -1;
//         //Return to beginning
//         //currentIndex    =   0;
//     }
// }

/**Ex3:*/
// let circle  =   {
//     x:  0,
//     y:  0,
//     size:   100,
//     trail:  [],
//     trailSize:  20,
// };

// function setup()    {
//     createCanvas(windowWidth, windowHeight);
// }

// function draw() {
//  background(0);

//     circle.x    =   mouseX;
//     circle.y    =   mouseY;

//     for (let i = 0; i < circle.trail.length; i++)   {
//         let position    =   circle.trail[i];
//         ellipse(position.x, position.y, circle.size);
//     }

//     ellipse(circle.x,   circle.y,   circle.size);

//     //Remembering circlePosition
//     let newTrailPosition    =   {
//         x:  circle.x,
//         y:  circle.y,
//     };
//     circle.trail.push(newTrailPosition);

//     if (circle.trail.length > circle.trailSize) {
//         //shift()   =   moves the array down by 1 ()
//         circle.trail.shift();
//     }
// }

/**Ex4:*/
// let barkSFX;

// let rates   =   [-2.25, -2, -1.75 ,-1.5, 1.5, 1.75, 2, 2.25, ];

// function preload()  {
//     barkSFX =   loadSound(`assets/sounds/bark.wav`);
// }

// function setup()    {
//     createCanvas(windowWidth, windowHeight);
// }

// function draw() {
//     background(0);
// }

// function mousePressed() {
//     let randomRate    =   random(rates);

//     //Changes playback rate (pitch + speed)
//     barkSFX.rate(randomRate);
//     barkSFX.play();
// }

/**Ex5:*/
let images  =   [];
let displayImage;

function preload()  {

    for (let i = 0; i < 10; i++)    {
        //nb of image = nb in image name
        images[i]   =   loadImage(`assets/images/InsertImgHere${i}.png`);

        let clownImage  =   loadImage(`assets/images/InsertImgHere${i}.png`);
        images.push(clownImage);
    }

    // //Loading original Images
    // images[0]   =   loadImage(`assets/images/InsertImgHere0.png`);
    // images[1]   =   loadImage(`assets/images/InsertImgHere1.png`);
    // images[2]   =   loadImage(`assets/images/InsertImgHere1.png`);
    // //                          [...]
}

function setup()    {
    createCanvas(windowWidth, windowHeight);

    displayImage    =   random(images);
}

function draw() {
    background(0);


    push();
    mageMode(CENTER);
    images(displayImage, width/2, height/2);
    pop();
}