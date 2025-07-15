class Camera {
    constructor(juego, entityToFollow) {
        this.juego = juego;
        this.entityFollow = entityToFollow;

        this.x = this.entityFollow.x
        this.y = this.entityFollow.y


    }

    update() {
        this.setCameraPositionTo(this.entityFollow.x, this.entityFollow.y)
    }

    setCameraPositionTo(posx, posy) {
        if (!this.juego.bgimg) return;

        const finalX = -posx + this.juego.width / 2;
        const finalY = -posy + this.juego.height / 2;

        this.juego.mainContainer.x -= (this.juego.mainContainer.x - finalX);
        this.juego.mainContainer.y -= (this.juego.mainContainer.y - finalY);
    }


}