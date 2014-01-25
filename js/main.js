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
    // Particle graphic
    game.preload("img/simpleparticle.png");

    game.onload = function(){

        var background = new Sprite(960,640);
        background.image = game.assets["img/background.png"];
        background.x = 10;
        background.y = 10;
        game.rootScene.addChild(background);
        background.addEventListener("enterframe", function(){
            particleSystem.update();
        });
        background.addEventListener("touchend", function(e){
            initParticle(e.x, e.y);
        });

        // Particle Setting up
        var particleCount = 10;
        var particleSystem = ParticleSystem.createParticleSystem(this.rootScene,
            this.assets["img/simpleparticle.png"],
            32, 32, particleCount);

        function initParticle(p_x, p_y) {
            var particleX = p_x;
            var particleY = p_y;
            for (var i=0;i<particleCount;i++) {
                var moveX = Math.random()*2 - 1;
                var moveY = Math.random()*2 - 1;
                var lifeSpan = Math.random()*10 + 5;
                particleSystem.addParticle(particleX, particleY, 1, 1, moveX, moveY, lifeSpan);
            }
        }
        world.start();
    };

    var testAnimal = new Animal(64, 64, "test", Vec2(120, 120), 32, 64);
    testAnimal.speed = Vec2(-0.1,-0.1);

    game.start();
};
