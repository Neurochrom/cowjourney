var Particle = Class.create( {
    initialize : function(center) {

        // preparing particle sets
        for(var i = 0; i < m_PartCount; ++i)
        {
            m_Red1dot[i] = ParticleSystem.createParticleSystem(m_Game.rootScene,
                world.game.assets["img/red1dot.png"],
                32, 32, m_PartCount);
            m_Red2dot[i] = ParticleSystem.createParticleSystem(m_Game.rootScene,
                world.game.assets["img/red2dot.png"],
                32, 32, m_PartCount);
            m_Red3dot[i] = ParticleSystem.createParticleSystem(m_Game.rootScene,
                world.game.assets["img/red3dot.png"],
                32, 32, m_PartCount);
            m_Simpledot[i] = ParticleSystem.createParticleSystem(m_Game.rootScene,
                world.game.assets["img/simpleparticle.png"],
                32, 32, m_PartCount);
        }

        this.addEventListener("enterframe", function(){
            this.Update();
        });
    },
    Preload : function()
    {
        world.pushPreload("img/red1dot.png");
        world.pushPreload("img/red2dot.png");
        world.pushPreload("img/red3dot.png");
        world.pushPreload("img/simpleparticle.png");
    },
    Update: function()
    {
        for(var i = 0; i < m_PartCount; ++i)
        {
            m_Red1dot[i].update();
            m_Red2dot[i].update();
            m_Red3dot[i].update();
            m_Simpledot[i].update();
        }
    },
    Blood: function(p_x, p_y)
    {
        for (var i=0; i < m_PartCount; i++)
        {
            var moveX = Math.random()*10 - 5;
            var moveY = Math.random()*10 - 5;
            var lifeSpan = Math.random()*10 + 5;
            m_Red1dot[m_Act].addParticle(p_x, p_y, 1, 1, moveX, moveY, lifeSpan);
            m_Red2dot[m_Act].addParticle(p_x, p_y, 1, 1, moveX, moveY, lifeSpan);
            m_Red3dot[m_Act].addParticle(p_x, p_y, 1, 1, moveX, moveY, lifeSpan);
        }

        // Aby nie można było wyświetlać wiele partiki na raz
        // trzeba przelączać aktualnie generowanego zestawu cząsteczek
        m_Act++;
        if(m_Act >= m_PartCount)
            m_Act = 0;
    },
    // particle count
    m_PartCount : 10,
    // Tables with particles
    m_Red1dot : new Array(), m_Red2dot : new Array(),
    m_Red3dot : new Array(), m_Simpledot : new Array(),
    // last used particle set
    m_Act : 0,
    followedObject : {}
});