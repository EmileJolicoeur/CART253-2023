//
//Bomb Defusing
//Emile Jolicoeur
//
//This is a template. You must fill in the title, author, and this description to match your project!
//

"use strict";



//Variables:
let phase	=	        `Start`	//Start, Puzzle, Lose, Win

let bg	=   {
x:		                undefined,  //Center
y:		                undefined,  //	||
size:	                undefined,  //windowHeight
    fill:   {
        puzzProxy:	    100,        //Placeholder until adding bgImage
        gameOver:	    255,
        fadeSpeed:	    1,
        fadeAcc:		0.01,
    },
};
    //Bomb Variables:
let axisY	=	        `Mid`;		//Top, Mid, Bot
let axisX	=	        `North`;	//North, South, East, West
let bomb	=	{
	x:	                undefined,
	y:	                undefined,
	size:	{
		x:	            512,
		y:	            256,
	},
};

    //Module Basic Variables:
let node    =   {
    x:                  undefined,
    y:                  undefined,
    size:               128,
    position:           undefined,
        //Color
    completed:          false,
    fill:               0,
}
    //Button Module Variables:
let butMod  =   {
    but:    {
        x:              undefined,
        y:              undefined,
        size:           80,
            //Button color
        fill:   {
            r:          255,
            gb:         0,
            hover:      100,
            hold:       180,
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

/**Time values (Timer module)*/
    //Minutes
let maxMin  =           undefined;
    //Seconds
let maxSec  =           undefined;
let timeSec =           undefined;
let countdownSec    =   undefined;

let armed = true;


    //Sprite Variables:
let bgImg;
let bombDisplayX, bombDisplayY, bombDisplayTopZ, bombDisplayBotZ;
let timeModImg, wireModImg, buttonModImg, wordAssGameImg;



function preload()  {
        //Background
    bgImg   =   loadImage(`assets/images/Sim_Bg.png`);
        //Bomb
    bombDisplayX    =   loadImage(`assets/images/Sim_bomb-F.png`);
    bombDisplayY    =   loadImage(`assets/images/Sim_bomb-S.png`);
    bombDisplayTopZ =   loadImage(`assets/images/Sim_bomb-T.png`);
    bombDisplayBotZ =   loadImage(`assets/images/Sim_bomb-B.png`);
        //Modules
    timeModImg  =   loadImage(`assets/images/Sim_TimMod.png`);
    wireModImg  =   loadImage(`assets/images/Sim_WirMod.png`);
    wordAssGameImg  =   loadImage(`assets/images/Sim_wagMod.png`);
    buttonModImg    =   loadImage(`assets/images/Sim_BtnMod.png`);
}

function setup()    {
    createCanvas(windowHeight, windowHeight);

        //Bomb Values
    bomb.x	=	width/2;
	bomb.y	=	height/2;

        //Timer starting value:
    maxMin =   floor(random(1, 4));
    maxSec=    60*maxMin;

    console.log(`width = ${width} \nheight = ${height}`)

        //node values (temporary)
    node.x  =   width/2;
    node.y  =   height/2;

        //Node Generation   [Incomplete]    //For future use
    //nodeType

    nodeLocation();

        //Generating color for Button Module:
    colorIndGeneration();
}

// /**  Determining Modules for nodes   */  //For future use
// function nodeType() {
//     node.typeSel =   round(random(1, 4));

//     if (node.typeSel === 1)   {
//         node.type   =   `Btn`;
//     } else if (node.typeSel === 2)    {
//         node.type   =   `Wir`;
//     } else if (node.typeSel === 3)    {
//         node.type   =   `WAG`;
//     }
    
//     console.log(`Type:${node.type}`);
// }

function nodeLocation() {
    node.position   =   round(random(0, 5));

    console.log(`ModuleLocation: ${node.position}`);

    if (node.position === 0)    {
        node.x  =   9*width/26;
        node.y  =   17*height/40;
    }   else if (node.position === 1)    {
        node.x  =   9*width/26;
        node.y  =   23*height/40;
    }   else if (node.position === 2)    {
        node.x  =   width/2;
        node.y  =   17*height/40;
    }   else if (node.position === 3)    {
        node.x  =   width/2;
        node.y  =   23*height/40;
    }   else if (node.position === 4)    {
        node.x  =   17*width/26;
        node.y  =   17*height/40;
    }   else if (node.position === 5)    {
        node.x  =   17*width/26;
        node.y  =   23*height/40;
    } 
}

function colorIndGeneration()   {
    butMod.lit.colPick  =   round(random(3));

    if (butMod.lit.colPick === 0) {
        butMod.lit.fill.r   =   255;
    } else if (butMod.lit.colPick === 1)    {
        butMod.lit.fill.g   =   255;
    } else if (butMod.lit.colPick === 2)    {
        butMod.lit.fill.b   =   255;
    } else if (butMod.lit.colPick === 3)    {
        butMod.lit.fill.r   =   255;
        butMod.lit.fill.g   =   255;
    }
    console.log(`NB: ${butMod.lit.colPick} \n r: ${butMod.lit.fill.r} \n g: ${butMod.lit.fill.g} \n b: ${butMod.lit.fill.b}`);
}

function draw() {
    background(0);

    gamePhases();
    bgValues();
    moduleSelection();
}



/** Steps of the Game:  */
function gamePhases()   {
    if (phase === `Start`)  {
        startScreen();
    } else if (phase === `Puzzle`)  {
        puzzleScreen();
    } else if (phase === `Lose`)    {
        gameOverScreen();
    } else if (phase === `Win`) {
        winScreen();
    }
}

function startScreen()   {
        //Elements for the Title:
    push();
    textSize(64);
    fill(255);
    textAlign(CENTER);
    text(`Bomb Defusing Simulator`, width/2, height/3);
    pop();

        //Elements for the instructions:
    push();
    textSize(32);
    fill(175);	                                            //If there is time, make:   function flashingTxt();
    textAlign(CENTER);
    text	(`Click screen to start`, width/2, 2*height/3);  //in mousePressed() function
    pop();
}
function puzzleScreen()	{
    //bgValues();

        //Background Placeholder:
    push();
    fill(bg.fill.puzzProxy);
    noStroke();
    rectMode(CENTER);
    rect(bg.x, bg.y, bg.size);
    pop();
        //Background Image:
    push();
    imageMode(CENTER);
    image(bgImg, bg.x, bg.y, bg.size, bg.size);
    pop();

    bombVertical();

    countdown();
}

function countdown()    {
    countdownSec    =   round(millis()/1000);
    if (timeSec != maxSec - countdownSec  && armed === true )    {
        timeSec  =   maxSec - countdownSec;
        beep();
    }
}

/** Countdown to zero   */
function timerMod() {
    if (timeSec <= 0)   {
        phase = `Lose`;
    }

        //Displaying countdown:
    push();
    imageMode(CENTER);
    image(timeModImg, 9*width/26, 17*height/40, 128, 128);
    pop();
        //timer
    push();
    textAlign(CENTER);
    textSize(32);
    fill(255, 0, 0);
    text(floor(timeSec/60) + ':' + floor((timeSec%60)/10) + (timeSec%60)%10 , width/2 - 145, 2*height/5);
    pop();
}

/** Choosing between Modules    */              //Not Fully Operational
function moduleSelection()  {
    if (node.type === `Btn`) {
        buttonModule();
    }
    // else if (node.type === `Wir`) {              //For future use
    //     wireModule();
    // }   else if (node.type === `WAG`)   {
    //     wordAssGameModule();
    // }
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
        armed = false;
    }   else    {
        node.fill   =   0;
    }
}


/** Button Module   */
function buttonModule() {
    displayComplete();
    displayButton();
    displayLight();
    
    push();
    imageMode(CENTER);
    image(buttonModImg, node.x, node.y, node.size, node.size);
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
        if (mouseIsPressed === false)    {                  //Mouse hovering over the button
            butMod.but.fill.gb  =   butMod.but.fill.hover;
            butMod.lit.val  =   false;
        } else if (mouseIsPressed === true) {               //Mouse is held down on the button
            butMod.but.fill.r   =   butMod.but.fill.hold;
            butMod.lit.val  =   true;
            buttonInstructions()
        }
    } else  {                                               //Mouse is off the button
        butMod.but.fill.r   =   255;
        butMod.but.fill.gb  =   0;
    }
}

function buttonInstructions()   {
    let buttonTxt;
    let hintTxt =   `(use keyboard)`;
    
    if (butMod.lit.colPick === 0)   {                       //Red Light
        buttonTxt   =   `In 10, 7 is mirrored by 4. The INPUT is a mirror letter`;
    }   else if (butMod.lit.colPick === 1)  {
        buttonTxt   =   `Awaiting corresponding KEY INPUT`;
    }   else if (butMod.lit.colPick === 2)  {
        buttonTxt   =   `the 3rd letter`;
    }   else if (butMod.lit.colPick === 3)  {
        buttonTxt   =   `%%^Q*#)^%*)&Q^%_*^(Q_%^Q)*&%^(*Q_^&$%_*%Q{^&%)*(Q#^&WY$*&%QT()(P$*{&WYTE%})`;
        hintTxt =   `Goodbye`;
    }

    push();
    textSize(30);
    fill(0);
    textAlign(CENTER, BOTTOM);
    text(`${buttonTxt}\n${hintTxt}`, width/2, height - 40);
    pop();
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



/** Background Values for following Screens */
function bgValues() {
        //Background Position:
    bg.x		=	width/2;
    bg.y		=	height/2;
        //Background Size:
    bg.size	=	height;
        //GameOverScreen Background Fade:    
    bg.fill.fadeSpeed	+=	bg.fill.fadeAcc;
    bg.fill.gameOver	-=	bg.fill.fadeSpeed;
}



/** Bomb Orientation based on the axes  */
function bombVertical()	{
        //Bomb view on Y axis:
    if (axisY === `Mid`)  {
        bombHorizontal();
        console.log(`Mid-${axisX}`);
    } else if (axisY === `Top`) {
        topView();
        console.log(`Top`);
    } else if (axisY === `Bot`) {
        bottomView();
        console.log(`Bot`);
    }
}
function bombHorizontal()	{
        //Bomb view on X axis:
    if (axisX === `North`)	{
        frontalView();
    }  else if (axisX === `South`)	{
        dorsalView();
    } else if (axisX === `West`)	{
        leftView();
    }else if (axisX === `East`)	{
        rightView();
    }
}

/** "X" View:   Frontal & Dorsal    */
function frontalView()	{
    //bombPlaceholderF();
        //DisplayImage
    push();
    imageMode(CENTER);
    image(bombDisplayX, bomb.x, bomb.y, bomb.size2, bomb.size1);
    pop();

    timerMod();
}
function dorsalView()	{
    //bombPlaceholderD();
        //DisplayImage
    push();
    imageMode(CENTER);
    image(bombDisplayX, bomb.x, bomb.y, bomb.size2, bomb.size1);
    pop();

    buttonModule();
}

/** "Y" View:   Left & Right    */
function leftView()	{
    //bombPlaceholderL();
        //DisplayImage
    push();
    imageMode(CENTER);
    image(bombDisplayY, bomb.x, bomb.y, bomb.size2, bomb.size1);
    pop();
}
function rightView()	{
    //bombPlaceholderR();
        //DisplayImage
    push();
    imageMode(CENTER);
    image(bombDisplayY, bomb.x, bomb.y, bomb.size2, bomb.size1);
    pop();
}

/** "Z" View:   Top & Bottom    */
function topView()	{
    //bombPlaceholderT();
        //DisplayImage
    push();
    imageMode(CENTER);
    image(bombDisplayTopZ, bomb.x, bomb.y, bomb.size2, bomb.size1);
    pop();
}
function bottomView()	{
    //bombPlaceholderB();
        //DisplayImage
    push();
    imageMode(CENTER);
    image(bombDisplayBotZ, bomb.x, bomb.y, bomb.size2, bomb.size1);
    pop();
}



function gameOverScreen()	{   //Completed
    //bgValues();

        //White background fade to black:	Use bg Variables
    push();
    fill(bg.fill.gameOver);
    noStroke();
    rectMode(CENTER);
    rect(bg.x, bg.y, bg.size);
    pop();

        //Elements for the “Game Over” text:
    push();
    textSize(80);
    fill(255, bg.fill.gameOver, bg.fill.gameOver);
    textAlign(CENTER);
    text(`Game Over`, width/2, height/3);
    pop();3

        //Elements for the Instructions:
    push();
    textSize(32);
    fill(150, bg.fill.gameOver, bg.fill.gameOver);
    textAlign(CENTER);
    text	(`Click to try again`, width/2, 2*height/3);
    pop();
}
function winScreen()	{       //Add final Timer
        //Elements for the Title:
    push();
    textSize(64);
    fill(255);
    textAlign(CENTER);
    text(`Bomb Defused \n Time Left:    `+ floor(timeSec/60) + ':' + floor((timeSec%60)/10) + (timeSec%60)%10 , width/2, height/3);
    pop();

        //Elements for the instructions:
    push();
    textSize(32);
    fill(175);
    textAlign(CENTER);
    text	(`Click to try again`, width/2, 2*height/3);		//in mousePressed() function
    pop();
}



/** Bomb Orientation    */
function arrows()	{
    arrowsAxisY();
    arrowsAxisX();
}
function arrowsAxisY()  {
		//Top Arrow:
	if (mouseY <= 100)	{
		if (axisY === `Bot`)	{
			axisY = `Mid`;
		} else if (axisY === `Mid`)	{
			axisY = `Top`;
		}
	}
		//Bottom Arrow:
	if (mouseY >= height - 100)	{

        push();
        fill(100, 200, 50);
        rectMode(CENTER);
        rect(width/2, height -50, width, 100);
        pop();

		if (axisY === `Top`)	{
			axisY = `Mid`;
		} else if (axisY === `Mid`)	{
			axisY = `Bot`;
		}
	}
}
function arrowsAxisX()  {
    
	if (axisY === `Mid`)	{
			//Left Arrow:
		if (mouseX <= (width/2) + 400)	{
			if (axisX === `North`)	{
				axisX = `West`;
			} else if (axisX === `West`)   {
				axisX = `South`;
			}   else if (axisX === `South`)   {
				axisX = `East`;
			}   else if (axisX === `East`)   {
				axisX = `North`;
			}
        }
			//Right Arrow:
		if (mouseX >= (width/2) -400)	{
			if (axisX === `North`)	{
				axisX = `East`;
			} else if (axisX === `East`)   {
				axisX = `South`;
			}   else if (axisX === `South`)   {
				axisX = `West`;
			}   else if (axisX === `West`)   {
				axisX = `North`;
			}
        }
	}
}


/** Mouse Controls during each phases */
function mousePressed()	{
	if (phase === `Start`)	{
		phase	=	`Puzzle`;
	} else if (phase === `Puzzle`)	{
		arrows();
        //nodeInteraction();    // function to interact with modules?
	} else if (phase === `Lose`	||	phase === `Win`)	{
        window.location.reload();
		phase = `Start`;
	}

    console.log(`Click! (x = ${mouseX}, y = ${mouseY})`);
}

/**	Debugging:	*/
function keyPressed()	{       //[1,2,3,4]
    //Switching phase Values
    debugging();
    if (butMod.lit.val  ===   true)   {
        if (butMod.lit.colPick === 0)    {
            if (key === `h`)    {
                armed   =   false;
                phase   =   `Win`;
            }   else if (key != `h`)    {
                phase   =   `Lose`;
            }
        } else if (butMod.lit.colPick === 1)    {
            if (key === `g`)    {
                armed   =   false;
                phase   =   `Win`;
            }   else if (key != `g`)    {
                phase   =   `Lose`;
            }
        } else if (butMod.lit.colPick === 2)    {
            if (key === `u`)    {
                armed   =   false;
                phase   =   `Win`;
            }   else if (key != `u`)    {
                phase   =   `Lose`;
            }
        } else if (butMod.lit.colPick === 3)    {
            if (key)    {
                phase   =   `Lose`;
            }
        }
    }
}


// /** Placeholders*/
// function bombPlaceholderF() {
//         //BombFrame Placeholder:
//     push();
//     fill(0, 255, 0);
//     rectMode(CENTER);
//     rect(bomb.x, bomb.y, bomb.size.x);
//     pop();
//         //Orientation Help:
//     push();
//     textSize(20);
//     fill(0);
//     text(`F`, width/2, 40);
//     pop();
// }
// function bombPlaceholderD() {
//     //BombFrame Placeholder:
//     push();
//     fill(255, 0, 255);
//     rectMode(CENTER);
//     rect(bomb.x, bomb.y, bomb.size.x);
//     pop();
//         //Orientation Help:
//     push();
//     textSize(20);
//     fill(0);
//     text(`D`, width/2, 40);
//     pop();
// }
// function bombPlaceholderL() {
//             //BombFrame Placeholder:
//             push();
//             fill(0, 255, 255);
//             rectMode(CENTER);
//             rect(bomb.x, bomb.y, bomb.size.y, bomb.size.x);
//             pop();
//                 //Orientation Help:
//             push();
//             textSize(20);
//             fill(0);
//             text(`L`, width/2, 40);
//             pop();
// }
// function bombPlaceholderR() {
//     //BombFrame Placeholder:
//     push();
//     fill(255, 0, 0);
//     rectMode(CENTER);
//     rect(bomb.x, bomb.y, bomb.size.y, bomb.size.x);
//     pop();
//         //Orientation Help:
//     push();
//     textSize(20);
//     fill(0);
//     text(`R`, width/2, 40);
//     pop();
// }
// function bombPlaceholderT() {
//         //BombFrame Placeholder:
//     push();
//     fill(0, 0, 255);
//     rectMode(CENTER);
//     rect(bomb.x, bomb.y, bomb.size.x, bomb.size.y);
//     pop();
//         //Orientation Help:
//     push();
//     textSize(20);
//     fill(0);
//     text(`T`, width/2, 40);
//     pop();
// }
// function bombPlaceholderB() {
//     //BombFrame Placeholder:
//     push();
//     fill(255, 255, 0);
//     rectMode(CENTER);
//     rect(bomb.x, bomb.y, bomb.size.x, bomb.size.y);
//     pop();
//         //Orientation Help:
//     push();
//     textSize(20);
//     fill(0);
//     text(`B`, width/2, 40);
//     pop();
// }

function debugging()    {
    if (key === `1`)	{
        phase	=	`Start`;
    } else if (key === `2`)	{
        phase	=	`Puzzle`;
    } else if (key === `3`)	{
        phase	=	`Lose`;
    } else if (key === `4`)	{
        phase	=	`Win`;
    } else if (key === `5`) {
        node.completed  =   true;
    }
}
function beep() {
    let beepSFX = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    beepSFX.play();
}