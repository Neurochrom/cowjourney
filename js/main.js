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

    world.smell = function() {

        // O(n^2) - slow as shit quick solution
        for(var i=0; i<world.animals.length; ++i) {
            var a1 = world.animals[i];
            for (var j=0; j<world.animals.length; ++j) {
                if (j==i)
                    continue;
                var a2 = world.animals[j];
                var to = a2.center().subV(a1.center());
                if (to.lengthSqr() < a2.rSense*a2.rSense) {
                    a2.smell(a1);
                }
            }
        }
    }

    var par = Particle();
    world.start();
 }