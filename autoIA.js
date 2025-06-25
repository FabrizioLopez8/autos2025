class AutoIA extends Auto {
    constructor(juego, x, y) {
        super(juego, x, y);
        this.id = 100
        this.acc = { x: 0, y: 0 };

        this.playerChar = this.juego.autoJugable

        this.atractionForce = 15;
        this.repulsionForce = 10;
        this.groupForce = 1;

        this.cell = null
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

    update() {
        if (!this.spriteLoaded) return;

        this.acc.x = 0;
        this.acc.y = 0;
        //if (this.juego.autoJugable) console.log(distancia(this, this.juego.autoJugable));
        this.group();
        //this.attraction();

        this.x += this.acc.x;
        this.y += this.acc.y;

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

        console.log(currentCell)
    }

}