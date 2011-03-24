/**
 * Memory - Labb 3
 * Hans Bentlöv
 */
var desktopApp = desktopApp || {};
desktopApp.scripts = desktopApp.scripts || {};
desktopApp.scripts.ui = desktopApp.scripts.ui || {};
desktopApp.scripts.Memory = function(text, icon, size){

    desktopApp.scripts.ui.Win.call(this, text, icon, size);
    this.renderWindow();
    var that = this;
    this.squares = [];
    this.clicked = [];
    this.turns = 0;
    this.count = 0;
    this.rows = 3;
    this.cols = 4;
    
    this.squares = desktopApp.scripts.Random(this.rows, this.cols);
    
    var wrap = document.createElement("div");
    wrap.className = "wrap";
    
    this.board = document.createElement("div");
    this.board.className = "board";
    
    this.counter = document.createElement("div");
    this.counter.className = "counter";
    
    this.countLeft = document.createElement("div");
    this.countLeft.className = "countLeft";
    
    var clear = document.createElement("div");
    clear.className = "clear";
    this.windowContent.appendChild(wrap);
    wrap.appendChild(this.board);
    wrap.appendChild(this.counter);
    wrap.appendChild(this.countLeft);
    
    // Loopar ut brickorna
    for (var x = 0, len = this.squares.length; x < len; ++x) {
        this.createSquare(x);
    }
    this.board.appendChild(clear);
};

desktopApp.scripts.Memory.prototype = new desktopApp.scripts.ui.Win();
desktopApp.scripts.Memory.prototype.createSquare = function(squareID){
    var that = this;
    //Skapar HTML/CSS för en bricka
    var squarelink = document.createElement("a");
    squarelink.href = "#";
    squarelink.className = "square";
    //var board = document.getElementById("board");
    this.board.appendChild(squarelink);
    
    // Sätter onclickevent på brickan
    squarelink.onclick = function(){
        that.turnSquare(this, squareID);
        return false;
    };
};

desktopApp.scripts.Memory.prototype.turnSquare = function(squarelink, squareID){
    var that = this;
    
    // Vänd om antal klick är mindre än 2
    if (squarelink.className === "square") {
        this.clicked.push(this.squares[squareID]);
        if (this.clicked.length < 3) {
            squarelink.className = "square s" + this.squares[squareID];
            this.clicks++;
            if (this.clicked.length === 2) {
                this.checkSquares();
            }
        }
    }
};

// Funktion som kontrollerar de två klickade brickorna
desktopApp.scripts.Memory.prototype.checkSquares = function(){
    var that = this;
    
    if (this.clicked[0] === this.clicked[1]) {
    
        this.clicked = [];
        this.count++;
        this.countTurns();
        this.countsLeft();
    }
    else {
        // Vänder tillbaka de senast vända brickorna
        setTimeout(function(){
            for (var i = 0; i < that.board.getElementsByTagName("a").length; i++) {
                if (that.board.getElementsByTagName("a")[i].className === "square s" + that.clicked[0] ||
                that.board.getElementsByTagName("a")[i].className === "square s" + that.clicked[1]) {
                    that.board.getElementsByTagName("a")[i].className = "square";
                }
            }
            that.clicked = [];
        }, 1000);
        this.countTurns();
        this.countsLeft();
    }
    if (this.count === (this.rows * this.cols) / 2) {
        alert("Grattis! Det tog dig  " + this.turns + " försök att klara memoryt!");
        this.count = 0;
    }
};
desktopApp.scripts.Memory.prototype.countTurns = function(){
    this.turns++;
    //var counter = document.getElementById("counter");
    this.counter.innerHTML = "";
    this.counter.appendChild(document.createTextNode(this.turns + " drag"));
};
desktopApp.scripts.Memory.prototype.countsLeft = function(){
    //var countLeft = document.getElementById("countLeft");
    this.countLeft.innerHTML = "";
    this.countLeft.appendChild(document.createTextNode((((this.rows * this.cols) / 2) - this.count) + " par kvar"));
    
};
/*
 window.onload = function(){
 new Memory();
 new Memory();
 new Memory();
 new Memory();
 }
 */
