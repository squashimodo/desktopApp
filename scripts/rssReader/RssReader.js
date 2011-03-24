var desktopApp = desktopApp || {};
desktopApp.scripts = desktopApp.scripts || {};
desktopApp.scripts.ui = desktopApp.scripts.ui || {};
desktopApp.scripts.RssReader = function(text, icon, size){
    desktopApp.scripts.ui.Win.call(this, text, icon, size);
    var that = this;
	this.url = "http://www.webbprogrammerare.se/feed/rss/";
    this.renderWindow();
    this.callRss();
    this.t = setInterval(function(){
        that.callRss();
    }, 5000);
    //new MakeAjaxRequest("http://homepage.hik.se/student/hb222ap/webbprojekt/Backend/rss.php?url="+escape("http://lnu.se/1.454?l=sv_SE"), that.handleRss);
    this.windowClose.onclick = function(){
        $(that.windowWrap).fadeOut("slow", function(){
            $(this).remove();
        });
        clearInterval(that.t);
    };
};
desktopApp.scripts.RssReader.prototype = new desktopApp.scripts.ui.Win();
desktopApp.scripts.RssReader.prototype.handleRss = function(data){
    this.windowContent.innerHTML = data;
    var chanElement = rssxml.getElementsByTagName("channel")[0];
    var itemElements = rssxml.getElementsByTagName("item");
};
desktopApp.scripts.RssReader.prototype.callRss = function(){
    var that = this;
    $.ajax({
        method: "get",
        url: "Backend/rss.php?url=" + escape("http://www.webbprogrammerare.se/feed/rss/"),
        //data:
        beforeSend: function(){
			console.log("Hej");
			that.windowStatus.innerHTML = "";
			var ajaxLoader = document.createElement("div");
			ajaxLoader.className = "windowAjaxLoaderBar";
			that.windowStatus.appendChild(ajaxLoader);

        },
        
        success: function(result){
            that.windowStatus.innerHTML = "";
            
            that.windowContent.innerHTML = result;
			desktopApp.scripts.RssReader.prototype.showTime(that);
        }
    });
};
desktopApp.scripts.RssReader.prototype.showTime = function(that){
	var clock = new Date();
	var hours = clock.getHours();
	var minutes = clock.getMinutes();
	var seconds = clock.getSeconds();
	if(hours < 10){
		hours = "0" + hours;
	}
	if(minutes < 10){
		minutes = "0" +  minutes;
	}
	if(seconds < 10){
		seconds = "0" + seconds;
	}
	that.windowStatus.innerHTML = "Senast uppdaterad: " + hours + ":" + minutes + ":" + seconds;
};
