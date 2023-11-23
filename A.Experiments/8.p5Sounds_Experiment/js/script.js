"use strict";


/** Reintroducing P5.Sound: */
// let barkSFX;

// let osc, playing, freq, rep;


// function preload() {
//     //soundFormat(`______`);        //Defines what type of sound format is used
//     barkSFX =   loadSound(`assets/sounds/bark.wav`);
// }


// function setup() {
//     createCanvas(600, 600);
//     userStartAudio();
// }


// function draw() {
//     background(0);

//     let newRate =   map(mouseX, 0, width, -3, 3);
//     barkSFX.rate(newRate);
// }

// function mousePressed() {
//     //barkSFX.rate(-2);
//     barkSFX.loop();
// }



/** p5.Oscillator:  */
// let oscillator;
// let t   =   0;
// let angle   =   0;

// function setup()    {
//     createCanvas(600, 600);
//     userStartAudio();

//     //(pitch, sine/ triangle/ square/ sawtooth)
//     oscillator  =   new p5.Oscillator(440,`sine`);
// }

// function draw() {
//     background(0);

//     // //Randomly switches between frequencies:
//     // let r   =   random(0, 1);
//     // let newFreq =   map(r, 0, 1, 440, 880);

//     //Smoothly transitions between frequencies:
//     let noiseValue  =   noise(t);
//     let newFreq =   map(noiseValue, 0, 1, 20, 2000);    //Radio frequency?

//     // //sin(), cos(), tan();
//     // let sinAngle    =   sin(angle);
//     // let newFreq =   map(sinAngle, -1, 1, 440, 880);

//     // //changes the frequency of the sound:
//     // let newFreq =   map(mouseY, height, 0, 20, 880);
//     oscillator.freq(newFreq);

//     angle   =   angle + 0.05;
//     t   =   t + 0.1;

//     // //Changes the amplitude of the sound:
//     // let newAmp  =   map(mouseX, 0, width, 0, 1);
//     // oscillator.amp(newAmp);

//     push();
//     textSize(32);
//     textAlign(LEFT, CENTER);
//     fill(255);
//     text(newFreq, 100, height/2);
//     pop();

//     //

// }

// function mousePressed() {
//     oscillator.start();
// }

// function mouseReleased()    {
//     oscillator.stop();
// }



/** p5.PolySynth:   */
// let synth;
// let minorNotes   =   [`F4`, `G4`, `Ab4`, `Bb4`, `C4`, `D`, `Ea4`, `F4`]; //F minor
// let notes   =   [`F2`, `G2`, `Ab3`, `Bb3`, `C3`, `Db3`, `Eb3`, `F4`];
// let currentNote =   0;

// function setup()    {
//     createCanvas(600, 600);

//     synth   =   new p5.PolySynth(); 
    
//     userStartAudio();
// }

// function draw() {
//     background(0);


// }

// function mousePressed() {
//     //Music starts on key press indefinitely
//     setInterval(playRandomNote, 500);
// }

// function playRandomNote()    {
//     let randomNote  =   random(minorNotes);

//     let note    =   notes[currentNote];

//     //note [string or nb(0, 127)], velocity [speed at which you hit the key(0, 1)], timeDelay[in seconds], duration[time of note];
//     synth.play(randomNote, 1, 2, 1);
//     synth.play(note, 1, 0.5, 3);
//     synth.play(`D4`, 1, 0, 3);

//     currentNote =   currentNote + 1;
//     if (currentNote === notes.length)   {
//         currentNote =   0;
//     }

    
//     console.log(`note: ${randomNote}`);
// }

/** p5 Audio In:    */

let mic;

let ghost   =   {
    x:  0,
    y:  0,
    vx: 0,
    vy: 0,
    image:  undefined,
}

function preload()  {
    ghost.image =   loadImage(`assets/images/clown.png`);
}

function setup()    {
    createCanvas(600, 600);

    ghost.x =   width/2;
    ghost.y =   height/2;

    mic =   new p5.AudioIn();
    mic.start();
}

function draw() {
    background(0);
    //shake
    ghost.x += random(-1, 1);
    ghost.y += random(-1, 1);

    //mic level
    let level   =   mic.getLevel();

    //check mic level
    if (level > 0.001)    {
        ghost.vx    =   20;
    }

    ghost.x +=  ghost.vx;
    ghost.y +=  ghost.vy;

    push();
    imageMode(CENTER);
    tint(255, 50);
    image(ghost.image, ghost.x, ghost.y)
    pop();

    // let size    =   map(level, 0, 1, 0, width);

    // push();
    // fill(255, 0, 0);
    // noStroke();
    // ellipse(width/2, height/2, size);
    // pop();

    console.log(`${level},\n ${ghost.x},\n ${ghost.y}`);
}