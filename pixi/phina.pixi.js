
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

  addChild: function(pixiObject){
    this.stage.addChild(pixiObject);
    return this;
  },

  removeChild: function(pixiObject){
    this.stage.removeChild(pixiObject);
    return this;
  }
});

/* 専用コアクラス */
phina.define('phina.display.PixiApp', {
     superClass: 'phina.display.DomApp',

     renderer: null,
     domElement: null,

     init: function(options) {
          var options = (options || {}).$safe(phina.display.CanvasApp.defaults);
          this.renderer = PIXI.autoDetectRenderer(options.width, options.height);
          options.domElement  = this.renderer.view;

          this.superInit(options);

          this.canvas = phina.graphics.Canvas();
          this.canvas.canvas = this.canvas.domElement = this.domElement;
          this.canvas.setSize(options.width, options.height);              　　                  　　　
          document.body.appendChild(this.domElement);
          if (options.fit) this.canvas.fitScreen(true);

          this.replaceScene(phina.app.PixiScene());
     },

     _draw: function(){
          if (this.currentScene) this.renderer.render(this.currentScene.stage);
     }
});

/* 専用シーンクラス */
phina.define('phina.app.PixiScene', {
  superClass: 'phina.app.Element',
  stage: null,

  init: function(options) {
    this.superInit();

    var options = ({}).$safe(options, phina.app.Object2D.defaults);

    this.stage = new PIXI.Container();
    this.width = options.width;
    this.height = options.height;
    if (options.backgroundColor) {
      this.on('enter', function() {
        this.app.renderer.backgroundColor = options.backgroundColor;
      });
    }
  },

  addChild: function(pixiObject){
    this.stage.addChild(pixiObject);
  },

  removeChild: function(pixiObject){
    this.stage.removeChild(pixiObject);
  }
});