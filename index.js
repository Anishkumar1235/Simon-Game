let gameseq = [];
let userseq = [];

let btns = ["red", "yellow", "purple", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started === false) {
        console.log("Game is started");
        started = true;
        levelup();
    }
});

function gameFlash(btn) {
    btn.classList.add("Flash");
    setTimeout(function () {
        btn.classList.remove("Flash");
    }, 200);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 200);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // Fixed the random index range
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    console.log(gameseq);
    setTimeout(function () {
        gameFlash(randBtn);
    }, 500); // Added delay before flashing
}

function checkAns(Idx) {
    if (userseq[Idx] === gameseq[Idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your Score was <b>${level}</b><br>Press any key to start.`; // Corrected template literal
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnpress() {
    let btn = this;
    userFlash(btn);

    let usercolor = btn.classList[1]; // Fixed getting the color class
    userseq.push(usercolor);

    checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

// Added initial level display
h2.innerText = "Press any key to start.";