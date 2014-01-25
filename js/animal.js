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
            if((this.followedObject) && (world.isObstacleAt(this.pos.addV(this.speed)))){
                //We might have done it more complex
                this.followedObject = null;
                this.speed = this.speed.mulS(0);
            }
            this.pos = this.pos.addV(this.speed);
            this.speed = this.speed.mulS(this.speed.lengthSqr() > this.rCol ? 0.6 : 0.94);
            if (this.followedObject) {
                if (this.stunned > 0)
                   this.stunned--;
                else {
                var to = this.followedObject.center().subV(this.center());
                to.normalize();
                this.speed = this.speed.addV(to.mulS(0.14));
                //this.speed.normalize();
                }
            } else {
                //this.speed = this.speed.mulS(0);
            }

            this.frame = (this.age + Math.random()*4) % 40  < 4 ? 1 : 0;
        });
        world.addAnimal(this);
    },
    center: function() { return this.pos.addV(new Vec2(this.width*0.5, this.height*0.5)); },
    rCol : 0,
    rSense : 0,
    vel : "x",
    followedObject : null,
    stunned : 0,    // for this many frames the animal will not follow anyone
    type : "cow",
    smell: function(a) {
        this.followedObject = a;
    }

});

var pseudoPhysicalCol = function(a1, a2) {
    if(a1.type != "player_cow") {
        a1.followedObject = null;
        a1.stunned = 60;
    }
    if(a2.type != "player_cow") {
        a2.followedObject = null;
        a2.stunned = 60;
    }

    var to = a1.center().subV(a2.center());
    var n = new Vec2(to.x, to.y);
    n.normalize();

    var m1 = a1.rCol*a1.rCol;
    var m2 = a2.rCol*a2.rCol;

    var pen = to.length() - a1.rCol - a2.rCol;
    pen = 50 + pen*pen;

    var j = n.mulS((m1+m2)*pen*-0.005);
    a1.speed = a1.speed.subV(j.divS(m1*1.3));
    a2.speed = a2.speed.addV(j.divS(m2*1.3));
};

var Player = Class.create(Animal, {
    smell : function(a) {
        var xxx=2;
    }
});



