//TODO: BUGS:
//click on the opposite teams piece to move, it disapears 

var allTiles = [];
window.scrollTo(500, 900);
drawAll();
addAllUserTiles();

var pieceToPlay = null;
var placeSelected = null;
var isWhitesTurn = true;
var whitePlayCount = 0;
var blackPlayCount = 0;
var whitePlayedBee = false;
var blackPlayedBee = false;
var gamePlaying = true;
var boardPlaceSelected = null;
var board = [];
var isMoving = false;



document.getElementById("canvas").addEventListener("click", placeClickedOn, false);

function newPieceClickedToPlay() {
    if (isWhitesTurn && this.id == "white") {
        pieceToPlay = this;
    } else if (!isWhitesTurn && this.id == "black") {
        pieceToPlay = this;
    } else {
        pieceToPlay = null;
    }
}

function placeClickedOn(e) {
    var xPosition = e.pageX;
    var yPosition = e.pageY;

    //boardPlaceSelected = findTileClicked(xPosition, yPosition);
    boardIdSelected = findTileClicked(xPosition, yPosition);
    console.log(boardIdSelected);
    if (pieceToPlay == null) {
        if (isPlaceOnBoardEmpty(boardIdSelected)) {
        }
        else if ((getPieceOnBoard(boardIdSelected).pieceColor == "white" && isWhitesTurn) || getPieceOnBoard(boardIdSelected).pieceColor == "black" && !isWhitesTurn) {
            var button = document.createElement("button");
            button.innerHTML = getPieceOnBoard(boardIdSelected).pieceType;

            if (isWhitesTurn) {
                button.id = "white";
            } else {
                button.id = "black";
            }
            button.value = getPieceOnBoard(boardIdSelected).pieceType;
            pieceToPlay = button;
            if (checkBee()) {
                removeText(findTileFromId(boardIdSelected).leftMidX, findTileFromId(boardIdSelected).leftMidY);
                removePieceFromBoard(boardIdSelected);
                isMoving = true;
            }

        }
    }

    else if (pieceToPlay != null && checkBee() && isPlaceOnBoardEmpty(boardIdSelected)) {
        var theTile = findTileFromId(boardIdSelected);

        if (checkPlace(pieceToPlay.value, boardIdSelected, pieceToPlay.id)) {
            putPieceOnPlace(theTile.leftMidX, theTile.leftMidY);
            var theNewPiece = new pieceOnBoard(pieceToPlay.value, boardIdSelected, pieceToPlay.id);
            board.push(theNewPiece);
            pieceToPlay = null;
            gameUpdate();
        }
    }
}

function checkPlace(piece, place, color) {
    if (whitePlayCount + blackPlayCount == 0) {              //first play
        return true;
    } else if (whitePlayCount + blackPlayCount == 1) {      //second play 
        var target = board[0].placeNumber;
        var piecesAroud = getAllPiecesAroundThisId(place);
        for (var i = 0; i < piecesAroud.length; i++) {
            if (piecesAroud[i] == target) {
                return true;
            }
        }
        return false;
    } else if(!isMoving){                                   //placing a piece
        return checkIfOnlyTouchingItsColor(place, color);
    }else{                                                  //moving a piece
        return true;
    }
}
function getAllPiecesAroundThisId(place) {
    var piecesAroundIt = [];
    piecesAroundIt.push(place + 1);
    piecesAroundIt.push(place - 1);
    if (Math.floor(place / 100) % 2 == 0) {
        piecesAroundIt.push(place - 100);
        piecesAroundIt.push(place + 100);
        piecesAroundIt.push(place - 101);
        piecesAroundIt.push(place + 99);
    } else {
        piecesAroundIt.push(place - 100);
        piecesAroundIt.push(place + 100);
        piecesAroundIt.push(place - 99);
        piecesAroundIt.push(place + 101);
    }
    return piecesAroundIt;
}

