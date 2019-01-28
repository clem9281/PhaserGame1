let player;

class SceneA extends Phaser.Scene {
  constructor() {
    super({ key: "SceneA", active: true });
  }
  preload() {
    this.load.image("stars", "assets/spaceparts/stars.png");
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
    console.log(this.cache.tilemap.get("map").data);
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
    player.body.onOverlap = true;
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
      console.log(this.input.activePointer);
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
      let lastDirection =
        Phaser.Math.Angle.Between(
          player.x,
          player.y,
          this.input.activePointer.x,
          this.input.activePointer.y
        ) + 1.57;
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
