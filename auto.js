// la idea es que el auto se mueva hacia el angulo que esta mirando (la flecha puede simular esto)
// poner una flecha que rota y el auto lo sigue (como sigue el auto? va hacia la punta de la flecha? burro siguendo zanahoria)
// esto tambien puede ser la direccion del auto

class Auto {
    constructor(juego, x, y) {
        this.juego = juego;
        this.containerdelauto = new PIXI.Container();
        this.containerdelauto.label = 'auto' //container que se encarga de llevar las piezas del auto

        this.x = x;
        this.y = y;

        this.spriteLoaded = false;

        this.velmax = 3
        this.acc = 0.2

        this.acc = 0
        this.velx = 0
        this.vely = 0
        this.rotation = 0;

        this.position = { x: this.x, y: this.y }

        this.generate()
    }

    generate() {
        this.loadSprite();
        this.juego.app.stage.addChild(this.containerdelauto);
    }

    async loadSprite() {
        const texture = await PIXI.Assets.load("./sprites/cero/auto.png");
        //console.log("texture", texture);
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.anchor.set(0.5);
        this.spriteLoaded = true;
        this.containerdelauto.addChild(this.sprite);

        this.flecha = new PIXI.Container();
        this.flecha.label = 'flecha'
        let grafico = await new PIXI.Graphics();
        this.linea = grafico.rect(this.sprite.anchor.x, this.sprite.anchor.y, 80, 2);
        this.linea.fill('#ffffff');
        this.flecha.addChild(this.linea);
        let grafico1 = await new PIXI.Graphics();
        this.punta = grafico1.rect(this.flecha.x + 80, this.sprite.anchor.y, 2, 10);
        this.punta.fill('#ffffff')
        this.flecha.addChild(this.punta)
        this.containerdelauto.addChild(this.flecha);
    }

    update(delta) {
        if (!this.spriteLoaded) return;

        this.leerInput();
        this.aplicarVel()
        this.actualizarPosition(delta)

        if (this.juego.autoIA) {
            if (distancia(this, this.juego.autoIA) < 90) this.applyCollisionForce(this.juego.autoIA)
        }


        this.render()
    }

    render() {
        this.containerdelauto.x = this.x;
        this.containerdelauto.y = this.y;
        this.containerdelauto.rotation = this.rotation
    }

    applyCollisionForce(obj1) {
        if (this.speed > 0) {
            this.x += Math.sqrt((this.x - obj1.x) ** 2) * -0.2
            this.y += Math.sqrt((this.y - obj1.y) ** 2) * -0.2
        }
        else {
            this.x += Math.sqrt((this.x - obj1.x) ** 2) * 0.2
            this.y += Math.sqrt((this.y - obj1.y) ** 2) * 0.2
        }
    }

    aplicarAcc(nro) {
        this.acc = nro
    }
    aplicarVel() {
        this.velx = Math.min(this.velx + this.acc, this.velmax)
        //console.log(this.velx)
        this.vely = Math.min(this.vely + this.acc, this.velmax)
        this.velx = Math.max(this.velx - 0.1, 0)
        this.vely = Math.max(this.vely - 0.1, 0)
    }
    actualizarPosition(delta) {
        this.x += delta * this.velx * Math.cos(this.rotation)
        this.y += delta * this.vely * Math.sin(this.rotation)
        this.position = { x: this.x, y: this.y }
    }

    leerInput() {
        if (this.juego.keyboard.w) { this.aplicarAcc(0.2) } else { this.aplicarAcc(0) }
        if (this.juego.keyboard.s) { this.aplicarDesacc(0.2) }
        //else if (this.juego.keyboard.s) this.speed = -10; else this.speed = 0
        if (this.juego.keyboard.a) this.girarSentidoContraHorario()
        if (this.juego.keyboard.d) this.girarSentidoHorario()
    }
}