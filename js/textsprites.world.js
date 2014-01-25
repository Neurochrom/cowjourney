world.registerOnGameStart({}, function(par){
    //part of game which will be run on start
    //first variable is a
    for(var i = 0; i < g_MaxMessages; ++i)
    {
        g_Messages[i] = new TextSprite();
    }
});
world.registerOnUpdate({}, function(par){
    //part of game which will be run on start
    //first variable is a
    for(var i = 0; i < g_MaxMessages; ++i)
    {
        if(g_Messages[i].m_Active)
        {
            g_Messages[i].update();
        }
    }
});
world.registerOnClick({}, function(e, par){
    //part of game which will be run on start
    //first variable is a
    world.music.play(g_SoundEffect.Cow);
    AddMessage();

});
world.registerPreload('img/grass1.png');

var AddMessage = function ()
{
    var closesToDie = 0;
    var closesID = 0;
    for(var i = 0; i < g_MaxMessages; ++i)
    {
        if(!g_Messages[i].m_Active)
        {
            closesID = i;
            break;
        }
        if(closesToDie < g_Messages[i].m_ActLife/g_Messages[i].m_Life)
        {
            closesToDie = g_Messages[i].m_ActLife/g_Messages[i].m_Life;
            closesID = i;
        }
    }

    g_Messages[closesID].show("Cowssss", new Vec2(100,0), new Vec2(0,0), 100, "#FFF");
}

var g_MaxMessages = 20;
var g_Messages = [];