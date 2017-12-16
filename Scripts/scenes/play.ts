module scenes {
  export class Play extends objects.Scene {
    // PRIVATE INSTANCE VARIABLES
    private _playLabel:objects.Label;
    private _nextButton:objects.Button;
    private _gamepad:managers.GamePad;
    private _player:objects.Plane;
    private _keyboard:managers.Keyboard;
    private _mouse:managers.Mouse;

    //CONSTRUCTORS
    constructor(currentScene: number) {
      super();

      this._currentScene = currentScene;

      // register button event handlers
      this._nextButtonClick = this._nextButtonClick.bind(this);

      this.Start();
    }

    // PRIVATE METHODS
    private _nextButtonClick(event:createjs.MouseEvent):void {
      this._currentScene = config.Scene.END;
      this.removeAllChildren();
    }


    // PUBLIC METHODS
    public Start():void {
      this._playLabel = new objects.Label("Play Scene", "60px", "Consolas", config.Color.BLACK, config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT, true);
      this._nextButton = new objects.Button("nextButton", config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT + 70, true);

      this._player = new objects.Plane();

      // uncomment the next line to enable gamepad support
      //this._gamepad = new managers.GamePad(this._player, 0);
      this._mouse = new managers.Mouse(this._player);
      this._keyboard = new managers.Keyboard(this._player);


      this.Main();
    }

    public Update():number {
      this._player.Update();
      // uncomment the next line to enable gamepad support
     // this._gamepad.Update();
      this._mouse.Update();
      this._keyboard.Update();


      return this._currentScene;
    }

    public Main():void {
      this.addChild(this._playLabel);
      this.addChild(this._nextButton);
      this.addChild(this._player);



      this._nextButton.on("click", this._nextButtonClick);
    }
  }
}
