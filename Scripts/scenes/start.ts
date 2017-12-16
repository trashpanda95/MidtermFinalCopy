module scenes {
  export class Start extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _startLabel:objects.Label;
    private _startButton:objects.Button;
    private _startImage:objects.TankBackground;
    private _assetManager:createjs.LoadQueue;
    //CONSTRUCTORS
    constructor(assetManager:createjs.LoadQueue, currentScene: number) {
      super();
      this._assetManager = assetManager;
      this._currentScene = currentScene;

      // register button event handlers
      this._startButtonClick = this._startButtonClick.bind(this);

      this.Start();
    }

    // PRIVATE METHODS
    private _startButtonClick(event:createjs.MouseEvent):void {
      this._currentScene = config.Scene.PLAY;
      this.removeAllChildren();
    }


    // PUBLIC METHODS
    public Start():void {
      console.log("Start Scene");
      this._startLabel = new objects.Label("Battle Tanks", "60px", "Consolas", config.Color.BLACK, config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT, true);
      this._startButton = new objects.Button("startButton", config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT + 70, true);
      this._startImage = new objects.TankBackground(this._assetManager);
      this.Main();
    }

    public Update():number {
      return this._currentScene;
    }

    public Main():void {
      this.addChild(this._startImage);
      this.addChild(this._startLabel);
      this.addChild(this._startButton);

      this._startButton.on("click", this._startButtonClick);
    }
  }
}
