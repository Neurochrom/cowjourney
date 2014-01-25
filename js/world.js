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
    this.scene = null;

    this.init = function(game){
        this.game = game;
        this.scene = new Scene();
    };

    this.size = new Vec2(getWidth(), getHeight());
    this.animals = [];
    this.obstacles = {};

    this.addAnimal = function(animal){
        this.animals.push(animal);
        this.scene.addChild(animal);
    };
    this.addAnimalsAss = function(ass){
        this.scene.addChild(ass);
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
                this.scene.addChild(sprite);
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
        this.game.preload("img/grass2.png");
        this.game.preload("img/trees_1.png");
        this.game.preload("img/trees_2.png");
        this.game.preload("img/trees_3.png");
        this.game.preload("img/trees_4.png");
        this.game.preload("img/cow_animation.png");
        this.game.preload("img/cow_ass.png");
        this.game.preload("img/cow_animation.png");
        this.game.preload("img/cow_ass.png");
        this.game.preload("img/beaver_animation.png");
        this.game.preload("img/beaver_ass.png");


        for(var i = 0; i < this.preloadStash.length; i++){
            this.game.preload( this.preloadStash[i]);
        }

        world.game.onload = function(){
            world.game.pushScene(scene);
            world.load_level(1);

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
