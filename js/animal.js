var Animal = Class.create(Sprite, {
    initialize : function(width, height, atlasName, pos, rCol, rSense) {
        Sprite.call(this, width, height);

        this.rCol = rCol;
        this.rSense = rSense;
        this.speed = new Vec2(0, 0);

        var surface = new Surface(width, height);
        surface.context.beginPath();
        surface.context.arc(rCol, rCol, rCol, 0, Math.PI * 2);
        surface.context.fillStyle = "#FF1133";
        surface.context.fill();
        this.image = surface;

        this.pos = pos;

        this.addEventListener("enterframe", function(){
            this.pos = this.pos.addV(this.speed);
            //this.speed = this.speed.mulS(this.speed.lengthSqr() > this.rCol ? 0.91 : 0.9999995);
            if (this.followedObject) {
                this.speed = this.followedObject.center().subV(this.pos);
                this.speed.normalize();
            } else {
                this.speed = this.speed.mulS(0);
            }
        });
        world.addAnimal(this);
    },
    rCol : 0,
    rSense : 0,
    vel : "x",
    followedObject : null
});



