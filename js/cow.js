
var Cow = Class.create(Animal, {
    initialize : function(pos) {
        Animal.call(this, 64, 64,
            "cow",
            18,
            pos, 30, 120);
    },

    smell: function (a) {
        var limit = 0;
        if (this.followedObject) {
            var head = this.followedObject;
            while (head && head != this) {
                if ('isPlayer' in head && head.isPlayer)
                    return;
                if ( !( 'followedObject' in head) )
                    return;
                head = head.followedObject;
                if (++limit > 14) {
                    console.log("damn1");
                    break;
                }
            }
            this.detachAnimal();
        }
        else {
            this.followedObject = a;
            limit = 0;
            while(this.followedObject.groupie && this.followedObject.groupie != a) {
                this.followedObject = this.followedObject.groupie;
                if (++limit > 14) {
                    console.log("damn2");
                    break;
                }
            }
            this.followedObject.groupie = this;
        }
        //console.log("end smell");
    }
});