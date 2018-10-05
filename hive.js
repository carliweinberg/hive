
var allTiles = [];
window.scrollTo(500,900);
drawAll();
addAllUserTiles();

var pieceToPlay = null;
var placeSelected = null;
var isWhitesTurn = true;
var whitePlayCount = 0;
var blackPlayCount = 0;
var whitePlayedBee = false;
var blackPlayedBee = false;

document.getElementById("canvas").addEventListener("click", placeClickedOn, false);

function placeClickedOn(e) {
    var xPosition = e.pageX;
    var yPosition = e.pageY;
    if (pieceToPlay != null && checkBee()){

        findTileClicked(xPosition, yPosition);
        if (placeSelected != null){
            putPieceOnPlace(xPosition, yPosition);
            placeSelected = null;
            pieceToPlay = null;

        } 
        gameUpdate();
    }else{
        findTileClicked(xPosition, yPosition);
        movePlacedPiece(placeSelected);
        gameUpdate();
    }
    
}



function checkBee(){            ////TODO: whitePlayedBee is logging the wrong thing, trying to get it so you have to play the bee within 4
    console.log("checking bee");
    console.log(isWhitesTurn + " ___whose turn");
    console.log(whitePlayedBee + " whited played bee");
    console.log(whitePlayCount);
    if ((whitePlayedBee && isWhitesTurn)|| (blackPlayedBee && !isWhitesTurn)){
        return true;
    }
    else if (pieceToPlay.value = "bee"){
        if(pieceToPlay.id == "white"){
            whitePlayedBee = true;
            return true;
        }else{
            blackPlayedBee = true;
            return true;
        }
    } else if ((isWhitesTurn && whitePlayCount < 4) || (blackPlayCount < 4 && !isWhitesTurn)){
        return true;
    } else{
        console.log("more then 4 and haven't played bee");
        return false;
    }
    
}

function gameUpdate(){
    if (isWhitesTurn){
        document.getElementById("whoseTurn").innerHTML  = "White's turn";
        whitePlayCount = whitePlayCount + 1;
    } else {
        document.getElementById("whoseTurn").innerHTML  = "Black's turn";
        blackPlayCount = blackPlayCount + 1;
    }
}

function movePlacedPiece(thePiece){
    console.log(thePiece);
}

function putPieceOnPlace(xPosition, yPosition){
    var canvas = document.querySelector('#canvas').getContext('2d'),side = 0, size = 50,x = xPosition, y = yPosition;
    /////////////////////
    var elem = document.getElementById('canvas');
    elemLeft = elem.offsetLeft;
    elemTop = elem.offsetTop;
    context = elem.getContext('2d');
    /////////////////////////
    canvas.font = "13px Arial";
    canvas.fillStyle = pieceToPlay.id; 
    canvas.fillText(pieceToPlay.value, placeSelected.leftMidX + 5, placeSelected.leftMidY); ///placeSelectd not 
    pieceToPlay.disabled = true;
    pieceToPlay.style.backgroundColor = "#7FFF00";
    if (isWhitesTurn){
        isWhitesTurn = false;
    } else{
        isWhitesTurn = true;
    }
}

function findTileClicked(x,y){
    for(var i = 0; i <allTiles.length; i++){
        if(allTiles[i].leftTopX < x && allTiles[i].rightTopX > x && allTiles[i].leftTopY < y && allTiles[i].leftBotY >y){
            // if (allTiles[i].type == "empty" ) {
                if(allTiles[i].tileType == "empty"){
                    allTiles[i].tileType = pieceToPlay.value;
                }
                placeSelected = allTiles[i];
            // } else{
            //    placeSelected = null;
            // }
        }
    }
}


