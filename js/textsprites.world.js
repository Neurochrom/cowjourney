world.registerOnGameStart({}, function(par){
    //part of game which will be run on start
    //first variable is a
    m_TitleShadow = new TextSprite("Cowssss", new Vec2(105,5), new Vec2(0,0), 100, "#000");
    m_Title = new TextSprite("Cowssss", new Vec2(100,0), new Vec2(0,0), 100, "#FFF");
});
world.registerOnUpdate({}, function(par){
    //part of game which will be run on start
    //first variable is a
    m_TitleShadow.update();
    m_Title.update();
});
world.registerOnClick({}, function(e, par){
    //part of game which will be run on start
    //first variable is a
    world.music.play(g_SoundEffect.Cow);

});
world.registerPreload('img/grass1.png');

var m_Title = null;
var m_TitleShadow = null;