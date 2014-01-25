var TextSprite = Class.create(Label, {

    initialize : function()
    {
        Label.call(this);
        this.font  = "24px Comic Sans MS";
        this.textAlign = "center";
        world.game.rootScene.addChild(this);

    },

    show : function(text, p_center, p_dest, p_lifespan, p_color)
    {
        this.color = p_color;
        this.text = text;

        var centr = new Vec2(this.width/2, 24);
        p_center = p_center.subV(centr);
        p_dest = p_dest.subV(centr);
        this.pos = p_center;
        this.m_Center = p_center;
        this.m_Life = p_lifespan;
        this.m_Dest = p_dest;

        this.m_ActLife = 0;
        this.m_Active = true;
    },

    update : function(e)
    {
        this.m_ActLife++;
        var progress = this.m_ActLife/this.m_Life;
        if(progress > 1)
        {
            this.m_Active = false;
            return;
        }

        this.pos = this.m_Center.addV( this.m_Dest.subV(this.m_Center).mulS(progress));
        this.opacity = 1 - (1 - Math.cos(Math.PI/2 * this.m_ActLife/this.m_Life));
    },


    m_Move : null,
    m_Center : null,
    m_Life : 0,
    m_ActLife : 0,
    m_Active : false
});