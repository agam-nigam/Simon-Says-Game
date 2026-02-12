const heading = document.querySelector("h2");
const buttons = document.querySelectorAll(".btn");

const colors = ["pink", "orange", "teal", "blue"];

let gameSeq = [];
let userSeq = [];

let level = 0;
let started = false;
let myTurn = false;
let maxScore = 0;

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
    if (started) return;

    started = true;
    startBtn.style.display = "none";
    
    levelUp();
});

function levelUp() {
    userSeq = [];
    myTurn = false;
    level++;

    heading.innerText = `Level ${level}`;

    // update scores
    maxScore = Math.max(maxScore, level);
    document.getElementById("current").innerText = level;
    document.getElementById("highest").innerText = maxScore;

    // pick random color
    const randColor = colors[Math.floor(Math.random() * colors.length)];
    gameSeq.push(randColor);

    const btn = document.querySelector(`.${randColor}`);
    
    btnFlash(btn);
    clickSound(); 

    setTimeout(() => {
        myTurn = true;
    }, 400);
}

buttons.forEach(btn => {
    btn.addEventListener("click", function () {
        if (!myTurn) return;

        const color = this.id;
        userSeq.push(color);

        btnFlash(this);
        clickSound();

        checkAns(userSeq.length - 1);
    });
});

function checkAns(idx) {
    if (userSeq[idx] !== gameSeq[idx]) {
        gameOver();
        return;
    }

    if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 900);
    }
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function clickSound() {
    new Audio("audios/click-sound.mp3").play();
}

function wrongSound() {
    new Audio("audios/fail.mp3").play();
}

function gameOver() {
    heading.innerHTML = `Game Over! Score: ${level - 1}`;

    document.body.style.backgroundColor = "red";
    setTimeout(() => {
        document.body.style.backgroundColor = "";
    }, 200);

    wrongSound();

    document.getElementById("current").innerText = "0";

    startBtn.style.display = "inline-block";
    reset();
}

function reset() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}