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
    this.obstacles = {};

    this.addAnimal = function(animal){
        this.animals.push(animal);
        this.game.rootScene.addChild(animal);
    };

    this.isObstacleAt = function(pos){
        var p = pos.divV(this.field_size);
        if(this.obstacles[Math.floor(p.y)] && this.obstacles[Math.floor(p.y)][Math.floor(p.x)])
                return true;

        return false;
    };

    this.field_size = null;

    this.readMap = function(map){
        var maps_size = new Vec2(map[0].length, map.length);
        this.field_size = this.size.divV(maps_size);

        for(var i = 0; i < map.length; i++){
            this.obstacles[i] = {};

            for(var j = 0; j < map[i].length; j++){

                var path;
                switch(map[i][j]){
                    case 0:
                        continue;
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

                var img = world.game.assets['img/' + path];
                var sprite = new Sprite(img.width, img.height);
                sprite.image = img;
                
                var padding = 0.02;
                var paddedField = this.field_size.mulS(1 + padding * 2);

                sprite.scale(paddedField.x / img.width, paddedField.y / img.height);
                sprite.pos = this.field_size.mulV(new Vec2(j * (1 - padding),i * (1 - padding)));

                this.obstacles[i][j] = sprite;
                this.game.rootScene.addChild(sprite);
            }
        }
    };

    this.par = null;
    this.music = null;
    this.onStartStash = [];
    this.registerOnGameStart = function(param, item){
        this.onStartStash.push({fun: item, par: param});
    }

    this.onUpdateStash = [];
    this.registerOnUpdate = function(param, item){
        this.onUpdateStash.push({fun: item, par: param});
    }


    this.onClickStash = [];
    this.registerOnClick = function(param, item){
        this.onClickStash.push({fun: item, par: param});
    }

    this.preloadStash = [];
    this.registerPreload = function(item){
        this.preloadStash.push(item);
    }


    this.start = function(){
        this.par   = new Particle();
        this.music = new Music();

        this.game.preload(this.par.preload);
        this.game.preload(this.music.preload);
        this.game.preload("img/cow_atlas.png");
        this.game.preload("img/grass2.png");
        this.game.preload("img/trees_1.png");
        this.game.preload("img/trees_2.png");
        this.game.preload("img/trees_3.png");
        this.game.preload("img/trees_4.png");

        for(var i = 0; i < this.preloadStash.length; i++){
            this.game.preload( this.preloadStash[i]);
        }

        world.game.onload = function(){
            // temp adding of animals here

            // A background for touch event handling
            var background = new Sprite(world.size.x, world.size.y);
            background.image = world.game.assets["img/grass2.png"];
            background.addEventListener('touchstart', function(e) {
                world.par.blood(new Vec2(e.x-12, e.y-12));
                a1.followedObject = { center: function() { return new Vec2(e.x, e.y); } };
                for(var i = 0; i < world.onClickStash.length; i++){
                    world.onClickStash[i].fun(e, world.onClickStash[i].par);
                }

                //music.play(g_SoundEffect.Cow);
            });

            background.addEventListener("enterframe", function(){
                ParticleSystem.update();
                // music.update();
                world.smell();
                world.resolveCollisions(world.findCollidingPairs());
                for(var i = 0; i < world.onUpdateStash.length; i++){
                    world.onUpdateStash[i].fun(world.onUpdateStash[i].par);
                }
            });

            background.width = world.size.x;
            background.height = world.size.y;

            world.game.rootScene.addChild(background);

            var a1 = new Player(64, 64, world.game.assets["img/cow_atlas.png"], new Vec2(30, 30), 30, 120);
            a1.type = "player_cow";
            var a2 = new Animal(64, 64, world.game.assets["img/cow_atlas.png"], new Vec2(30, 230), 30, 120);
            var a3 = new Animal(64, 64, world.game.assets["img/cow_atlas.png"], new Vec2(40, 410), 30, 120);
            var a4 = new Animal(64, 64, world.game.assets["img/cow_atlas.png"], new Vec2(240, 410), 30, 120);

            world.readMap([
                    [0,0,0,0,0,0,0],
                    [0,3,4,4,2,0,0],
                    [0,0,0,0,0,0,1],
                    [0,1,0,0,1,0,0]
                ]);
            world.par.init();
            //world.music.init();

            for(var i = 0; i < world.onStartStash.length; i++){
                world.onStartStash[i].fun(world.onStartStash[i].par);
            }
        };
        this.game.start();
    }
    return this;
})();
