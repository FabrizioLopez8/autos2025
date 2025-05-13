class AutoIA extends Auto {
    constructor(juego, x, y) {
        super(juego, x, y)

    }

    update() {
        if (!this.spriteLoaded) return;

        //if (this.juego.autoJugable) console.log(distancia(this, this.juego.autoJugable));



        this.render()
    }

}