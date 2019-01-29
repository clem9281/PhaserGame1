let player;

class SceneA extends Phaser.Scene {
  constructor() {
    super({ key: "SceneA", active: true });
  }
  preload() {
    this.load.image("ship1", "assets/sprites/ship1.png");
    this.load.image("cursor", "assets/sprites/crosshairs.png");
    this.load.image("startiles", "assets/spaceparts/tiles/starTiles.png");
    this.load.image("planettiles", "assets/spaceparts/tiles/planetTiles.png");
    this.load.tilemapTiledJSON(
      "map",
      "assets/spaceparts/tiles/planetsandstars2MAP..json"
    );
  }
  create() {
    // maps
    let map = this.add.tilemap("map");
    let startiles = map.addTilesetImage("starTiles", "startiles");
    let starLayer = map.createStaticLayer("sky", startiles, 0, 0);
    let planettiles = map.addTilesetImage("planetTiles", "planettiles");
    let smallPlanetLayer = map.createStaticLayer(
      "smallplanets",
      planettiles,
      0,
      0
    );
    let sunLayer = map.createStaticLayer("sun", planettiles, 0, 0);
    let iceplanetLayer = map.createStaticLayer("iceplanet", planettiles, 0, 0);
    let gasgiantLayer = map.createStaticLayer("gasgiant", planettiles, 0, 0);
    let exoplanetLayer = map.createStaticLayer("exoplanet", planettiles, 0, 0);

    // world bounds
    this.physics.world.bounds.width = starLayer.width;
    this.physics.world.bounds.height = starLayer.height;

    // cursor
    this.cursor = this.add.image(0, 0, "cursor").setVisible(false);

    // player
    player = this.physics.add
      .sprite(
        this.physics.world.bounds.centerX,
        this.physics.world.bounds.centerY,
        "ship1"
      )
      .setVelocity(0, 0);
    player.body.onOverlap = true;
    player.body.setCollideWorldBounds(true);
    console.log(this);
    console.log("body", player);

    // camera
    this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 0, starLayer.width, starLayer.height);
    console.log("camera", this.cameras);
    console.log(this.physics);
    console.log("cursor", this.cursor);
  }

  update() {
    if (this.input.activePointer.isDown) {
      this.cursor.setVisible(true);
      // movement
      if (this.input.activePointer.x > 480) {
        this.cursor.setX(
          this.cameras.main.midPoint.x + this.input.activePointer.x - 480
        );
      } else if (this.input.activePointer.x < 480) {
        this.cursor.setX(
          this.cameras.main.midPoint.x - (480 - this.input.activePointer.x)
        );
      }
      if (this.input.activePointer.y < 640) {
        this.cursor.setY(
          this.cameras.main.midPoint.y - (640 - this.input.activePointer.y)
        );
      } else if (this.input.activePointer.y > 640) {
        this.cursor.setY(
          this.cameras.main.midPoint.y + this.input.activePointer.y - 640
        );
      }

      console.log("cameras", this.cameras.main.midPoint);
      console.log(
        "pointer",
        this.input.activePointer.x,
        this.input.activePointer.y
      );
      console.log("cursor", this.cursor.x, this.cursor.y);
      console.log("ship", player.x, player.y);
      console.log("body", player.body.x, player.body.y);
      this.physics.moveToObject(player, this.cursor, 700);
      player.rotation =
        Phaser.Math.Angle.Between(
          player.x,
          player.y,
          this.cursor.x,
          this.cursor.y
        ) + 1.57;
      let lastDirection =
        Phaser.Math.Angle.Between(
          player.x,
          player.y,
          this.input.activePointer.x,
          this.input.activePointer.y
        ) + 1.57;
      // not sure yet if this is working
      if (
        player.x === this.input.activePointer.x ||
        player.y === this.input.activePointer.y
      ) {
        player.body.setVelocity(0);
      }
    } else if (!this.input.activePointer.isUp) {
      this.cursor.setVisible(false);
    }
  }
}
