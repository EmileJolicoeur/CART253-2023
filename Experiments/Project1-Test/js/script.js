/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

//
let gravity =   9.807;

let player  =   {   //image = square
    x:  undefined,
    y:  undefined,
    size:   32,
    vx: 0,
    vy: 0,
    speed:  10,
    fill:   255,
};

let bullet  =   {
    x:  undefined,
    y:  undefined,
    size:   {
        x:  10,
        y:  10,
    },
    vx: 0,
    vy: 0,
    speed:  10,
    maxSpeed:   20,
    fill:   {
        r:  10,
        g:  0,
        b:  0,
    },
}

function preload() {

}


//
function setup() {
    createCanvas(windowWidth, windowHeight);

    player.x    =   width/2;
    player.y    =   2*height/3;
}

//
function draw() {
    background(0);

    character();

    
}

//Creating the player:
function character()   {
    controls();
    pMove();
    pAvatar();
    
}

function controls() {
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW))    {
        player.vx   =   -player.speed;
    }   else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW))   {
        player.vx   =   player.speed;
    }   else    {
        player.vx   =   0;
    }
}
    //Player's movement
function pMove() {
    player.x    +=  player.vx;
    player.y    +=  player.vy;
}
    //Player's visuals
function pAvatar()    {
    //Player Placeholder
    fill(player.fill);
    rectMode(CENTER);
    rect(player.x, player.y, player.size);

    push();
    fill(0, 255, 0);
    text(`P`, player.x, player.y);
    pop();
}

    //Shooting mechanic
function shoot()    {
    if (keyIsDown(32))  {
        bullet();
    }
}
        //Bullet
function bullet()   {
    bMove();

}

function bMove()    {

}



