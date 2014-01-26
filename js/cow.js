var Cow = Class.create(Animal, {
    initialize : function(pos, scale) {
        Animal.call(this, 64, 64,
            "cow",
            18,
            pos, 30, 120, scale);
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

            var col = Math.floor(Math.random() * 5);
            var color = "#FFF";
            switch(col){
                case 0: color = "#AEAEAE"; break;
                case 1: color = "#7EAE9E"; break;
                case 2: color = "#FEFEAE"; break;
                case 3: color = "#FFAEFF"; break;
                case 4: color = "#AA82FF"; break;
            }
            AddMessage("moo!", this.pos, this.pos.addV(new Vec2(Math.random() * 200 - 50, Math.random() * 200 - 50)), 80, color);
        }
        //console.log("end smell");
    }
});
