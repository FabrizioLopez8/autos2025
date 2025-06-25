class Grid {
    constructor(juego, cellWidth) {
        this.juego = juego;
        this.cellWidth = cellWidth;
        this.cellWidthSize = Math.ceil(this.juego.width / this.cellWidth) * 2;
        this.cellHeightSize = Math.ceil(this.juego.height / this.cellWidth) * 2;
        this.cells = {}

        this.initGrid();
    }

    initGrid() {
        for (let x = 0; x < this.cellWidthSize; x++) {
            for (let y = 0; y < this.cellHeightSize; y++) {
                const cell = new Cell(this.juego, this.cellWidth, x, y);
                const hash = this.obtainHashPosition(x, y);
                this.cells[hash] = cell;
            }
        }
    }

    obtainHashPosition(x, y) {
        return `x: ${x} y: ${y}`
    }

    obtainCellInPosition(x, y) {
        const newX = Math.floor(x / this.cellWidthSize);
        const newY = Math.floor(y / this.cellHeightSize);
        const hash = this.obtainHashPosition(newX, newY);

        let cell = this.cells[hash];

        if (!cell) {
            cell = new Cell(this.juego, this.cellWidth, newX, newY);
        }

        return cell
    }
}