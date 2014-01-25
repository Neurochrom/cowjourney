var Player = Class.create(Cow, {
    initialize : function(pos) {
        //alert( " Player");
        Cow.call(this, pos);
        this.isPlayer = 1;
    },

    smell : function(a) {
        var xxx=2;
    }
});
