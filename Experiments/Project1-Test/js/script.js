/**
 * Title of Project
 * Emile Jolicoeur
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";


//States of Simulation
let state   =   `Solving`;        //Start, Solving, Fail, Success

//BackgroundValues
let bg  =   {
    x:  0,
    y:  0,
    size:   1000,
}
    //Background Display:
let bgImage;

//Briefcase values
let bomb    =   {
    x:  undefined,
    y:  undefined,
    size1:  256,
    size2:  512,
}
    //Orientation of briefcase
let perspective =   `Mid`;      //Top, Mid, Bot
let faceView    =   `Front`;    //Front, Right, Back, Left
    //Briefcase Display:
let briefcaseF;
let briefcaseS;
let briefcaseT;
let briefcaseB;

/**Time values (Timer module)*/
    //Minutes
let maxMin   =   undefined;
let minMin  =   0;
let timeMin =   undefined;
let countdownMin    =   undefined;
    //Seconds
let maxSec  =   60;
let minSec  =   0;
let timeSec =   undefined;
let countdownSec    =   undefined;

/**Loading images   */
function preload()  {
    //Background Image:
    bgImage     =   loadImage(`assets/images/Sim_Background.png`);
    //Briefcase Images:
    briefcaseF  =   loadImage(`assets/images/Suitcase_F.png`);
    briefcaseS  =   loadImage(`assets/images/Suitcase_S.png`);
    briefcaseT  =   loadImage(`assets/images/Suitcase_T.png`);
    briefcaseB  =   loadImage(`assets/images/Suitcase_B.png`);

    //Module Images:
}

//
function setup() {
    createCanvas(windowWidth, windowHeight);

//Whole bomb
    bombCase();

//Timer starting value:
    maxMin =   5;//round(random(5, 8));
    
}
//Position of the Briefcase:
function bombCase()    {
//Position of Case
    bomb.x  =   width/2;
    bomb.y  =   height/2;
}

function draw() {
//Background
    background(0);
    backgroundSprite();

//

//Hud Components:
    perspectives();

    //Displaying countdown:
        //Calculating seconds & minutes
    countdownSec    =   round(millis()/1000);
    countdownMin    =   countdownSec/120;
        //making the numbers count down
    timeSec =   maxSec - countdownSec;
    timeMin =   round(maxMin - countdownMin);       //for some reason, 1st minute is fine, but next nb decrease happens after 2 minutes
    
    
    while (timeSec < minSec)   {
        timeSec +=  maxSec;
    }

    if (timeMin <= 0    &&  timeSec <= 0)   {
        let state = `Fail`;
    }

    console.log(`Time: ${countdownMin}`);

    timerDisplay();
}

function timerDisplay() {
    textAlign(CENTER);
    textSize(32);
    fill(255, 0, 0);
    text(timeMin + ':' + timeSec, width/3, height/3);
}

function backgroundSprite() {
    //Background Position
    bg.x    =   width/2
    bg.y    =   height/2

    //Display Background
    push();
    imageMode(CENTER);
    image(bgImage, bg.x, bg.y, bg.size, bg.size);
    pop();
}



//Briefcase Orientation Setup:
function perspectives() {
    if (perspective === `Mid`)  {
        faces();

        console.log(`Mid-${faceView}`);
    }   else if (perspective === `Top`) {
        topView();

        console.log(`Top`);
    }   else if (perspective === `Bot`) {
        bottomView();

        console.log(`Bot`);
    }
}
    //Briefcase Vertical Perspective:   [Top, Middle or Bottom]
function topView()  {
    //Display Case:
    push();
    imageMode(CENTER);
    image(briefcaseT, bomb.x, bomb.y, bomb.size2, bomb.size1);
    pop();
}
function bottomView()   {
    //Display Case:
    push();
    imageMode(CENTER);
    image(briefcaseB, bomb.x, bomb.y, bomb.size2, bomb.size1);
    pop();
}

function faces()    {
    if (faceView === `Front`)   {
        frontView();
    }   else if (faceView === `Right`)  {
        rightView();
    }   else if (faceView === `Back`)   {
        backView();
    }   else if (faceView === `Left`)   {
        leftView();
    }
}
    //Briefcase Middle Orientation: [Front, Right, Back, Left]
function frontView()    {
    //Display Case:
    push();
    imageMode(CENTER);
    image(briefcaseF, bomb.x, bomb.y, bomb.size2, bomb.size2);
    pop();
}
function rightView()    {
    //Display Case:
    push();
    imageMode(CENTER);
    image(briefcaseS, bomb.x, bomb.y, bomb.size1, bomb.size2);
    pop();
}
function backView() {
    //Display Case:
    push();
    imageMode(CENTER);
    image(briefcaseF, bomb.x, bomb.y, - bomb.size2, bomb.size2);
    pop();
}
function leftView() {
    //Display Case:
    push();
    imageMode(CENTER);
    image(briefcaseS, bomb.x, bomb.y, bomb.size1, bomb.size2);
    pop();
}

//Controls
    //Orientation:
function arrows()   {
    perspectiveArrows();
    faceArrows();
}
function perspectiveArrows()    {
    //Top arrow
    if (mouseY <= 100)  {
        if (perspective === `Bot`) {
            perspective = `Mid`;
        }   else if (perspective === `Mid`)  {
            perspective = `Top`;
        }
    }
    //Bottom arrow
    if (mouseY >= height - 100)  {
        if (perspective === `Top`) {
            perspective = `Mid`;
        }   else if (perspective === `Mid`)  {
            perspective = `Bot`;
        }
    }
}
function faceArrows()   {
    
    if (perspective === `Mid`)  {
        //Left arrow
        if (mouseX <= (width/2) - 400)  {
            if (faceView === `Front`)   {
                faceView = `Left`;
            }   else if (faceView === `Left`)   {
                faceView = `Back`;
            }   else if (faceView === `Back`)   {
                faceView = `Right`;
            }   else if (faceView === `Right`)   {
                faceView = `Front`;
            }
        }
        //Right arrow
        if (mouseX >= (width/2) + 400)  {
            if (faceView === `Front`)   {
                faceView = `Right`;
            }   else if (faceView === `Right`)   {
                faceView = `Back`;
            }   else if (faceView === `Back`)   {
                faceView = `Left`;
            }   else if (faceView === `Left`)   {
                faceView = `Front`;
            }
        }
    }
    
}


function mousePressed() {
    arrows();

    console.log(`Click! (x = ${mouseX}, y = ${mouseY})`);
}