module managers {
  // Keyboard Class +++++++++++++++
  export class Keyboard {
    // PUBLIC INSTANCE VARIABLES ++++++++++++
    public enabled: boolean;
    public jump: boolean;
    public moveBackward: boolean;
    public moveForward: boolean;
    public moveLeft: boolean;
    public moveRight: boolean;
    public paused: boolean;

    public player:objects.GameObject;

    // CONSTRUCTOR ++++++++++++++++++++++++++
    constructor(player:objects.GameObject) {
      this.enabled = false;
      document.addEventListener('keydown', this.onKeyDown.bind(this), false);
      document.addEventListener('keyup', this.onKeyUp.bind(this), false);
      this.player = player;
    }

    // PUBLIC METHODS

    public onKeyDown(event: KeyboardEvent): void {
      switch (event.keyCode) {
        case config.Key.UP_ARROW:
        case config.Key.W:
          this.moveForward = true;
          break;
        case config.Key.LEFT_ARROW:
        case config.Key.A:
          this.moveLeft = true;
          break;
        case config.Key.DOWN_ARROW:
        case config.Key.S:
          this.moveBackward = true;
          break;
        case config.Key.RIGHT_ARROW:
        case config.Key.D:
          this.moveRight = true;
          break;
        case config.Key.SPACEBAR:
          this.jump = true;
          break;
        case 81: /* pause */
          this.paused = (this.paused) ? false : true;
          break;
      }
    }

    public onKeyUp(event: KeyboardEvent): void {
      switch (event.keyCode) {
        case config.Key.UP_ARROW:
        case config.Key.W:
          this.moveForward = false;
          break;
        case config.Key.LEFT_ARROW:
        case config.Key.A:
          this.moveLeft = false;
          break;
        case config.Key.DOWN_ARROW:
        case config.Key.S:
          this.moveBackward = false;
          break;
        case config.Key.RIGHT_ARROW:
        case config.Key.D:
          this.moveRight = false;
          break;
        case config.Key.SPACEBAR:
          this.jump = false;
          break;
      }
    }

    public MovePlayer():void {
      // correct direction
      let direction = (this.player.rotation -90) * -1;

      // uncomment the following for Regular player movement not following player's direction
      /*
      if(this.moveRight) {
        this.player.x += 5;
      }
      if(this.moveLeft) {
        this.player.x -= 5;
      }

      if(this.moveForward) {
        this.player.y -= 5;
      }
      if(this.moveBackward) {
        this.player.y += 5;
      }
      */

      // uncomment the following lines to have the keyboard buttons follow player's direction
      if(this.moveForward) {
        this.player.x += 5 * Math.cos(direction * (Math.PI / 180.0));
        this.player.y -= 5 * Math.sin(direction * (Math.PI / 180.0));
      }
      if(this.moveBackward) {
        this.player.x -= 5 * Math.cos(direction * (Math.PI / 180.0));
        this.player.y += 5 * Math.sin(direction * (Math.PI / 180.0));
      }

      if(this.moveRight) {
        this.player.x += 2 * Math.sin(direction * (Math.PI / 180));
        this.player.y += 2 * Math.cos(direction * (Math.PI / 180));
      }

      if(this.moveLeft) {
        this.player.x -= 2 * Math.sin(direction * (Math.PI / 180));
        this.player.y -= 2 * Math.cos(direction * (Math.PI / 180));
      }
    }

    public Update():void {
      this.MovePlayer();
    }


  }
}
