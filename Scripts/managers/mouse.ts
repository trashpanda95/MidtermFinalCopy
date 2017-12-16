module managers {
  // Mouse Class +++++++++++++++
  export class Mouse {
    // PRIVATE INSTANCE VARIABLES
    private _dx:number;
    private _dy:number;


    // PUBLIC INSTANCE VARIABLES +++++++++
    public direction:number;
    public player:objects.GameObject;


    // CONSTRUCTOR +++++++++++++++++++++++
    constructor(player:objects.GameObject) {
      this.player = player;
    }

    // PUBLIC METHODS +++++++++++++++++++++
     public PlayerFollowMouse():void {
      this._dx = objects.Game.stage.mouseX - this.player.x;
      this._dy = objects.Game.stage.mouseY - this.player.y;
      // find the angle of rotation
      this.direction = Math.atan2(this._dy, this._dx) * (180 / Math.PI) + 90;
       this.player.rotation = this.direction;
    }


    public Update():void {
      this.PlayerFollowMouse();
    }

  }
}
