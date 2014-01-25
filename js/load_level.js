world.load_level = function(lvl_n) {
	world.scene = new Scene();
	world.game.replaceScene(world.scene);
    world.animals = [];
    world.obstacles = {};

	var background = new Sprite(world.size.x, world.size.y);

	background.addEventListener('touchstart', function(e) {
		world.par.blood(new Vec2(e.x-12, e.y-12));
		a1.followedObject = { center: function() { return new Vec2(e.x, e.y); } };
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

            /*
            var a1 = new Player(new Vec2(30, 30));
            a1.type = "player_cow";
            var a2 = new Cow(new Vec2(30, 230));
            var a3 = new Cow(new Vec2(40, 410));
            var a4 = new Cow(new Vec2(240, 410));
            */

			world.readMap([
				[0,0,0,0,0,0,0],
				[0,3,4,4,2,0,0],
				[0,0,0,0,0,0,1],
				[0,1,0,0,1,0,0]
			]);


			break;

		case 2:

			break;
	}
}