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


        //this.velmax = 3
        //this.acc = 0.2

        this.velmax = 13
        this.acc = 0.2
        this.desacc = 0.3


        //this.acc = 0
        this.vel = { x: 0, y: 0 }
        this.rotation = 3.1;

        this.position = { x: this.x, y: this.y }

        this.generate()
    }

    generate() {
        this.loadSprite();
        this.juego.mainContainer.addChild(this.containerdelauto);
    }

    async loadSprite() {

        const texture = await PIXI.Assets.load("./sprites/texture.png");
        //console.log("texture", texture);

        this.sprite = new PIXI.Sprite(texture);
        this.sprite.scale.set(3)
        this.sprite.anchor.set(0.5);
        this.spriteLoaded = true;
        this.containerdelauto.addChild(this.sprite);

        // this.flecha = new PIXI.Container();
        // this.flecha.label = 'flecha'
        // let grafico = await new PIXI.Graphics();
        // this.linea = grafico.rect(this.sprite.anchor.x, this.sprite.anchor.y, 80, 2);
        // this.linea.fill('#ffffff');
        // this.flecha.addChild(this.linea);
        // let grafico1 = await new PIXI.Graphics();
        // this.punta = grafico1.rect(this.flecha.x + 80, this.sprite.anchor.y, 2, 10);
        // this.punta.fill('#ffffff')
        // this.flecha.addChild(this.punta)
        // this.containerdelauto.addChild(this.flecha);
    }

    update(delta) {
        if (!this.spriteLoaded) return;

        this.leerInput();
        this.actualizarPosition(delta);

        for (let other of this.juego.cars) {
            if (other !== this) {
                let dx = this.x - other.x;
                let dy = this.y - other.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                let collisionDistance = 60;

                if (dist < collisionDistance) {
                    console.log("car collided with ", other)
                    this.applyCollisionForce(other);
                }
            }
        }

        this.vel.x -= Math.min(0.10, this.vel.x);
        this.vel.y -= Math.min(0.10, this.vel.y);

        this.render();
    }

    render() {
        this.containerdelauto.x = this.x;
        this.containerdelauto.y = this.y;
        this.containerdelauto.rotation = this.rotation
    }

    applyCollisionForce(obj1) {
        // calcula distancia
        let dx = this.x - obj1.x;
        let dy = this.y - obj1.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist === 0) return;

        dx /= dist;
        dy /= dist;

        let force = 9;
        this.x += dx * force;
        this.y += dy * force;
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

    aplicarAcc(nro) {
        this.vel.x += Math.min(nro, this.velmax);
        this.vel.y += Math.min(nro, this.velmax);

        // limit velocity
        const speed = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
        if (speed > this.velmax) {
            const scale = this.velmax / speed;
            this.vel.x *= scale;
            this.vel.y *= scale;
        }
    }
    aplicarDesacc(nro) {
        this.vel.x -= nro
        this.vel.y -= nro
    }
    /*aplicarVel(delta){
        this.velx += Math.min(delta * (this.acc +  this.mantenerVelocidad()) * Math.cos(this.rotation), this.velmax) //cuando suelte el accelerador, se queda el 0 impidiendo el auto en mover su  velocidad
        this.vely += Math.min(delta * (this.acc +  this.mantenerVelocidad()) * Math.sin(this.rotation), this.velmax)
        this.velx -= Math.max(-0.1, 0)
        this.vely -= Math.max(-0.1, 0) 
    }
    actualizarPosition(){
        this.x += this.velx
        this.y += this.vely
    }*/


    actualizarPosition(delta) {
        this.x += delta * this.vel.x * Math.cos(this.rotation)
        this.y += delta * this.vel.y * Math.sin(this.rotation)
    }

    leerInput() {
        if (this.juego.keyboard.w) { this.aplicarAcc(0.2) } else { this.aplicarAcc(0) }
        if (this.juego.keyboard.s) { this.aplicarDesacc(0.2) }
        //else if (this.juego.keyboard.s) this.speed = -10; else this.speed = 0
        if (this.juego.keyboard.a) this.girarSentidoContraHorario()
        if (this.juego.keyboard.d) this.girarSentidoHorario()
    }

    girarSentidoHorario() {
        if (this.vel.x || this.vel.y) {
            this.rotation += 0.03
        }

    }

    girarSentidoContraHorario() {
        if (this.vel.x || this.vel.y) {
            this.rotation -= 0.03
        }

    }
}