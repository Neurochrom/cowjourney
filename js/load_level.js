world.load_level = function(lvl_n) {
	world.scene = new Scene();
	world.game.replaceScene(world.scene);
    world.animals = [];
    world.obstacles = {};

	var background = new Sprite(world.size.x, world.size.y);

	background.addEventListener('touchstart', function(e) {
		world.par.clickDust(new Vec2(e.x-12, e.y-12));
		world.player.followedObject = {
            center: function() { return new Vec2(e.x, e.y); },
            groupie: world.player
        };
		for(var i = 0; i < world.onClickStash.length; i++){
			world.onClickStash[i].fun(e, world.onClickStash[i].par);
		}

		//music.play(g_SoundEffect.Cow);
	});

	background.addEventListener("enterframe", function(){
		ParticleSystem.update();
		// music.update();
		world.smell();
		world.resolveCollisions(world.findCollidingPairs());
		for(var i = 0; i < world.onUpdateStash.length; i++){
			world.onUpdateStash[i].fun(world.onUpdateStash[i].par);
		}
	});

	background.width = world.size.x;
	background.height = world.size.y;

	switch(lvl_n)
	{
        case 1:
            background.image = world.game.assets["img/grass2.png"];

            world.scene.addChild(background);
            world.readMap([[13,6,6,6,14,6,6,6,14,6,6,10],
                [11,0,0,0,11,0,0,0,11,0,0,11],
                [11,0,30,0,11,0,20,0,11,0,0,11],
                [11,0,0,0,11,0,5,6,4,0,0,11],
                [11,0,0,0,11,0,0,0,0,0,0,11],
                [11,0,0,0,3,0,0,0,13,2,0,11],
                [7,10,0,0,0,0,0,0,11,0,0,11],
                [0,11,0,0,0,13,6,6,4,0,0,11],
                [0,11,0,0,0,11,17,0,0,30,0,11],
                [0,11,0,0,0,11,0,0,0,0,0,11],
                [0,11,0,0,0,11,0,0,0,0,0,11],
                [0,7,6,6,6,6,6,6,6,6,6,4],
            ]);
            break;
		case 2:
            background.image = world.game.assets["img/grass2.png"];

            world.scene.addChild(background);

            world.readMap([[13,6,6,14,6,6,6,6,6,6,14,6,6,6,6,6,6,6,6,6,6,6,6,6,10],
                [11,0,0,11,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
                [11,0,20,11,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
                [11,0,0,11,0,0,9,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
                [11,0,0,11,0,0,11,0,30,0,11,0,0,0,0,13,2,0,5,10,0,0,0,0,11],
                [11,0,0,11,0,0,11,0,0,0,11,0,0,0,0,11,0,0,0,11,0,0,0,0,11],
                [11,0,0,11,0,0,11,0,0,0,11,0,0,0,0,11,0,0,0,11,0,0,0,0,11],
                [11,0,0,11,0,0,7,6,6,6,12,0,30,0,0,11,0,40,0,11,0,0,0,0,11],
                [11,0,0,11,0,0,0,0,0,0,11,0,0,0,0,11,0,0,0,15,6,2,0,0,11],
                [11,0,0,7,6,6,2,0,0,0,11,0,0,0,0,11,0,0,13,4,0,0,0,0,11],
                [11,0,0,0,0,0,0,0,0,0,11,0,0,0,0,15,6,6,4,0,0,0,0,0,11],
                [11,0,0,0,0,0,0,0,0,0,7,6,14,6,6,4,0,0,0,0,0,0,0,0,11],
                [11,0,0,13,6,6,2,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,11],
                [11,0,0,11,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,11],
                [11,0,0,11,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,11],
                [11,0,0,11,0,0,0,5,6,6,6,6,12,0,0,0,5,6,6,10,0,0,0,0,11],
                [11,0,0,11,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,11,0,0,0,0,11],
                [11,0,0,11,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,11,0,0,0,0,11],
                [11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,11],
                [11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,11],
                [11,0,0,15,6,6,6,6,6,6,6,6,2,0,0,5,6,6,6,8,6,6,6,6,12],
                [11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
                [11,0,30,11,0,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,0,11],
                [11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
                [7,6,6,8,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4],
            ]);

			break;
	}
}
