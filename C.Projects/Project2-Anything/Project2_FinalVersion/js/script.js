/**
 * Keep Trying and don't  Detonate!
 * Emile Jolicoeur
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";


/** Image Variables:    */
let caseImg =                   [];
let modImg  =                   [];
let wiresImg    =               [];

/** Image values:   */
let disBackground;
let disBombX, disBombY, disBombT, disBombB;
let disTIM, disBTN, disWIR, disWAG;
let disBlaWire, disCyaWire, disMagWire, disYelWire, disRedWire;
let disBlaWireH, disCyaWireH, disMagWireH, disYelWireH, disRedWireH;

/** The Background values:  */
let bg	=   {
    //Position & Size:
    x:		                    undefined,
    y:		                    undefined,
    size:	                    undefined,
    //Background Colors:
    fill:                       0,
};

/** Bomb Object:    */
let bomb;

/** Timer Object values:    */
let timerMod;
let timerMaxMin;
let timerMaxSec;
let timerNB         =           0;

/** Node Values:    */
let nodes           =           [];
let totalMaxNodes   =           12;
let visibleNodes    =           0;

/** Node Orientation:   (bomb.frontalView & bomb.dorsalView)    */
let northNodes      =           [];
let maxNorthNodes   =           0;
let southNodes      =           [];
let maxSouthNodes   =           0;

/** Creating the different game states: */
let gamePhase   =               `start`;



/** Loading Sounds & Images:    */
function preload() {
    //Images:
    disBackground   =   loadImage(`assets/images/Background.png`);
    for (let i = 0; i < 4; i++) {
        caseImg[i]  =   loadImage(`assets/images/Case_${i}.png`);
        modImg[i]   =   loadImage(`assets/images/Module_${i}.png`);
    }
    for (let i = 0; i < 10; i++) {
        wiresImg[i]   =   loadImage(`assets/images/Wires_${i}.png`);
    }
}

/** Scene Setup:    */
function setup() {
    createCanvas(windowHeight, windowHeight);
    //Attributing images to image names:
    imageSetup();
    //Attributing values to bg:
    bgValues();

    //Setting the TimerMod's time values:
    timerMaxMin    =   floor(random(3, 8));
    timerMaxSec    =   60*timerMaxMin;

    //creating bomb OBJ:
    bomb    =   new Bomb(width/2, height/2);

    //Creating the 12 possible areas where nodes could appear:
    generatingTotalNodes();
}

/** Image Setup:    */
function imageSetup()   {
    //Bomb:
    disBombX    =   caseImg[0];
    disBombY    =   caseImg[1];
    disBombT    =   caseImg[2];
    disBombB    =   caseImg[3];
    //Modules:
    disTIM  =   modImg[0];
    disBTN  =   modImg[1];
    disWIR  =   modImg[2];
    disWAG  =   modImg[3];
    //Wires:
    disBlaWire  =   wiresImg[0];
    disBlaWireH =   wiresImg[1];
    disCyaWire  =   wiresImg[2];
    disCyaWireH =   wiresImg[3];
    disMagWire  =   wiresImg[4];
    disMagWireH =   wiresImg[5];
    disYelWire  =   wiresImg[6];
    disYelWireH =   wiresImg[7];
    disRedWire  =   wiresImg[8];
    disRedWireH =   wiresImg[9];
}

/** Attributing bg values:  */
function bgValues() {
    bg.x    =   width/2;
    bg.y    =   height/2;
    bg.size =   height;
}

/** Creating all nodes (total of 12):   */
function generatingTotalNodes()  {
    //Generate nodes:
    for (let i = 0; i < totalMaxNodes; i++) {   //12
        //Setting Node values:
        let column;
        let row;
        let nb  =   i;
        let size    =   128;
        //Setting up node positions on the screen in a 6-position grid:
        let location    =   (i/2) + 1;

        //Setting Grid Column:
        column  =   floor(location);
        //Setting Grid Row:
        if (fract(location) === 0.5)    {
            row =   2;
        }
        else    {
            row =   1;
        }

        //Creating node OBJ:
        let node    =   new Node(nb, column, row, size);

        //Setting up the node functions:
        node.setup();
        node.debugging();
        nodes.push(node);
    }
}

/** Draw:   */
function draw() {
    background(0);
    gamePhases();
}

