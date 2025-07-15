class AutoIA extends Auto {
    constructor(juego, x, y, angle, flow) {
        super(juego, x, y);
        this.id = 100

        this.playerChar = this.juego.autoJugable.position

        this.atractionForce = 15;
        this.repulsionForce = 10;
        this.groupForce = 1;

        this.acc = { x: 0, y: 0 }

        this.cell = null

        this.mass = 2
        this.position = new PIXI.Point(x, y);
        this.velocity = new PIXI.Point();
        this.acc = new PIXI.Point();
        this.maxForce = 0.2
        this.maxSpeed = 10
        //this.maxForce = 200
        //this.maxSpeed = 300
        this.rotation = angle

        this.flow = flow

    }

    test(steerDirection) {
        const steerForce = truncateV(steerDirection, this.maxForce);
        const acc = divideV(steerForce, this.mass);
        this.velocity = truncateV(sumV(this.velocity, acc), this.maxSpeed);
        //console.log(this.velocity)
        this.position = sumV(this.position, this.velocity);
        //console.log(this.position, this.velocity, this.playerChar)
    }

    test2() {
        this.newForward = this.velocity.normalize();
        this.newSide = perpendicular(this.newForward);
        this.direction = Math.atan2(this.newForward.x, this.newForward.y);
        this.rotation = this.direction;
    }

    flowtest(delta) {
        const flow = this.flow.test(this.position.x, this.position.y);

        const desVel = new PIXI.Point(flow.x, flow.y);
        desVel.normalize();
        desVel.x *= this.maxSpeed
        desVel.y *= this.maxSpeed

        const steer = new PIXI.Point(desVel.x - this.velocity.x, desVel.y - this.velocity.y);
        const mag = Math.hypot(steer.x, steer.y);
        if (mag > this.maxForce) {
            steer.x = (steer.x / mag) * this.maxForce;
            steer.y = (steer.y / mag) * this.maxSpeed;
        }

        this.acc.x += steer.x;
        this.acc.y += steer.y;

        this.velocity.x += this.acc.x * delta
        this.velocity.y += this.acc.y * delta

        const speed = Math.hypot(this.velocity.x, this.velocity.y);
        if (speed > this.maxSpeed) {
            this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
            this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
        }

        this.position.x += this.velocity.x / delta;
        this.position.y += this.velocity.y / delta;

        this.sprite.rotation = Math.atan2(this.velocity.y, this.velocity.x);

        this.acc.set(0, 0);

        console.log(flow)
    }

    applyForce(x, y) {
        this.acc.x += x;
        this.acc.y += y;
    }

    group() {
        let autoX = this.juego.autoJugable.x
        let autoY = this.juego.autoJugable.y

        this.vector = { x: this.x - autoX, y: this.y - autoY };

        this.applyForce(this.vector.x * this.groupForce, this.vector.y * this.groupForce)
    }

    attraction() {
        this.applyForce(1 * this.atractionForce, 1 * this.atractionForce)
    }

    update(dt) {
        if (!this.spriteLoaded) return;
        this.playerChar = { x: this.juego.autoJugable.position.x - this.x, y: this.juego.autoJugable.position.y - this.y }
        //if (this.juego.autoJugable) console.log(distancia(this, this.juego.autoJugable));
        //this.group();
        //this.attraction();
        //this.test(this.playerChar)
        this.flowtest(dt)
        //this.test2()
        this.x = this.position.x;
        this.y = this.position.y;


        this.render();

        this.updatePositionOnGrid()
    }

    updatePositionOnGrid() {
        const currentCell = this.juego.grid.obtainCellInPosition(this.x, this.y);

        if (this.cell && currentCell && currentCell != this.cell) {
            this.cell.removeEntity(this);
            currentCell.sumEntity(this);
            this.cell = currentCell;
        } else if (!this.cell && currentCell) {
            this.cell = currentCell;
        }

        //console.log(currentCell)
    }

}