
phina.define('phina.display.PixiLayer', {
  superClass: 'phina.display.DisplayElement',

  stage: null,
  renderer: null,

  init: function(options) {
    this.superInit();

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
    if (child.pixiObj) {
      this.stage.addChild(child.pixiObj);
    }
    this.superClass.prototype.addChild.apply(this, arguments);
    return this;
  },

  removeChild: function(child){
    if (child.pixiObj) {
      this.stage.removeChild(child.pixiObj);
    }
    this.superClass.prototype.removeChild.apply(this, arguments);
    return this;
  }
});

phina.define('phina.display.PixiSprite', {
  superClass: 'phina.display.DisplayElement',

  pixiObj: null,

  init: function(image, width, height) {
    this.superInit();

    if (typeof image === 'string') {
      image = phina.asset.AssetManager.get('image', image);
    }
    this.image = image;
    this.width = width || this.image.domElement.width;
    this.height = height || this.image.domElement.height;

    this.pixiObj = new PIXI.Sprite.fromImage(image.src);
  },

  setOrgin: function(x, y) {
    this.pixiObj.anchor.set(x, y);
  },

  setPosition: function(x, y) {
    this.pixiObj.position.set(x, y);
  },
});
