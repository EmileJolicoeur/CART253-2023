/**
 * Whack a Mole!
 * Emile Jolicoeur
 * 
 * Add user                             [Done]
 * Alter fish mechanics/behavior        [Done]
 * Add fish properties                  [Done]
 * Add ending                           [Done]
 * 
 */

"use strict";

let simState    =   `start`;    //start, sim, win, lose

    //creating an empty array:
let moleNB  =   [];
let moleMaxNB  =   9;

let images  =   [];
let dirtImg;
let moleImg;
let hammerImg;

let ui  =   {
    t:  {
        sec:    undefined,
        maxSec: 40,
        countdown:  undefined,
    },
    points: 0,
    maxPoints:  9,
};

let hammer  =   {
    x:  undefined,
    y:  undefined,
    size:   50,
};



function preload()  {
    for (let i = 0; i < 3; i++) {
        images[i]   =   loadImage(`assets/images/WhackAMole-${i}.png`);
    }
}


function setup()    {
    createCanvas(windowWidth, windowHeight);
    //Applying images to names
    hammerImg   =   images[0];
    dirtImg =   images[1];
    moleImg =   images[2];

    //Applying amount of moles to screen
    for (let i = 0; i < moleMaxNB; i++)    {
        let mole   =   createMole(random(0, width), random(0, height));
        moleNB.push(mole);
    }
}


/** State-related Functions:    */
    //Stating simState functions:   //Done
function draw() {
    if (simState === `start`)   {
        background(50, 200, 0);
        startScreen();
    } else if (simState === `sim`)   {
        background(50, 200, 0);
        simulationScreen();
    } else if (simState === `win`)   {
        background(0);
        winScreen();
    } else if (simState === `lose`)   {
        background(0);
        loseScreen();
    }
}
    //Switching from the simulationScreen to win/loseScreens:   //Done
function simSwitch()  {
    if (ui.t.sec <= 0)  {
        simState    =   `lose`;
    } else if (ui.points >= ui.maxPoints)   {
        simState    =   `win`;
    }
}
    //Switching from startScreen to simulationScreen + switching from win/loseScreens to startScreen:   //Done
function stateSwitch()    {
    if (simState === `start`)   {
        simState = `sim`;
    } else if (simState === `win`   ||  simState === `lose`)    {
        window.location.reload();
        simState = `start`;
    }
}


/** Mole Obj:   */
    //The values of the mole
function createMole(x, y)   {
    let mole    =   {
        //nb: index,
        x:  x,
        y:  y,
        size:   random(40, 60),
        vx: 0,
        vy: 0,
        speed:  3,
        overlap:    false,
        hit:    false,
        trail:  [],
        trailSize:  20,
        //trailScale: 5,
    };
    console.log(`mole #: ${mole.index}\nx: ${mole.x}\ny: ${mole.y}`);
    return mole;
}
    //Verifying if the mole gets slammed by the hammer [if so, adds 1 point]
function checkMole(mole)    {
    if (mole.hit === false)  {
        let d   =   dist(hammer.x, hammer.y, mole.x, mole.y);
        if (d < hammer.size/2 + mole.size/2 &&  mousePressed)    {  //Overlap
            mole.overlap    =   true;
            if (mouseIsPressed === true)  {                         //Overlap && hammerSlam
                mole.hit    =   true;
                ui.points   +=   1;
                
                //console.log(`+1 pt!`);
            }   else {                                              //Overlap && !hammerSlam
                mole.hit    =   false;
            }
        }   else    {                                               //!Overlap
            mole.overlap    =   false;
        }
    }

    console.log(`O: ${mole.overlap}\nH: ${mole.hit}`);
}
    //The different pathings of the moles:      *for some reason, moving each path into their own function would not work*
function moveMole(mole) {
    
    //Move the fish
    mole.x  +=  mole.vx;
    mole.y  +=  mole.vy;

    //Constrain fish location
    mole.x  =   constrain(mole.x, 0, width);
    mole.y  =   constrain(mole.y, 0, height);

    if (ui.points <= 4)    {
            //If direction change
        let change  =   random(0, 1);
        if (change < 0.05)  {
            mole.vx =   random(-mole.speed, mole.speed);
            mole.vy =   random(-mole.speed, mole.speed);
        }
            //Setting speed (panic/agitated moles)
        if (ui.points >=1)  {
            mole.speed  =   5;
        }

    } else if (ui.points > 4)   {
        mole.speed    =   7;
            //distance between moles & hammer
        let dx  =   mole.x - hammer.x;
        let dy  =   mole.y - hammer.y;

            //changing direction in relation to hammer position
        if  (dx > 0)    {
            mole.vx   =   mole.speed;
        }   else if (dx < 0)    {
            mole.vx   =   -mole.speed;
        }
        if  (dy > 0)    {
            mole.vy   =   mole.speed;
        }   else if (dx < 0)    {
            mole.vy   =   -mole.speed;
        }
    }
    
}
    //Making a dirt trail for the mole:
