class Cell {
    constructor(juego, cellWidht, x, y) {
        this.juego = juego;
        this.x = x;
        this.y = y;

        this.entitiesHere = []
    }

    sumEntity(entity) {
        if (!entity) return;
        this.entitiesHere.push(entity)
    }

    removeEntity(entity) {
        if (!entity) return;
        for (let i = 0; i < this.entitiesHere.length; i++) {
            const entityHere = this.entitiesHere[i];
            if (entity.id == entityHere.id) {
                this.entitiesHere.splice(i, 1);
                return;
            }
        }
    }

    obtainCellAtDistance(distance, direction) {
        return 0
    }
}