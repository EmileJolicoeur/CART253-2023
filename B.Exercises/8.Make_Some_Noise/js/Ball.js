class Ball  {

    constructor(x, y)   {
        this.x  =   x;
        this.y  =   y;
        this.size   =   50;
        this.fill   =   {
            r:  random(200, 255),
            g:  random(200, 255),
            b:  random(200, 255),
        };
        this. speed =   7;
        this.vx =   random(-this.speed, this.speed);
        this.vy =   random(-this.speed, this.speed);

        //Oscillator:
        this.oscillatorType =   `sawtooth`  //sawtooth, square, triangle, sine
        this.oscillator =   new p5.Oscillator(this.oscType());

        this.nearFreq   =   220;
        this.farFreq    =   440;
        this.oscillator.amp(0.1);
        this.oscillator.start();
    }

    oscType()   {
        this.r   =   floor(random(1, 5));

        if (this.r === 1)    {
            this.oscillatorType =   `sine`;
        } else if (this.r === 2) {
            this.oscillatorType =   `triangle`;
        } else if (this.r === 3) {
            this.oscillatorType =   `square`;
        } else if (this.r === 4) {
            this.oscillatorType =   `sawtooth`;
        }
    }

    move()  {
        this.x  +=  this.vx;
        this.y  +=  this.vy;

        //update frequency:
        let d   =   dist(this.x, this.y, width/2, height/2);
        let maxDist =   dist(0, 0, width/2, height/2);

        let newFreq =   map(d, 0, maxDist, this.nearFreq, this.farFreq);
        this.oscillator.freq(newFreq);
    }

    bounce()    {
        if (this.x - this.size/2 < 0 || this.x + this.size/2 > width)   {
            this.vx =   -this.vx;
        }

        if (this.y - this.size/2 < 0 || this.y + this.size/2 > height)  {
            this.vy =   -this.vy;
        }
    }
    display()   {
        push();
        noStroke();
        fill(this.fill.r, this.fill.g, this.fill.b);
        ellipse(this.x, this.y, this.size);
        pop();

        console.log(this.oscillatorType);
    }
}