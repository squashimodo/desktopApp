var desktopApp = desktopApp || {};
desktopApp.scripts = desktopApp.scripts || {};
desktopApp.scripts.ui = desktopApp.scripts.ui || {};

desktopApp.menu = [
		{hover: "Chat", icon: "images/chatIcon.png", type: function(){new desktopApp.scripts.LabbyMessage("Awesome Chat", "images/chatWinIcon.png", [300, 300]);}},
		{hover: "Rss-reader", icon: "images/rssIcon.png", type: function(){new desktopApp.scripts.RssReader("Latest news", "images/rssWinIcon.png", [450, 400]);}},
		{hover: "Picture-viewer", icon: "images/picIcon.png", type: function(){new desktopApp.scripts.PictureViewer("Picture Gallery", "images/picWinIcon.png", [305, 330]);}},
		{hover: "Memory", icon: "images/memoryIcon.png", type: function(){new desktopApp.scripts.Memory("Social Memory", "images/memoryWinIcon.png", [300, 250]);}}
];

desktopApp.init = function(){		
	var content = document.getElementById("content");
	content.style.width = 1250 + "px"; 
	content.style.height = 819 + "px";
	var bottombar = document.getElementById("bottombar");
	var bottombarInv = document.getElementById("bottomInvis");
	var ul = document.createElement('ul');
	ul.setAttribute("id", "lista");
	bottombar.appendChild(ul);	
	for(var i = 0; i < desktopApp.menu.length;i++){
		desktopApp.buildBottomMenuItems(i);			
	}
	desktopApp.buildClock();
};
desktopApp.buildClock = function(){
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
		document.getElementById("clock").innerHTML = hours + ":" + minutes + ":" + seconds;
		setTimeout("desktopApp.buildClock()", 1000);	
};
desktopApp.buildBottomMenuItems = function(i){
		var that = this;
		var ul = document.getElementById("lista");
		var li = document.createElement('li');
		var tt = document.createElement("div");
		tt.className = "tooltip";
		ul.appendChild(li);
		var a = document.createElement('a');
		$(a).css({ opacity: 0.2 });
		$('#lista').css({ opacity: 0.5 });
		a.setAttribute('title',desktopApp.menu[i].hover);
		a.setAttribute('href',"#");
		a.style.backgroundImage = "url( "+ desktopApp.menu[i].icon + ")";
		li.appendChild(a);
		a.onclick = function(){
			return false;
		}
		a.ondblclick = function(){
			that.menu[i].type();
		};
		a.onmouseover = function(e){			
			$(this).stop().animate({opacity: '1'}, 'slow');
		};
		a.onmouseout = function(e){
			$(this).stop().animate({opacity: '0.3'});
		};
		$('#lista').hover(function(){
			$(this).stop().animate({opacity: '1'}, 'slow');
		}, function(){
			$(this).stop().animate({opacity: '0.2'}, 'slow');
		});		
};

window.onload = desktopApp.init;
