/*
 * Webbteknik1
 * Labb 2
 * LabbyMessage
 * Hans Bentlöv
 *
 */
var desktopApp = desktopApp || {};
desktopApp.scripts = desktopApp.scripts || {};
desktopApp.scripts.ui = desktopApp.scripts.ui || {};

desktopApp.scripts.LabbyMessage = function(text, icon, size) {
		desktopApp.scripts.ui.Win.call(this, text, icon, size);
		this.renderWindow();
		var that = this;
		this.messages = [];
		var content = document.getElementById("content");
		
		/* Skapar all HTML-kod för chatten */
		var siteDIV = document.createElement("div");
		siteDIV.className = "site";
		var wrapDiv = document.createElement("div");
		wrapDiv.className = "wrap";


		var h1 = document.createElement("h1");
		var headingSpan = document.createElement("span");
		headingSpan.className = "orange";
		this.chatDIV = document.createElement("div");
		this.chatDIV.className = "chat";

		var textRutorDiv = document.createElement("div");
		textRutorDiv.className = "textRutor";
		var inputDIV = document.createElement("div");
		inputDIV.className = "input";
		var termsP = document.createElement("p");
		var form = document.createElement("form");
		form.name = "labbymessage";
		this.textArea = document.createElement("textarea");
		this.textArea.className = "text";
		this.textArea.onkeypress = function(e){
			if (!e) {
				var e = window.event;
			} // IE-fix
			if (!e.shiftKey) {
				if (e.keyCode === 13) {
					that.createMessage();
					return false;
				}
			}
		};		
		this.textArea.onmousedown = function(e){
			that.textArea.innerHTML = "";
		};
		var inputButton = document.createElement("input");
		inputButton.type = "button";
		inputButton.value = "Skriv";
		inputButton.className = "submit";
		inputButton.onclick = function(e){
			that.createMessage();
			return false;
		};
		
		/* Placerar HTML-elementen */
		this.windowContent.appendChild(siteDIV);
		siteDIV.appendChild(wrapDiv);
		
		wrapDiv.appendChild(this.chatDIV);
		this.chatDIV.appendChild(textRutorDiv);
	
		wrapDiv.appendChild(inputDIV);
		inputDIV.appendChild(form);
		form.appendChild(this.textArea);
		this.renderMessages();
		this.textArea.appendChild(document.createTextNode("Skriv in ditt meddelande här!"));
		form.appendChild(inputButton);
	
};
desktopApp.scripts.LabbyMessage.prototype = new desktopApp.scripts.ui.Win();
desktopApp.scripts.LabbyMessage.prototype.createMessage = function () {

    if (this.textArea.value === "") {
        this.focusOnTextArea();
		alert("Du måste skriva någonting!");
        return false;
    }
    var meddelande = new desktopApp.scripts.Message(this.textArea.value, new Date());
    this.messages.push(meddelande);
    this.renderMessages();
};
desktopApp.scripts.LabbyMessage.prototype.clearMessages = function () {
    /* Tar bort alla meddelanden */
    this.chatDIV.innerHTML = "";
};
desktopApp.scripts.LabbyMessage.prototype.renderMessages = function () {

    /* Rensar meddelanden ur divven */
	this.clearMessages();

    /* Rensar textfältet */
    this.textArea.value = "";

    /* Skriver ut alla meddelanden */
    for (var i = 0; i < this.messages.length; i++) {
        this.renderMessage(i);
    }
	this.chatDIV.scrollTop = this.chatDIV.scrollHeight;
    //this.countDIV.innerHTML = "Antal meddelanden: " + this.renderMessageCount();
    this.focusOnTextArea();
};
desktopApp.scripts.LabbyMessage.prototype.renderMessage = function (messageID) {

    /* Skapar de nödvändiga HTML-elementen för varje meddelande */
    var that = this;
	
    var removeNode = document.createElement("a");
    removeNode.href = "#";
    removeNode.title = "Ta bort inlägg!";
    removeNode.className = "closeMessage";

    var timeNode = document.createElement("a");
    timeNode.href = "#";
    timeNode.title = "Tid för inlägg";
    timeNode.className = "timeMessage";

    var divNode = document.createElement("div");
    divNode.className = "message";
    var pNode = document.createElement("p");
    pNode.className = "meddelande";
    var meddelandeRuta = document.createElement("meddelandeRuta");
    meddelandeRuta.clasName = "messageText";	
    var timeStamp = document.createTextNode(this.messages[messageID].getTime());

    /* Placerar elementen */
    this.chatDIV.appendChild(divNode);
    divNode.appendChild(pNode);
    divNode.appendChild(removeNode);
    divNode.appendChild(timeNode);
    pNode.innerHTML = this.messages[messageID].getHTMLText();


    /* Ta bort meddelande ur arrayen vid klick*/
    removeNode.onclick = function () {
        return that.removeMessage(messageID);
    };

    /* Visar tid och datum vid klick*/
    timeNode.onclick = function () {
        alert(that.messages[messageID].getDateTime());
    };
};
desktopApp.scripts.LabbyMessage.prototype.focusOnTextArea = function () {	
    this.textArea.focus();
};
desktopApp.scripts.LabbyMessage.prototype.removeMessage = function (messageID) {
    if (window.confirm("Vill du ta bort meddelandet?")) {
        this.messages.splice(messageID, 1);
        this.renderMessages();
    } else {
        this.focusOnTextArea();
    }
};
desktopApp.scripts.LabbyMessage.prototype.renderMessageCount = function () {
    var count = this.messages.length;	
    if (count === null) {
        return "0";
    } else {
        return count;
    }
};
