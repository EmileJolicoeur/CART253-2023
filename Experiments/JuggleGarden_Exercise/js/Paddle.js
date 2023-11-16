class   Paddle  {
    constructor(w, h)   {
        this.width  =   w;
        this.height =   h;
        this.x  =   undefined;
        this.y  =   height - this.height/2;

        this.color  =   {
            r:  200,
            g:  100,
            b:  10,
        };
    }

    move()  {
        this.x= mouseX;
    }

    display()   {
        push();
        fill(this.color.r, this.color.g, this.color.b);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height)
        pop();
    }

    mouseIsHeld() {
        if (mouseIsPressed === true)    {
            this.y  =   mouseY;
        }
    }
}