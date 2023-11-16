class   Bomb    {
    //Bomb
    constructor(x, y)   {
        this.x  =   x;
        this.y  =   y;
        this.height =   512;
        this.width  =   512;
        this.depth  =   256;

        this.axisY  =   `Mid`;  //Top, Mid, Bot
        this.axisX  =   `North`;    //North, South, East, West
    }

    //Displaying the Bomb based on Y Axis:
    displayVertical()  {
        if (this.axisY === `Top`) {
            this.topView();
            this.botArrow();

            console.log(`Top`);
        } else if (this.axisY === `Mid`)  {
            this.displayHorizontal();
            this.topArrow();
            this.botArrow();

            console.log(`Mid-${this.axisX}`);
        } else if (this.axisY === `Bot`) {
            this.bottomView();
            this.topArrow();

            console.log(`Bot`);
        } 
    }

    //Interractable box on the bottom of the screen:
    topArrow()  {
        let arrowX  =   width/2;
        let arrowY  =   50;
        let arrowW  =   width;
        let arrowH  =   100;
        
        let dx  =   mouseX - arrowX;
        let dy  =   mouseY - arrowY;

        if (dx < arrowW/2 && dy < arrowH/2)    {
            push();
            fill(200, 100, 0, 50);
            rectMode(CENTER);
            rect(arrowX, arrowY, arrowW, arrowH);
            pop();
        }

    }
    //Interractable box on the bottom of the screen:
    botArrow()  {
        let arrowX  =   width/2;
        let arrowY  =   height - 50;
        let arrowW  =   width;
        let arrowH  =   100;
        
        let dx  =   mouseX - arrowX;
        let dy  =   mouseY - arrowY;

        if (dx < arrowW/2 && dy > -arrowH/2)    {
            push();
            fill(200, 100, 0, 50);
            rectMode(CENTER);
            rect(arrowX, arrowY, arrowW, arrowH);
            pop();
        }

    }

    //Displaying the Bomb based on X Axis:
    displayHorizontal()    {
        
        this.xArrows();

            //Bomb view on X axis:
        if (this.axisX === `North`)	{
            this.frontalView();
        }  else if (this.axisX === `South`)	{
            this.dorsalView();
        } else if (this.axisX === `West`)	{
            this.leftView();
        }else if (this.axisX === `East`)	{
            this.rightView();
        }
    }

    //Interactable boxes on display for x Axis:
    xArrows()   {
        let leftArrowX  =   50;
        let rightArrowX  =   width - 50;
        let arrowY  =   height/2;
        let arrowW  =   100;
        let arrowH  =   height;
        
        let dxL =   mouseX - leftArrowX;
        let dxR =   mouseX - rightArrowX;
        let dy  =   mouseY - arrowY;

        if (dxL < arrowW/2 && dy < arrowH/2)    {
            push();
            fill(200, 100, 0, 50);
            rectMode(CENTER);
            rect(leftArrowX, arrowY, arrowW, arrowH);
            pop();
        }

        if (dxR > -arrowW/2 && dy < arrowH/2)    {
            push();
            fill(200, 100, 0, 50);
            rectMode(CENTER);
            rect(rightArrowX, arrowY, arrowW, arrowH);
            pop();
        }
    }


    //Displaying the front of the bomb:
    frontalView()   {
        //Placeholder
            //Shape:
        push();
        fill(0, 255, 0);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
        pop();
            //Orientation Help:
        push();
        textSize(20);
        textAlign(CENTER);
        fill(0);
        text(`F`, width/2, 40);
        pop();

        //Image:
        push();
        imageMode(CENTER);
        image(disBombX, this.x, this.y, this.width, this.height);
        pop();


    }
    //Displaying the back of the bomb:
    dorsalView()    {
        //Placeholder
            //Shape:
        push();
        fill(255, 0, 255);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
        pop();
            //Orientation Help:
        push();
        textSize(20);
        textAlign(CENTER);
        fill(0);
        text(`D`, width/2, 40);
        pop();

        //Image:
        push();
        imageMode(CENTER);
        image(disBombX, this.x, this.y, this.width, this.height);
        pop();
    }
    //Displaying the left of the bomb:
    leftView()  {
        //Placeholder
            //Shape:
        push();
        fill(0, 255, 255);
        rectMode(CENTER);
        rect(this.x, this.y, this.depth, this.height);
        pop();
            //Orientation Help:
        push();
        textSize(20);
        textAlign(CENTER);
        fill(0);
        text(`L`, width/2, 40);
        pop();
        

        //Image:
        push();
        imageMode(CENTER);
        image(disBombY, this.x, this.y, this.depth, this.height);
        pop();
    }
    //Displaying the right of the bomb:
    rightView() {
        //Placeholder
            //Shape:
        push();
        fill(255, 0, 0);
        rectMode(CENTER);
        rect(this.x, this.y, this.depth, this.height);
        pop();
            //Orientation Help:
        push();
        textSize(20);
        textAlign(CENTER);
        fill(0);
        text(`R`, width/2, 40);
        pop();

        //Image:
        push();
        imageMode(CENTER);
        image(disBombY, this.x, this.y, this.depth, this.height);
        pop();
    }
    //Displaying the top of the bomb:
    topView()   {
        //Placeholder
            //Shape:
        push();
        fill(0, 0, 255);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.depth);
        pop();
            //Orientation Help:
        push();
        textSize(20);
        textAlign(CENTER);
        fill(0);
        text(`T`, width/2, 40);
        pop();
        
        //Image:
        push();
        imageMode(CENTER);
        image(disBombT, this.x, this.y, this.width, this.depth);
        pop();
    }
    //Displaying the bottom of the bomb:
    bottomView()    {
        //Placeholder
            //Shape:
        push();
        fill(255, 255, 0);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.depth);
        pop();
            //Orientation Help:
        push();
        textSize(20);
        textAlign(CENTER);
        fill(0);
        text(`B`, width/2, 40);
        pop();

        //Image
        push();
        imageMode(CENTER);
        image(disBombB, this.x, this.y, this.width, this.depth);
        pop();
    }

    
    //Controls:
    mouseClick()    {
        this.rotateY();
        this.rotateX();
    }
    //Controls on Y Axis:
    rotateY()   {
            //Top Arrow:
        if (mouseY <= 100)	{
            if (this.axisY === `Bot`)	{
                this.axisY = `Mid`;
            } else if (this.axisY === `Mid`)	{
                this.axisY = `Top`;
            }
        }
            //Bottom Arrow:
        if (mouseY >= height - 100)	{

            push();
            fill(200);
            rectMode(CENTER);
            rect(width/2, height -50, width, 100);
            pop();

                if (this.axisY === `Top`)	{
                    this.axisY = `Mid`;
                } else if (this.axisY === `Mid`)	{
                    this.axisY = `Bot`;
                }

            // push();
            // fill(50, 50, 50, 50);
            // rectMode(CENTER);
            // rect(width/2, height -50, width, 100);
            // pop();
        }
    }
    //Controls on X Axis:
    rotateX()    {
        if (this.axisY === `Mid`)    {
			    //Left Arrow:
            if (mouseX <= (width/2) + 400)  {
                
                console.log(`left`);

                // push();
                // fill(50, 50, 50, 50);
                // rectMode(CENTER);
                // rect(width - 50, height/2, 100, height);
                // pop();

                if (this.axisX === `North`)	{
                    this.axisX = `West`;
                } else if (this.axisX === `West`)   {
                    this.axisX = `South`;
                }   else if (this.axisX === `South`)    {
                    this.axisX = `East`;
                }   else if (this.axisX === `East`) {
                    this.axisX = `North`;
                }
            }
                //Right Arrow:
            if (mouseX >= (width/2) -400)	{

                console.log(`right`);

                // push();
                // fill(100, 200, 50);
                // rectMode(CENTER);
                // rect(50, (width/2) - 400, 100, height);
                // pop();

                if (this.axisX === `North`)	{
                    this.axisX = `East`;
                } else if (this.axisX === `East`)   {
                    this.axisX = `South`;
                }   else if (this.axisX === `South`)    {
                    this.axisX = `West`;
                }   else if (this.axisX === `West`) {
                    this.axisX = `North`;
                }
            }
	    }
    }
}