// To add more sounds, add new item here and this.preload and in this.play
var g_SoundEffect = {Bgm : 0, Cow : 1, Blood : 2, DogYelp : 3, Bark : 4};

function Music(){
    /* souds sources:
     * bgm.mp3 : http://www.jamendo.com/en/track/957452/une-souris-instrumental
     * cow.mp3 : http://www.freesound.org/people/Benboncan/sounds/58277/
     * bloody.mp3 : http://www.freesound.org/people/mattiagreyfox/sounds/202400/
     * dogyelp.mp3 : http://www.freesound.org/people/Tails1942/sounds/163280/
     * bark.mp3 : http://www.freesound.org/people/soundscalpel.com/sounds/110389/
     */
    this.preload = [//"res/bgm.mp3",
                    "res/cow.mp3",
                    "res/cow1.mp3",
                    "res/cow2.mp3",
                    "res/bloody.mp3",
                    "res/dogyelp.mp3",
                    "res/bark.mp3"];
    this.init = function(){
        // set BGM
        m_BGM = world.game.assets["res/bgm.mp3"];
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
                world.game.assets["res/bgm.mp3"].clone().play();
                break;
            case g_SoundEffect.Cow:
                var cows = ["res/cow.mp3",
                            "res/cow1.mp3",
                            "res/cow2.mp3"];
                world.game.assets[cows[Math.floor(Math.random()*2.999)]].clone().play();
                break;
            case g_SoundEffect.Blood:
                world.game.assets["res/bloody.mp3"].clone().play();
                break;
            case g_SoundEffect.DogYelp:
                world.game.assets["res/dogyelp.mp3"].clone().play();
                break;
            case g_SoundEffect.Bark:
                world.game.assets["res/bark.mp3"].clone().play();
                break;
        }
    };

    var m_BGM = null;
}