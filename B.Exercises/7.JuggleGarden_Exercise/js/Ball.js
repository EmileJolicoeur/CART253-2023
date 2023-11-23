class   Ball    {

    constructor(x, y)   {
        this.x  =   x;
        this.y  =   y;
        this.size   =   40;

        //Speed Momentum Values:
        this.vx =   0;
        this.vy =   0;
        this.ax =   0;
        this.ay =   0;
        this.maxSpeed   =   10;

        this.active =   true;

        this.color  =   {
            r:  random(50,255),
            g:  random(50,255),
            b:  random(50,255),
        };
    };

    gravity(force)   {
        this.ay +=  force
    }

    move()  {
        this.vx +=  this.ax;
        this.vy +=  this.ay;

        this.vx =   constrain(this.vx, -this.maxSpeed, this.maxSpeed);
        this.vy =   constrain(this.vy, -this.maxSpeed, this.maxSpeed);

        this.x  +=  this.vx;
        this.y  +=  this.vy;

        this.x  =   constrain(this.x, this.size/2, width - (this.size/2));

        
        if (this.y -this.size/2 > height)   {
            this.active =   false;
        }
    }

    bounce(paddle)    {
        //In relation to paddle:
        if (this.x > paddle.x - paddle.width/2  &&
            this.x < paddle.x + paddle.width/2  &&
            this.y + this.size/2 > paddle.y - paddle.height/2   &&
            this.y - this.size/2 < paddle.y + paddle.height/2)  {

            //Bounce
                //x
            let dx  =   this.x - paddle.x;
            this.vx +=  map(dx, -paddle.width/2, paddle.width/2, -2, 2);

            

                //y
            this.vy =   -this.vy;
            this.ay =   0.15;                      //To mess around with
        }

        //In relation to walls:
        if (this.x <= this.size/2   ||  this.x >= width - this.size/2)    {
            this.vx =   -this.vx;
        }
    }

    display()   {
        push();
        fill(this.color.r, this.color.g, this.color.b);
        noStroke();
        ellipse(this.x, this.y, this.size);
        pop();
    }
}