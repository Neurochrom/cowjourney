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
        for(var i=1; i<world.animals.length; ++i) {
            var a1 = world.animals[i-1];
            var a2 = world.animals[i];

            var rsum = a1.rSense+a2.rSense;
            var to = a2.center().subV(a2.center());

            var smellyPairs = [];
            if (rsum*rsum < to.lengthSqr()) {
                smellyPairs.push([a1, a2]);
            }
        }
    }

    var par = Particle();
    world.start();
 }