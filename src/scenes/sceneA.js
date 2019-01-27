let cursors, player;
var SPEED = 100;
var ROTATION_SPEED = (2 * Math.PI) / 4; // 90 deg/s
var ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED);
var TOLERANCE = 0.01 * ROTATION_SPEED;

var velocityFromRotation =
  Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation;
var sin = Math.sin;
var cos = Math.cos;
var atan2 = Math.atan2;
var ship;

class SceneA extends Phaser.Scene {
  constructor() {
    super({ key: "SceneA", active: true });
  }
  preload() {
    this.load.image("stars", "../assets/spaceparts/stars.png");
    this.load.image("ship1", "../assets/sprites/ship1.png");
    this.load.image("cursor", "../assets/sprites/crosshairs.png");
  }
  create() {
    this.stars = this.add.tileSprite(
      100,
      100,
      game.width,
      game.height,
      "stars"
    );
    this.cursor = this.add.image(0, 0, "cursor").setVisible(false);
    player = this.physics.add
      .sprite(
        // window.innerWidth / 2,
        // window.innerHeight / 2.5,
        0,
        0,
        "ship1"
      )
      .setVelocity(0, 0);
    player.body.setCollideWorldBounds(true);
    console.log(player); // cursors = this.input.keyboard.createCursorKeys();
    // player.body.setCollideWorldBounds(true);
    // player.body.setVelocity(0, 0);
  }

  update() {
    if (this.input.activePointer.isDown) {
      console.log(this.input.activePointer);
      this.cursor
        .setVisible(true)
        .setPosition(this.input.activePointer.x, this.input.activePointer.y);
      this.physics.moveToObject(player, this.input.activePointer, 500);
    } else if (!this.input.activePointer.isUp) {
      this.cursor.setVisible(false);
    }
  }
}
