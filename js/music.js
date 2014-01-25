function Music(){
    /* souds sources:
     * bgm.mp3 : http://www.jamendo.com/en/track/957452/une-souris-instrumental
     */
    this.preload = ["res/bgm.mp3"];
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
    // particle count
    var m_BGM = null;
}