class Grid {
    constructor(juego, cellWidth) {
        this.juego = juego;
        this.cellWidth = cellWidth;
        this.cellWidthSize = Math.ceil(juego.bgimg.width / this.cellWidth) * 2;
        this.cellHeightSize = Math.ceil(juego.bgimg.height / this.cellWidth) * 2;
        this.cells = {};
        this.cols = 0;
        this.rows = 0;


        this.initGrid();
        this.initFlowfield();
    }

    initGrid() {
        for (let x = 0; x < this.cellWidthSize; x++) {
            this.cols += 1;
            for (let y = 0; y < this.cellHeightSize; y++) {
                const cell = new Cell(this.juego, this.cellWidth, x, y);
                const hash = this.obtainHashPosition(x, y);
                this.cells[hash] = cell;
                this.rows += 1;
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
    initFlowfield() {
        this.field = new Array(this.cols * this.rows).fill().map(() => new PIXI.Point())
    }

    flowTowards(posx, posy) {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const idx = x + y * this.cols;
                const worldX = x * this.cellWidth + this.cellWidth / 2;
                const worldY = y * this.cellWidth + this.cellWidth / 2;
                const dirx = posx - worldX;
                const diry = posy - worldY;
                const vec = new PIXI.Point(dirx, diry);
                vec.normalize();
                this.field[idx] = vec;
            }
        }
    }

    test(px, py) {
        let x = Math.floor(px / this.cellWidth);
        let y = Math.floor(py / this.cellWidth);
        x = Math.max(0, Math.min(this.cols - 1, x));
        y = Math.max(0, Math.min(this.rows - 1, y));
        //return [x, y]
        return this.field[x + y * this.cols];
    }
}
