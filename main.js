import{Juego} from "./juego.js";

window.onload = ()=>{
    let div = document.getElementById("juego");
    var juego = new Juego(div);

    document.addEventListener("keydown",(event)=>{
        console.log(event.keyCode);
        if(event.keyCode == 37){
            juego.moverNaveDerecha();
        }
        else if(event.keyCode == 39){
            juego.moverNaveIzquierda();
        }
        else if(event.keyCode == 32){
            juego.dispararNave();
        }
    });
}
