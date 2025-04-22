// la idea es que el auto se mueva hacia el angulo que esta mirando (la flecha puede simular esto)
// poner una flecha que rota y el auto lo sigue (como sigue el auto? va hacia la punta de la flecha? burro siguendo zanahoria)
// esto tambien puede ser la direccion del auto

class Auto{
    constructor(juego){
        this.juego = juego;

        //this.x = startx;
        //this.y = starty;

        this.sprite = new juego.app.Sprite.from('sprites\cero\auto.png')

        juego.app.stage.addChild(this.sprite);
    }
}