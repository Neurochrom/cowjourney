var Beaver = Class.create(Animal, {
    initialize : function(pos) {
        Animal.call(this, 64, 64,
            "beaver",
            9,
            pos, 30, 120);
    },

    smell: function(a) {
        var xxx=2;
    }
});