const CLICK_LEFT = 0;
const CLICK_RIGHT = 2;
let playerX = false;
let playerO = false;
let cases = document.getElementsByClassName("case");

for(const square of cases) {
    square.addEventListener('mouseup', function(event) {
        switch(event.button) {
            case CLICK_LEFT:
                insertPlayerText(this, "X");
                break;

            case CLICK_RIGHT:
                insertPlayerText(this, "O")
                break;
        }
        checkCases();
    });
}

function checkCases() {
    playerX = checkHorizontal("X");
    playerO = checkHorizontal("O");
    if(!playerX && !playerO) {
        playerX = checkVertical("X");
        playerO = checkVertical("O")
        if (!playerX && !playerO) {
            playerX = checkDiagonal("X");
            playerO = checkDiagonal("O");
        }
    }
    if (playerX) {
        document.getElementById("won").innerHTML = "Le joueur 1 à gagné (X)!";
    }
    else if (playerO) {
        document.getElementById("won").innerHTML = "Le joueur 2 à gagné (O)!";
    }
}

//Un vérification horizontale.
function checkHorizontal(player) {
    for (let idx = 0; idx <= 8; idx += 3) {
        if (cases[idx].innerHTML === player && cases[idx+1].innerHTML === player && cases[idx+2].innerHTML === player) {
            return true;
        }
    }
    return false;
}

//Une vérification verticale.
function checkVertical(player) {
    for (let idx = 0; idx <= 2; idx ++) {
        if (cases[idx].innerHTML === player && cases[idx+3].innerHTML === player && cases[idx+6].innerHTML === player) {
            return true;
        }
    }
    return false;
}

//Une verification diagonale.
function checkDiagonal(player) {
    if (cases[0].innerHTML === player && cases[4].innerHTML === player && cases[8].innerHTML === player) {
        return true;
    }
    else if (cases[2].innerHTML === player && cases[4].innerHTML === player && cases[6].innerHTML === player) {
        return true;
    }
    return false;
}

//Insère une lettre dans le div .case
function insertPlayerText(element, playerChar) {
    if (!playerX && !playerO) {
        if (element.innerHTML.length === 0) {
            element.innerHTML = playerChar;
            element.style.backgroundImage = 'url(Capture.PNG)';
        }
    }
}

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

document.getElementById("reset").addEventListener("click", function () {
    for (let square of cases) {
        square.innerHTML = "";
    }
    playerO = playerX = false; //playerO et playerX sont faux !
    document.getElementById("won").innerHTML = "";
})