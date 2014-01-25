function Particle(){
    this.preload = ["img/red1dot.png"
        ,"img/red2dot.png"
        ,"img/red3dot.png"
        ,"img/simpleparticle.png"];
    this.init = function(){
        // preparing particle sets
        this.system = ParticleSystem.createParticleSystem(world.game.rootScene,
            world.game.assets["img/red1dot.png"],
            32, 32, m_PartCount);

        this.addEventListener("enterframe", function(){
            this.system.update();
        });
    };
    this.system = null;
    this.update = function()
    {
        for(var i = 0; i < m_PartCount; ++i)
        {
            this.m_Red1dot[i].update();
            this.m_Red2dot[i].update();
            this.m_Red3dot[i].update();
            this.m_Simpledot[i].update();
        }
    };
    this.blood = function(vec)
    {
        for (var i=0; i < m_PartCount / 5; i++)
        {
            var moveX = (Math.random() - 0.5) / 10;
            var moveY = (Math.random() - 0.5)/ 10;
            var lifeSpan = Math.random()*1005;
            this.system.addParticle(vec.x, vec.y, 0.5 + Math.random() * 0.5,
                0.2 + Math.random() * 0.8, moveX, moveY, lifeSpan);
            //    this.m_Red2dot[this.m_Act].addParticle(vec.x, vec.y, 1, 1, moveX, moveY, lifeSpan);
            //    this.m_Red3dot[this.m_Act].addParticle(vec.x, vec.y, 1, 1, moveX, moveY, lifeSpan);
        }

        // Aby nie można było wyświetlać wiele partiki na raz
        // trzeba przelączać aktualnie generowanego zestawu cząsteczek
    };
    // particle count
    var m_PartCount = 50;
};