var Player = Class.create(Cow, {
    initialize : function(pos, scale) {
        //alert( " Player");
        Cow.call(this, pos, scale);
        this.isPlayer = 1;
        world.player = this;
    },

    smell : function(a) {
        var xxx=2;
    },

    score: 0
});
