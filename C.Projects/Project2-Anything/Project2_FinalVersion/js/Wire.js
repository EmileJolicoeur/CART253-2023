class   Wire    {
    constructor(x, y, size)   {
        //WireMod values:
        this.x              =   x;
        this.y              =   y;
        this.size           =   size;
        //Wires array:
        this.cables         =   [];
        this.totalCables    =   4;
        //Amount of Wires:
        this.nbWires        =   0;
        //Color of the Wires:
        this.color  =   undefined;
        //Amount of Wires per color:
        this.wireNb =   {
            b:          0,
            c:          0,
            m:          0,
            y:          0,
            r:          0,
        };
        //The nb of wires to cut:
        this.wiresToCut     =   0;
        //If the Module is solved:
        this.completed      =   false;


    }

    /** Generating Cables:  */
    cableSetup()    {
        for (let i = 0; i < this.totalCables; i++)   {
            //Random number used to generate the cable's color:
            this.r  =   floor(random(0, 10));

            this.cableVariables(this.r);

            //creating the cable:
            this.cable  =   this.createCables((3*(i)*8), this.r, this.color);
            this.cables.push(this.cable);

        }
    }

    cableVariables(randomNB)    {
        if (randomNB === 0) {                           //Black
            //Adding to the total nb of Black Cables:
            this.wireNb.b++;
            //Adding to the total nb of Cables:
            this.nbWires++;
            //Adding to the total nb of Cables to cut:
            this.wiresToCut++;
            //Cable color:
            this.color  =   `B`;
        }
        else if (randomNB === 1 || randomNB === 6)  {   //Cyan
            //Adding to the total nb of Cyan Cables:
            this.wireNb.c++;
            //Adding to the total nb of Cables:
            this.nbWires++;
            //Cable color:
            this.color  =   `C`;
        }
        else if (randomNB === 2 || randomNB === 7)  {   //Magenta
            //Adding to the total nb of Magenta Cables:
            this.wireNb.m++;
            //Adding to the total nb of Cables:
            this.nbWires++;
            //Cable color:
            this.color  =   `M`;
        }
        else if (randomNB === 3 || randomNB === 8)  {   //Yellow
            //Adding to the total nb of Yellow Cables:
            this.wireNb.y++;
            //Adding to the total nb of Cables:
            this.nbWires++;
            //Adding to the total nb of Cables to cut:
            this.wiresToCut++;
            //Cable color:
            this.color  =   `Y`;
        }
        else if (randomNB === 4 || randomNB === 9)  {   //Red
            //Adding to the total nb of Red Cables:
            this.wireNb.r++;
            //Adding to the total nb of Cables:
            this.nbWires++;
            //Cable color:
            this.color  =   `R`;
        }
        else if (randomNB === 5)    {
            this.color  =   `NaN`
        }
    }

    /** Creating Cables:    */
    createCables(y, r, color)  {
        this.cable  =   {
            //Cable position:
            x:          this.x,
            posY:       (-46 + y),
            y:          undefined,
            //Cable size:
            w:          96,
            h:          24,
            //Cable color randomizer:
            r:          r,
            //Cutting wire value:
            cut:        false,
            //
            color:      color,
        };
        return this.cable;
    }

    /** Displaying WireMod: */
    displayMod(s)    {
        //Module Image:
        push();
        imageMode(CENTER);
        image(disWIR, this.x, this.y, this.size*s, this.size*s);
        pop();
        //Displaying Cables:
        for (let i = 0; i < this.cables.length; i++) {
            this.cableDisplay(this.cables[i], s);
        }

    }

    /** Displaying Cables:  */
    cableDisplay(cable, s)    {
        //Determining which & how many Cables to cut in order to solve the WireMod:
        let ref    =   true;
        for (let i = 0; i < this.cables.length; i++)  {
            if (this.cables[i].color === `B` && this.cables[i].cut === false || this.cables[i].color === `Y` && this.cables[i].cut === false)    {
                ref    =   false;
            }
            if (this.cables[i].color === `C` && this.cables[i].cut === true || this.cables[i].color === `M` && this.cables[i].cut === true || this.cables[i].color === `R` && this.cables[i].cut === true)  {
                gamePhase   =   `lost`;
                //console.log(this.cables[i].cut);
            }
        }
        //If all wires are cut:
        if (ref === true)  {
            this.completed  =   true;
        }

        this.mouseClicked(cable);

        //Calculating distance between the Mouse and Cable:
        this.d  =   dist(mouseX, mouseY, cable.x, cable.y);

        //Cable position (implementing Node scaling):
        cable.y = this.y + cable.posY*s;

        //Displaying the Cable based on color:
        if (cable.cut != true)    {
            if (this.d <= cable.w/2 || this.d <= cable.h/2) {
                //When mouse is not overlapping:
                if (cable.r === 0)  {
                    this.displayBlackCableH(cable, s);
                }
                else if (cable.r === 1 || cable.r === 6)    {
                    this.displayCyanCableH(cable, s);
                }
                else if (cable.r === 2 || cable.r === 7)    {
                    this.displayMagentaCableH(cable, s);
                }
                else if (cable.r === 3 || cable.r === 8)    {
                    this.displayYellowCableH(cable, s);
                }
                else if (cable.r === 4 || cable.r === 9)    {
                    this.displayRedCableH(cable, s);
                }
            }
            //When mouse is overlapping:
            else    {
                if (cable.r === 0)  {
                    this.displayBlackCable(cable, s);
                }
                else if (cable.r === 1 || cable.r === 6)    {
                    this.displayCyanCable(cable, s);
                }
                else if (cable.r === 2 || cable.r === 7)    {
                    this.displayMagentaCable(cable, s);
                }
                else if (cable.r === 3 || cable.r === 8)    {
                    this.displayYellowCable(cable, s);
                }
                else if (cable.r === 4 || cable.r === 9)    {
                    this.displayRedCable(cable, s);
                }
            }
        }
    }

    /** Mouse Click:    */
    mouseClicked(cable)  {
        
        //Calculating distance between the Mouse and Cable:
        this.d  =   dist(mouseX, mouseY, cable.x, cable.y);

        //Not displaying the cable if it is cut:
        if (this.d <= cable.w/2 || this.d <= cable.h/2) {
            if (mouseIsPressed === true)    {
                cable.cut   =   true;
            }
        }
    }




    /** Cables: */
    displayBlackCable(cable, s) {
        push();
        imageMode(CENTER);
        image(disBlaWire, cable.x, cable.y, cable.w*s, cable.h*s);
        pop();
    }
    displayCyanCable(cable, s)  {
        push();
        imageMode(CENTER);
        image(disCyaWire, cable.x, cable.y, cable.w*s, cable.h*s);
        pop();
    }
    displayMagentaCable(cable, s)   {
        push();
        imageMode(CENTER);
        image(disMagWire, cable.x, cable.y, cable.w*s, cable.h*s);
        pop();
    }
    displayYellowCable(cable, s)    {
        push();
        imageMode(CENTER);
        image(disYelWire, cable.x, cable.y, cable.w*s, cable.h*s);
        pop();
    }
    displayRedCable(cable, s)   {
        push();
        imageMode(CENTER);
        image(disRedWire, cable.x, cable.y, cable.w*s, cable.h*s);
        pop();
    }

    /** Cables when the mouse is overlapping:   */
    displayBlackCableH(cable, s)    {
        push();
        imageMode(CENTER);
        image(disBlaWireH, cable.x, cable.y, cable.w*s, cable.h*s);
        pop();
    }
    displayCyanCableH(cable, s) {
        push();
        imageMode(CENTER);
        image(disCyaWireH, cable.x, cable.y, cable.w*s, cable.h*s);
        pop();
    }
    displayMagentaCableH(cable, s)  {
        push();
        imageMode(CENTER);
        image(disMagWireH, cable.x, cable.y, cable.w*s, cable.h*s);
        pop();
    }
    displayYellowCableH(cable, s)   {
        push();
        imageMode(CENTER);
        image(disYelWireH, cable.x, cable.y, cable.w*s, cable.h*s);
        pop();
    }
    displayRedCableH(cable, s)  {
        push();
        imageMode(CENTER);
        image(disRedWireH, cable.x, cable.y, cable.w*s, cable.h*s);
        pop();
    }
}