var desktopApp = desktopApp || {};
desktopApp.scripts = desktopApp.scripts || {};
desktopApp.scripts.ui = desktopApp.scripts.ui || {};

desktopApp.scripts.Message = function(text, date){
	
	this.setText = function(_text){	
		text = _text;		
	};
	this.getText = function(){
		return text;
	};
	this.getDate = function(){
		return date;
	};	
};
desktopApp.scripts.Message.prototype.toString = function(){
	return (this.getText() + ",  " + this.getDate());
};
desktopApp.scripts.Message.prototype.getHTMLText = function(){
	return "<b> [ " + this.getTime() + " ]: </b> " + this.getText().replace(/[\n\r]/g, "<br />");
};
desktopApp.scripts.Message.prototype.getDateText = function(){
	return this.getDate();
};
desktopApp.scripts.Message.prototype.getDateTime = function(){ 
	// Returnerar sträng med År, månad, datum, veckodag, tid 
	
	var year = this.getDate().getFullYear();
	var month = this.getDate().getMonth();
	var day = this.getDate().getDay();
	var date = this.getDate().getDate();
	var hour = this.getDate().getHours();
	var minute = this.getDate().getMinutes();
	var second = this.getDate().getSeconds();
	
	switch (month) {
		case 0:
			month = "Januari";
			break;
		case 1:
			month = "Februari";
			break;
		case 2:
			month = "Mars";
			break;
		case 3:
			month = "April";
			break;
		case 4:
			month = "Maj";
			break;
		case 5:
			month = "Juni";
			break;
		case 6:
			month = "Juli";
			break;
		case 7:
			month = "Augusti";
			break;
		case 8:
			month = "September";
			break;
		case 9:
			month = "Oktober";
			break;
		case 10:
			month = "November";
			break;
		case 11:
			month = "December";
			break;
	}
	switch (day) {
		case 0:
			day = "Måndagen";
			break;
		case 1:
			day = "Tisdagen";
			break;
		case 2:
			day = "Onsdagen";
			break;
		case 3:
			day = "Torsdagen";
			break;
		case 4:
			day = "Fredagen";
			break;
		case 5:
			day = "Lördagen";
			break;
		case 6:
			day = "Söndagen";
			break;
	}
	switch (date){
		case 1:
		date = date + ":a";
		case 2:
		date = date + ":a";
		default:
		date = date + ":e";
	}
	if (hour < 10){
		hour = "0" + hour;
	}
	if (minute < 10){
		minute = "0" + minute;
	}
	if (second < 10){
		second = "0" + second;
	}
	return ("Inlägget skapades " + day + " den " + date + " " + month + " " + year + " klockan " + hour + ":" + minute + ":" + second);
};
desktopApp.scripts.Message.prototype.getTime = function(){
	// Returnerar tid 
	
	var hour = this.getDate().getHours();
	var minute = this.getDate().getMinutes();
	var second = this.getDate().getSeconds();
	
	if (hour < 10){  
		hour = "0" + hour;
	}
	if (minute < 10){
		minute = "0" + minute;
	}
	if (second < 10){
		second = "0" + second;
	}
	return hour + ":" + minute + ":" + second;
};

