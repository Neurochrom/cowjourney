var animalId = 0;

var Animal = Class.create(Sprite, {
    initialize : function(width, height, type, headOff, pos, rCol, rSense, scale) {
        //alert( " Animal");
        Sprite.call(this, width, height);
        this.id = animalId++;
        this.type = type;

        this.rCol = rCol * scale.x; // hope it will work
        this.rSense = rSense * scale.x; // hope it will work
        this.speed = new Vec2(0, 0);

        var image = world.game.assets["img/"+type+"_animation.png"];

        this.scaleV = scale;
        this.image = image;
        this.frame = 0;
        this.pos = pos;

        this.rotationDiv = Math.random() * 10 + 15;
        this.rotationMul = Math.random() * 0.2 + 0.2;

        var assImage = world.game.assets["img/"+type+"_ass.png"];
        this.ass = new Sprite(width, height);
        this.ass.image = assImage;
        this.ass.pos = this.pos.addV(new Vec2(0,this.headOff));
        world.addAnimal(this, this.ass);

        this.scale(scale.x, scale.y);
        this.ass.scale(scale.x, scale.y);

        this.addEventListener("enterframe", function(){
            if(this.bleed) {
                if(this.age % 22 == 5)
                world.par.blood(this.pos);
                if(this.age % 50)
                    world.music.play(g_SoundEffect.Blood);
            }

            if(true){
                var to_be = this.center();

                if(world.isObstacleAt(to_be.addV(new Vec2(this.rCol * this.scaleV.x,0)))){
                    if (this.speed.x>0) this.speed.x = 0;
                }
                if(world.isObstacleAt(to_be.addV(new Vec2(0,this.rCol * this.scaleV.y)))){
                    if (this.speed.y>0) this.speed.y = 0;
                }
                if(world.isObstacleAt(to_be.subV(new Vec2(this.rCol * this.scaleV.x,0)))){
                    if (this.speed.x<0) this.speed.x = 0;
                }
                if(world.isObstacleAt(to_be.subV(new Vec2(0,this.rCol * this.scaleV.y)))){
                    if (this.speed.y<0) this.speed.y = 0;
                }
            }
            this.pos = this.pos.addV(this.speed.mulV(this.scaleV));
            this.speed = this.speed.mulS(this.speed.lengthSqr() > this.rCol ? 0.6 : 0.96);
            if (this.followedObject) {
                if (this.stunned > 0)
                   this.stunned--;
                else {
                    var to = this.followedObject.center().subV(this.center());
                    to.normalize();
                    this.speed = this.speed.addV(to.mulS(0.1));
                    //this.speed.normalize();
                }

                var tov = this.followedObject.center().subV(this.center());
                if ( (tov.lengthSqr() > this.rSense*this.rSense*1.9) && 'type' in this.followedObject) {
                    if (this.followedObject.groupie == this)
                        this.followedObject.groupie = null;
                    this.followedObject = null;
                }

            } else {
                //this.speed = this.speed.mulS(0);
            }

            this.frame += (this.age % 5 == 0) ? 1 : 0;
            if(this.frame > 10) this.frame = 0;
            this.ass.pos = this.pos.subV(this.speed.mulV(this.speed.mulV(this.speed)).mulV(this.scaleV))
                               .addV(new Vec2(0,this.headOff * this.scaleV.y));
            this.rotate((Math.sin(this.age/this.rotationDiv - this.rotationDiv / 2)*this.rotationMul));
            var tmp = this.speed.length();
            this.ass.rotate(0.2 * Math.sin(tmp * this.age * 10));

            if (this.dead) {
                this.speed = this.speed.mulS(0);
                this._rotation = 180;
                this.frame = 4;
                return;
            }

        });
    },
    ass : null,
    scaleV : new Vec2(1,1),

    center: function() {
        return this.pos.addV(new Vec2(this.width*0.5, this.height*0.5).mulV(this.scaleV));
    },

    rCol : 0,
    rSense : 0,
    headOff : 16,
    followedObject : null,
    stunned : 0,    // for this many frames the animal will not follow anyone
    type : "",
    id : 0,
    isPlayer : 0,
    groupie : null,

    smell : function(a) {
    },

    onColidedWith : function(a) {
        stun(this);
    },

    bleed : 0,
    dead : 0,

    onDie : function() {
        this.dead = 1;
        this.bleed = 1;
        //world.par.slaughter(this.pos);
        this.headOff = -4;

        if(this.isPlayer)
            world.game.replaceScene(new GameOver());
    },


    attachAnimal : function(a) {
        this.followedObject = a;
        var limit = 0;
        while(this.followedObject.groupie && this.followedObject.groupie != a) {
            this.followedObject = this.followedObject.groupie;
            if (++limit > 14) {
                console.log("damn attach");
                break;
            }
        }
        this.followedObject.groupie = this;
    },

    detachAnimal : function() {
        //console.log("detatch start id " + this.id );
        if (this.followedObject && this.followedObject.groupie==this) {
            //console.log("detatch groupie foll.id " + this.followedObject.id );
            this.followedObject.groupie = null;
        }
        this.followedObject = null;
        //console.log("detatch end");
    },

    herd: function() {
        var h = [];
        var f = this.followedObject;
        while (f && f!=this) {
            h.push(f);
            f = f.followedObject;
        }
        var g = this.groupie;
        while (g && g!=this) {
            h.push(g);
            g = g.groupie;
        }
        return h;
    },

    groupSize : function() {
        var i = 1;
        var g = this.groupie;
        while (g && g!=this) {
            ++i;
            g = g.groupie;
            if(i>14)
               return 15;
        }
        var f = this.followedObject;
        while (f && f!=this && 'type' in f) {
            ++i;
            f = f.followedObject;
            if(i>14)
                return 15;
        }
        return i;
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
    if(!a1.isPlayer) {
        a1.stunned = 20;
    }
}

var pseudoPhysicalCol = function(a1, a2) {
    a1.onColidedWith(a2);
    a2.onColidedWith(a1);

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
