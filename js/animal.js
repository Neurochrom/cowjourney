var Animal = Class.create(Sprite, {
    initialize : function(width, height, atlasName, pos, rCol, rSense) {
        Sprite.call(this, width, height);

        this.rCol = rCol;
        this.speed = Vec2(0, 0);

        var surface = new Surface(width, height);


        surface.context.beginPath();
        surface.context.arc(rCol, rCol, rCol, 0, Math.PI * 2);
        surface.context.fillStyle = "#F3A312";
        surface.context.fill();
        this.image = surface;

        this.pos = pos;


        this.addEventListener("enterframe", function(){
            this.pos = this.pos.addV(this.speed);

            this.speed = this.speed.mulS(this.speed.lengthSqr() > this.rCol ? 0.91 : 0.9999995);
        });
        world.add(this);
        this.addEventListener('touchmove', this.moveByUI);
        this.addEventListener('touchend', this.setNewSpeed);
    },
    moveByUI: function(e){
        this.movePrev = this.pos;
        this.speed = new Vec2(0,0);
        var newPos = new Vec2(e.x - this.r, e.y - this.r);
        this.futureSpeed = this.futureSpeed.addV(newPos.subV(this.pos).mulS(TOUCH_INFLUENCE_FACTOR));
        this.pos = newPos;
    },
    setNewSpeed: function(e){
        this.speed = this.futureSpeed;
        this.futureSpeed = new Vec2(0,0);
    },
    rCol : 0,
    rSense : 0,
    speed : Vec2(0,0),
    followedObject : {}
});