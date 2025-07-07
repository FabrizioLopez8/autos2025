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

        this.velmax = 0.8 
        this.acc = 0.01
        this.desacc = 0.02

        this.acc = 0
        this.vel = {x: 0, y: 0}
        this.rotation = 0;

        this.generate()
    }

    generate() {
        this.loadSprite();
        this.juego.app.stage.addChild(this.containerdelauto);
    }

    async loadSprite() {
        const texture = await PIXI.Assets.load("sprites/texture.png");
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
        //this.aplicarVel()
        this.actualizarPosition(delta)

        if (this.juego.autoIA) {
            if (distancia(this, this.juego.autoIA) < 90) this.applyCollisionForce(this.juego.autoIA)
        }
        
        this.vel.x -= Math.min(0.10, this.vel.x) // desaccelar el auto
        this.vel.y -= Math.min(0.10, this.vel.y) // uso math.min para evitar que el valor se haga negativo

        // if (this.vel.x < 0){this.vel.x += 0.1}
        // if (this.vel.y < 0){this.vel.y += 0.1}

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

    aplicarAcc(nro){
        this.vel.x += Math.min(nro, this.velmax)
        this.vel.y += Math.min(nro, this.velmax)
            
    }
    aplicarDesacc(nro){
        this.vel.x -= nro
        this.vel.y -= nro
    }
    /*aplicarVel(delta){
        this.velx += Math.min(delta * (this.acc +  this.mantenerVelocidad()) * Math.cos(this.rotation), this.velmax) //cuando suelte el accelerador, se queda el 0 impidiento el auto en mover su  velocidad
        this.vely += Math.min(delta * (this.acc +  this.mantenerVelocidad()) * Math.sin(this.rotation), this.velmax)
        this.velx -= Math.max(-0.1, 0)
        this.vely -= Math.max(-0.1, 0) 
    }
    actualizarPosition(){
        this.x += this.velx
        this.y += this.vely
    }*/

    
    actualizarPosition(delta){
        this.x += delta * this.vel.x * Math.cos(this.rotation)
        this.y += delta * this.vel.y * Math.sin(this.rotation)
    }

    leerInput(){
        if (this.juego.keyboard.w) { this.aplicarAcc(0.2)} else {this.aplicarAcc(0)}
        if (this.juego.keyboard.s) { this.aplicarDesacc(0.2)}
        //else if (this.juego.keyboard.s) this.speed = -10; else this.speed = 0
        if (this.juego.keyboard.a) this.girarSentidoContraHorario()
        if (this.juego.keyboard.d) this.girarSentidoHorario()
    }

    girarSentidoHorario(){
        if (this.vel.x || this.vel.y){
            this.rotation += 0.03
        }
        
    }

    girarSentidoContraHorario(){
        if (this.vel.x || this.vel.y){
            this.rotation -= 0.03
        }
    }
}