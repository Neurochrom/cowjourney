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
    var game = new Core(world.size.x, world.size.y);
    game.fps = 60;
    game.preload("img/cow_atlas.png");

    world.init(game);

    var par = Particle();
    world.start();
 }
