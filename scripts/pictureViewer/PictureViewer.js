var desktopApp = desktopApp || {};
desktopApp.scripts = desktopApp.scripts || {};
desktopApp.scripts.ui = desktopApp.scripts.ui || {};

desktopApp.scripts.PictureViewer = function(text, winIcon, size){
    
    
    desktopApp.scripts.ui.Win.call(this, text, winIcon, size);
    var that = this;
    this.renderWindow();
    this.pictureContainer = document.createElement("div");
    this.pictureContainer.setAttribute("class", "pictureContainer");
    
    $.ajax({
        method: "get",
        url: "Backend/getJSONThumbs.php",
        //data:
        beforeSend: function(){
			that.windowStatus.innerHTML = "";
			var ajaxLoader = document.createElement("div");
			ajaxLoader.className = "windowAjaxLoaderBar";
			that.windowStatus.appendChild(ajaxLoader);
            $(that.windowAjaxLoader).fadeIn();
        },
        //complete:
        success: function(result){
            that.windowStatus.innerHTML = "";
            $(that.windowAjaxLoader).fadeOut();
            that.jsObject = jQuery.parseJSON(result);
            for (var i = 0; i < that.jsObject.length; i++) {
                that.renderThumbs(i);
            }
        }
    });
};
desktopApp.scripts.PictureViewer.prototype = new desktopApp.scripts.ui.Win();

desktopApp.scripts.PictureViewer.prototype.renderThumbs = function(i){
    var that = this;
    var imageLink = document.createElement("a");
    imageLink.setAttribute("href", "#");
    imageLink.className = "imagelink";
    var maxWidth = this.getMaxWidth();
    var maxHeight = this.getMaxHeight();
    imageLink.style.width = maxWidth + "px";
    imageLink.style.height = maxHeight + "px";
    var image = document.createElement("img");
    image.setAttribute("class", "thumbImage");
    
    image.style.width = this.jsObject[i].thumbWidth + "px";
    image.style.height = this.jsObject[i].thumbHeight + "px";
    image.setAttribute("src", "images/pictureViewer/" + this.jsObject[i].fileName);
    imageLink.appendChild(image);
    
    imageLink.onclick = function(){
        that.bgChanger(i);
    };
	imageLink.onmouseover = function(){
        that.windowStatus.innerHTML = that.jsObject[i].fileName 
    };
	imageLink.onmouseout = function(){
        that.windowStatus.innerHTML = ""; 
    };
    this.windowContent.appendChild(imageLink);
};
desktopApp.scripts.PictureViewer.prototype.bgChanger = function(i){
    var that = this;
    
    // Skapar fönster till bilden
    var picture = new desktopApp.scripts.ui.Win(this.jsObject[i].fileName, "images/picWinIcon.png", [this.jsObject[i].width + 10, this.jsObject[i].height + 10]);
    picture.renderWindow();
    
    // Slänger in bilden
    var a = document.createElement("a");
    a.href = "#";
    var img = document.createElement("img");
    img.src = "images/pictureViewer/" + this.jsObject[i].fileName;
    
    
    a.appendChild(img);
    picture.windowContent.appendChild(a);
    a.onclick = function(){
        that.contentWindow.style.backgroundImage = "url(images/pictureViewer/" + that.jsObject[i].fileName + ")";
    };
    
    //this.windowContent.style.backgroundImage = "url(images/pictureViewer/" + this.jsObject[i].fileName + ")";	
};
desktopApp.scripts.PictureViewer.prototype.getMaxWidth = function(){
    var maxWidth = 0;
    for (var i = 0; i < this.jsObject.length; i++) {
        if (this.jsObject[i].thumbWidth > maxWidth) {
            maxWidth = this.jsObject[i].thumbWidth;
        }
    }
    return maxWidth;
};
desktopApp.scripts.PictureViewer.prototype.getMaxHeight = function(){
    var maxHeight = 0;
    for (var i = 0; i < this.jsObject.length; i++) {
        if (this.jsObject[i].thumbHeight > maxHeight) {
            maxHeight = this.jsObject[i].thumbHeight;
        }
    }
    return maxHeight;
};
