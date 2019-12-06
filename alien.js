export class Alien{
	constructor(div,ancho,posX, posY){
        this.div = div;
        this.rectangulo=document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.alien = this.rectangulo;
        this.ancho = ancho;
        this.posX = posX;
        this.posY = posY;
        this.dibujar();
        this.moverDerecha();
    }
	dibujar(){
        this.rectangulo.setAttribute('x',this.posX);
        this.rectangulo.setAttribute('y',this.posY);
        this.rectangulo.setAttribute('width',this.ancho);
        this.rectangulo.setAttribute('height',this.ancho);
        this.rectangulo.setAttribute('fill',"black");
        this.div.appendChild(this.rectangulo);
    }
    getAlien(){
        return this.alien;
    }
    getPosX(){
        return this.posX;
    }
    getPosY(){
        return this.posY;
    }
    getAncho(){
        return this.ancho;
    }
    moverDerecha(){
        this.posX += 10;
        this.rectangulo.setAttribute('x',this.posX);
    }
    moverIzquierda(){
        this.posX -= 10;
        this.rectangulo.setAttribute('x',this.posX);
    }
    moverAbajo(){
        this.posY += this.ancho*2;
        this.rectangulo.setAttribute('y',this.posY);
    }
    comprobarGolpe(bala){
    }
}