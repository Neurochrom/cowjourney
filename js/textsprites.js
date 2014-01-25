var TextSprite = Class.create(Label, {

    initialize : function(text, p_center, p_move, p_lifespan, p_color)
    {
        Label.call(this, text);
        this.font  = "24px monospace";
        this.color = p_color;
        this.pos = p_center;

        this.m_Center = p_center;
        this.m_Life = p_lifespan;
        this.m_Move = p_move;

        world.game.rootScene.addChild(this);
    },

    update : function(e)
    {
        this.m_ActLife++;
        var progress = this.m_ActLife/this.m_Life;
        this.opacity = 1 - this.m_ActLife/this.m_Life;
    },


    m_Move : null,
    m_Center : null,
    m_Life : 0,
    m_ActLife : 0,
    m_Active : false
});