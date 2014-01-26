var GameWon = Class.create(Scene, {
    initialize: function() {
        var game, label, bg, cow, beaver, camp, tick, score, message;
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

        label = new Label("Ccngratulations! You won the game!");
        label.width = ScreenW;
        label.font = "58px Comic Sans MS";
        label.textAlign = "center";
        label.color = "#2F2";
        label.y = ScreenH/20;
        label.scale(scale);

        score = new Label("Your score: " + world.player.score);
        score.width = ScreenW;
        score.font = "32px Comic Sans MS";
        score.textAlign = "center";
        score.color = "#55F";
        score.y = 3/20*ScreenH;
        score.scale(scale);

        message = new Label("Click to play again");
        message.width = ScreenW;
        message.opacity = 0;
        message.font = "32px Comic Sans MS";
        message.textAlign = "center";
        message.color = "#FFF";
        message.y = 16/20*ScreenH;
        message.scale(scale);

        cow = new Sprite(64, 64);
        cow.image = game.assets["img/cow_animation.png"];
        cow.x = ScreenW/2;
        cow.y = ScreenH/2;
        cow.scale(scale);

        beaver = new Sprite(64, 64);
        beaver.image = game.assets["img/beaver_animation.png"];
        beaver.x = ScreenW/2;
        beaver.y = ScreenH/2;
        beaver.scale(scale);

        camp = new Sprite(64, 64);
        camp.image = game.assets["img/camp.png"];
        camp.x = ScreenW/2;
        camp.y = ScreenH/2;
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
            cow.x = ScreenW/2 + scale*100*Math.sin((tick+80)/60);
            cow.y = ScreenH/2 + scale*100*Math.cos((tick+80)/60);

            beaver.x = ScreenW/2 + scale*100*Math.sin(tick/60);
            beaver.y = ScreenH/2 + scale*100*Math.cos(tick/60);

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
        this.addChild(score);
        this.addChild(message);
    }
});
