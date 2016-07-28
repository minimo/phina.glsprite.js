
phina.define('phina.display.PixiLayer', {
  superClass: 'phina.display.Layer',

  stage: null,
  renderer: null,

  /** 子供を 自分のCanvasRenderer で描画するか */
  renderChildBySelf: true,

  init: function(options) {
    this.superInit();
    options = (options || {}).$safe({
      width: 640,
      height: 480
    });

    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(options.width, options.height, {transparent: true});

    this.on('enterframe', function() {
      this.renderer.render(this.stage);
    });
  },

  draw: function(canvas) {
    var domElement = this.renderer.view;
    canvas.context.drawImage(domElement, 0, 0, domElement.width, domElement.height);
  },

  addChild: function(child){
    if (child.pixiObject) {
      this.stage.addChild(child.pixiObject);
    }
    this.superClass.prototype.addChild.apply(this, arguments);
    return this;
  },

  removeChild: function(child){
    if (child.pixiObject) {
      this.stage.removeChild(child.pixiObject);
    }
    this.superClass.prototype.removeChild.apply(this, arguments);
    return this;
  }
});

phina.define('phina.display.PixiSprite', {
  superClass: 'phina.display.Sprite',

  pixiObject: null,

  init: function(image, width, height) {
    this.superInit(image, width, height);

    this.pixiObject = new PIXI.Sprite.fromImage(image.src);
    this.pixiObject.anchor.set(0.5, 0.5);
  },

  setOrgin: function(x, y) {
    this.pixiObject.anchor.set(x, y);
  },

  setPosition: function(x, y) {
    this.pixiObject.position.set(x, y);
  },
});
