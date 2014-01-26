// To add more sounds, add new item here and this.preload and in this.play
var g_SoundEffect = {Bgm : 0, Cow : 1, Blood : 2, DogYelp : 3, Bark : 4};

function Music(){
    /* souds sources:
     * bgm.ogg : http://www.jamendo.com/en/track/957452/une-souris-instrumental
     * cow.ogg : http://www.freesound.org/people/Benboncan/sounds/58277/
     * bloody.ogg : http://www.freesound.org/people/mattiagreyfox/sounds/202400/
     * dogyelp.ogg : http://www.freesound.org/people/Tails1942/sounds/163280/
     * bark.ogg : http://www.freesound.org/people/soundscalpel.com/sounds/110389/
     */
    this.preload = ["res/bgm.ogg",
                    "res/cow.ogg",
                    "res/cow1.ogg",
                    "res/cow2.ogg",
                    "res/bloody.ogg",
                    "res/dogyelp.ogg",
                    "res/bark.ogg"];
    this.init = function(){
        // set BGM
        m_BGM = world.game.assets["res/bgm.ogg"];
        m_BGM.play();
    };
    this.update = function ()
    {
        if (m_BGM.currentTime >= m_BGM.duration )
        {
            m_BGM.play();
        }
    };
    this.play = function (p_soundid)
    {
        switch(p_soundid)
        {
            case g_SoundEffect.Bgm:
                world.game.assets["res/bgm.ogg"].clone().play();
                break;
            case g_SoundEffect.Cow:
                var cows = ["res/cow.ogg",
                            "res/cow1.ogg",
                            "res/cow2.ogg",
                            "res/bark.ogg"];
                world.game.assets[cows[Math.floor(Math.random()*3.999)]].clone().play();
                break;
            case g_SoundEffect.Blood:
                world.game.assets["res/bloody.ogg"].clone().play();
                break;
            case g_SoundEffect.DogYelp:
                world.game.assets["res/dogyelp.ogg"].clone().play();
                break;
            case g_SoundEffect.Bark:
                world.game.assets["res/bark.ogg"].clone().play();
                break;
        }
    };

    var m_BGM = null;
}