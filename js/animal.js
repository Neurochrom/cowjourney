var Animal = Class.create(Sprite, {

    initialize : function(width, height, image, pos, rCol, rSense) {
        Sprite.call(this, width, height);

        this.rCol = rCol;
        this.rSense = rSense;
        this.speed = new Vec2(0, 0);
        /*
        var surface = new Surface(width, height);
        surface.context.beginPath();
        surface.context.arc(rCol, rCol, rCol, 0, Math.PI * 2);
        surface.context.fillStyle = "#FF1133";
        surface.context.fill();
        this.image = surface;
        */
        this.image = image;
        this.frame = 0;
        this.pos = pos;

        this.addEventListener("enterframe", function(){
            if(this.followedObject){
                var to_be = this.center().addV(this.speed);
                var to_be = this.center();
                if(world.isObstacleAt(to_be.addV(new Vec2(this.rCol,0)))){
                    this.speed.x = 0;
                }
                if(world.isObstacleAt(to_be.addV(new Vec2(0,this.rCol)))){
                    this.speed.y = 0;
                }
                if(world.isObstacleAt(to_be.subV(new Vec2(this.rCol,0)))){
                    this.speed.x = 0;
                }
                if(world.isObstacleAt(to_be.subV(new Vec2(0,this.rCol)))){
                    this.speed.y = 0;
                }
            }
            this.pos = this.pos.addV(this.speed);
            //this.speed = this.speed.mulS(this.speed.lengthSqr() > this.rCol ? 0.91 : 0.9999995);
            if (this.followedObject) {
                this.speed = this.followedObject.center().subV(this.pos.addV(new Vec2(this.width*0.5, this.height*0.5)));
                this.speed.normalize();
            } else {
                this.speed = this.speed.mulS(0);
            }

            this.frame = (this.age + Math.random()*4) % 40  < 4 ? 1 : 0;
        });
        world.addAnimal(this);
    },

    center: function() {
        return this.pos.addV(new Vec2(this.width*0.5, this.height*0.5));
    },

    rCol : 0,
    rSense : 0,
    vel : "x",
    followedObject : null,
    type : "cow",

    smell: function(a) {
        this.followedObject = a;
    }
});

var Player = Class.create(Animal, {
    smell : function(a) {
        var xxx=2;
    }
});
