module objects {
  export class Label extends createjs.Text {
    constructor(text:string, fontSize:string = "40px", fontFamily:string="Consolas", color:string="#000000", x:number = 0, y:number=0, isCentered:boolean=false) {
      super(text, fontSize + " " + fontFamily, color);
      if(isCentered) {
        this.regX = this.getMeasuredWidth() * 0.5;
        this.regY = this.getMeasuredHeight() * 0.5;
      }
      this.x = x;
      this.y = y;
    }
  }
}
