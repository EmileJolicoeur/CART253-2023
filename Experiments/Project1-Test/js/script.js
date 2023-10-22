
"use strict";

    //Node Aspects:
let node    =   {
    x:  undefined,
    y:  undefined,
    size:   128,
        //Color
    completed:  false,
    fill:   0,
        //Type of nodes
    type:   `Btn`,       //Nan, Btn, Wir, WAG,
    typeSel:    undefined,
}

let butMod  =   {
    but:    {
        x:  undefined,
        y:  undefined,
        size:   80,
            //Button color
        fill:   {
            r:  255,
            gb: 0,
            hover:  100,
            hold:   180,
        },
    },
    lit:    {       //Light color which tells you when to release
        x:  undefined,
        y:  undefined,
        size:   32,
        val:    false,
            //Color picker
        colPick:    undefined,
            //Color
        fill:   {
            r:  0,
            g:  0,
            b:  0,
        },
    },
}

let buttonMod;

function preload()  {
    buttonMod   =   loadImage(`assets/images/Sim_BtnMod.png`);
}

    //button Function:

function setup()    {
    createCanvas(windowHeight, windowHeight);

        //node values (temporary)
    node.x  =   width/2;
    node.y  =   height/2;

    butMod.lit.colPick  =   round(random(2));

    if (butMod.lit.colPick === 0) {
        butMod.lit.fill.r   =   255;
    } else if (butMod.lit.colPick === 1)  {
        butMod.lit.fill.g   =   255;
    } else if (butMod.lit.colPick === 2)  {
        butMod.lit.fill.b   =   255;
    }
    console.log(`NB: ${butMod.lit.colPick} \n r: ${butMod.lit.fill.r} \n g: ${butMod.lit.fill.g} \n b: ${butMod.lit.fill.b}`);

    nodeType();
}

function nodeType() {
    node.typeSel =   round(random(1, 4));

    if (node.typeSel === 1)   {
        node.type   =   `Btn`;
    } else if (node.typeSel === 2)    {
        node.type   =   `Wir`;
    } else if (node.typeSel === 3)    {
        node.type   =   `WAG`;
    }
    
    console.log(`Type:${node.type}`);
}

function draw() {
    background(100);

    moduleSelection();
}

/** If the Module is complete or not    */
function displayComplete()  {
    nodeCompletion();
    
    rectMode(CENTER);
    fill(0, node.fill, 0);
    rect(node.x, node.y, node.size);
}
function nodeCompletion()   {
    if (node.completed  === true)   {
        node.fill   =   255;
    }   else    {
        node.fill   =   0;
    }
}

/** Choosing between Modules    */
function moduleSelection()  {
    if (node.type === `Btn`) {
        buttonModule();
    }
    else if (node.type === `Wir`) {
        wireModule();
    }   else if (node.type === `WAG`)   {
        wordAssGameModule();
    }
}

function buttonModule() {
    displayComplete();
    displayButton();
    displayLight();
    
    push();
    imageMode(CENTER);
    image(buttonMod, node.x, node.y, node.size, node.size);
    pop();
}

function displayButton()    {
    butMod.but.x    =   node.x - 16;
    butMod.but.y    =   node.y - 16;

    push();
    buttonHeld();
    rectMode(CENTER);
    rect(butMod.but.x, butMod.but.y, butMod.but.size);
    pop();
}

function buttonHeld()   {
    fill(butMod.but.fill.r, butMod.but.fill.gb, butMod.but.fill.gb);
    butMod.but.fill.r   =   255;
    butMod.but.fill.gb  =   0;

    let d   =   dist(mouseX, mouseY, butMod.but.x, butMod.but.y);

    if (d < butMod.but.size/2)    {
        if (mouseIsPressed === false)    {
            butMod.but.fill.gb  =   butMod.but.fill.hover;
            butMod.lit.val  =   false;
        } else  {
            butMod.but.fill.r   =   butMod.but.fill.hold;
            butMod.lit.val  =   true;
        }
    } else  {
        butMod.but.fill.r   =   255;
        butMod.but.fill.gb  =   0;
    }
}

function displayLight()   {
    butMod.lit.x    =   node.x + 40;
    butMod.lit.y    =   node.y - 24;
    


    push();
    noStroke();
    if (butMod.lit.val  === true)   {
        fill(butMod.lit.fill.r, butMod.lit.fill.g, butMod.lit.fill.b);
    }   else    {
        noFill;
    }
    rectMode(CENTER);
    rect(butMod.lit.x, butMod.lit.y, butMod.lit.size);
    pop();
}



function beep() {
    let beepSFX = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    beepSFX.play();
  }