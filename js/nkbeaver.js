// A non conformist beaver

var NKBeaver = Class.create(Animal, {
    initialize : function(pos, scale) {
        Animal.call(this, 64, 64,
            "nkbeaver",
            9,
            pos, 30, 190, scale);
    },

    smell: function(a) {
        if (a.type == "cow") {
            var herd = a.herd();
            for (var i=0; i<herd.length; ++i) {
                if (herd[i].type == "beaver") {
                    this.followedObject = herd[i];
                }
            }
        }
    },
    onColidedWith : function(a) {
        if (a.type == "cow") {
            if (this.followedObject && this.followedObject.type != "beaver")
                a.onDie();
        }
    }
});