// To add more sounds, add new item here and this.preload
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
        world.game.assets[this.preload[p_soundid]].clone().play();
    };

    var m_BGM = null;
}