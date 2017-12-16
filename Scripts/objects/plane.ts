module objects {
  export class Plane extends objects.GameObject{
    // PRIVATE INSTANCE VARIABLES
    bulletSpawn:createjs.Point;

    // PUBLIC PROPERTIES

    // CONSTRUCTORS
    constructor() {
      super("plane");
      this.Start();
    }
    // PRIVATE METHODS
    private _checkBounds() {
      if(this.x >= config.Screen.WIDTH - this.halfWidth) {
        this.x = config.Screen.WIDTH - this.halfWidth;
      }
      if(this.x <= this.halfWidth) {
        this.x = this.halfWidth;
      }

      if(this.y >= config.Screen.HEIGHT - this.halfHeight) {
        this.y = config.Screen.HEIGHT - this.halfHeight;
      }

      if(this.y <= this.halfHeight) {
        this.y = this.halfHeight;
      }
    }


    // PUBLIC METHODS
    public Start():void {
      this.x = 320;
      this.y = 430;
      this.bulletSpawn = new createjs.Point(this.y - 35, this.x);
    }

    public Update():void {
      this.bulletSpawn.x = this.x;
      this.bulletSpawn.y = this.y -35;
      this._checkBounds();
    }
  }
}
