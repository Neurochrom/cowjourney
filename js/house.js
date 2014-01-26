var House = Class.create(Sprite, {
    initialize : function(pos, scale) {
        Sprite.call(this, 64, 64);

        this.rSense = 100 * scale.x;

        this.image = world.game.assets["img/house.png"];
        this.pos = pos;

        this.scale(scale.x, scale.y);
        world.addAnimal(this, null); // I know, right? :P
    },

    center: function() {
        return this.pos.addV(new Vec2(this.width*0.5, this.height*0.5));
    },

    rCol : 0,
    rSense : 0,

    smell: function(a) {
        if (a.isPlayer) {
            world.next_level();
        }
    }



    // initialize : function(width, height, type, headOff, pos, rCol, rSense, scale) {
    //     //alert( " Animal");
    //     Sprite.call(this, width, height);
    //     this.id = animalId++;
    //     this.type = type;

    //     this.rCol = rCol;
    //     this.rSense = rSense;
    //     this.speed = new Vec2(0, 0);

    //     var image = world.game.assets["img/"+type+"_animation.png"];

    //     this.image = image;
    //     this.frame = 0;
    //     this.pos = pos;

    //     this.rotationDiv = Math.random() * 10 + 15;
    //     this.rotationMul = Math.random() * 0.2 + 0.2;

    //     var assImage = world.game.assets["img/"+type+"_ass.png"];
    //     this.ass = new Sprite(width, height);
    //     this.ass.image = assImage;
    //     this.ass.pos = this.pos.addV(new Vec2(0,this.headOff));
    //     world.addAnimal(this, this.ass);

    //     this.scale(scale.x, scale.y);
    //     this.ass.scale(scale.x, scale.y);

    //     this.addEventListener("enterframe", function(){
    //         if(this.bleed) {
    //             world.par.blood(this.pos);
    //         }

    //         if(this.followedObject){
    //             var to_be = this.center().addV(this.speed);

    //             if(world.isObstacleAt(to_be.addV(new Vec2(this.rCol,0)))){
    //                 if (this.speed.x>0) this.speed.x = 0;
    //             }
    //             if(world.isObstacleAt(to_be.addV(new Vec2(0,this.rCol)))){
    //                 if (this.speed.y>0) this.speed.y = 0;
    //             }
    //             if(world.isObstacleAt(to_be.subV(new Vec2(this.rCol,0)))){
    //                 if (this.speed.x<0) this.speed.x = 0;
    //             }
    //             if(world.isObstacleAt(to_be.subV(new Vec2(0,this.rCol)))){
    //                 if (this.speed.y<0) this.speed.y = 0;
    //             }
    //         }
    //         this.pos = this.pos.addV(this.speed);
    //         this.speed = this.speed.mulS(this.speed.lengthSqr() > this.rCol ? 0.6 : 0.96);
    //         if (this.followedObject) {
    //             if (this.stunned > 0)
    //                this.stunned--;
    //             else {
    //                 var to = this.followedObject.center().subV(this.center());
    //                 to.normalize();
    //                 this.speed = this.speed.addV(to.mulS(0.1));
    //                 //this.speed.normalize();
    //             }

    //             var tov = this.followedObject.center().subV(this.center());
    //             if ( (tov.lengthSqr() > this.rSense*this.rSense*1.5) && 'type' in this.followedObject) {
    //                 if (this.followedObject.groupie == this)
    //                     this.followedObject.groupie = null;
    //                 this.followedObject = null;
    //             }

    //         } else {
    //             //this.speed = this.speed.mulS(0);
    //         }

    //         this.frame += (this.age % 5 == 0) ? 1 : 0;
    //         if(this.frame > 10) this.frame = 0;
    //         this.ass.pos = this.pos.subV(this.speed.mulV(this.speed.mulV(this.speed)))
    //                            .addV(new Vec2(0,this.headOff));
    //         this.rotate((Math.sin(this.age/this.rotationDiv - this.rotationDiv / 2)*this.rotationMul));
    //         var tmp = this.speed.length();
    //         this.ass.rotate(0.2 * Math.sin(tmp * this.age * 10));

    //         if (this.dead) {
    //             this.speed = this.speed.mulS(0);
    //             this._rotation = 180;
    //             this.frame = 4;
    //             return;
    //         }

    //     });
    // },
    // ass : null,

    // center: function() {
    //     return this.pos.addV(new Vec2(this.width*0.5, this.height*0.5));
    // },

    // rCol : 0,
    // rSense : 0,
    // headOff : 16,
    // followedObject : null,
    // stunned : 0,    // for this many frames the animal will not follow anyone
    // type : "",
    // id : 0,
    // isPlayer : 0,
    // groupie : null,
    // smell : function(a) {
    // },
    // onColidedWith : function(a) {
    //     stun(this);
    // },
    // bleed : 0,
    // dead : 0,
    // onDie : function() {
    //     this.dead = 1;
    //     this.bleed = 1;
    //     //world.par.slaughter(this.pos);
    //     this.headOff = -4;
    // },
    // detachAnimal : function() {
    //     //console.log("detatch start id " + this.id );
    //     if (this.followedObject && this.followedObject.groupie==this) {
    //         //console.log("detatch groupie foll.id " + this.followedObject.id );
    //         this.followedObject.groupie = null;
    //     }
    //     this.followedObject = null;
    //     //console.log("detatch end");
    // }

});