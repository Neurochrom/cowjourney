/**
 * Created by Marcin on 26.01.14.
 */
var MainMenu = Class.create(Scene, {
    // The main gameplay scene.
    initialize: function() {
        var game, label, bg, cow, beaver, camp, tick, message;
        var ScreenW = world.size.x;
        var ScreenH = world.size.y;

        // 1 - Call superclass constructor
        Scene.apply(this);
        // 2 - Access to the game singleton instance
        game = Game.instance;

        var scale, sw, sh;
        sw = ScreenW/800;
        sh = ScreenH/600;
        if(sw > sh)
            scale = sh;
        else
            scale = sw;

        label = new Label("Cow journey!");
        label.width = ScreenW;
        label.font = "58px Comic Sans MS";
        label.textAlign = "center";
        label.color = "#FFF";
        label.y = ScreenH/20;
        label.scale(scale);

        message = new Label("Click to begin!");
        message.width = ScreenW;
        message.opacity = 0;
        message.font = "32px Comic Sans MS";
        message.textAlign = "center";
        message.color = "#FFF";
        message.y = 16/20*ScreenH;
        message.scale(scale);

        cow = new Sprite(64, 64);
        cow.image = game.assets["img/cow_animation.png"];
        cow.x = ScreenW/2 - cow.width *0.5;
        cow.y = ScreenH/2 - cow.height*0.5;
        cow.scale(scale);

        beaver = new Sprite(64, 64);
        beaver.image = game.assets["img/beaver_animation.png"];
        beaver.x = ScreenW/2 - beaver.width *0.5;
        beaver.y = ScreenH/2 - beaver.height*0.5;
        beaver.scale(scale);

        camp = new Sprite(64, 64);
        camp.image = game.assets["img/camp.png"];
        camp.x = ScreenW/2 - camp.width *0.5 ;
        camp.y = ScreenH/2 - camp.height*0.5 ;
        camp.scale(scale);

        bg = new Sprite(world.size.x, world.size.y);
        bg.image = game.assets["img/grass2.png"];
        bg.addEventListener(Event.TOUCH_END, function(e)
        {
            world.loadnormalgame();
        });

        tick = 0;
        game.addEventListener(Event.ENTER_FRAME, function()
        {
            cow.x = ScreenW/2 - cow.width *0.5 + scale*100*Math.sin((tick+80)/60);
            cow.y = ScreenH/2 - cow.height*0.5 + scale*100*Math.cos((tick+80)/60);

            beaver.x = ScreenW/2 - beaver.width *0.5 + scale*100*Math.sin(tick/60);
            beaver.y = ScreenH/2 - beaver.height*0.5 + scale*100*Math.cos(tick/60);

            if(tick % 10 == 0)
            {
                cow.frame = (cow.frame + 1) % 10;
                beaver.frame = (beaver.frame + 1) % 10;
            }
            if(tick >= 40)
            {
                message.opacity = (1 - Math.cos( (tick - 40)/ 10)) /2;
            }

            tick++;
        });
        // 4 - Add child nodes
        this.addChild(bg);
        this.addChild(camp);
        this.addChild(label);
        this.addChild(cow);
        this.addChild(beaver);
        this.addChild(message);
    }
});