userSeq = [];
gameSeq = [];
let level = 0;

let gameBtns = ["pink", "orange", "teal", "blue"];
let startBtn = document.querySelector(".start-btn");

let gameStarted = false;
let isUserTurn = false;

let h2 = document.querySelector("h2");
let hScore = 0;

startBtn.addEventListener("click", () => {
    if (!gameStarted) {
        console.log("Game Started!");
        gameStarted = true;
        startBtn.style.display = "none";
        startSound();
        setTimeout(levelUp, 500);
    }
});

function levelUp() {
    isUserTurn = false;
    level++;
    userSeq = [];
    h2.innerText = `Level ${level}`;

    document.querySelector("#current").innerText = `${level - 1}`;
    hScore = Math.max(hScore, level - 1);
    document.querySelector("#hScore").innerText = `${hScore}`;


    let randIdx = Math.floor(Math.random() * gameBtns.length);
    let randColor = gameBtns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log("game seq: ", gameSeq);

    playSequence();
}

function playSequence() {
    let i = 0;

    let interval = setInterval(() => {
        let color = gameSeq[i];
        let btn = document.querySelector(`.${color}`);
        btnFlash(btn);
        clickSound();
        i++;

        if (i >= gameSeq.length) {
            clearInterval(interval);
            setTimeout(() => {
                isUserTurn = true;
            }, 300);
        }
    }, 600);
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

let allBtns = document.querySelectorAll(".btn");
for (btns of allBtns) {
    btns.addEventListener("click", btnPress);
}

function btnPress() {
    if (!isUserTurn) return;

    let btn = this;
    btnFlash(btn);
    clickSound();

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log("user seq: ", userSeq);

    isValidSeq(userSeq.length - 1);
}

function isValidSeq(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            startSound();
            setTimeout(levelUp, 800);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    h2.innerHTML = `Game Over! Your score was ${level - 1}. <br>Press Start button to start again.`;
    overSound();
    resetGame();
    startBtn.style.display = "inline-block";
}

function resetGame() {
    level = 0;
    gameSeq = [];
    userSeq = [];
    gameStarted = false;
    isUserTurn = false;
    document.querySelector("#current").innerText = "0";
}

function clickSound() {
    new Audio("audios/click-sound.mp3").play();
}

function overSound() {
    new Audio("audios/game-over.mp3").play();
}

function startSound() {
    new Audio("audios/game-start.mp3").play();
}