function moleTrail(mole)    {

    //mole.trailScale =   mole.size - mole.trailScale;

    for (let i = 0; i < mole.trail.length; i++) {
        let position    =   mole.trail[i];
        //image(CENTER);
        push();
        imageMode(CENTER);
        image(dirtImg, position.x, position.y, mole.size + (3*i)/2, mole.size + (3*i)/2);  //Image
        pop();
    }
    imageMode(CENTER);
    image(dirtImg, mole.x, mole.y,mole.size, mole.size);        //Image

    let newTrailPosition    =   {
        x:  mole.x,
        y:  mole.y,
    };
    mole.trail.push(newTrailPosition);

    if (mole.trail.length > mole.trailSize) {
        mole.trail.shift();
    }

    //mole.trailScale -=  mole.size;
}
    //Displaying the mole on different states (dead or alive)
function displayMole(mole)  {
    
    if (mole.hit)    {                                     //When hit, go offscreen & become still
        mole.vx =   0;
        mole.vy =   0;

        push();
        fill(100, 50, 0);
        noStroke();
        imageMode(CENTER);
        image(moleImg, mole.x, mole.y, mole.size, mole.size);
        pop();
    } else {
        push();
        fill(100, 50, 0);
        noStroke();
        imageMode(CENTER);
        image(dirtImg, mole.x, mole.y, mole.size, mole.size);
        pop();
    }
}


/** Hammer Obj: */
    //Hammer follows the mouse
function moveHammer() {
    hammer.x    =   mouseX;
    hammer.y    =   mouseY;
}
function displayHammer()  {     //Change image
    push();
    fill(255);
    imageMode(CENTER);
    image(hammerImg, hammer.x, hammer.y, hammer.size, hammer.size);
    pop();
}


/** UI Elements:    */
    //Create countdown timer
function countdown()    {

    //Counting down seconds
    ui.t.countdown  =   round(millis()/1000);
    if (ui.t.sec != ui.t.maxSec - ui.t.countdown  && simState === `sim`)    {
        ui.t.sec  =   ui.t.maxSec - ui.t.countdown;

        console.log(`time: ${ui.t.sec}`);
    }
}
    //Displaying the countdown and points
function displayUI()   {
    if (ui.t.sec <= 0)  {
        simState    =   `lose`;
    } else if (ui.points >= ui.maxPoints)   {
        simState    =   `win`;
    }
    
    push();
    textAlign(CENTER);
    textSize(32);
    fill(255);
    text(`Time: ${floor(ui.t.sec)}\nPoints: ${ui.points}`, width/2, 40);
    pop();
}


/** ScreenTypes:    */
function startScreen()  {
    push();
    textAlign(CENTER);
    textSize(32);
    fill(10, 10, 230);
    text(`Start`, width/2, height/2);
    pop();
}
function simulationScreen() {
    for (let i = 0; i < moleNB.length; i++) {    
    checkMole(moleNB[i]);
    moleTrail(moleNB[i]);
    displayMole(moleNB[i]);
    
    }    

    for (let i = 0; i < moleNB.length; i++) {
        //roamPathing(moleNB[i]);
        //escapePathing(moleNB[i]);
        moveMole(moleNB[i]);
    }
    
    //Hammer object
    moveHammer();
    displayHammer();

    countdown();
    displayUI();
    simSwitch();
}
function winScreen()    {
    push();
    textAlign(CENTER);
    textSize(32);
    fill(10, 10, 230);
    text(`Moles Defeated!`, width/2, height/2);
    pop();
}
function loseScreen()   {
    push();
    textAlign(CENTER);
    textSize(32);
    fill(10, 10, 230);
    text(`The moles have escaped!`, width/2, height/2);
    pop();
}



function mousePressed() {
    stateSwitch()
}