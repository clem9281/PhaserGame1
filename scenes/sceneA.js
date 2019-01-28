let player;

class SceneA extends Phaser.Scene {
  constructor() {
    super({ key: "SceneA", active: true });
  }
  preload() {
    this.load.image("stars", "/assets/spaceparts/stars.png");
    this.load.image("ship1", "/assets/sprites/ship1.png");
    this.load.image("cursor", "/assets/sprites/crosshairs.png");
    this.load.image("tiles", "/assets/spaceparts/tiles2.tsx");
    this.load.tilemapTiledJSON(
      "map",
      "..assets/spaceparts/tilemapstarsplanets1.json"
    );
  }
  create() {
    this.stars = this.add.tileSprite(0, 0, game.width, game.height, "stars");
    // let map = this.make.tilemap({ key: "map" });
    // let tileset = map.addTilesetImage("tiles2", "tiles");
    // let bottom = map.createStaticLayer(tileset, 0, 0);
    this.cursor = this.add.image(0, 0, "cursor").setVisible(false);
    player = this.physics.add
      .sprite(
        // window.innerWidth / 2,
        // window.innerHeight / 2.5,
        this.physics.world.bounds.centerX,
        this.physics.world.bounds.centerY,
        "ship1"
      )
      .setVelocity(0, 0);
    // .setAngularDrag(40)
    // .setAngularVelocity(-40);
    console.log(player.body);
    player.body.setCollideWorldBounds(true);
    console.log(player.rotation); // cursors = this.input.keyboard.createCursorKeys();
    // player.body.setCollideWorldBounds(true);
    // player.body.setVelocity(0, 0);
  }

  update() {
    if (this.input.activePointer.isDown) {
      // console.log(this.input.activePointer);
      this.cursor
        .setVisible(true)
        .setPosition(this.input.activePointer.x, this.input.activePointer.y);
      this.physics.moveToObject(player, this.input.activePointer, 700);

      player.rotation =
        Phaser.Math.Angle.Between(
          player.x,
          player.y,
          this.input.activePointer.x,
          this.input.activePointer.y
        ) + 1.57;
    } else if (!this.input.activePointer.isUp) {
      this.cursor.setVisible(false);
    }
  }
}
