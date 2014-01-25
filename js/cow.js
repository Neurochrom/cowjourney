
var Cow = Class.create(Animal, {
    initialize : function(pos) {
        Animal.call(this, 64, 64,
            world.game.assets["img/cow_animation.png"],
            world.game.assets["img/cow_ass.png"],
            pos, 30, 120);
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
});