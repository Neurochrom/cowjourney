var world = (function(){
    this.init = function(game){
        this.game = game;
    };
    this.game;
    this.size = new Vec2(window.getWidth(),window.getHeight());
    this.balls = [];
    this.add = function(animal){
        this.animals.push(animal);
        this.game.rootScene.addChild(animal);
    };

    return this;
})();