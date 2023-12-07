class   Bomb    {
    /** Object values:  */
    constructor(x, y)   {
        //Position:
        this.x  =               x;
        this.y  =               y;
        //Size:
        this.height =           512;
        this.width  =           512;
        this.depth  =           256;
        //Axes:
        this.axisY  =           `Mid`;      //Top, Mid, Bot
        this.axisX  =           `North`;    //North, South, East, West
    }

    /** Displaying the Bomb based on Y-Axis:    */
    displayVertical()  {
        if (this.axisY === `Mid`)   {
            //Displaying the Bomb based on X-Axis:
            this.displayHorizontal();

            //Screen Buttons:
            this.topArrow();
            this.botArrow();
        }
        else if (this.axisY === `Top`)  {
            //Displaying bomb.topView:
            this.topView();

            //Screen Buttons:
            this.botArrow();
        }
        else if (this.axisY === `Bot`)  {
            //Displaying bomb.bottomViews:
            this.bottomView();

            //Screen Buttons:
            this.topArrow();
        } 
    }

    /** Screen Button at the bottom of the screen:  */
    topArrow()  {
        //Button values:
            //Position:
        let arrowX  =   width/2;
        let arrowY  =   50;
            //Size:
        let arrowW  =   width;
        let arrowH  =   100;
        
        //Distance between mouse and Button:
        let dx  =   mouseX - arrowX;
        let dy  =   mouseY - arrowY;

        //Displaying the Button if the mouse hovers over it:
        if (dx < arrowW/2 && dy < arrowH/2)    {
            push();
            fill(200, 100, 0, 50);
            rectMode(CENTER);
            rect(arrowX, arrowY, arrowW, arrowH);
            pop();
        }
    }

    /** Screen Button at the bottom of the screen:  */
    botArrow()  {
        //Button values:
            //Position:
        let arrowX  =   width/2;
        let arrowY  =   height - 50;
            //Size:
        let arrowW  =   width;
        let arrowH  =   100;
        
        //Distance between mouse and Button:
        let dx  =   mouseX - arrowX;
        let dy  =   mouseY - arrowY;

        //Displaying the Button if the mouse hovers over it:
        if (dx < arrowW/2 && dy > -arrowH/2)    {
            push();
            fill(200, 100, 0, 50);
            rectMode(CENTER);
            rect(arrowX, arrowY, arrowW, arrowH);
            pop();
        }
    }

    /** Displaying the Bomb based on X-Axis:    */
    displayHorizontal()    {
        //Screen Buttons:
        this.xArrows();

        if (this.axisX === `North`)	{
            //Displaying bomb.frontalView:
            this.frontalView();
        }
        else if (this.axisX === `South`)    {
            //Displaying bomb.dorsalView:
            this.dorsalView();
        }
        else if (this.axisX === `West`) {
            //Displaying bomb.leftView:
            this.leftView();
        }
        else if (this.axisX === `East`) {
            //Displaying bomb.rightView:
            this.rightView();
        }
    }

    /** Screen Button displayed for X-Axis: */
    xArrows()   {
        //Screen Buttons values:
            //Position:
        let leftArrowX  =   50;
        let rightArrowX  =   width - 50;
        let arrowY  =   height/2;
            //Size:
        let arrowW  =   100;
        let arrowH  =   height;
        
        //Distance between mouse and Button:
        let dxL =   mouseX - leftArrowX;
        let dxR =   mouseX - rightArrowX;
        let dy  =   mouseY - arrowY;

        //Displaying the left Button if the mouse hovers over it:
        if (dxL < arrowW/2 && dy < arrowH/2)    {
            push();
            fill(200, 100, 0, 50);
            rectMode(CENTER);
            rect(leftArrowX, arrowY, arrowW, arrowH);
            pop();
        }
        //Displaying the right Button if the mouse hovers over it:
        if (dxR > -arrowW/2 && dy < arrowH/2)    {
            push();
            fill(200, 100, 0, 50);
            rectMode(CENTER);
            rect(rightArrowX, arrowY, arrowW, arrowH);
            pop();
        }
    }


    /** Displaying the front of the bomb:   */
    frontalView()   {
        //Image:
        push();
        imageMode(CENTER);
        image(disBombX, this.x, this.y, this.width, this.height);
        pop();
    }

    /** Displaying the back of the bomb:    */
    dorsalView()    {
        //Image:
        push();
        imageMode(CENTER);
        image(disBombX, this.x, this.y, this.width, this.height);
        pop();
    }

    /** Displaying the left of the bomb:    */
    leftView()  {
        //Image:
        push();
        imageMode(CENTER);
        image(disBombY, this.x, this.y, this.depth, this.height);
        pop();
    }

    /** Displaying the right of the bomb:   */
    rightView() {
        //Image:
        push();
        imageMode(CENTER);
        image(disBombY, this.x, this.y, this.depth, this.height);
        pop();
    }

    /** Displaying the top of the bomb: */
    topView()   {
        //Image:
        push();
        imageMode(CENTER);
        image(disBombT, this.x, this.y, this.width, this.depth);
        pop();
    }

    /** Displaying the bottom of the bomb:  */
    bottomView()    {
        //Image:
        push();
        imageMode(CENTER);
        image(disBombB, this.x, this.y, this.width, this.depth);
        pop();
    }

    /** Controls:   */
    mouseClick()    {
        //Controls:
        this.rotateY();
        this.rotateX();

        //Debug:
        //this.debugging();
    }
    
    /** Controls on Y Axis: */
    rotateY()   {
        //Top Arrow hitbox:
        if (mouseY <= 100)	{
            if (this.axisY === `Bot`)	{
                this.axisY = `Mid`;
            }
            else if (this.axisY === `Mid`)  {
                this.axisY = `Top`;
            }
        }
        //Bottom Arrow hitbox:
        if (mouseY >= height - 100)	{
            if (this.axisY === `Top`)	{
                this.axisY = `Mid`;
            }
            else if (this.axisY === `Mid`)  {
                this.axisY = `Bot`;
            }
        }
    }

    //Controls on X Axis:
    rotateX()    {
        if (this.axisY === `Mid`)    {
			    //Left Arrow hitbox:
            if (mouseX <= (width/2) +355)  {
                if (this.axisX === `North`) {
                    this.axisX = `West`;
                }
                else if (this.axisX === `West`) {
                    this.axisX = `South`;
                }
                else if (this.axisX === `South`)    {
                    this.axisX = `East`;
                }
                else if (this.axisX === `East`) {
                    this.axisX = `North`;
                }
            }
                //Right Arrow hitbox:
            if (mouseX >= (width/2) -355)	{
                if (this.axisX === `North`) {
                    this.axisX = `East`;
                }
                else if (this.axisX === `East`) {
                    this.axisX = `South`;
                }
                else if (this.axisX === `South`)    {
                    this.axisX = `West`;
                }
                else if (this.axisX === `West`) {
                    this.axisX = `North`;
                }
            }
	    }
    }

    /** Debugging (logging face orientation of the Bomb):   */
    debugging() {
        console.log(`Orientation:   ${this.axisX}-${this.axisY}`)
    }
}