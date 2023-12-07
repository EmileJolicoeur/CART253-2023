class   Button  {
    constructor(x, y, size, scaled)   {
        //Button Module's Node variables:
        this.x  =               x;
        this.y  =               y;
        this.size   =           size;
        this.scaled =           scaled;

        //Physical button values:
        this.button  =   {
            //Basic values:
            x:                  undefined,
            y:                  undefined,
            size:               80,
            //Color values:
            fill:   {
                r:              255,
                gb:             0,
                hover:          100,
                hold:           180,
            },
        };

        //Lit Indicator values:
        this.indicator   =   {
            //Basic values:
            x:                  undefined,
            y:                  undefined,
            size:               32,
            //Displaying Indicator:
            displayed:  false,
            //Color values:
            fill:   {
                r:              0,
                g:              0,
                b:              0,
                //Color Selection:
                picker:         undefined,
            },

            //[Red / Green / Blue]
            color:              `0`,
        };
        this.completed   =   false;
    }

    /** Displaying ButtonMod:   */
    displayMod(s)    {
        //Displaying the interactive aspects of the ButtonMod:
        this.displayButton(s);
        this.displayIndicator(s);

        //ButtonMod Image:
        push();
        imageMode(CENTER);
        image(disBTN, this.x, this.y, this.size*s, this.size*s);
        pop();
    }

    /** Creating the physical button of the ButtonMod:  */
    displayButton(s) {
        //Physical button location based on ButtonMod:
        this.button.x   =   this.x - 16*s;
        this.button.y   =   this.y - 16*s;

        //Button shape:
        push();
        noStroke();
        this.buttonHeld();
        rectMode(CENTER);-
        rect(this.button.x, this.button.y, this.button.size*s);
        pop();
    }

    /** Physical button States: */
    buttonHeld()    {
        fill(this.button.fill.r, this.button.fill.gb, this.button.fill.gb);
        
        //Calculating the distance between Mouse Position and the physical button:
        this.d   =   dist(mouseX, mouseY, this.button.x, this.button.y);

        //States of the physical button based on Mouse Position:
        //  If the mouse is hovering over the physical button:
        if (this.d < this.button.size/2)    {
            //  No Mouse Click:
            if (mouseIsPressed === false)   {
                this.button.fill.gb =   this.button.fill.hover;
                this.indicator.displayed    =   false;
            }
            //  With Mouse Click:
            else if (mouseIsPressed === true) {
                this.button.fill.r  =   this.button.fill.hold;
                this.indicator.displayed    =   true;
                //insert button instructions
                this.buttonInstructions();
                //Insert Key Pressed mechanics
            }
        }
        //  If the mouse is not hovering over the physical button:
        else if (this.d >= this.button.size/2)    {
            //Set default red color
            this.button.fill.r  =   255;
            this.button.fill.gb =   0;
        }
    }

    /** Lit Indicator Color Picker: [Red, Green, Blue]*/
    indicatorColor()    {
        //Picking a random number:  [0 - 2]
        this.indicator.fill.picker  =   floor(random(0, 3));

        //Assigning color to number generated:  [Red / Green / Blue]
        if (this.indicator.fill.picker === 0)   {
            this.indicator.fill.r   =   255;
            this.indicator.color    =   `Red`;
        }
        else if (this.indicator.fill.picker === 1)  {
            this.indicator.fill.g   =   255;
            this.indicator.color    =   `Green`;
        }
        else if (this.indicator.fill.picker === 2)  {
            this.indicator.fill.b   =   255;
            this.indicator.color    =   `Blue`;
        }
    }

    /** Creating the Lit Indicator of the ButtonMod:    */
    displayIndicator(s)  {
        //Indicator location based on ButtonMod:
        this.indicator.x    =   this.x + 40*s;
        this.indicator.y    =   this.y - 24*s;

        //Indicator shape:
        push();
        noStroke();
        this.displayIndicatorColor();
        rectMode(CENTER);
        rect(this.indicator.x, this.indicator.y, this.indicator.size);
        pop();
    }

    /** Lit Indicator States:   */
    displayIndicatorColor()  {
        if (this.indicator.displayed === true)   {
            fill(this.indicator.fill.r, this.indicator.fill.g, this.indicator.fill.b);
        }
        else if (this.indicator.displayed === false)    {
            fill(0);
        }
    }

    /** Text appearing for key input*/
    buttonInstructions()    {
        this.buttonTxt;
        this.hintTxt =   `(use keyboard)`;
        
        if (this.indicator.fill.picker === 0)   {                       //Red Light
            this.buttonTxt   =   `In 10, 7 is mirrored by 4. The INPUT is a mirror letter`;
        }
        else if (this.indicator.fill.picker === 1)  {
            this.buttonTxt   =   `Awaiting corresponding KEY INPUT`;
        }
        else if (this.indicator.fill.picker === 2)  {
            this.buttonTxt   =   `the 3rd letter`;
        }
    
        push();
        textSize(30);
        fill(0);
        textAlign(CENTER, BOTTOM);
        text(`${this.buttonTxt}\n${this.hintTxt}`, width/2, height - 40);
        pop();
    }

    keyTyped()    {
        if (this.indicator.displayed === true) {
            console.log(this.indicator.color);
            if (this.indicator.color === `Red`)  {
                if (key === `h`)   {
                    this.completed  =   true;
                    console.log(this.completed);
                }
                else if (key != `h`) {
                    gamePhase   =   `lost`;
                    console.log(`Boom`);
                }
            }
            if (this.indicator.color === `Green`)  {
                if (key === `g`)   {
                    this.completed  =   true;
                    console.log(this.completed);
                }
                else if (key != `g`) {
                    gamePhase   =   `lost`;
                    console.log(`Boom`);
                }
            }
            if (this.indicator.color === `Blue`)  {
                if (key === `u`)   {
                    this.completed  =   true;
                    console.log(this.completed);
                }
                else if (key != `u`) {
                    gamePhase   =   `lost`;
                    console.log(`Boom`);
                }
            }
        }
    }
}