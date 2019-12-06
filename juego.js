import { Nave } from "./nave.js";
import { Alien } from "./alien.js";
import { Bala } from "./bala.js";

export class Juego{
	constructor(div){
        this.puedeDisparar = true;
        this.bloqueado = false;
        this.svg = div;
        this.balas = new Array();
        this.nave = new Nave(this.svg);
        this.svgx=parseInt(div.getAttribute('width'));
        this.svgy=parseInt(div.getAttribute('height'));
		this.posAlien = new Array();
        this.separacion = this.svgx/30;
		this.posY=this.separacion/2;
        this.posX=this.separacion/2;
        console.log(this.posX,this.posY);
        this.crearAliens();
        this.anchoAliens = this.posX+this.separacion*20;
        this.altoAliens = this.posY+this.separacion*6;
        this.comenzarMovimiento();
    }
    crearAliens(){
		for (let i=0;i<3;i++){
            for(let j = 0; j<10;j++){
                this.posAlien.push(new Alien(this.svg,this.separacion,this.posX,this.posY));
                this.posX += this.separacion*2;
            }
            this.posY += this.separacion*2;
            this.posX = this.separacion/2;
        }
    }

    comenzarMovimiento(){      
        let derecha = true;
        let posicionX = this.anchoAliens;
        let posicionY = this.altoAliens;
        let balas = document.getElementsByTagName("circle");
        let intervalo = setInterval(()=>{
            if(posicionY < this.svgy-this.separacion*5){
                if(!this.bloqueado){
                    if(derecha && posicionX<this.svgx-10){
                        posicionX += 10;
                        this.posAlien.forEach((alien)=>{
                            alien.moverDerecha();
                        });
                    }
                    else if(!derecha && posicionX>this.anchoAliens-10){
                        posicionX -= 10;
                        this.posAlien.forEach((alien)=>{
                            alien.moverIzquierda();
                        });
                    }
                    else{
                        this.posAlien.forEach((alien)=>{
                            alien.moverAbajo();                    
                        });
                        derecha = !derecha;
                        posicionY +=20;
                    }       
                }
                else{
                    clearInterval(intervalo);
                }
            }
            else{
                this.juegoPerdido();
            }
        },50);
    }
        juegoGanado(){
            document.getElementById("titulo").innerHTML = "Has ganado!";
        }
        juegoPerdido(){
            document.getElementById("titulo").innerHTML = "Has perdido...!";
        }
        moverNaveDerecha(){
            if(!this.bloqueado)
                this.nave.moverDerecha();
        }
        moverNaveIzquierda(){
            if(!this.bloqueado)
                this.nave.moverIzquierda();
        }
        comprobarChoque(){
            this.balas.forEach((bala)=>{
                let anchoBala = parseInt(bala.getBala().getAttribute("r"));
                let balaPosX = bala.getPosX();
                let balaPosY = bala.getPosY();
                this.posAlien.forEach((alien)=>{
                    let alienPosX = alien.getPosX();
                    let alienPosY = alien.getPosY();
                    let anchoAlien = alien.getAncho();
                    if((balaPosY <= alienPosY && balaPosY >= alienPosY-anchoAlien) || (balaPosY <= alienPosY && balaPosY >= alienPosY-anchoAlien)){
                        if((balaPosX+anchoBala > alienPosX && balaPosX+anchoBala < alienPosX+anchoAlien) || (balaPosX-anchoBala > alienPosX && balaPosX-anchoBala < alienPosX+anchoAlien)){
                            this.svg.removeChild(bala.getBala());
                            this.svg.removeChild(alien.getAlien());
                            this.posAlien.splice(this.posAlien.indexOf(alien),1);
                            if(this.posAlien.length == 0){
                                this.bloqueado = true;
                                this.juegoGanado();
                            }  
                            this.balas.splice(this.balas.indexOf(bala),1);                
                        }
                    }
                    if(balaPosY < 10){
                        this.balas.splice(this.balas.indexOf(bala),1);
                    }
                });
            });
        }
        dispararNave(){
            if(this.puedeDisparar && !this.bloqueado){
                let bala = new Bala(this.svg,this.nave.getNave());
                this.balas.push(bala);
                this.puedeDisparar = false;
                setTimeout(()=>{
                    this.puedeDisparar = true;
                },100);
                let intervalo = setInterval(()=>{
                    this.posicion -= 5;
                    if(bala.getPosY() < 0){
                        //this.svg.removeChild(bala.getBala());
                        //this.balas.shift();
                        clearInterval(intervalo);
                    }
                    else{
                        bala.mover();
                        this.comprobarChoque();
                    }
                },20);
            }
            /*
            let intervalo = setInterval(()=>{
                this.posY -= 5;
                if(this.posY < 0){
                    this.svg.removeChild(this.bala);
                    clearInterval(intervalo);
                }
                else{
                    this.bala.getBala().setAttribute("cy",this.posY);
                }
            },50)
            */
        }
    }
    
