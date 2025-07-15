class Juego {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.cellWidth = 100;
        this.app = new PIXI.Application();
        this.app.init({ background: '#333333', width: this.width, height: this.height }).then(() => { this.dibujarCanvas(); });
        this.loadbg();

        this.nodePos = {
            "posx1": 3000,
            "posy1": 1100,

            "posx2": 1600,
            "posy2": 1100,

            "posx3": 950,
            "posy3": 1750,

            "posx4": 1400,
            "posy4": 2400,

            "posx5": 3000,
            "posy5": 2400,

            "posx6": 4450,
            "posy6": 2400,

            "posx7": 5100,
            "posy7": 1750,

            "posx8": 4400,
            "posy8": 1100,
        }
        this.raceNodes = [];

        for (let i = 0; i < 8; i++) {
            let node = new PNode(this.nodePos[("posx" + String(i + 1))], this.nodePos[("posy" + String(i + 1))]);
            this.raceNodes[i] = node;
            console.log(this.raceNodes);

        }
        this.cars = []
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
        this.eventListenerSetup();
        window.__PIXI_APP__ = this.app;

        this.mainContainer = new PIXI.Container();


        this.autoJugable = new Auto(this, 3300, 1100);
        this.generateCars(60, 3100, 800, 4300, 1350);
        this.app.ticker.add(() => this.gameLoop());
        this.app.stage.addChild(this.mainContainer);
        //this.grid.flowTowards(this.autoJugable.x, this.autoJugable.y)

        this.camera = new Camera(this, this.autoJugable)
    }

    async loadbg() {
        this.bgasset = await PIXI.Assets.load("./sprites/pista.png");
        this.bgimg = new PIXI.Sprite(this.bgasset);

        // Double the size of the background image
        this.bgimg.width = this.bgasset.width * 2;
        this.bgimg.height = this.bgasset.height * 2;
        this.bgimg.position.set(0, 0);

        this.mainContainer.addChildAt(this.bgimg, 0);
        this.grid = new Grid(this, this.cellWidth);
    }

    gameLoop(d) {
        // agrego el updateLoop aca
        let timeElapsed = 0.0;
        timeElapsed += this.app.ticker.deltaTime;
        this.app.stage.update;

        //if (this.grid) this.grid.flowTowards(this.autoJugable.x, this.autoJugable.y)

        //this.camera.update()
        this.moveCamera()
        if (this.autoJugable) this.autoJugable.update(this.app.ticker.deltaTime)
        if (this.cars) {
            for (const car of this.cars) {
                car.update(this.app.ticker.deltaTime);
            }
        }
        console.log(this.autoJugable.x, this.autoJugable.y)
        //console.log(this.keyboard.w);
        //console.log(timeElapsed)
    }

    moveCamera() {
        if (!this.bgimg) return;


        let targetX = -this.autoJugable.x + this.width / 2;
        let targetY = -this.autoJugable.y + this.height / 2;
        // left/top bounds
        targetX = Math.min(targetX, 0);
        targetY = Math.min(targetY, 0);

        // right/bottom bounds
        targetX = Math.max(targetX, this.width - this.bgimg.width);
        targetY = Math.max(targetY, this.height - this.bgimg.height);

        this.mainContainer.x = targetX;
        this.mainContainer.y = targetY;
    }

    generateCars(N, xMin, yMin, xMax, yMax) {
        for (let i = 0; i < N; i++) {

            const x = Math.random() * (xMax - xMin) + xMin;
            const y = Math.random() * (yMax - yMin) + yMin;

            const car = new AutoIA(this, x, y, 0, this.grid);
            this.cars.push(car);
        }
    }

    generateCarsInArea(N, xMin, yMin, xMax, yMax) {
        this.cars = this.cars || []; // Ensure the array exists

        for (let i = 0; i < N; i++) {
            // Random position within the rectangle
            const x = Math.random() * (xMax - xMin) + xMin;
            const y = Math.random() * (yMax - yMin) + yMin;

            // Create a new car (AutoIA or Auto)
            const car = new AutoIA(this, x, y, 0, this.grid); // or new Auto(this, x, y)
            this.cars.push(car);
        }
    }

}
