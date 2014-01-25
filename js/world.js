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
        var maps_size = new Vec2(map.length, map[0].length);
        var field_size = this.size.divV(maps_size);
        for(var i = 0; i < map.length; i++){
            this.obstacles[i] = [];
            for(var j = 0; j < map[i].length; j++){
                var color;
                switch(map[i][j]){
                    case 0:
                        continue;
                        break;
                    case 1:
                        color = "#AE3132";
                        break;
                    case 2:
                        color = "#1276FE";
                        break;
                    case 5:
                        color = "#098A8A";
                        break;
                }
                var surface = new Surface(field_size.x, field_size.y);
                surface.context.beginPath();
                surface.context.fillStyle = color;
                surface.context.rect(0,0,field_size.x, field_size.y);
                surface.context.fill();
                var sprite = new Sprite(field_size.x, field_size.y);
                sprite.image = surface;
                sprite.pos = field_size.mulV(new Vec2(i,j));
                this.game.rootScene.addChild(sprite);

            }
        }
    };
    this.par;
    this.start = function(){
        this.par = new Particle();
        this.game.preload(this.par.preload);
        this.game.preload("img/cow_atlas.png");

        world.game.onload = function(){
            // temp adding of animals here
            var a1 = new Animal(64, 64, world.game.assets["img/cow_atlas.png"], new Vec2(30, 30), 60, 320);
            a1.speed = new Vec2(1, 1);

            // A background for touch event handling
            var background = new Entity();
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

                world.readMap([
                    [0,1,0,0],
                    [0,0,0,1],
                    [0,1,0,2],
                    [0,5,0,0]
                ]);
            world.par.init();

        };
        this.game.start();
    }
    return this;
})();