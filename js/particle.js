function Particle(){

    this.preload = ["img/red1dot.png"
        ,"img/red2dot.png"
        ,"img/red3dot.png"
        ,"img/simpleparticle.png"];

    this.init = function(){
        // preparing particle sets
        this.system = ParticleSystem.createParticleSystem(world.scene,
            world.game.assets["img/red1dot.png"],
            32, 32, m_PartCount);
    };

    this.system = null;

    this.blood = function(vec)
    {
        for (var i=0; i < m_PartCount / 5; i++)
        {
            var moveX = (Math.random() - 0.5);
            var moveY = (Math.random() - 0.5);
            var lifeSpan = Math.random()*20 + 30;
            this.system.addParticle(vec.x, vec.y, 0.5 + Math.random() * 0.5,
                0.2 + Math.random() * 0.8, moveX, moveY, lifeSpan);
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
            this.system.addParticle(vec.x, vec.y, 0.5 + Math.random() * 0.5,
                0.2 + Math.random() * 0.8, moveX, moveY, lifeSpan);
        }
    }

};
