enchant();

Sprite.prototype.setPosV = function(vec_) {
    this.x = vec_.x;
    this.y = vec_.y;
};
Sprite.prototype.addToPosV = function(vec_) {
    this.x += vec_.x;
    this.y += vec_.y;
};

window.onload = function(){
    var game = new Core(960, 640);
    game.fps = 60;
    game.preload("img/background.png");
    game.onload = function(){
        var background = new Sprite(960,640);
        background.image = game.assets["img/background.png"];
        background.x = 0;
        background.y = 0;
        game.rootScene.addChild(background);
        background.addEventListener("enterframe", function(){
            this.x += 0.1;
            this.y += 0.1;
        });
        background.addEventListener("touchend", function(){
            this.x = 0;
            this.y = 0;
            game.addLabel("Game Over", "#000", 0, 200);
        });

    };

    var testAnimal = new Animal(64, 64, "test", Vec2(120, 120), 32, 64);
    testAnimal.speed = Vec2(-0.1,-0.1);

    game.start();
};
