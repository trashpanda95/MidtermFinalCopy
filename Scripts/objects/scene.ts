module objects {
  export abstract class Scene extends createjs.Container {
    // PRIVATE INSTANCE VARIABLES
    protected _currentScene: number;

    // PUBLIC PROPERTIES

    // CONSTRUCTORS
    constructor() {
      super();
    }

    // PUBLIC METHODS

    /**
     * This method is used to setup scene objects
     *
     * @method Start
     * @memberof Scene
     * @returns {void}
     */
    public Start():void {

    }

    /**
     * This method updates components of the scene
     *
     * @method Update
     * @returns {number}
     * @memberof Scene
     */
    public Update():number {
      return 0;
    }

    /**
     * This method is the Main method of the scene where all the action happens
     *
     * @method Main
     * @returns {void}
     * @memberof Scene
     */
    public Main():void {

    }
  }
}
