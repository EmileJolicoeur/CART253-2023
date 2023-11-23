"use strict";

// Our user, to move with the mouse
let user = {   /**grammar (luser) */
    x: 0,
    y: 0,
    size: 100   /**user.userSize is confusing */

/**Needs bracket */}
// Food objects

/**missing variable (let food1;) */let food1;
/**needs let*/let food2;
let food3;
let food4;
let food5;
let food6;

function setup()/**Needs Bracket */{
    createCanvas(600, 600);

    food1 = createFood(50, 300);
    food2 = createFood(100, -300);
    food3 = createFood(250, 300);
    food4 = createFood(350, 300);
    food5 = createFood(450, 450);        /**missing value (y) */
    food6 = createFood(550, 300);
}


function createFood(x/**Needs comma (not same variable) */, y) {
    let food = {
        x: x,
        y: y,
        size: 50,
        eaten: false /**grammar (flase)*/
    };
    return food;
}

function draw(/**needs closing parentheses */) {    /**grammar drew */
    background(0); /**grammar (backgrund) */

    // Move the user (with the mouse)
    moveUser();     /**MoveUser */

    // Check whether the user has eaten either food
    checkFood(food1);
    checkFood(food2);
    checkFood(food3);    /**Chck */
    checkFood(food4/**needs closing parentheses */);
    checkFood(food5);

// Display the user and foods
    displayUser();
    displayFood(food1);
    displayFood(food2);
    displayFood(food3);
    displayFood(food4);
    displayFood(food5);      /**displayFod */
    displayFood(food6);
}

// Sets the user position to the mouse position
function moveUser() {
    user/**Needs a dot */.x = mouseX;
    user.y = mouseY;
}

// Checks if the user overlaps the food object and eats it if so
function checkFood(food) {
    if (!food.eaten === true) {     /**Needs value (=== false) */
        let d = dist(user.x, user.x, food.x, food.y);
        if (d < user.size / 2 + food.size / 2/**needs closing bracket */) {
            food.eaten = true;
        }
    }
/**needs closing curly bracket */}

// Draw the user as a circle
function displayUser() {     /**dismayUser */
    push();
    fill(255);
    ellipse(user.x, user.y, user.size);
    pop();
}

// Draw the food as a circle
function displayFood(food)/**Needs Curly Bracket */{
    // Check if the food is still available to be eaten
    if (food.eaten === true) {   /**"if (food.ate)" is not a command*/
        // Display the food as its position and with its size
        push();
        fill(255, 100, 100);
        ellipse(food.x, food.y);
        pop();
    }
}
