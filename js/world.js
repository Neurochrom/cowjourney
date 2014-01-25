function getWidth(){
    xWidth = null;
    if(window.screen != null)
        xWidth = window.screen.availWidth;

    if(window.innerWidth != null)
        xWidth = window.innerWidth;

    if(document.body != null)
        xWidth = document.body.clientWidth;

    return xWidth;
}
function getHeight(){
    xHeight = null;
    if(window.screen != null)
        xHeight = window.screen.availHeight;

    if(window.innerHeight != null)
        xHeight =   window.innerHeight;

    if(document.body != null)
        xHeight = document.body.clientHeight;

    return xHeight;
}


var world = (function(){
    this.init = function(game){
        this.game = game;
    };
    this.game = null;
    this.size = new Vec2(getWidth(), getHeight());
    this.animals = [];
    this.addAnimal = function(animal){
        this.animals.push(animal);
        this.game.rootScene.addChild(animal);
    };
    this.readMap = function(map){

        for(var x = 0; x < map.length; x ++){
            for(var y = 0; y < map[x].length; y++){
                var surface = new Surface(2*r, 2*r);
                surface.context.beginPath();
                surface.context.fillRect(0,1,2,3)
                surface.context.fillStyle = "#F3A312";
                var sprite = new Sprite();
                this.image = surface;


            }



        }


    };
    this.start = function(){
        this.readMap([
            [0,1,0,0],
            [0,2,0,0],
            [0,1,0,0],
            [0,5,0,0]
        ]);
        game.start();
    }
    return this;
})();