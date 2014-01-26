var Beaver = Class.create(Animal, {
    initialize : function(pos, scale) {
        Animal.call(this, 64, 64,
            "beaver",
            9,
            pos, 30, 190, scale);
    },

    smell: function(a) {
        if (a.type == "cow") {
            this.followedObject = a;
        }
    },
    onColidedWith : function(a) {
        if (a.type == "cow")
            a.onDie();
    }
});