/** Creating the different phases of the game:  */
function gamePhases()   {
    if (gamePhase === `start`)  {
        startScreen();
    }
    else if (gamePhase === `bomb`)  {
        gameScreen();
    }
    else if (gamePhase === `lost`)  {
        lostScreen();
    }
    else if (gamePhase === `win`)   {
        winScreen();
    }
}

/** Title Screen:   */
function startScreen()  {
    //Elements for the Title:
    push();
    textSize(56);
    fill(255);
    textAlign(CENTER);
    text(`Keep Trying and Don't Detonate!`, width/2, height/3);
    pop();

    //Elements for the instructions:
    push();
    textSize(32);
    fill(175);
    textAlign(CENTER);
    text	(`Press "Space" to Start`, width/2, 2*height/3);
    pop();
}

/** Screen displaying the bomb: */
function gameScreen()   {
    //Display Background:
    push();
    imageMode(CENTER);
    image(disBackground, bg.x, bg.y, bg.size, bg.size);
    pop();

    //Display Bomb:
    bomb.displayVertical();
    //Setting up the TimerMod's countdown:  (always active no matter what face of the bomb you are on)
    timerMod.countdown();

    //Displaying the right nodes on the right faces:
    if (bomb.axisY  === `Mid`)  {
        //Facing the frontView:
        if (bomb.axisX  === `North`)    {
            for (let i = 0; i < nodes.length/2; i++) {
                let node    =   nodes[i];
                
                node.displayNode();
            }
        }
        //Facing the backView:
        if (bomb.axisX  === `South`)    {
            for (let i = nodes.length/2; i < nodes.length; i++) {
                let node   =   nodes[i];
        
                node.displayNode();
            }
        }
    }

    //Checking if the entirety of the nodes are solved:
    let completingNode  =   true;
    for (let i = 0; i < nodes.length; i++)  {
        if (nodes[i].solved === false)  {
            completingNode  =   false;
        }
    }
    //If they are, You Win:
    if (completingNode === true)   {
        gamePhase   =   `win`;
    }
}

/** Screen if the bomb explodes:    */
function lostScreen()   {
    //Elements for the “Game Over” text:
    push();
    textSize(80);
    fill(255, 0, 0);
    textAlign(CENTER);
    text(`Game Over`, width/2, height/3);
    pop();3
    //Elements for the Instructions:
    push();
    textSize(32);
    fill(150, 0, 0);
    textAlign(CENTER);
    text	(`Press "Space" to try again`, width/2, 2*height/3);
    pop();
}

/** Screen if the bomb is defused:  */
function winScreen()    {
    //Elements for the Stats:
    push();
    textSize(64);
    fill(255);
    textAlign(CENTER);
    text(`Bomb Defused \n Time Left:    `+ floor(timerMod.timeSec/60) + ':' + floor((timerMod.timeSec%60)/10) + (timerMod.timeSec%60)%10 , width/2, height/3);
    pop();

    //Elements for the instructions:
    push();
    textSize(32);
    fill(175);
    textAlign(CENTER);
    text	(`Press "Space" to try again`, width/2, 2*height/3);		//in mousePressed() function
    pop();
}

/** Rotating the Bomb:  */
function mousePressed() {
    if (gamePhase === `bomb`)   {
        bomb.mouseClick();
    }
}

/** Key Inputs: */
function keyPressed()   {
    //Switching GameStates:
    if (event.keyCode === 32)   {
        if (gamePhase === `start`)  {
            gamePhase   =   'bomb';
        }
        //Resetting the window reloads a new randomized bomb:
        else if (gamePhase === `lost` ||  gamePhase === `win`)  {
            window.location.reload();
        }
        //Debugging:    GameStates:
        console.log(`spacebar (${gamePhase})`);
    }
    //Debugging:    Changing Cursor:
    if (event.keyCode === 49)   {
        cursor(CROSS);
    }
}

/** Setting up the keys to press to solve ButtonMod:    */
function keyTyped() {
    for (let i = 0; i < nodes.length; i++)  {
        let node    =   nodes[i];

        if (node.type === `Button`) {
            if (node.hovering === true) {
                node.buttonMod.keyTyped();
            }
        }
    }
}

/** TimerMod beeping sounds:    */
function beep() {
    let beepSFX = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    beepSFX.play();
}