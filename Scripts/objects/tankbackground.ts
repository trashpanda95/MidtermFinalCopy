module objects {
    export class TankBackGround extends createjs.Bitmap {
        // PRIVATE INSTANCE VARIABLES
        private _verticalSpeed:number;
        // PUBLIC PROPERTIES
    
        // CONSTRUCTORS
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager.getResult("tankbgi"));
    
            this.Start();
        }

    
    
        // PUBLIC METHODS
        public Start():void {

        }
    
        public Update():void {
        }
    }
}

  