class Juego {
    constructor(){
        this.app = new PIXI.Application();
        this.app.init({ background: '#333333', width: 1000, height: 750 }).then(() =>{this.dibujarcanvas();});

        //this.app.ticker.add(() => this.gameLoop());
        
    }
    dibujarcanvas(){
        document.body.appendChild(this.app.canvas);
        window.__PIXI_APP__ = this.app;
        this.app.ticker.add(() => this.gameLoop());
    }

    gameLoop(){
        console.log('tick')
    }
}