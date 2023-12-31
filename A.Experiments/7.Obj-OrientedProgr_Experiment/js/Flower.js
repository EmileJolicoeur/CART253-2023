/** Classes are automatically in strict mode    */

class   Flower  {

    //Functions in class are called Methods
    constructor(x, y, size, stemLength, petalColor)   {
        //Do not need to declare new variable
        //Variable name "This"  =   Current object made in constructor
        this.x  =   x;
        this.y  =   y;
        this.size   =   size;
        this.maxSize    =   size;
        this.stemLength =   stemLength;
        this.stemThickness  =   10;
        this.petalThickness =   10;
        this.maxPetalThickness  =   10;
        this.stemColor  =   {
            r:  50,
            g:  150,
            b:  50,
        };
        this.petalColor =   petalColor;
        this.centerColor    =   {
            r:  50,
            g:  0,
            b:  0,
        };
            //Video 4
        this.alive  =   true;
        //Automatically returns class object
    }

    display()   {

        push();
    
        strokeWeight(this.stemThickness);
        stroke(this.stemColor.r, this.stemColor.g, this.stemColor.b);
        line(this.x, this.y, this.x, this.y + this.stemLength);
    
        strokeWeight(this.petalThickness);
        fill(this.centerColor.r, this.centerColor.g, this.centerColor.b);
        stroke(this.petalColor.r, this.petalColor.g, this.petalColor.b);
        ellipse(this.x, this.y, this.size);
        pop();
    }

//     /** Video 3:    Object Oriented Programming & p5 Events (needs previous parts of script*/
//     mousePressed()  {
//         let d   =   dist(this.x, this.y, mouseX, mouseY);
//         if (d < this.size/2 + this.petalThickness)  {
//             this.stemLength +=  5;
//             this.y  -=  5;
//         }
//     }

    /** Video 4:    Interacting Objects:    (needs previous part 1 & 2 of script*/
    shrink()    {
        let shrinkage   =   random(0, 0.1);
        this.size   -=  shrinkage;
        this.petalThickness -=  shrinkage/10;

        if (this.size <= 0  ||  this.petalThickness <= 0)   {
            this.alive  =   false;
        }
    }

    pollinate() {
        let growth  =   random(0, 0.5);
        this.size   +=  growth;
        this.petalThickness +=  growth/10;
        this.size   =   constrain(this.size, 0, this.maxSize);
        this.petalThickness =   constrain(this.petalThickness, 0, this.maxPetalThickness);
    }
}