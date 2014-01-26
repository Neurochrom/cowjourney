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
        xHeight = window.innerHeight;

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

                var path = null;
                switch(map[i][j]){
                    case 0:                          continue;
                    case 1:   path = 'camp.png'    ;    break;
                    case 2:   path = 'wood_l.png'  ;    break;
                    case 3:   path = 'wood_u.png'  ;    break;
                    case 4:   path = 'wood_rd.png' ;    break;
                    case 5:   path = 'wood_r.png'  ;    break;
                    case 6:   path = 'wood_w.png'  ;    break;
                    case 7:   path = 'wood_ld.png' ;    break;
                    case 8:   path = 'wood_cu.png' ;    break;
                    case 9:   path = 'wood_d.png'  ;    break;
                    case 10:  path = 'wood_ru.png' ;    break;
                    case 11:  path = 'wood_h.png'  ;    break;
                    case 12:  path = 'wood_cl.png' ;    break;
                    case 13:  path = 'wood_lu.png' ;    break;
                    case 14:  path = 'wood_cd.png' ;    break;
                    case 15:  path = 'wood_cr.png' ;    break;
                    case 16:  path = 'wood_c.png'  ;    break;
                    case 17:  path = 'house.png'   ;    break;
                    case 20:  new Player ( this.field_size.mulV( new Vec2(j, i)) ); continue;
                    case 30:  new Cow    ( this.field_size.mulV( new Vec2(j, i)) ); continue;
                    case 40:  new Beaver ( this.field_size.mulV( new Vec2(j, i)) ); continue;
                }

                var img = world.game.assets['img/' + path];
                var sprite = new Sprite(img.width, img.height);
                sprite.image = img;

                var newscale = new Vec2(this.field_size.x/ img.width, this.field_size.y/ img.height);
                sprite.scale(newscale.x, newscale.y);
                var diffScale = new Vec2((newscale.x*img.width - img.width) / 2,
                                         (newscale.y*img.height - img.height) / 2);
                sprite.pos = this.field_size.mulV(new Vec2(j, i)).addV(diffScale);

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
        this.game.preload("img/brick.png");
        this.game.preload("img/camp.png");
        this.game.preload("img/house.png");
        this.game.preload("img/wood.png");
        this.game.preload("img/wood_c.png");
        this.game.preload("img/wood_cd.png");
        this.game.preload("img/wood_cl.png");
        this.game.preload("img/wood_cr.png");
        this.game.preload("img/wood_cu.png");
        this.game.preload("img/wood_d.png");
        this.game.preload("img/wood_h.png");
        this.game.preload("img/wood_l.png");
        this.game.preload("img/wood_ld.png");
        this.game.preload("img/wood_lu.png");
        this.game.preload("img/wood_r.png");
        this.game.preload("img/wood_rd.png");
        this.game.preload("img/wood_ru.png");
        this.game.preload("img/wood_u.png");
        this.game.preload("img/wood_w.png");
        this.game.preload("img/cow_animation.png");
        this.game.preload("img/cow_ass.png");
        this.game.preload("img/beaver_animation.png");
        this.game.preload("img/beaver_ass.png");


        for(var i = 0; i < this.preloadStash.length; i++){
            this.game.preload( this.preloadStash[i]);
        }

        this.loadnormalgame = function (){
            world.game.pushScene(scene);
            world.load_level(1);
            world.par.init();
            for(var i = 0; i < world.onStartStash.length; i++){
                world.onStartStash[i].fun(world.onStartStash[i].par);
            }
        }

        world.game.onload = function(){
            var mainmenu = new MainMenu();
            world.game.pushScene(mainmenu);
            // moved to this.loadnormalgame

        };
        this.game.start();
    }
    return this;
})();
