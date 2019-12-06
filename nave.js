import {Bala} from "./bala.js";

export class Nave{
    constructor(div){
        this.puedeDisparar = true;
        this.div = div;
        this.anchoDiv = parseInt(div.getAttribute("width"));
        this.ancho = this.anchoDiv*0.05;
        this.posy = parseInt(div.getAttribute("height"))-5-this.ancho;
        this.posx = this.anchoDiv/2;
        this.nave = this.dibujarNave();
    }

    dibujarNave(){
        let nave = document.createElementNS("http://www.w3.org/2000/svg","rect");
        nave.setAttribute("x",this.posx);
        nave.setAttribute("y",this.posy);
        nave.setAttribute("width",this.ancho);
        nave.setAttribute("height",this.ancho);
        nave.setAttribute("fill","black");
        nave.setAttribute("stroke","black");
        console.log(this.div);
        console.log(nave);
        this.div.appendChild(nave);
        return nave;
    }
    moverIzquierda(){
        if(this.posx < this.anchoDiv-5-this.ancho){
            this.posx += 5;
            this.nave.setAttribute("x",this.posx);
        }
    }

    getNave(){
        return this.nave;
    }
    moverDerecha(){
        if(this.posx > 5){
            this.posx -= 5;
            this.nave.setAttribute("x",this.posx);
        }
    }

    disparar(){
        if(this.puedeDisparar){
            let bala = new Bala(this.div,this.nave);
            this.puedeDisparar = false;
            setTimeout(()=>{
                this.puedeDisparar = true;
            },1000);
        }        
    }
}