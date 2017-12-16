module managers {
  export class GamePad {
    // PRIVATE INSTANCE VARIABLES
    private _gamepad:Gamepad;
    private _gamepadIndex:number;

    // PUBLIC INSTANCE VARIABLES
    public direction:number;
    public axis:number[];
    public player:objects.GameObject;

    // CONSTRUCTORS
    constructor(player:objects.GameObject, gamepadIndex:number) {
      this.axis = new Array<number>();
      this.direction = 0;
      this.player = player;
      this._gamepadIndex = gamepadIndex;
    }

    public GetInput():void {
      this._gamepad = window.navigator.getGamepads()[this._gamepadIndex];
      if (this._gamepad) {

        // check Buttons
        for (let button = 0; button < this._gamepad.buttons.length; button++) {

          if (this._gamepad.buttons[button].pressed) {
            console.log("button " + button + " pressed");
          }
        }
        // check Axes
        for (let index = 0; index < this._gamepad.axes.length; index++) {
          if ((this._gamepad.axes[index] > 0.2) || (this._gamepad.axes[index] < -0.2)) {
            this.axis[index] = this._gamepad.axes[index];
            /*
            if((index == 1) && (this.axis[index] > 0)) {
              this.axis[index] = 0; // don't allow backward movement
            }
            */
          }
          else if((this._gamepad.axes[index] > -0.2 ) && (this._gamepad.axes[index] < 0.2)) {
            this.axis[index] = 0;
          }
        } // end check Axes

      } // end check if gamepad is connected
    }

    public MovePlayer():void {
      // correct direction
      let newDirection = 90 - this.player.rotation;
      this.direction = newDirection;
      if(newDirection > 360) {
        this.direction -= 360;
      }
      if(newDirection < 0) {
        this.direction += 360
      }

      // forward and back movement
      this.player.x -= this.axis[config.Gamepad.VERTICAL] * 5 * Math.cos(this.direction * (Math.PI / 180));
      this.player.y += this.axis[config.Gamepad.VERTICAL] * 5 * Math.sin(this.direction * (Math.PI / 180));

      // left and right movement
      this.player.x += this.axis[config.Gamepad.HORIZONTAL] * 2 * Math.sin(this.direction * (Math.PI / 180));
      this.player.y += this.axis[config.Gamepad.HORIZONTAL] * 2 * Math.cos(this.direction * (Math.PI / 180));

      // change direction
      this.player.rotation += this.axis[config.Gamepad.ROTATION] * 2;
    }

    public Update():void {
      this.GetInput();
      this.MovePlayer();
    }


  }
}
