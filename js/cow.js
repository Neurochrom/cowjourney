
var Cow = Class.create(Animal, {
    initialize : function(pos) {
        Animal.call(64, 64, "img/cow_atlas", pos, 30, 120);
    },

    smell: function(a) {
        if(this.followedObject) {
        }
        else {
            this.followedObject = a;
            while(this.followedObject.groupie)
                this.followedObject = this.followedObject.groupie;
            this.followedObject.groupie = this;
        }
    }
}