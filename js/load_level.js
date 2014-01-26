world.load_level = function(lvl_n) {
	world.scene = new Scene();
	world.game.replaceScene(world.scene);
    world.animals = [];
    world.obstacles = {};
    world.current_level = lvl_n;

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

		music.play(g_SoundEffect.Cow);
	});

	background.addEventListener("enterframe", function(){
		ParticleSystem.update();
		music.update();
		world.smell();
		world.resolveCollisions(world.findCollidingPairs());
		for(var i = 0; i < world.onUpdateStash.length; i++){
			world.onUpdateStash[i].fun(world.onUpdateStash[i].par);
		}
	});

	background.width = world.size.x;
	background.height = world.size.y;
    background.image = world.game.assets["img/gras1.png"];

    music.init();

    world.scene.addChild(background);

	switch(lvl_n)
	{
        case 1:
            world.readMap([[13,6,6,6,6,6,6,6,6,10],
                [11,20,0,0,0,0,0,0,30,11],
                [11,0,0,0,0,0,0,0,0,11],
                [11,0,0,0,0,0,0,0,0,11],
                [11,0,0,0,0,0,0,0,0,11],
                [11,0,0,0,0,0,0,0,0,11],
                [11,0,0,0,0,0,0,0,0,11],
                [11,0,0,0,0,0,0,0,0,11],
                [11,40,0,0,0,0,0,0,50,11],
                [7,6,6,6,6,6,6,6,6,4],
            ]);
            break;

		case 2:
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

        case 3:
            world.readMap([[13,6,6,6,14,6,6,6,6,6,6,6,6,14,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,10],
                [11,0,0,0,11,0,0,0,0,0,0,0,0,11,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
                [11,0,0,0,11,0,0,0,0,0,0,0,0,7,6,6,6,6,6,6,6,10,0,0,0,0,0,0,0,0,0,11],
                [11,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,13,6,10,0,0,0,0,11],
                [11,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,11,0,7,2,0,0,0,11],
                [11,0,50,0,11,0,0,5,6,6,6,10,0,0,9,0,0,9,0,30,0,11,0,0,11,0,0,0,0,0,0,11],
                [11,0,0,0,11,0,0,0,0,0,0,11,0,0,11,0,0,11,0,0,0,11,0,0,11,0,0,0,0,0,0,11],
                [11,0,0,0,11,0,0,0,0,0,0,11,0,0,11,0,0,11,0,0,0,11,0,0,11,0,0,0,0,0,0,11],
                [11,0,0,0,11,0,0,0,0,0,0,11,0,0,11,0,0,7,6,6,6,4,0,0,11,0,0,0,0,0,0,11],
                [11,0,0,0,11,0,0,0,20,0,0,11,0,0,11,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,11],
                [11,0,0,0,11,0,0,0,0,0,0,11,0,0,11,0,0,9,0,0,30,0,0,0,11,0,0,0,0,0,0,11],
                [11,0,0,0,11,0,0,0,0,0,0,11,0,0,11,0,0,11,0,0,0,0,0,0,11,0,0,0,0,0,0,11],
                [11,0,0,0,11,0,0,0,0,0,0,11,0,0,11,0,0,11,0,0,0,0,0,0,11,0,0,0,0,0,0,11],
                [11,0,0,0,7,6,6,6,6,6,6,4,0,0,7,6,6,8,6,6,6,6,6,6,4,0,0,0,0,0,0,11],
                [11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,0,0,0,11],
                [11,0,0,0,0,0,0,0,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
                [11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
                [7,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,4],
            ]);
            break;

        case 4:
            world.readMap([[13,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,10],
                [11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
                [11,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,50,0,0,11],
                [11,0,0,9,0,30,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
                [11,0,0,11,0,0,0,11,0,0,5,6,6,6,6,6,6,6,6,6,6,14,6,6,6,6,6,6,6,12],
                [11,0,40,11,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,11],
                [11,0,0,11,0,0,0,3,0,0,9,0,13,6,6,6,10,0,9,0,0,11,0,0,0,9,0,0,0,11],
                [11,0,0,11,0,0,0,0,0,0,11,0,11,0,20,0,11,0,11,0,0,3,0,0,0,11,0,0,0,11],
                [15,6,6,8,6,6,6,10,0,0,11,0,11,0,0,0,11,0,11,0,0,0,0,0,0,11,30,0,0,11],
                [11,0,0,0,0,0,0,11,0,0,11,0,7,10,0,13,4,0,11,0,0,9,0,5,6,8,6,2,0,11],
                [15,6,6,6,2,0,0,11,0,0,11,0,0,3,0,3,0,0,11,0,0,11,0,0,0,0,0,0,0,11],
                [11,0,0,0,0,0,0,11,0,0,11,0,0,0,0,0,0,0,11,0,0,11,0,0,0,0,0,0,0,11],
                [11,0,0,0,30,0,0,11,0,0,7,6,6,6,6,6,6,6,12,0,0,11,0,0,0,0,0,0,0,11],
                [11,0,9,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,11,0,0,11,0,0,0,40,0,0,0,11],
                [11,0,11,0,0,0,0,3,0,0,0,0,1,0,0,0,17,0,11,0,0,11,0,0,0,0,0,0,0,11],
                [11,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,11,0,0,0,0,0,0,0,11],
                [7,6,8,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,8,6,6,8,6,6,6,6,6,6,6,4],
            ]);
            break;

        default:
            world.game.replaceScene(new GameWon());
	}
}
