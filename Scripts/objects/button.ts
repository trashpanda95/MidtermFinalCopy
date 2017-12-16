module objects {
  export class Button extends createjs.Bitmap {

    constructor(buttonName:string, x:number = 0, y:number = 0, isCentered:boolean = false) {
      super(objects.Game.assetManager.getResult(buttonName));

      if(isCentered) {
        this.regX = this.getBounds().width * 0.5;
        this.regY = this.getBounds().height * 0.5;
      }

      this.x = x;
      this.y = y;

      this.on("mouseover", this._Over);
      this.on("mouseout", this._Out);
    }

    // PRIVATE METHODS
    private _Over(event:createjs.MouseEvent):void {
      this.alpha = 0.8;
    }

    private _Out(event:createjs.MouseEvent):void {
      this.alpha = 1.0;
    }
  }
}
