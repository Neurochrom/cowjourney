function getWidth(){
    var xWidth = null;
    if(window.screen != null)
        xWidth = window.screen.availWidth;

    if(window.innerWidth != null)
        xWidth = window.innerWidth;

    if(document.body != null)
        xWidth = document.body.clientWidth;

    return xWidth;
}
function getHeight(){
    var xHeight = null;
    if(window.screen != null)
        xHeight = window.screen.availHeight;

    if(window.innerHeight != null)
        xHeight =   window.innerHeight;

    if(document.body != null)
        xHeight = document.body.clientHeight;

    return xHeight;
}


var world = (function(){
    this.game = null;
    this.init = function(game){
        this.game = game;
    };
    this.size = new Vec2(getWidth(), getHeight());
    this.animals = [];
    this.obstacles = [];
    this.addAnimal = function(animal){
        this.animals.push(animal);
        this.game.rootScene.addChild(animal);
    };
    this.readMap = function(map){
        var maps_size = new Vec2(map[0].length, map.length);
        var field_size = this.size.divV(maps_size);
        for(var i = 0; i < map.length; i++){
            this.obstacles[i] = [];
            for(var j = 0; j < map[i].length; j++){
                var path;
                switch(map[i][j]){
                    case 0:
                        continue;
                        break;
                    case 1:
                        path = 'trees_1.png'
                        break;
                    case 2:
                        path = 'trees_2.png'
                        break;
                    case 3:
                        path = 'trees_3.png'
                        break;
                    case 4:
                        path = 'trees_4.png'
                        break;
                }
                var sprite = new Sprite(field_size.x, field_size.y);
                sprite.image = world.game.assets['img/' + path];
                sprite.width = field_size.x;
                sprite.height = field_size.y;
                sprite.pos = field_size.mulV(new Vec2(j,i));
                this.game.rootScene.addChild(sprite);

            }
        }
    };
    this.par;
    this.start = function(){
        this.par = new Particle();
        this.game.preload(this.par.preload);
        this.game.preload("img/cow_atlas.png");
        this.game.preload("img/grass2.png");
        this.game.preload("img/trees_1.png");
        this.game.preload("img/trees_2.png");
        this.game.preload("img/trees_3.png");
        this.game.preload("img/trees_4.png");

        world.game.onload = function(){
            // temp adding of animals here

            // A background for touch event handling
            var background = new Sprite(world.size.x, world.size.y);
            background.image = world.game.assets["img/grass2.png"];
            background.addEventListener('touchstart', function(e) {
                world.par.blood(new Vec2(e.x-12, e.y-12));
                a1.followedObject = { center: function() { return new Vec2(e.x, e.y); } };
            });
            background.addEventListener("enterframe", function(){
                ParticleSystem.update();
            });
            background.width = world.size.x;
            background.height = world.size.y;
            world.game.rootScene.addChild(background);
            var a1 = new Animal(64, 64, world.game.assets["img/cow_atlas.png"], new Vec2(30, 30), 60, 320);
            a1.speed = new Vec2(1, 1);

                world.readMap([
                    [0,0,0,0,0,0,0],
                    [0,3,4,4,2,0,0],
                    [0,0,0,0,0,0,1],
                    [0,1,0,0,1,0,0]
                ]);
            world.par.init();

        };
        this.game.start();
    }
    return this;
})();