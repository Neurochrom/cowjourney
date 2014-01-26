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
    },

    onColidedWith : function(a) {}
});
