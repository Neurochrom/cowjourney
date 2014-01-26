function Particle(){

    this.preload = ["img/red1dot.png"
        ,"img/red2dot.png"
        ,"img/dustdot.png"
        ,"img/red3dot.png"
        ,"img/simpleparticle.png"];

    this.init = function(){
        // preparing particle sets
        this.bloodSys = ParticleSystem.createParticleSystem(world.scene,
            world.game.assets["img/red1dot.png"], world.game.assets["img/dustdot.png"],
            32, 32, m_PartCount);
    };

    this.bloodSys = null;
    this.dustSys = null;

    this.blood = function(vec)
    {
        for (var i=0; i < m_PartCount / 5; i++)
        {
            var moveX = (Math.random() - 0.5);
            var moveY = (Math.random() - 0.5);
            var lifeSpan = Math.random()*20 + 30;
            this.bloodSys.addParticle(vec.x, vec.y, 0.5 + Math.random() * 0.5,
                0.2 + Math.random() * 0.8, moveX, moveY, lifeSpan);
        }
    };

    this.clickDust = function(vec)
    {
        for (var i=0; i < m_PartCount / 5; i++)
        {
            var moveX = (Math.random() - 0.5) * 2;
            var moveY = (Math.random() - 0.4) * 0.5;
            var lifeSpan = Math.random()*10 + 20;
            this.bloodSys.addParticle(vec.x, vec.y, 0.2 + Math.random() * 0.3,
                0.2 + Math.random() * 0.8, moveX, moveY, lifeSpan, true);
        }
    };

    // particle count
    var m_PartCount = 250;

    this.slaughter = function(vec)
    {
        for (var i=0; i < m_PartCount / 5; i++)
        {
            var moveX = (Math.random() - 0.5);
            var moveY = (Math.random() - 0.5);
            var lifeSpan = 60*60;
            this.bloodSys.addParticle(vec.x, vec.y, 0.5 + Math.random() * 0.5,
                0.2 + Math.random() * 0.8, moveX, moveY, lifeSpan);
        }
    }

};
