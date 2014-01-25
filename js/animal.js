var Animal = Class.create(Sprite, {

    initialize : function(width, height, image, assImage, headOff, pos, rCol, rSense) {
        //alert( " Animal");
        Sprite.call(this, width, height);

        this.rCol = rCol;
        this.rSense = rSense;
        this.speed = new Vec2(0, 0);

        this.image = image;
        this.frame = 0;
        this.pos = pos;

        this.rotationDiv = Math.random() * 10 + 15;
        this.rotationMul = Math.random() * 0.2 + 0.2;

        this.ass = new Sprite(width, height);
        this.ass.image = assImage;
        this.ass.pos = this.pos.addV(new Vec2(0,headOff));
        world.addAnimalsAss(this.ass);
        world.addAnimal(this);


        this.addEventListener("enterframe", function(){
            if(this.followedObject){
                var to_be = this.center().addV(this.speed);
                var to_be = this.center();
                if(world.isObstacleAt(to_be.addV(new Vec2(this.rCol,0)))){
                    if (this.speed.x>0) this.speed.x = 0;
                }
                if(world.isObstacleAt(to_be.addV(new Vec2(0,this.rCol)))){
                    if (this.speed.y>0) this.speed.y = 0;
                }
                if(world.isObstacleAt(to_be.subV(new Vec2(this.rCol,0)))){
                    if (this.speed.x<0) this.speed.x = 0;
                }
                if(world.isObstacleAt(to_be.subV(new Vec2(0,this.rCol)))){
                    if (this.speed.y<0) this.speed.y = 0;
                }
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

            this.frame += (this.age % 5 == 0) ? 1 : 0;
            if(this.frame > 10) this.frame = 0;
            this.ass.pos = this.pos.subV(this.speed.mulV(this.speed.mulV(this.speed)))
                               .addV(new Vec2(0,headOff));
            this.rotate((Math.sin(this.age/this.rotationDiv - this.rotationDiv / 2)*this.rotationMul));
            var tmp = this.speed.length();
            this.ass.rotate(0.2 * Math.sin(tmp * this.age * 10));

        });
    },
    ass : null,

    center: function() {
        return this.pos.addV(new Vec2(this.width*0.5, this.height*0.5));
    },

    rCol : 0,
    rSense : 0,
    vel : "x",
    followedObject : null,
    stunned : 0,    // for this many frames the animal will not follow anyone
    type : "cow",
    groupie: null,
    smell: function(a) {
    }
});

world.smell = function() {
    // O(n^2) - slow as shit quick solution
    for(var i=0; i<this.animals.length; ++i) {

        var a1 = this.animals[i];
        for (var j=0; j<this.animals.length; ++j) {
            if (j==i)
                continue;

            var a2 = this.animals[j];

            var to = a2.center().subV(a1.center());
            if (to.lengthSqr() < a2.rSense*a2.rSense) {
                a2.smell(a1);
            }
        }
    }
}

world.findCollidingPairs = function() {
    // O(n^2) - slow as shit quick solution
    var colliding = [];
    for(var i=0; i<world.animals.length; ++i) {
        var a1 = world.animals[i];
        for (var j=0; j<world.animals.length; ++j) {
            if (j==i)
                continue;
            var a2 = world.animals[j];
            var to = a2.center().subV(a1.center());
            var rSum = a1.rCol + a2.rCol;
            if (to.lengthSqr() < rSum*rSum) {
                colliding.push([a1, a2]);
            }
        }
    }

    return colliding;
};

world.resolveCollisions = function(colliding) {
    for (var i=0; i<colliding.length; ++i) {
        var a1 = colliding[i][0];
        var a2 = colliding[i][1];
        pseudoPhysicalCol(a1,a2);
    }
};

var stun = function(a1) {
    if(a1.type != "player_cow") {
        //a1.followedObject = null;
        if(a1.followedObject.type == "player_cow")
            a1.stunned = 60;
        else
            a1.stunned = 10;
    }
}
var pseudoPhysicalCol = function(a1, a2) {
    stun(a1);
    stun(a2);

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




