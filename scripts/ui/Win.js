var desktopApp = desktopApp || {};
desktopApp.scripts = desktopApp.scripts || {};
desktopApp.scripts.ui = desktopApp.scripts.ui || {};

desktopApp.scripts.ui.Win = function(text, icon, size){
    this.text = text;
    this.icon = icon;
    this.size = size;
};
desktopApp.scripts.ui.Win.prototype.renderDesktop = function(){

};
desktopApp.scripts.ui.Win.prototype.renderWindow = function(){

    var that = this;
    this.contentWindow = document.getElementById("content");
    this.windowWrap = document.createElement("div");
    this.windowWrap.className = "windowWrap";
    this.window = document.createElement("div");
    this.window.className = "window";
    this.windowWrap.appendChild(this.window);
    this.windowContent = document.createElement("div");
    this.windowContent.className = "windowContent";
    
    
    /* Bygger fönstrets top-panel */
    
    this.windowTop = document.createElement("div");
    this.windowTop.className = "windowTop";
    this.window.appendChild(this.windowTop);
    // Lägger till ikon
    var icon = document.createElement("div");
    icon.className = "windowIcon";
    icon.style.backgroundImage = "url(" + this.icon + ")";
    this.windowTop.appendChild(icon);
    // Lägger in rubriken
    var heading = document.createElement("h2");
    heading.className = "windowHeading";
    heading.appendChild(document.createTextNode(this.text));
    this.windowTop.appendChild(heading);
    // Lägger in stäng-knapp
    this.windowClose = document.createElement("a");
    this.windowClose.className = "windowClose";
    this.windowClose.href = "#";
    this.windowTop.appendChild(this.windowClose);
    
    // Kopplar onclick-events 
    this.windowTop.onmousedown = function(e){
        that.windowWrap.style.zIndex = that.checkZindex();
        that.moveWindow(that.windowWrap, e);
    };
    this.windowClose.onclick = function(){
        $(that.windowWrap).fadeOut("slow", function(){
            $(this).remove();
        });
    };
    
    this.windowBottom = document.createElement("div");
    this.windowBottom.className = "windowBottom";
    
	this.windowStatus = document.createElement("div");
    this.windowStatus.className = "windowStatus";

	
    this.windowResize = document.createElement("div");
    this.windowResize.className = "windowResize";
    //this.windowResize.href = "#";
    this.windowResize.onmousedown = function(event){
        that.resizeWindow(that.windowContent, event);
        return false;
    };
    this.windowBottom.appendChild(this.windowStatus);
    this.windowBottom.appendChild(this.windowResize);
    
    this.contentWindow.appendChild(this.windowWrap);
    this.window.appendChild(this.windowContent);
    this.window.appendChild(this.windowBottom);
    
    this.windowContent.style.minWidth = this.size[0] + "px";
    this.windowContent.style.minHeight = this.size[1] + "px";
    this.windowContent.style.width = this.size[0] + "px";
    this.windowContent.style.height = this.size[1] + "px";
	
    this.windowWrap.style.top = this.placeWindow(this.windowContent)[1] + "px";
    this.windowWrap.style.left = this.placeWindow(this.windowContent)[0] + "px";
    
    this.windowWrap.style.zIndex = this.checkZindex();
    
    this.windowAjaxLoader = document.createElement("div");
    this.windowAjaxLoader.className = "windowAjaxLoader";
    
    this.windowContent.appendChild(this.windowAjaxLoader);
};
desktopApp.scripts.ui.Win.prototype.resizeWindow = function(elementToResize, event){
    var that = this;
    var mouseTop = this.getMousePosition(event)[1];
    var mouseLeft = this.getMousePosition(event)[0];
    
    var divHeight = parseInt(elementToResize.style.height, 10);
    var divWidth = parseInt(elementToResize.style.width, 10);
    var maxWidth = parseInt(that.windowWrap.offsetLeft, 10) + parseInt(that.windowWrap.offsetWidth, 10);
    // Registrerar eventhandlers för när muspekaren rör sig (mousemove) samt när den släpps (mouseup)
    if (document.addEventListener) { // DOM Level 2 event model
        document.addEventListener("mousemove", whenDragResize, true);
        document.addEventListener("mouseup", whenDragResizeUp, true);
    }
    else 
        if (document.attachEvent) { // IE5+	
            elementToResize.setCapture();
            elementToResize.attachEvent("onmousemove", whenDragResize);
            elementToResize.attachEvent("onmouseup", whenDragResizeUp);
            elementToResize.attachEvent("onlosecapture", whenDragResizeUp);
        }
        else { // IE4
            var oldmovehandler = document.onmousemove;
            var olduphandler = document.onmouseup;
            document.onmousemove = whenDragResize;
            document.onmouseup = whenDragResizeUp;
        }
    
    // Event hanterat, Låt ingen annan se det.
    if (event.stopPropagation) { // DOM level 2
        event.stopPropagation();
    }
    else { // IE
        event.cancelBubble = true;
    }
    //Förhindra default händelse
    if (event.preventDefault) { // DOM level 2
        event.preventDefault();
    }
    else { // IE
        event.returnValue = false;
    }
    function whenDragResize(event){		
        var height = divHeight + (that.getMousePosition(event)[1] - mouseTop);
		var width = divWidth + (that.getMousePosition(event)[0] - mouseLeft);
		if(height <= parseInt(elementToResize.style.minHeight, 10)){
			height = parseInt(elementToResize.style.minHeight, 10);
		}
		if(width <= parseInt(elementToResize.style.minWidth, 10)){
			width = parseInt(elementToResize.style.minWidth, 10);
		}
		if ((parseInt(that.windowWrap.offsetLeft, 10) + parseInt(that.windowWrap.offsetWidth, 10)) >= parseInt(that.contentWindow.style.width, 10)) {
			elementToResize.style.width = maxWidth + "px";
		}
		else {
//			elementToResize.style.height = height + "px";
			elementToResize.style.width = width + "px";
		}
    }
    function whenDragResizeUp(event){
        if (!event) { // IE
            event = window.event;
        }
        
        // Avregistrerar eventlisteners
        if (document.removeEventListener) { // DOM Level 2 event model
            document.removeEventListener("mousemove", whenDragResize, true);
            document.removeEventListener("mouseup", whenDragResizeUp, true);
        }
        else 
            if (document.detachEvent) { // IE5+	
                elementToDrag.releaseCapture();
                elementToDrag.detachEvent("onmousemove", whenDragResize);
                elementToDrag.detachEvent("onmouseup", whenDragResizeUp);
                elementToDrag.detachEvent("onlosecapture", whenDragResizeUp);
            }
            else { // IE4
                document.onmousemove = olduphandler;
                document.onmouseup = oldmovehandler;
            }
        if (event.stopPropagation) { // DOM level 2
            event.stopPropagation();
        }
        else { // IE
            event.cancelBubble = true;
        }
    }
    
    
    
    
};
desktopApp.scripts.ui.Win.prototype.moveWindow = function(elementToDrag, event){
    var that = this;
    
    // elementToDrag.style.zIndex = checkZindex();
    
    // Muspositionerna när drag-funktionen körs igång
    var startX = this.getMousePosition(event)[0];
    var startY = this.getMousePosition(event)[1];
    
    // Orginalpositionerna hos elementet som ska bli flyttat.
    var origX = elementToDrag.offsetLeft;
    var origY = elementToDrag.offsetTop;
    
    // Räknar ut avståndet mellan elementets position och muspekarens position
    var deltaX = startX - origX;
    var deltaY = startY - origY;
    
    // Registrerar eventhandlers för när muspekaren rör sig (mousemove) samt när den släpps (mouseup)
    if (document.addEventListener) { // DOM Level 2 event model
        document.addEventListener("mousemove", whenDrag, true);
        document.addEventListener("mouseup", whenUp, true);
    }
    else 
        if (document.attachEvent) { // IE5+	
            elementToDrag.setCapture();
            elementToDrag.attachEvent("onmousemove", whenDrag);
            elementToDrag.attachEvent("onmouseup", whenUp);
            elementToDrag.attachEvent("onlosecapture", whenUp);
        }
        else { // IE4
            var oldmovehandler = document.onmousemove;
            var olduphandler = document.onmouseup;
            document.onmousemove = whenDrag;
            document.onmouseup = whenUp;
        }
    
    // Event hanterat, Låt ingen annan se det.
    if (event.stopPropagation) { // DOM level 2
        event.stopPropagation();
    }
    else { // IE
        event.cancelBubble = true;
    }
    //Förhindra default händelse
    if (event.preventDefault) { // DOM level 2
        event.preventDefault();
    }
    else { // IE
        event.returnValue = false;
    }
 
    
    var height = parseInt(elementToDrag.style.height, 10);
    var width = parseInt(elementToDrag.style.width, 10);
    
    // Denna funktion anropas när muspekaren rör på sig, den ansvarar för att elementet flyttas
    function whenDrag(event){
        if (!event) { // IE event model
            event = window.event;
        }
        var right = (that.contentWindow.offsetWidth - elementToDrag.offsetWidth) - 30;
        var hej = (that.contentWindow.offsetHeight - elementToDrag.offsetHeight) - 30;
        
        // Förflyttar elementet till nuvarande musposition (justerad efter "element-musposition" differensen vid mustrycket)           
        elementToDrag.style.left = (event.clientX - deltaX) + "px";
        elementToDrag.style.top = (event.clientY - deltaY) + "px";
        
        
        if ((elementToDrag.offsetLeft + elementToDrag.offsetWidth) > (that.contentWindow.offsetWidth - 30)) {
            elementToDrag.style.left = right + "px";
        }
        if ((elementToDrag.offsetTop + elementToDrag.offsetHeight) > (that.contentWindow.offsetHeight - 30)) {
            elementToDrag.style.top = hej + "px";
        }
        if (elementToDrag.offsetLeft <= 3) {
            elementToDrag.style.left = 3 + "px";
        }
        if (elementToDrag.offsetTop <= 3) {
            elementToDrag.style.top = 3 + "px";
        }
        if (event.stopPropagation) { // DOM level 2
            event.stopPropagation();
        }
        else { // IE
            event.cancelBubble = true;
        }
    }
    function whenUp(event){
        if (!event) { // IE
            event = window.event;
        }
        
        // Avregistrerar eventlisteners
        if (document.removeEventListener) { // DOM Level 2 event model
            document.removeEventListener("mousemove", whenDrag, true);
            document.removeEventListener("mouseup", whenUp, true);
        }
        else 
            if (document.detachEvent) { // IE5+	
                elementToDrag.releaseCapture();
                elementToDrag.detachEvent("onmousemove", whenDrag);
                elementToDrag.detachEvent("onmouseup", whenUp);
                elementToDrag.detachEvent("onlosecapture", whenUp);
            }
            else { // IE4
                document.onmousemove = olduphandler;
                document.onmouseup = oldmovehandler;
            }
        if (event.stopPropagation) { // DOM level 2
            event.stopPropagation();
        }
        else { // IE
            event.cancelBubble = true;
        }
    }
};
desktopApp.scripts.ui.Win.zIndex = 0;
desktopApp.scripts.ui.Win.prototype.checkZindex = function(){
    return ++desktopApp.scripts.ui.Win.zIndex;
};
desktopApp.scripts.ui.Win.top = 0;
desktopApp.scripts.ui.Win.left = 0;
desktopApp.scripts.ui.Win.prototype.placeWindow = function(){

    desktopApp.scripts.ui.Win.top++;
    desktopApp.scripts.ui.Win.left++;
    var top = 0;
    var left = 0;
    top = desktopApp.scripts.ui.Win.top * 30;
    left = desktopApp.scripts.ui.Win.left * 30;
    if (top >= (this.contentWindow.offsetHeight - this.windowWrap.offsetHeight)) {
        top = 30;
        desktopApp.scripts.ui.Win.top = 1;
    }
    if (left >= (this.contentWindow.offsetWidth - this.windowWrap.offsetWidth - 30)) {
        left = 30;
        desktopApp.scripts.ui.Win.left = 1;
    }
    
    return [left, top];
};
desktopApp.scripts.ui.Win.prototype.getMousePosition = function(e){
    var mouseX = 0;
    var mouseY = 0;
    if (!e) {
        var e = window.event;
    }
    if (e.pageX || e.pageY) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    }
    else 
        if (e.clientX || e.clientY) {
            mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
    
    return [mouseX, mouseY];
};
