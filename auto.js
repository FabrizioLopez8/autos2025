// la idea es que el auto se mueva hacia el angulo que esta mirando (la flecha puede simular esto)
// poner una flecha que rota y el auto lo sigue (como sigue el auto? va hacia la punta de la flecha? burro siguendo zanahoria)
// esto tambien puede ser la direccion del auto

class Auto {
    constructor(juego, x, y) {
        this.juego = juego;

        this.x = x;
        this.y = y;

        this.spriteLoaded = false;

        this.speed = 0;
        this.rotation = 0;

        this.generate()
    }

    generate() {
        this.loadSprite();
    }

    async loadSprite() {
        const texture = await PIXI.Assets.load("./sprites/cero/auto.png");
        console.log("texture", texture);
        this.sprite = new PIXI.Sprite(texture);
        console.log("sprite", this.sprite);
        this.sprite.anchor.set(0.5);
        this.spriteLoaded = true;
        this.juego.app.stage.addChild(this.sprite);
    }

    processMovement(delta) {
        if (this.juego.keyboard.w) { this.speed = 10; }
        else if (this.juego.keyboard.s) this.speed = -10; else this.speed = 0
        if (this.juego.keyboard.a && this.speed) this.rotation -= 0.05;
        if (this.juego.keyboard.d && this.speed) this.rotation += 0.05;

        this.x += delta * this.speed * Math.cos(this.rotation);
        //console.log(delta * this.speed * Math.cos(this.rotation))
        this.y += delta * this.speed * Math.sin(this.rotation);
    }

    update(delta) {
        if (!this.spriteLoaded) return;

        this.processMovement(delta);

        if (this.juego.autoIA) {
            if (distancia(this, this.juego.autoIA) < 90) this.applyCollisionForce(this.juego.autoIA)
        }
        this.render()
    }

    render() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;

        this.sprite.rotation = this.rotation;
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

}