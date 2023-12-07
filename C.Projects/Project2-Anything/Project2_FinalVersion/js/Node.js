class   Node    {
    /** Object values:  */
    constructor(index, column, row, size)   {
        //Node number:
        this.nb             =   index + 1;
        //Node "Grid" Position:
        this.column         =   column;
        this.row            =   row;
        //Node Orientation: [front, back, redacted, error]
        this.looking        =   `error`;

        //Module visibility:
        this.displayed      =   false;
        //Module Type:  [Timer, Button, Wire, WAG, Error]
        this.type           =   `Error`;
        //Module Objects:
        this.buttonMod;
        this.wireMod;
        this.wagMod;

        //Node / Module Position based on "Grid" Position:
        this.x              =   0;
        this.y              =   0;
        //Node / Module Size:
        this.size           =   size;
        this.scaled         =   1;
        this.maxSize        =   this.size*this.scaled
        //Node / Module completed:
        this.solved =           false;
        this.solvedColor    =   0;

        //Node / mouse overlap:
        this.hovering       =   false;
        //Node / mouse overlap indication:
        this.hoverStroke    =   0;
    }

    /** Object Setup:   */
    setup()    {
        this.position();
        this.visible();
        this.facing();
        this.moduleSelection();
    }

    /** Converting "Grid" Position to X & Y positions on Canvas:    */
    position()  {
        //Column position:
        if (this.column === 1   ||  this.column === 4)  {
            this.x  =   bomb.x - (18*8);
        }
        else if (this.column === 2    ||  this.column === 5)    {
            this.x  =   bomb.x;
        }
        else if (this.column === 3    ||  this.column === 6)    {
            this.x  =   bomb.x + (18*8);
        }
        //Row position:
        if (this.row === 1) {
            this.y  =   bomb.y - (9*8);
        }
        else if (this.row === 2)    {
            this.y  =   bomb.y + (9*8);
        }
    }

    /** Checking if the node is visible:    */
    visible()   {
        //random nb from 0 to 3 in order to have a bigger chance for nodes to appear:
        this.r   =   floor(random(0, 3));

        //Using this nb to determine if the node is displayed or not:
        if (this.r === 2)   {
            this.displayed  =   false;
            //Invisible nodes are solved by default:
            this.solved =   true;
        }
        else    {
            this.displayed  =   true;
        }
    }

    /** Determining the Node's orientation: (Used for debugging)    */
    facing()    {
        //Default orientation in case of error:
        this.looking    =   `redacted`;

        //Checking node.nb:
        if (this.nb <= 6)   {
            this.looking    =   `front`;
        }
        else if (this.nb > 6)   {
            this.looking    =   `back`;
        }
    }

    /** Determining which Module is displayed on the node:  */
    moduleSelection()   {
        //Checks if the node is visible:
        if (this.displayed === false)   {
            this.type   =   `NaN`;
        }
        else    {
            //Checks if there is a timerMod created:
            if (timerNB === 0)  {
                //Locking the timerMod amount to 1:
                timerNB    =   1;
                //Naming the type of module:
                this.type   =   `Timer`;

                //Creating the type of module:
                timerMod    =   new Timer(this.x, this.y, this.size, timerMaxMin, timerMaxSec);
                //TimerMod is solved by default:
                this.solved =   true;
            }
            else if (timerNB === 1) {
                //Random nb used to generate 1/3 modules:
                this.r  =   floor(random(0, 3));
            
                //Using nb to create designated module:
                if (this.r === 0)   {
                    //Naming the type of module:
                    this.type   =   `Button`;

                    //Creating the type of module:
                    this.buttonMod  =   new Button(this.x, this.y, this.size, this.scaled);
                    //Module Object properties:
                    this.buttonMod.indicatorColor();
                }
                else if (this.r === 1)  {
                    //Naming the type of module:
                    this.type   =   `Wire`;

                    //Creating the type of module:
                    this.wireMod    =   new Wire(this.x, this.y, this.size);
                    //Module Object properties:
                    this.wireMod.cableSetup();
                }
                else if (this.r === 2)  {
                    //Naming the type of module:
                    this.type   =   `WAG`;

                    //Creating the type of module:
                    this.wagMod =   new WordAssociationGame(this.x, this.y, this.size, this.scaled);
                    //Module Object properties:
                    this.wagMod.wordGenerator();
                    this.wagMod.buttonSetup();
                }
            }
        }
    }


    /** Displaying the physical Node:   */
    displayNode()   {
        if (this.displayed === true)    {
            this.displayModule();
        }
    }

    
    /** Making the visible Nodes scale up when the mouse is hovering above them:*/
    mouseHover()    {
        //Calculating the distance between the mouse & Node:
        let d   =   dist(mouseX, mouseY, this.x, this.y);

        //If the mouse and Node is overlapping:
        if (d < this.size/2)    {
            this.hovering   =   true;
            //Clear indication that you can interact with the Node:
            this.hoverStroke    =   15;
            //Scaling up the Node:
            this.scaled =   2/1.5;
            this.size   =   this.maxSize*this.scaled;

//Possible addition of hint string?
            if (this.type === `Button`) {
                if (!mouseIsPressed)    {
                    push();
                    textSize(30);
                    fill(0);
                    textAlign(CENTER, BOTTOM);
                    text(`Hold the button`, width/2, height - 40);
                    pop();
                }
            }
            else if (this.type === `Wire`)  {
                push();
                textSize(30);
                fill(0);
                textAlign(CENTER, BOTTOM);
                text(`Cut the Black and Yellow Wires`, width/2, height - 40);
                pop();
            }
            else if (this.type === `WAG`)   {
                push();
                textSize(30);
                fill(0);
                textAlign(CENTER, BOTTOM);
                text(`Press the colored button associated with the displayed label`, width/2, height - 40);
                pop();
            }
        }
        //If or Once the mouse does not hover over the Node:
        else    {
            //Giving back the node it's original values:
            this.hoverStroke    =   0;
            this.scaled =   1;
            this.size   =   128;
        }
        return this.scaled;
    }

    /** Displaying the Node's Modules based on their attributed names:  */
    displayModule() {
        if (this.type === `Timer`)  {
            timerMod.display();
        }
        else if (this.type === `Button`)    {
            this.displayCompleted();
            this.buttonMod.displayMod(this.mouseHover());
            //Making the Module's `solved` value interact with the Node's value:
            this.solved =   this.buttonMod.completed;
        }
        else if (this.type === `Wire`)  {
            this.displayCompleted();
            this.wireMod.displayMod(this.mouseHover());
            //Making the Module's `solved` value interact with the Node's value:
            this.solved =   this.wireMod.completed;
        }
        else if (this.type === `WAG`)   {
            //this.displayCompleted();
            this.displayCompleted();
            this.wagMod.displayMod(this.mouseHover(), this.solved);
            //Making the Module's `solved` value interact with the Node's value:
            this.solved =   this.wagMod.completed;
        }
    }

    /** Displaying the Node's Background:   */
    displayCompleted()  {
        this.completed();

        //Creating a square interacting with the Node's `solved` value:
        push();
        stroke(0, 250, 0, 150);
        strokeWeight(this.hoverStroke);
        rectMode(CENTER);
        fill(0, this.solvedColor, 0);
        rect(this.x, this.y, this.size);
        pop();
    }

    /** Node completed values:  */
    completed() {
        //Making the Node's Background Green when solved:
        if (this.solved === true)   {
            this.solvedColor    =   255;
        }
        //Making it Black when not solved:
        else    {
            this.solvedColor    =   0;
        }
    }

    /** Debugging Nodes & Modules:  */
    debugging() {
        if (this.displayed === true)    {
            if (this.type === `Timer`)  {
                console.log(`#${this.nb} ${this.type} (${this.looking}):\n> position: x = ${this.column} / y = ${this.row}\n> Timer Start: ${timerMaxMin}:00`);
            }
            else if (this.type === `Button`)    {
                console.log(`#${this.nb} ${this.type} (${this.looking}):\n> position: x = ${this.column} / y = ${this.row}\n> Indicator: ${this.buttonMod.indicator.color}\n> Complete:  ${this.solved}`);
            }
            else if (this.type === `Wire`)  {
                console.log(`#${this.nb} ${this.type} (${this.looking}):\n> position: x = ${this.column} / y = ${this.row}\n> Wires:(${this.wireMod.nbWires})\n--> B:${this.wireMod.wireNb.b}\n--> C:${this.wireMod.wireNb.c}\n--> M:${this.wireMod.wireNb.m}\n--> y:${this.wireMod.wireNb.y}\n--> R:${this.wireMod.wireNb.r}\n To cut: ${this.wireMod.wiresToCut}\nComplete: ${this.solved}`);
            }
            else if (this.type === `WAG`)   {
                console.log(`#${this.nb} ${this.type} (${this.looking}):\n> position: x = ${this.column} / y = ${this.row}\n> Displayed: ${this.wagMod.word}\n> Complete: ${this.solved}`);
            }
        }
        else    {
            console.log(`#${this.nb} NaN`);
        }
    }
}