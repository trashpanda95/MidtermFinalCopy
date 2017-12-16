var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var config;
(function (config) {
    // Color Presets
    var Color = /** @class */ (function () {
        function Color() {
        }
        Color.AZURE = "#F0FFFF";
        Color.BLACK = "#000000";
        Color.BLUE = "#0000FF";
        Color.BROWN = "#A52A2A";
        Color.CRIMSON = "#DC143C";
        Color.CYAN = "#00FFFF";
        Color.DARK_BLUE = "#00008B";
        Color.DARK_GREY = "#A9A9A9";
        Color.DARK_ORANGE = "#FF8C00";
        Color.DARK_RED = "#8B0000";
        Color.GOLD = "#FFD700";
        Color.GREEN = "#00FF00";
        Color.GREY = "#808080";
        Color.HOT_PINK = "#FF69B4";
        Color.INDIGO = "#4B0082";
        Color.IVORY = "#FFFFF0";
        Color.LIGHT_BLUE = "#ADD8E6";
        Color.LIGHT_GREY = "#D3D3D3";
        Color.LIGHT_PINK = "#FFB6C1";
        Color.LIGHT_YELLOW = "#FFFFE0";
        Color.MAGENTA = "#FF00FF";
        Color.MAROON = "#800000";
        Color.NAVY = "#000080";
        Color.OLIVE = "#808000";
        Color.ORANGE = "#FFA500";
        Color.PEACH = "#FFDAB9";
        Color.PINK = "#FFC0CB";
        Color.PURPLE = "#800080";
        Color.RED = "#FF0000";
        Color.SILVER = "#C0C0C0";
        Color.TEAL = "#008080";
        Color.VIOLET = "#EE82EE";
        Color.WHITE = "#FFFFFF";
        Color.YELLOW = "#FFFF00";
        return Color;
    }());
    config.Color = Color;
})(config || (config = {}));
var config;
(function (config) {
    var Gamepad;
    (function (Gamepad) {
        Gamepad[Gamepad["HORIZONTAL"] = 0] = "HORIZONTAL";
        Gamepad[Gamepad["VERTICAL"] = 1] = "VERTICAL";
        Gamepad[Gamepad["ROTATION"] = 2] = "ROTATION";
    })(Gamepad = config.Gamepad || (config.Gamepad = {}));
})(config || (config = {}));
var config;
(function (config) {
    var Key = /** @class */ (function () {
        function Key() {
        }
        // Keyboard values
        Key.A = 65;
        Key.CTRL = 17;
        Key.D = 68;
        Key.DOWN_ARROW = 40;
        Key.ESCAPE = 27;
        Key.LEFT_ARROW = 37;
        Key.RIGHT_ARROW = 39;
        Key.S = 83;
        Key.SHIFT = 16;
        Key.SPACEBAR = 32;
        Key.UP_ARROW = 38;
        Key.W = 87;
        return Key;
    }());
    config.Key = Key;
})(config || (config = {}));
var config;
(function (config) {
    // Scene Presets
    var Scene = /** @class */ (function () {
        function Scene() {
        }
        Scene.START = 0;
        Scene.PLAY = 1;
        Scene.END = 2;
        return Scene;
    }());
    config.Scene = Scene;
})(config || (config = {}));
var config;
(function (config) {
    // Screen Size Configuration
    var Screen = /** @class */ (function () {
        function Screen() {
        }
        Screen.WIDTH = 640;
        Screen.HEIGHT = 480;
        Screen.HALF_WIDTH = Screen.WIDTH * 0.5;
        Screen.HALF_HEIGHT = Screen.HEIGHT * 0.5;
        return Screen;
    }());
    config.Screen = Screen;
})(config || (config = {}));
//IIFE to encapsulate game
(function () {
    // game variables
    var assetManager;
    var currentScene;
    var currentState;
    var debugCanvas;
    var gameCanvas;
    var height = config.Screen.HEIGHT;
    var stage;
    var width = config.Screen.WIDTH;
    var stats;
    function SetupStats() {
        stats = new Stats();
        stats.showPanel(0);
        document.body.appendChild(stats.dom);
    }
    // Initializes game variables
    function Init() {
        console.log("Initialization");
        SetupStats();
        gameCanvas = document.getElementById("game");
        debugCanvas = document.getElementById("debug");
        gameCanvas.setAttribute("width", width.toString());
        gameCanvas.setAttribute("height", height.toString());
        debugCanvas.setAttribute("width", width.toString());
        debugCanvas.setAttribute("height", height.toString());
        // set global game object variables
        objects.Game.assetManager.on("complete", Start);
    }
    // Starts game
    function Start() {
        console.log("Start");
        stage = new createjs.Stage(gameCanvas);
        objects.Game.stage = stage; // save the stage to the global game object
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        currentState = config.Scene.START;
        Main();
    }
    // Main Game Loop
    function Update() {
        stats.begin();
        var newState = currentScene.Update();
        if (newState != currentState) {
            currentState = newState;
            Main();
        }
        stats.end();
        stage.update();
    }
    function Main() {
        console.log("Main FSM");
        stage.removeAllChildren();
        switch (currentState) {
            case config.Scene.START:
                currentScene = new scenes.Start(currentState);
                break;
            case config.Scene.PLAY:
                currentScene = new scenes.Play(currentState);
                break;
            case config.Scene.END:
                currentScene = new scenes.End(currentState);
                break;
        }
        stage.addChild(currentScene);
    }
    window.onload = Init;
})();
var managers;
(function (managers) {
    var assetManifest = [
        { id: "backButton", src: "./Assets/images/backButton.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "restartButton", src: "./Assets/images/restartButton.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "plane", src: "./Assets/images/plane.png" }
    ];
    var AssetManager = /** @class */ (function (_super) {
        __extends(AssetManager, _super);
        function AssetManager() {
            var _this = _super.call(this) || this;
            _this.manifest = new Array();
            _this.manifest = assetManifest;
            _this.installPlugin(createjs.Sound);
            _this.loadManifest(_this.manifest);
            return _this;
        }
        AssetManager.prototype.addItem = function (id, src) {
            this.manifest.push({ id: id, src: src });
            this.loadManifest(this.manifest);
        };
        return AssetManager;
    }(createjs.LoadQueue));
    managers.AssetManager = AssetManager;
})(managers || (managers = {}));
var managers;
(function (managers) {
    var GamePad = /** @class */ (function () {
        // CONSTRUCTORS
        function GamePad(player, gamepadIndex) {
            this.axis = new Array();
            this.direction = 0;
            this.player = player;
            this._gamepadIndex = gamepadIndex;
        }
        GamePad.prototype.GetInput = function () {
            this._gamepad = window.navigator.getGamepads()[this._gamepadIndex];
            if (this._gamepad) {
                // check Buttons
                for (var button = 0; button < this._gamepad.buttons.length; button++) {
                    if (this._gamepad.buttons[button].pressed) {
                        console.log("button " + button + " pressed");
                    }
                }
                // check Axes
                for (var index = 0; index < this._gamepad.axes.length; index++) {
                    if ((this._gamepad.axes[index] > 0.2) || (this._gamepad.axes[index] < -0.2)) {
                        this.axis[index] = this._gamepad.axes[index];
                        /*
                        if((index == 1) && (this.axis[index] > 0)) {
                          this.axis[index] = 0; // don't allow backward movement
                        }
                        */
                    }
                    else if ((this._gamepad.axes[index] > -0.2) && (this._gamepad.axes[index] < 0.2)) {
                        this.axis[index] = 0;
                    }
                } // end check Axes
            } // end check if gamepad is connected
        };
        GamePad.prototype.MovePlayer = function () {
            // correct direction
            var newDirection = 90 - this.player.rotation;
            this.direction = newDirection;
            if (newDirection > 360) {
                this.direction -= 360;
            }
            if (newDirection < 0) {
                this.direction += 360;
            }
            // forward and back movement
            this.player.x -= this.axis[config.Gamepad.VERTICAL] * 5 * Math.cos(this.direction * (Math.PI / 180));
            this.player.y += this.axis[config.Gamepad.VERTICAL] * 5 * Math.sin(this.direction * (Math.PI / 180));
            // left and right movement
            this.player.x += this.axis[config.Gamepad.HORIZONTAL] * 2 * Math.sin(this.direction * (Math.PI / 180));
            this.player.y += this.axis[config.Gamepad.HORIZONTAL] * 2 * Math.cos(this.direction * (Math.PI / 180));
            // change direction
            this.player.rotation += this.axis[config.Gamepad.ROTATION] * 2;
        };
        GamePad.prototype.Update = function () {
            this.GetInput();
            this.MovePlayer();
        };
        return GamePad;
    }());
    managers.GamePad = GamePad;
})(managers || (managers = {}));
var managers;
(function (managers) {
    // Keyboard Class +++++++++++++++
    var Keyboard = /** @class */ (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++
        function Keyboard(player) {
            this.enabled = false;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
            this.player = player;
        }
        // PUBLIC METHODS
        Keyboard.prototype.onKeyDown = function (event) {
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
                case 81:/* pause */ 
                    this.paused = (this.paused) ? false : true;
                    break;
            }
        };
        Keyboard.prototype.onKeyUp = function (event) {
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
        };
        Keyboard.prototype.MovePlayer = function () {
            // correct direction
            var direction = (this.player.rotation - 90) * -1;
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
            if (this.moveForward) {
                this.player.x += 5 * Math.cos(direction * (Math.PI / 180.0));
                this.player.y -= 5 * Math.sin(direction * (Math.PI / 180.0));
            }
            if (this.moveBackward) {
                this.player.x -= 5 * Math.cos(direction * (Math.PI / 180.0));
                this.player.y += 5 * Math.sin(direction * (Math.PI / 180.0));
            }
            if (this.moveRight) {
                this.player.x += 2 * Math.sin(direction * (Math.PI / 180));
                this.player.y += 2 * Math.cos(direction * (Math.PI / 180));
            }
            if (this.moveLeft) {
                this.player.x -= 2 * Math.sin(direction * (Math.PI / 180));
                this.player.y -= 2 * Math.cos(direction * (Math.PI / 180));
            }
        };
        Keyboard.prototype.Update = function () {
            this.MovePlayer();
        };
        return Keyboard;
    }());
    managers.Keyboard = Keyboard;
})(managers || (managers = {}));
var managers;
(function (managers) {
    // Mouse Class +++++++++++++++
    var Mouse = /** @class */ (function () {
        // CONSTRUCTOR +++++++++++++++++++++++
        function Mouse(player) {
            this.player = player;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        Mouse.prototype.PlayerFollowMouse = function () {
            this._dx = objects.Game.stage.mouseX - this.player.x;
            this._dy = objects.Game.stage.mouseY - this.player.y;
            // find the angle of rotation
            this.direction = Math.atan2(this._dy, this._dx) * (180 / Math.PI) + 90;
            this.player.rotation = this.direction;
        };
        Mouse.prototype.Update = function () {
            this.PlayerFollowMouse();
        };
        return Mouse;
    }());
    managers.Mouse = Mouse;
})(managers || (managers = {}));
var objects;
(function (objects) {
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(buttonName, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, objects.Game.assetManager.getResult(buttonName)) || this;
            if (isCentered) {
                _this.regX = _this.getBounds().width * 0.5;
                _this.regY = _this.getBounds().height * 0.5;
            }
            _this.x = x;
            _this.y = y;
            _this.on("mouseover", _this._Over);
            _this.on("mouseout", _this._Out);
            return _this;
        }
        // PRIVATE METHODS
        Button.prototype._Over = function (event) {
            this.alpha = 0.8;
        };
        Button.prototype._Out = function (event) {
            this.alpha = 1.0;
        };
        return Button;
    }(createjs.Bitmap));
    objects.Button = Button;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.assetManager = new managers.AssetManager();
        return Game;
    }());
    objects.Game = Game;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function GameObject(imageString) {
            var _this = _super.call(this, objects.Game.assetManager.getResult(imageString)) || this;
            _this.name = imageString;
            _this._initialize();
            return _this;
        }
        // PROTECTED METHODS
        GameObject.prototype._initialize = function () {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.position = new createjs.Point(this.x, this.y);
            this.isColliding = false;
        };
        return GameObject;
    }(createjs.Bitmap));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        function Label(text, fontSize, fontFamily, color, x, y, isCentered) {
            if (fontSize === void 0) { fontSize = "40px"; }
            if (fontFamily === void 0) { fontFamily = "Consolas"; }
            if (color === void 0) { color = "#000000"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, text, fontSize + " " + fontFamily, color) || this;
            if (isCentered) {
                _this.regX = _this.getMeasuredWidth() * 0.5;
                _this.regY = _this.getMeasuredHeight() * 0.5;
            }
            _this.x = x;
            _this.y = y;
            return _this;
        }
        return Label;
    }(createjs.Text));
    objects.Label = Label;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Plane() {
            var _this = _super.call(this, "plane") || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Plane.prototype._checkBounds = function () {
            if (this.x >= config.Screen.WIDTH - this.halfWidth) {
                this.x = config.Screen.WIDTH - this.halfWidth;
            }
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
            if (this.y >= config.Screen.HEIGHT - this.halfHeight) {
                this.y = config.Screen.HEIGHT - this.halfHeight;
            }
            if (this.y <= this.halfHeight) {
                this.y = this.halfHeight;
            }
        };
        // PUBLIC METHODS
        Plane.prototype.Start = function () {
            this.x = 320;
            this.y = 430;
            this.bulletSpawn = new createjs.Point(this.y - 35, this.x);
        };
        Plane.prototype.Update = function () {
            this.bulletSpawn.x = this.x;
            this.bulletSpawn.y = this.y - 35;
            this._checkBounds();
        };
        return Plane;
    }(objects.GameObject));
    objects.Plane = Plane;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Scene = /** @class */ (function (_super) {
        __extends(Scene, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTORS
        function Scene() {
            return _super.call(this) || this;
        }
        // PUBLIC METHODS
        /**
         * This method is used to setup scene objects
         *
         * @method Start
         * @memberof Scene
         * @returns {void}
         */
        Scene.prototype.Start = function () {
        };
        /**
         * This method updates components of the scene
         *
         * @method Update
         * @returns {number}
         * @memberof Scene
         */
        Scene.prototype.Update = function () {
            return 0;
        };
        /**
         * This method is the Main method of the scene where all the action happens
         *
         * @method Main
         * @returns {void}
         * @memberof Scene
         */
        Scene.prototype.Main = function () {
        };
        return Scene;
    }(createjs.Container));
    objects.Scene = Scene;
})(objects || (objects = {}));
var scenes;
(function (scenes) {
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        //CONSTRUCTORS
        function End(currentScene) {
            var _this = _super.call(this) || this;
            _this._currentScene = currentScene;
            // Register Button Event Handlers
            _this._backButtonClick = _this._backButtonClick.bind(_this);
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        End.prototype._backButtonClick = function (event) {
            this._currentScene = config.Scene.PLAY;
            this.removeAllChildren();
        };
        // PUBLIC METHODS
        End.prototype.Start = function () {
            this._startLabel = new objects.Label("End Scene", "60px", "Consolas", config.Color.BLACK, config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT, true);
            this._backButton = new objects.Button("backButton", config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT + 70, true);
            this.Main();
        };
        End.prototype.Update = function () {
            return this._currentScene;
        };
        End.prototype.Main = function () {
            this.addChild(this._startLabel);
            this.addChild(this._backButton);
            this._backButton.on("click", this._backButtonClick);
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        //CONSTRUCTORS
        function Play(currentScene) {
            var _this = _super.call(this) || this;
            _this._currentScene = currentScene;
            // register button event handlers
            _this._nextButtonClick = _this._nextButtonClick.bind(_this);
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Play.prototype._nextButtonClick = function (event) {
            this._currentScene = config.Scene.END;
            this.removeAllChildren();
        };
        // PUBLIC METHODS
        Play.prototype.Start = function () {
            this._playLabel = new objects.Label("Play Scene", "60px", "Consolas", config.Color.BLACK, config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT, true);
            this._nextButton = new objects.Button("nextButton", config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT + 70, true);
            this._player = new objects.Plane();
            // uncomment the next line to enable gamepad support
            //this._gamepad = new managers.GamePad(this._player, 0);
            this._mouse = new managers.Mouse(this._player);
            this._keyboard = new managers.Keyboard(this._player);
            this.Main();
        };
        Play.prototype.Update = function () {
            this._player.Update();
            // uncomment the next line to enable gamepad support
            // this._gamepad.Update();
            this._mouse.Update();
            this._keyboard.Update();
            return this._currentScene;
        };
        Play.prototype.Main = function () {
            this.addChild(this._playLabel);
            this.addChild(this._nextButton);
            this.addChild(this._player);
            this._nextButton.on("click", this._nextButtonClick);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
var scenes;
(function (scenes) {
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        //CONSTRUCTORS
        function Start(currentScene) {
            var _this = _super.call(this) || this;
            _this._currentScene = currentScene;
            // register button event handlers
            _this._startButtonClick = _this._startButtonClick.bind(_this);
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Start.prototype._startButtonClick = function (event) {
            this._currentScene = config.Scene.PLAY;
            this.removeAllChildren();
        };
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            console.log("Start Scene");
            this._startLabel = new objects.Label("Start Scene", "60px", "Consolas", config.Color.BLACK, config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT, true);
            this._startButton = new objects.Button("startButton", config.Screen.HALF_WIDTH, config.Screen.HALF_HEIGHT + 70, true);
            this.Main();
        };
        Start.prototype.Update = function () {
            return this._currentScene;
        };
        Start.prototype.Main = function () {
            this.addChild(this._startLabel);
            this.addChild(this._startButton);
            this._startButton.on("click", this._startButtonClick);
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=game.js.map