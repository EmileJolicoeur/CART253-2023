class   Node  {
    //Nodes
    constructor(modNB, x, y, z, size, randomModule)   {
        //ModuleNB
        this.moduleNB   =   modNB
        //Position of Node:
        this.x  =   x;
        this.y  =   y;
        this.z  =   z;
        //Size
        this.size   =   size;
        this.maxSize    =   3*size/2;

        //Color
        this.completedColor  =   {
            r:  0,
            g:  0,                      //Will become green
            b:  0,
        };

            //Selecting Module:
        this.typeRandom  =   randomModule;
        this.type   =   `tim`;          //tim (timer), btn (button), wir (Wires), wag (Word Association Game)

            //Module Completion
        this.complete   =   false;
    }


    moduleSelect()  {


    }

    moduleComplete()   {
        if (this.complete === true) {
            this.completedColor.g   =   255;
            //armed =   false
        } else  {
            this.completedColor.g   =   0;
        }

        push();
        this.mouseHover();
        rectMode(CENTER);
        fill(this.completedColor.r, this.completedColor.g, this.completedColor.b);
        rect(this.x, this.y, this.size);
        pop();
    }


    display()   {
        //this.moduleSelect();

        if (this.moduleNB === 0) {
            this.type   =   `tim`;
            timer.display();

        } else  if (this.moduleNB > 0)   {

            if (this.typeRandom === 1)    {
                this.type   =   `btn`;
                this.moduleComplete();

                push();
                imageMode(CENTER);
                image(disBTN, this.x, this.y, this.size, this.size);
                pop();

            } else if (this.typeRandom === 2)    {
                this.type   =   `wir`;
                this.moduleComplete();

                push();
                imageMode(CENTER);
                image(disWIR, this.x, this.y, this.size, this.size);
                pop();

            } else if (this.typeRandom === 3)    {
                this.type   =   `wag`;
                this.moduleComplete();

                push();
                imageMode(CENTER);
                image(disWAG, this.x, this.y, this.size, this.size);
                pop();

            }
        }
        this.debugging(this.moduleNB);
    }

    /** Indicators for interaction:  */
    mouseHover()    {
        let d   =   dist(mouseX, mouseY, this.x, this.y);
        if (d < this.size/2)    {
            stroke(200, 100, 0, 100);
            strokeWeight(15);
            this.size   = this.maxSize;


            //Debugging
            if (keyIsPressed) {
                this.complete  =   true;
            }
           
        } else  {
            this.size   =   128;
        }
    }


    debugging(i) {
        console.log(`${i}:${this.type}: \nX = ${this.x}\nY = ${this.y}\nZ = ${this.z} \nComplete: ${this.complete}`);
    }
}