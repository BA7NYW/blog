if (localStorage.getItem("music") == undefined) {
    localStorage.setItem("music", "0");
};
var consoleplayer = document.getElementById("consoleplayer");
function musicsw() {
    if (localStorage.getItem("music") == "0") {
      localStorage.setItem("music", "1");
      loadmusic();
    } else {
      localStorage.setItem("music", "0");
      loadmusic();
    }
};
function loadmusic() {
    var playerid = document.getElementById('guiguiplayer');
    var playertips = document.getElementById('guiguiTips');
    var playerksc = document.getElementById('guiguiKsc');
    var playerlrc = document.getElementById('guiguiKsc');
    var playerjs = document.getElementById('xplayer');
    if (localStorage.getItem("music") == "1") {
      if(playerjs && playerid && playertips && playerksc && playerlrc){
        playerid.style.visibility = 'visible';
        playertips.style.visibility = 'visible';
        playerksc.style.visibility = 'visible';
        playerlrc.style.visibility = 'visible';
      }else{
        var script = document.createElement('script');
        script.id = 'xplayer';
        script.src = 'https://y.cenguigui.cn/Static/player12/js/player.js';
        script.setAttribute('key','661a038c31f2b');
        script.setAttribute('m','1');
        script.setAttribute('api',"https://y.cenguigui.cn/");
        document.getElementsByTagName('body')[0].appendChild(script);
      }
      if (!consoleplayer.classList.contains('on')) {
        consoleplayer.classList.add('on')
      }
    }
    else if (localStorage.getItem("music") == "0")  {
      if (playerjs && playerid && playertips && playerksc && playerlrc){
        playerid.style.visibility = 'hidden';
        playertips.style.visibility = 'hidden';
        playerksc.style.visibility = 'hidden';
        playerlrc.style.visibility = 'hidden';
        hasgeci = false;
        $("li", $albumList).eq(albumId).addClass(cur).find(".artist").html("暂停播放 > ").parent().siblings().removeClass(cur).find(".artist").html("").parent();
        guiguiTips.show("暂停播放 - " + songSheetList[albumId].songNames[songId]);
        $cover.removeClass("coverplay");
        audio.pause();
        var obj = document.getElementsByClassName('pause');
        obj[0].style.display = "none";
    
        var play_obj = document.getElementsByClassName('play');
        play_obj[0].style.display = "block";
    
        $.cookie("auto_playre", "no")
      }
      if (consoleplayer.classList.contains('on')) {
        consoleplayer.classList.remove('on')
      }
    }
  };
loadmusic();