function hexTile(keyNum) {
  
    var rightOver = Math.floor(keyNum/100);
    var amountDown = (keyNum % 100);  
    if (rightOver%2 ==0) {
        if(rightOver == 0){
            rightOver = 0;
        } else{
            rightOver = rightOver / 2;
        }
        this.leftMidX= 9 + (160 * rightOver);
        this.leftMidY= 60  + (90 * (amountDown-1));
        this.rightMidX= 110 + (160 * rightOver);
        this.rightMidY = 60  + (90 * (amountDown-1));
        this.leftTopX = 34 + (160 * rightOver);
        this.leftTopY = 16 + (90 *(amountDown-1));
        this.rightTopX= 83 + (160 * rightOver);
        this.rightTopY= 16 + (90 *(amountDown-1));
        this.leftBotX = 34 + (160 * rightOver);
        this.leftBotY = 100 + (90 *(amountDown-1));
        this.rightBotX = 85 + (160 * rightOver);
        this.rightBotY = 100 + (90 *(amountDown-1));
    } else{
        if(rightOver == 1){
            rightOver = 0;
        }else{
            rightOver = (rightOver -1)/2 ;
        }
        this.leftMidX = 90 + (160 * (rightOver));
        this.leftMidY = 104 + (90 *(amountDown-1));
        this.rightMidX= 188 + (160 * (rightOver));
        this.rightMidY = 103  + (90 * (amountDown-1));
        this.leftTopX = 114 + (160 * (rightOver));
        this.leftTopY = 60 + (90 *(amountDown-1));
        this.rightTopX= 163 + (160 * (rightOver));
        this.rightTopY= 60 + (90 *(amountDown-1));
        this.leftBotX = 113 + (160 * (rightOver));
        this.leftBotY = 145 + (90 *(amountDown-1));
        this.rightBotX = 164 + (160 * (rightOver));
        this.rightBotY = 146 + (90 *(amountDown-1));

    }


    this.keyNum = keyNum;
    this.tileType = "empty";
    
}


function addAllUserTiles(){
    var body = document.getElementById("tilesBarWhite");
    addTileButton("spider" , body, "white");
    addTileButton("spider" , body, "white");
    addTileButton("beetle" , body, "white");
    addTileButton("beetle" , body, "white");
    addTileButton("bee", body, "white");
    addTileButton("grasshopper", body, "white");
    addTileButton("grasshopper", body, "white");
    addTileButton("grasshopper", body, "white");
    addTileButton("ant", body, "white");
    addTileButton("ant", body, "white");
    addTileButton("ant", body, "white");
    var body = document.getElementById("tilesBarBlack");
    addTileButton("spider" , body, "black");
    addTileButton("spider" , body, "black");
    addTileButton("beetle" , body, "black");
    addTileButton("beetle" , body, "black");
    addTileButton("bee", body, "black");
    addTileButton("grasshopper", body, "black");
    addTileButton("grasshopper", body, "black");
    addTileButton("grasshopper", body, "black");
    addTileButton("ant", body, "black");
    addTileButton("ant", body, "black");
    addTileButton("ant", body, "black");
}    

function addTileButton(name, body, color){
    var button = document.createElement("button");
    button.innerHTML = name;
    button.id = color;
    body.appendChild(button);
    button.value = name; 
    button.addEventListener ("click", myFunc);
}
    
function myFunc(){
    if (isWhitesTurn && this.id == "white" ){
        pieceToPlay = this;
    } else if (!isWhitesTurn && this.id == "black"){
        pieceToPlay = this;
    }else{
        pieceToPlay = null;
    }
    
}

function drawAll(){
    x1 = 50;
    x2 = 130;
    num = 1;
    for (var i = 0; i < 50; i++){
        drawRow(x1,50, num);             
        drawRow(x2,95, (num + 100));
        x1 = x1 + 160;
        x2 = x2 + 160;
        num = num + 200;
    }
}
function drawRow(xVal, yVal, num){
    count = num;
    x = xVal;
    y = yVal;
    for(var i =0; i <50; i++){ 
        drawHex(x,y, count);
        y= y+90;
        count = count + 1;
    }
}

function drawHex(xCor, yCor, count){
    var canvas = document.querySelector('#canvas').getContext('2d'),side = 0, size = 50,x = xCor, y = yCor;
    canvas.beginPath();
    canvas.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
    
    for (side; side < 7; side++) {
        var val1 = x + size * Math.cos(side * 2 * Math.PI / 6);
        var val2 = y + size * Math.sin(side * 2 * Math.PI / 6);
        canvas.lineTo(val1, val2);
    }
    canvas.fillStyle = "#c0c0c0";;
    canvas.fill();
     var a = new hexTile(count);
    allTiles.push(a);
}


