let config = {
  type: Phaser.AUTO,
  width: 960,
  height: 1280,
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
      gravity: false
    }
  },

  inputMouse: true,
  inputTouch: true,
  parent: "game-container",
  scene: [SceneA],
  autoResize: true,
  callbacks: {
    postBoot: function(game) {
      // In v3.15, you have to override Phaser's default styles
      game.canvas.style.maxWidth = "100%";
      game.canvas.style.height = "auto";
    }
  }
};

let game = new Phaser.Game(config);
