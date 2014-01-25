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
                var surface = new Surface(field_size.x, field_size.y);
                surface.context.beginPath();
                surface.context.rect(0,0,field_size.x, field_size.y);
                switch(map[i][j]){
                    case 0:
                        surface.context.fillStyle = "#F3A312";
                        break;
                    case 1:
                        surface.context.fillStyle = "#AE3132";
                        break;
                    case 2:
                        surface.context.fillStyle = "#1276FE";
                        break;
                    case 5:
                        surface.context.fillStyle = "#098A8A";
                        break;

                }
                surface.context.fill();
                var sprite = new Sprite(field_size.x, field_size.y);
                sprite.image = surface;
                sprite.pos = field_size.mulV(new Vec2(i,j));
                this.game.rootScene.addChild(sprite);
            }
        }
    };
    this.start = function(){
        var par = new Particle();
        this.game.preload(par.preload);
        this.game.onload = function(){
            world.readMap([
                [0,1,0,0],
                [0,2,0,1],
                [0,1,0,0],
                [0,5,0,0]
            ]);
            //par.init();

            // Add animals here
            var a1 = new Animal(64, 64, "img/cow_atlas.png", new Vec2(120, 120), 60, 320);
            a1.speed = new Vec2(1, 1);

            // A background for touch event handling
            var background = new Entity();
            background.touchstart = function (e) {
                console.log("touchstart " + e.x);
                a1.followedObject = { center: function() { return new Vec2(e.x, e.y); } };
            };
            background.touchend = function (e) {
                console.log("touchend " + e.x);
            };
            background.touchmove = function (e) {
                console.log("touchmove " + e.x);
            };
            background.width = world.size.x;
            background.height = world.size.y;
            background.addEventListener('touchstart', background.touchstart);
            background.addEventListener('touchend', background.touchend);
            background.addEventListener('touchmove', background.touchmove);
            world.game.rootScene.addChild(background);

            //for (var i = 0; i < world.toCallLaterStack.length; i ++){
            //    world.toCallLaterStack[i].toBeCalledLater();
            //}
        };
        this.game.start();
    }
    return this;
})();