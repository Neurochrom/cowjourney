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

    if(Math.random() > 0.9)
        AddMessage("MOOO!!! BITCH!!!", new Vec2(e.x, e.y), new Vec2(e.x, e.y-100), 80, "#FFF");
    else
        AddMessage("moo!", new Vec2(e.x, e.y), new Vec2(e.x, e.y-100), 80, "#FFF");

});
world.registerPreload('img/grass1.png');

var AddMessage = function (text, p_center, p_dest, p_lifespan, p_color)
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
    g_Messages[closesID].show(text, p_center, p_dest, p_lifespan, p_color);
}

var g_MaxMessages = 20;
var g_Messages = [];