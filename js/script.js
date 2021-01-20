function myFunction() {
    document.getElementById("demo").innerHTML = "Genevieve Hope Johnson will you be a bridesmaid?";
}

var colorNumberSlider = document.getElementById("ColorNumberRange");
var displayNumberColors = document.getElementById("NumberOfColors");
var colors = []
var colorsLeft = 0;
displayNumberColors.innerHTML = colorNumberSlider.value;
colorNumberSlider.oninput = function () {
    displayNumberColors.innerHTML = this.value;
}


function shuffle(array) { 
    for (var i = array.length - 1; i > 0; i--) {  
     
        // Generate random number  
        var j = Math.floor(Math.random() * (i + 1)); 
                     
        var temp = array[i]; 
        array[i] = array[j]; 
        array[j] = temp; 
    } 
         
    return array; 
 } 
 

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    var tmp = 'A';
    for (var i = 0; i < 3; i++) {
      tmp = letters[Math.floor(Math.random() * 16)];
      color += tmp;
      color += tmp;
    }
    return color;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var colorCodeDiv = document.getElementById(data);
    var colorCode = colorCodeDiv.innerHTML;
    var ourIndex = Number(event.target.id.slice(-1));
    var ourColor = ""
    for (var x=0; x < colors.length; x++) {
        var color = colors[x];
        if (color[0] == ourIndex) {
            ourColor = color[1];
            break;
        }
    }
    // rn ourColor is the hex number of the in order array, 
    // TODO: change the value of ourColor to be the actual hexcode value instead of the one at the indexed position

    if (colorCode == ourColor) {
        event.target.innerHTML = colorCode;
        colorCodeDiv.style.display = "none";
        colorsLeft -= 1;
        if (colorsLeft == 0) {
            // game is over
            gameOver();
        }
    }

}

function startGame() {
    var numColors = Number(colorNumberSlider.value);
    var colorBlocks = document.getElementById("ColorBlocks");
    var colorCodes = document.getElementById("ColorCodes");
    var instructions = document.getElementById("Instructions")
    var colorBlocksHtml = "";
    var colorCodesHtml = "";
    colors = [];
    var tmpColors = [];
    for(var x=0; x < numColors; x++){
        color = getRandomColor();
        while (tmpColors.includes(color)) {
            color = getRandomColor();
        }
        colors.push([x, color])
        tmpColors.push(color);
        colorsLeft += 1;
        colorBlocksHtml += '<div id="block' + x + '" ondrop="drop(event)" ondragover="allowDrop(event)" class=colorblock style="background-color:'+color+'"></div>'
        //colorCodesHtml += '<div id="code' + x + '" draggable="true" ondragstart="drag(event)" class=colorcode>'+color+'</div>';
    }
    colors = shuffle(colors)
    for(var y=0; y < colors.length; y++){

        colorCodesHtml += '<div id="code' + y + '" draggable="true" ondragstart="drag(event)" class=colorcode>'+colors[y][1]+'</div>';
    }
    colorBlocks.innerHTML = colorBlocksHtml;
    colorCodes.innerHTML = colorCodesHtml;
    instructions.innerHTML ="<p>Drag the hex codes onto the corresponding colored boxes. If it's correct it will work. If not, it won't.</p>"
    
}
document.getElementById("startgamebutton").onclick = startGame;

function gameOver() {
    alert("Will you be my bridesmaid, Genny?!!");
}