function checkIfOnlyTouchingItsColor(place, color) {
    piecesAroundIt = getAllPiecesAroundThisId(place);
    for (var i = 0; i < board.length; i++) {
        if (piecesAroundIt.includes(board[i].placeNumber)) {
            if (board[i].pieceColor != color) {
                return false;
            }
        }
    }
    return true;
}




function checkBee() {
    if ((whitePlayedBee && isWhitesTurn) || (blackPlayedBee && !isWhitesTurn)) {
        return true;
    }
    else if (pieceToPlay.value == "bee") {
        if (pieceToPlay.id == "white") {
            whitePlayedBee = true;
            return true;
        } else {
            blackPlayedBee = true;
            return true;
        }
    } else if ((isWhitesTurn && whitePlayCount < 3) || (blackPlayCount < 3 && !isWhitesTurn)) {
        return true;
    } else {
        return false;
    }
}

function gameUpdate() {
    if (!isWhitesTurn) {
        document.getElementById("whoseTurn").innerHTML = "Black's turn";
        whitePlayCount = whitePlayCount + 1;
    } else {
        document.getElementById("whoseTurn").innerHTML = "White's turn";
        blackPlayCount = blackPlayCount + 1;
    }
    isMoving = false;
}



function removeText(pieceLeftMidX, pieceLeftMidY) {
    var c = document.getElementById('canvas');
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "#c0c0c0";
    ctx.rect(pieceLeftMidX + 2, pieceLeftMidY - 7, 75, 7);
    ctx.fillStyle = "#c0c0c0";
    ctx.fill();
    ctx.stroke();
}



function putPieceOnPlace(xVal, yVal) {
    var canvas = document.querySelector('#canvas').getContext('2d'), side = 0, size = 50, x = xVal, y = yVal;
    /////////////////////
    var elem = document.getElementById('canvas');
    elemLeft = elem.offsetLeft;
    elemTop = elem.offsetTop;
    context = elem.getContext('2d');
    /////////////////////////
    canvas.font = "13px Arial";
    canvas.fillStyle = pieceToPlay.id;
    canvas.fillText(pieceToPlay.value, xVal + 5, yVal);
    if (pieceToPlay.style != null) {
        pieceToPlay.disabled = true;
        pieceToPlay.style.backgroundColor = "#7FFF00";
    }
    if (isWhitesTurn) {
        isWhitesTurn = false;
    } else {
        isWhitesTurn = true;
    }

}

function isPlaceOnBoardEmpty(idNumber) {
    for (var i = 0; i < board.length; i++) {
        if (board[i].placeNumber == idNumber) {
            return false;
        }
    }
    return true;
}

function getPieceOnBoard(idNumber) {
    for (var i = 0; i < board.length; i++) {
        if (board[i].placeNumber == idNumber) {
            return board[i];
        }
    }
}

function removePieceFromBoard(idNumber) {
    for (var i = 0; i < board.length; i++) {
        if (board[i].placeNumber == idNumber) {
            board.splice(i, 1);
        }
    }
}


function findTileClicked(x, y) {
    for (var i = 0; i < allTiles.length; i++) {
        if (allTiles[i].leftTopX < x && allTiles[i].rightTopX > x && allTiles[i].leftTopY < y && allTiles[i].leftBotY > y) {
            return allTiles[i].keyNum;
        }
    }
}

function findTileFromId(num) {
    for (var i = 0; i < allTiles.length; i++) {
        if (allTiles[i].keyNum == num) {
            return allTiles[i];
        }
    }
}

class pieceOnBoard {
    constructor(type, place, color) {
        this.pieceType = type;
        this.placeNumber = place;
        this.pieceColor = color;
    }
}


