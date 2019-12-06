export class Bala{
    constructor(div,nave){
        this.div = div;
        this.posXNave = parseInt(nave.getAttribute("x"));
        this.anchoNave = parseInt(nave.getAttribute("width"));
        this.posYNave = parseInt(nave.getAttribute("y"));
        this.posY = this.posYNave;
        this.posX = this.posXNave + this.anchoNave/2;
        this.bala = this.dibujar();
        //this.mover();
    }

    getBala(){
        return this.bala;
    }
    dibujar(){
        let bala = document.createElementNS("http://www.w3.org/2000/svg","circle");
        bala.setAttribute("cx",this.posX);
        bala.setAttribute("cy",this.posYNave);
        bala.setAttribute("fill","black");
        bala.setAttribute("r",5);
        this.div.appendChild(bala);
        return bala;
    }
    getPosY(){
        return this.posY;
    }
    getPosX(){
        return this.posX;
    }
    mover(){
        this.posY -= 5;
        this.bala.setAttribute("cy",this.posY);
        /*
        let intervalo = setInterval(()=>{
            this.posY -= 5;
            if(this.posY < 0){
                this.div.removeChild(this.bala);
                clearInterval(intervalo);
            }
            else{
                this.bala.setAttribute("cy",this.posY);
            }
        })
        */
    }
}