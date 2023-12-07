class   WordAssociationGame {
    constructor(x, y, size)   {
        //Mod values:
        this.x  =               x;
        this.y  =               y;
        this.size   =           size;
        //Buttons array:
        this.buttons    =       [];
        this.totalButtons   =   4;
        //Word:
        this.word   =           undefined;
        //Colors:
        this.fill   =   {
            pressed:            0,
            hover:              255,
            opacity:            100,
        }
        //The button to press based on Word displayed:
        this.buttonToPress  =   undefined;
        this.completed  =   false;
    }

    /** Setting up the WagMod buttons:  */
    buttonSetup(s)   {
        for (let i = 0; i < this.totalButtons; i++) {
            this.buttons.push(this.button);
        }
        //Array of buttons:
        this.buttons[0]  =   this.createButton(-1, -1, -0.5, `Red`   , );
        this.buttons[1]  =   this.createButton( 1, -1, -0.5, `Green` , );
        this.buttons[2]  =   this.createButton(-1,  1,  3.5, `Yellow`, );
        this.buttons[3]  =   this.createButton( 1,  1,  3.5, `Blue`  , );
        
        console.log(this.buttons);
    }

    /** Creating the different buttons on the module:   */
    createButton(r, c, y, color, )  {
        this.button =   {
            //Color label:
            name:   color,
            //Position:
            posX:   r*(3.5*8),
            x:  undefined,
            posY:   c*(y*8),
            y:  undefined,
            //Size:
            w:  56,
            h:  24,
            //Tint:
            color:  undefined,
        };
        return this.button;
    }

    /** Displaying the WagMod:  */
    displayMod(s, node)    {
        this.displayWord(s);

        //wagMod Image:
        push();
        imageMode(CENTER);
        image(disWAG, this.x, this.y, this.size*s, this.size*s);
        pop();
        //Displaying the buttons:
        for (let i = 0; i < this.buttons.length; i ++)   {
            this.buttonDisplay(this.buttons[i], s, node);
        }
    }

    /** Displaying the word:    */
    displayWord(s)   {
        //Screen Background:
        push();
        fill(0);
        rectMode(CENTER);
        rect(this.x, this.y - this.size/4, this.size*s, (this.size/2)*s);
        pop();
        //Word:
        push();
        textAlign(CENTER);
        textSize(20*s);
        fill(255);
        text(this.word, this.x, this.y -25*s);
        pop();
    }

    /** Generating Word for WagMod Display: */
    wordGenerator() {
        //Selecting word based on random nb:
        this.r  =   floor(random(0, 4));
        if (this.r === 0)   {
            this.word   =   `Nature`;
            //Associating word with corresponding button:
            this.buttonToPress  =   0;
        }
        else if (this.r === 1)  {
            this.word   =   `Sun`;
            //Associating word with corresponding button:
            this.buttonToPress  =   1;
        }
        else if (this.r === 2)  {
            this.word   =   `Ocean`;
            //Associating word with corresponding button:
            this.buttonToPress  =   2;
        }
        else if (this.r === 3)  {
            this.word   =   `Predator`;
            //Associating word with corresponding button:
            this.buttonToPress  =   3;
        }
    }

    /** Displaying the Buttons: */
    buttonDisplay(button, s)    {
        //Calculating distance between Mouse and WagMod button:
        this.d  =   dist(mouseX, mouseY, button.x, button.y);

        //Button position (implementing Node scaling):
        button.x    =   this.x + button.posX*s;
        button.y    =   this.y + button.posY*s;

        //Displaying indication that the button is interactable:
        if (this.d <= button.w/2 || this.d <= button.h/2) {
            if (mouseIsPressed === false)   {
                button.color    =   this.fill.hover;
            }
            //Determining outcome of pressing the button based on Word and Color label:
            else if (mouseIsPressed === true)   {
                button.color    =   this.fill.pressed;
                if (button.name === `Red` && this.word === `Predator`)  {
                    this.completed   =   true;
                    console.log(`solved: ${this.completed}`);
                }
                else if (button.name === `Green` && this.word === `Nature`) {
                    this.completed   =   true;
                    console.log(`solved: ${this.completed}`);
                }
                else if (button.name === `Yellow` && this.word === `Sun`)   {
                    this.completed   =   true;
                    console.log(`solved: ${this.completed}`);
                }
                else if (button.name === `Blue` && this.word === `Ocean`)   {
                    this.completed   =   true;
                    console.log(`solved: ${this.completed}`);
                }
                else    {
                    gamePhase   =   `lost`;
                }
            }

            //Displaying the WagMod buttons:
            push();
            noStroke();
            rectMode(CENTER);
            fill(button.color, button.color, button.color, this.fill.opacity);
            rect(button.x, button.y, button.w*s, button.h*s);
            pop();
        }
    }
}