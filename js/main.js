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
    // Particle graphic
    world.init(game);

    // temp adding of animals here
    var a1 = new Animal(64, 64, "atlas", new Vec2(120, 120), 60, 320);
    a1.speed = new Vec2(1, 1);

    world.start();
 }