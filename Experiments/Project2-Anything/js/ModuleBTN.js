class   ModuleBTN   {
    //Button
    constructor()   {
        this.button  =   {
            x:  undefined,
            y:  undefined,
            size:   80,
            fill:   {
                r:  255,
                gb: 0,
                hover:  100,
                hold:   180,
            },
        };
        this.indicator  =   {
            x:  undefined,
            y:  undefined,
            size:   32,
            value:  false,

            colorPick:  undefined,

            fill:   {
                r:  0,
                g:  0,
                b:  0,
            },
        };
    }

    indicatorGenerator()    {
        this.indicator.colorPick    =   floor(random(0, 4));

        if (this.indicator.colorPick === 0) {
            this.indicator.fill.r   =   255;
        } else if (this.indicator.colorPick === 1) {
            this.indicator.fill.g   =   255;
        } else if (this.indicator.colorPick === 2) {
            this.indicator.fill.b   =   255;
        } else if (this.indicator.colorPick === 3) {
            this.indicator.fill.r   =   255;
            this.indicator.fill.g   =   255;
        }
        console.log(`NB: ${butMod.lit.colPick} \n r: ${butMod.lit.fill.r} \n g: ${butMod.lit.fill.g} \n b: ${butMod.lit.fill.b}`);
    }

    /** Interactions between mouse and button   */
    hold()  {
        fill(this.button.fill.r, this.button.fill.gb, this.button.fill.gb);
        
        let d   =   dist(mouseX, mouseY, this.button.x, this.button.y);

        if (d < this.button.size/2) {
            if (mouseIsPressed === false)   {
                this.button.fill.gb  =   this.button.fill.hover;
                this.indicator.value    =   false;
            } else if (mouseIsPressed === true) {
                this.button.fill.r  =   this.button.fill.hold;
                this.indicator.value    =   true;
                this.instructions();
            }
        } else  {
            this.button.fill.r  =   255;
            this.button.fill.gb =   0;
        }
    }

    /** Helps the player determine how to defuse the bomb*/
    instructions()  {
        let buttonTxt;
        let hintTxt =   `(use keyboard)`;
        
        if (this.indicator.colorPick === 0)   {                       //Red Light
            buttonTxt   =   `In 10, 7 is mirrored by 4. The INPUT is a mirror letter`;
        }   else if (this.indicator.colorPick === 1)  {
            buttonTxt   =   `Awaiting corresponding KEY INPUT`;
        }   else if (this.indicator.colorPick === 2)  {
            buttonTxt   =   `the 3rd letter`;
        }   else if (this.indicator.colorPick === 3)  {
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

    displayIndicator()  {
        this.indicator.x    =   node.x + 40;
        this.indicator.y    =   node.y - 24;

        push();
        noStroke();
        if (this.indicator.value  === true)   {
            fill(this.indicator.fill.r, this.indicator.fill.g, this.indicator.fill.b);
        }   else    {
            noFill;
        }
        rectMode(CENTER);
        rect(this.indicator.x, this.indicator.y, this.indicator.size);
        pop();
    }

    displayButton()   {
        this.button.x   =   node.x - 16;
        this.button.y   =   node.y - 16;

        push();
        this.buttonHeld();
        rectMode(CENTER);
        noStroke();
        rect(this.button.x, this.button.y, this.button.size);
        pop();
    }

    displayModule(node) {
        node.display();
        this.displayButton();
        this.displayIndicator();
        
        push();
        imageMode(CENTER);
        images(buttonModImg, node.x, node.y, node.size, node.size);
        pop();
    }

    keyPressed()	{       //[1,2,3,4]
        //Switching phase Values
        //debugging();
        if (butMod.lit.val  ===   true)   {
            if (this.indicator.colorPick === 0)    {
                if (key === `h`)    {
                    timer.armed   =   false;
                    phase   =   `Win`;
                }   else if (key != `h`)    {
                    phase   =   `Lose`;
                }
            } else if (this.indicator.colorPick === 1)    {
                if (key === `g`)    {
                    timer.armed   =   false;
                    phase   =   `Win`;
                }   else if (key != `g`)    {
                    phase   =   `Lose`;
                }
            } else if (this.indicator.colorPick === 2)    {
                if (key === `u`)    {
                    timer.armed   =   false;
                    phase   =   `Win`;
                }   else if (key != `u`)    {
                    phase   =   `Lose`;
                }
            } else if (this.indicator.colorPick === 3)    {
                if (key)    {
                    phase   =   `Lose`;
                }
            }
        }
    }
}