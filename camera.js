class Camera {
    constructor(juego, entityToFollow) {
        this.juego = juego;
        this.entityFollow = entityToFollow;

        this.x = this.entityFollow.x
        this.y = this.entityFollow.y
    }

    update() {
        setCameraPositionTo(this.entityFollow.x, this.entityFollow.y)
    }

    setCameraPositionTo(x, y) {
        return x, y
    }


}