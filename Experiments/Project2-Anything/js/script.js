/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

//Variables:
    //Sprite Variables:
let images  =   [];
let disBackground;
let disBombX, disBombY, disBombT, disBombB;
let disTIM, disBTN, disWIR, disWAG;

// let phase   =   `Start`;

// let bg  =   {
//     x:		                undefined,  //Center
// y:		                undefined,  //	||
// size:	                undefined,  //windowHeight
//     fill:   {
//         puzzProxy:	    100,        //Placeholder until adding bgImage
//         gameOver:	    255,
//         fadeSpeed:	    1,
//         fadeAcc:		0.01,
//     },
// };

let bomb;

let timer;
let maxMin;
let maxSec;

let totalNodes      =   [];     //amount of "Nodes"
let northNodes      =   [];
let southNodes      =   [];
let totalNodesNB    =   4;  //total amount of "Nodes"

let modules =   {
    //Number of Button Modules:
    btn:        [],
    btnNB:      2,
    //Number of Wire Modules:
    wir:        [],
    wirNB:      2,
    //Number of Word Association Game Modules:
    wag:        [],
    wagNB:      1,

    location: {
        x:      0,
        y:      0,
        z:      0,
    },

    size:   128,
}

/** Loading Sounds & Images:    */
function preload()  {
    //Sounds:
    

    //Images:
    for (let i = 0; i < 9; i++) {
        images[i]   =   loadImage(`assets/images/Anything_${i}.png`);
    }
}

function setup()    {
    createCanvas(windowHeight, windowHeight);

    //Categorizing preloaded Images:
    imageSetup();

    //Time on Timer Mod:
    maxMin  =   floor(random(3, 8));
    maxSec  =   60*maxMin;

    //Creating Bomb obj:
    bomb    =   new Bomb(width/2, height/2);        //Creating the Bomb

    //Creating node & node amount based on totalNodesNB
    for (let i = 0; i < totalNodesNB; i++)   {

        //Checking Height & Width of Module in grid:
        let column  =   floor(random(1, 4));
        let row =   floor(random(1, 3));

        //Checking if the Node should appear in the frontalView or the dorsalView of the Bomb
        let depth   =   floor(random(1, 3));

        //Setting valuables for Node based on grid position
        position(column, row, depth);


        //Setting up the Timer as Node#1:
        if (i != 0)   {
            
            let typeRandom  =   floor(random(1, 4));

            if (modules.location.z === `frontal`)   {
                let northNode    =   new Node(i, modules.location.x, modules.location.y, modules.location.z, modules.size, typeRandom);
                totalNodes.push(northNode);
                //console.log(`${i}:${node.type}: \nX = ${node.x}\nY = ${node.y}\nZ = ${node.dPosition} \nComplete: ${node.complete}`);
                northNode.debugging(i)
            } else if (modules.location.z === `dorsal`) {
                let southNode    =   new Node(i, modules.location.x, modules.location.y, modules.location.z, modules.size, typeRandom);
                totalNodes.push(southNode);
                //console.log(`${i}:${node.type}: \nX = ${node.x}\nY = ${node.y}\nZ = ${node.dPosition} \nComplete: ${node.complete}`);
                southNode.debugging(i)
            }



        } else  {
            timer   =   new ModuleTIM(modules.location.x, modules.location.y, modules.size, maxMin, maxSec);

            for (let j = 1; j < totalNodes.length; j++)   {
                console.log(`test`);
            }
            timer.debugging(i)

        }

    }


}


/** Setting Node position in grid values x, y, z:   */
function position(column, row, depth)   {
    //X:
    if (column === 1)   {
        modules.location.x  =   bomb.x - (18*8);
    } else if (column === 2)    {
        modules.location.x  =   bomb.x;
    } else if (column === 3)    {
        modules.location.x  =   bomb.x + (18*8);
    }

    //Y:
    if (row === 1)  {
        modules.location.y  =   bomb.y - (9*8);
    } else if (row === 2)   {
        modules.location.y  =   bomb.y + (9*8);
    }

    //Z:
    if (depth === 0)    {
        modules.location.z   =   `frontal`;
    } else if (depth === 1) {
        modules.location.z   =   `dorsal`;
    }
    return modules.location;
}


/** Labeling Images:    */
function imageSetup()   {
            //ImgNames
        disBackground   =   images[0];
            //bomb
        disBombX    =   images[1];
        disBombY    =   images[2];
        disBombT    =   images[3];
        disBombB    =   images[4];
            //modules
        disTIM  =   images[5];
        disBTN  =   images[6];
        disWIR  =   images[7];
        disWAG  =   images[8];
}


/** On every Frame: */
function draw() {
    background(100);

    timer.countdown();
    bomb.displayVertical();


    for (let i = 0; i < totalNodes.length; i++)  {
        let northNode    =   totalNodes[i];
        let southNode   =   totalNodes[i];
        if (bomb.axisX === `North`)   {
            timer.display();
            !southNode.display();
            northNode.display();
            
        } else if (bomb.axisX === `South`)  {
            !northNode.display();
            southNode.display();
        }
        
    } 
}

function mousePressed() {
    bomb.mouseClick();
}

function beep() {
    let beepSFX = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    beepSFX.play();
}