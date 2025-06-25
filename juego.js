class Juego {
    constructor() {
        this.app = new PIXI.Application();
        this.width = 1000
        this.height = 750
        this.cellWidth = 100
        this.app.init({ background: '#333333', width: this.width, height: this.height }).then(() => { this.dibujarCanvas(); });

        this.grid = new Grid(this, this.cellWidth);

        this.keyboard = {};

        this.autoJugable
        //this.app.ticker.add(() => this.gameLoop());

    }

    eventListenerSetup() {
        window.onkeydown = (keyEvent) => {
            let keyPressed = keyEvent.key.toLowerCase();
            this.keyboard[keyPressed] = true;
        };
        window.onkeyup = (keyEvent) => {
            let keyPressed = keyEvent.key.toLowerCase();
            delete this.keyboard[keyPressed];
        };
    }

    dibujarCanvas() {
        document.body.appendChild(this.app.canvas);
        window.__PIXI_APP__ = this.app;
        this.autoJugable = new Auto(this, this.width * 0.5, this.height * 0.5);
        this.autoIA = new AutoIA(this, this.width * 0.5, (this.height * 0.5 + 100));
        this.eventListenerSetup();
        this.app.ticker.add(() => this.gameLoop());


    }

    gameLoop(d) {
        // agrego el updateLoop aca
        let timeElapsed = 0.0;
        timeElapsed += this.app.ticker.deltaTime;
        this.app.stage.update;

        if (this.autoJugable) this.autoJugable.update(this.app.ticker.deltaTime)
        if (this.autoIA) this.autoIA.update()
        //console.log(this.keyboard.w);
        //console.log(timeElapsed)
    }
}