var SC_W = 800;
var SC_H = 640;

phina.define('MainScene', {
  superClass: 'phina.display.DisplayScene',
  init: function() {
    this.superInit({width:SC_W, height: SC_H});

    this.pixiLayer = phina.display.PixiLayer({width: SC_W, height: SC_H}).addChildTo(this);

    //Tomapiko読み込み
    var that = this;
    var url = "https://rawgit.com/phi-jp/phina.js/develop/assets/images/tomapiko_ss.png";
    var texture = phina.asset.Texture();
    texture.load(url).then(function() {
//        phina.display.Sprite(texture).addChildTo(that).setOrigin(0,0);

        that.tomapiko = phina.display.Sprite(texture, 64, 64)
  //        .addChildTo(that)
          .setFrameTrimming(192, 128, 192, 64)
          .setFrameIndex(0)
          .setPosition(SC_W*0.5, SC_H*0.5);
        that.tomapiko.update = function(e) {
          this.frameIndex++;
        }

        var sprite = phina.display.PixiSprite(texture)
            .addChildTo(that.pixiLayer)
            .setPosition(SC_W*0.5, SC_H*0.5);

/*
        var sprite = new PIXI.Sprite.fromImage(texture.src);
        sprite.position.set(SC_W*0.5, SC_H*0.5);
        sprite.anchor.set(0.5, 0.5);
        that.pixiLayer.addChild(sprite);
*/
    }.bind(this));
  },
});

phina.main(function() {
  var app = phina.game.GameApp({
    startLabel: 'main',
    width: SC_W,
    height: SC_H,
    backgroundColor: "#ccc",
  });
  app.fps = 60;
  app.run();
});