function hexTile(keyNum) {

    var rightOver = Math.floor(keyNum / 100);
    var amountDown = (keyNum % 100);
    if (rightOver % 2 == 0) {
        if (rightOver == 0) {
            rightOver = 0;
        } else {
            rightOver = rightOver / 2;
        }
        this.leftMidX = 9 + (160 * rightOver);
        this.leftMidY = 60 + (90 * (amountDown - 1));
        this.rightMidX = 110 + (160 * rightOver);
        this.rightMidY = 60 + (90 * (amountDown - 1));
        this.leftTopX = 34 + (160 * rightOver);
        this.leftTopY = 16 + (90 * (amountDown - 1));
        this.rightTopX = 83 + (160 * rightOver);
        this.rightTopY = 16 + (90 * (amountDown - 1));
        this.leftBotX = 34 + (160 * rightOver);
        this.leftBotY = 100 + (90 * (amountDown - 1));
        this.rightBotX = 85 + (160 * rightOver);
        this.rightBotY = 100 + (90 * (amountDown - 1));
    } else {
        if (rightOver == 1) {
            rightOver = 0;
        } else {
            rightOver = (rightOver - 1) / 2;
        }
        this.leftMidX = 90 + (160 * (rightOver));
        this.leftMidY = 104 + (90 * (amountDown - 1));
        this.rightMidX = 188 + (160 * (rightOver));
        this.rightMidY = 103 + (90 * (amountDown - 1));
        this.leftTopX = 114 + (160 * (rightOver));
        this.leftTopY = 60 + (90 * (amountDown - 1));
        this.rightTopX = 163 + (160 * (rightOver));
        this.rightTopY = 60 + (90 * (amountDown - 1));
        this.leftBotX = 113 + (160 * (rightOver));
        this.leftBotY = 145 + (90 * (amountDown - 1));
        this.rightBotX = 164 + (160 * (rightOver));
        this.rightBotY = 146 + (90 * (amountDown - 1));

    }

    this.keyNum = keyNum;
    this.tileType = "empty";
}


function addAllUserTiles() {
    var body = document.getElementById("tilesBarWhite");
    addTileButton("spider", body, "white");
    addTileButton("spider", body, "white");
    addTileButton("beetle", body, "white");
    addTileButton("beetle", body, "white");
    addTileButton("bee", body, "white");
    addTileButton("grasshopper", body, "white");
    addTileButton("grasshopper", body, "white");
    addTileButton("grasshopper", body, "white");
    addTileButton("ant", body, "white");
    addTileButton("ant", body, "white");
    addTileButton("ant", body, "white");
    var body = document.getElementById("tilesBarBlack");
    addTileButton("spider", body, "black");
    addTileButton("spider", body, "black");
    addTileButton("beetle", body, "black");
    addTileButton("beetle", body, "black");
    addTileButton("bee", body, "black");
    addTileButton("grasshopper", body, "black");
    addTileButton("grasshopper", body, "black");
    addTileButton("grasshopper", body, "black");
    addTileButton("ant", body, "black");
    addTileButton("ant", body, "black");
    addTileButton("ant", body, "black");
}

function addTileButton(name, body, color) {
    var button = document.createElement("button");
    button.innerHTML = name;
    button.id = color;
    body.appendChild(button);
    button.value = name;
    button.addEventListener("click", newPieceClickedToPlay);
}


function drawAll() {
    x1 = 50;
    x2 = 130;
    num = 1;
    for (var i = 0; i < 50; i++) {
        drawRow(x1, 50, num);
        drawRow(x2, 95, (num + 100));
        x1 = x1 + 160;
        x2 = x2 + 160;
        num = num + 200;
    }
}
function drawRow(xVal, yVal, num) {
    count = num;
    x = xVal;
    y = yVal;
    for (var i = 0; i < 50; i++) {
        drawHex(x, y, count);
        y = y + 90;
        count = count + 1;
    }
}

function drawHex(xCor, yCor, count) {
    var canvas = document.querySelector('#canvas').getContext('2d'), side = 0, size = 50, x = xCor, y = yCor;
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


