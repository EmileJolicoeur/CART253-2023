"use strict"
/** Video 1 & 2:    Introducing Object Oriented Programming [Learning Classes]  */
let garden  =   {

    flowers:    [],
    numFlowers: 20,

    bees:   [],
    numBees:    5,

    grassColor: {
        r:  120,
        g:  180,
        b:  120,
    },
};

function setup() {
    createCanvas(600,600);

    for (let i = 0; i < garden.numFlowers; i++) {

        let x   =   random(0, width);
        let y   =   random(0, height);
        let size    =   random(50, 80);
        let stemLength  =   random(50, 100);
        let petalColor  =   {
            r:  random(100, 255),
            g:  random(100, 255),
            b:  random(100, 255),
        };

        //new = calling the class Method
        let flower  =   new Flower(x, y, size, stemLength, petalColor);
        garden.flowers.push(flower);
    }

    for (let i = 0; i < garden.numBees; i++) {
        let bee  =   new Bee(random(0, width), random(0,height));
        garden.bees.push(bee);
    }
}


function draw() {
    background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

    for (let i = 0; i < garden.flowers.length; i++) {
        let flower  =   garden.flowers[i];
            //Video 4: adding "life" to the flowers
        if (flower.alive === true)  {
            flower.shrink();
            //Calls to the display sub-function of the Method
            flower.display();
        }
        //displayFlower(flower);
    }

    for (let i = 0; i < garden.bees.length; i++) {
        let bee  =   garden.bees[i];
        if (bee.alive === true)  {
            bee.shrink();
            bee.move();
            bee.display();

            for (let j = 0; j < garden.flowers.length; j++) {
                let flower  =   garden.flowers[j];
                if (flower.alive === true)  {
                    bee.tryToPollinate(flower);
                }
            }
        }
    }

}

// /** Video 3:    Object Oriented Programming & p5 Events (needs previous parts of script) */
// function mousePressed() {
//     for (let i = 0; i < garden.flowers.length; i++)  {
//         let flower  =   garden.flowers[i];
//         flower.mousePressed();
//     }
// }

/** Video 4:    Interacting Objects:    (needs previous part 1 & 2 of script)   */
