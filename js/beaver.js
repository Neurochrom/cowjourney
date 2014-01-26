var Beaver = Class.create(Animal, {
    initialize : function(pos, scale) {
        Animal.call(this, 64, 64,
            "beaver",
            9,
            pos, 30, 190, scale);
        this.cowFriendly = 0;
    },

    cowFriendly : 0,

    smell: function(a) {
        if (a.type == "cow" && !this.cowFriendly) {
            if (a.groupSize() > this.groupSize()) {
                this.detachAnimal();

                //this.attachAnimal(a);  // why this is a bug??
                this.followedObject = a; //.groupie;

                this.cowFriendly = 1;
            }
            else {
                this.followedObject = a;
            }
        }
    },
    
    onColidedWith : function(a) {
        if (a.type == "cow" && !this.cowFriendly)
            a.onDie();
    }
});
