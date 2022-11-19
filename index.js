var game = {};
var clicked = [];
var won = [];
const maxAttempts = 5;
const cardBack = "./Images/back.jpg";
var attempts = maxAttempts;

startGame();
document.querySelector(".play-btn").addEventListener("click", startGame);
document.querySelector(".reset-btn").addEventListener("click", resetGame);

/* Event listeners & click handlers */

function enableCardListener(){
    for (let i=0; i<12; i++){
        document.querySelectorAll(".cd-img")[i].addEventListener("click", handleClick);
    };
};

function disableCardListener(){
    for (let i=0; i<12; i++){
        document.querySelectorAll(".cd-img")[i].removeEventListener("click", handleClick);
    };
};

function handleClick(evt) {
    let cd = evt.target.id;
    let imgName = "./Images/"+game[cd];
    evt.target.src=imgName;
    evt.target.classList.add("clicked");

    if (clicked.length > 0) {
        if (game[cd] == clicked[1]) {
            //handle matched cards
            updateCollection(clicked[1]);
            setTimeout(hideCard,1500,clicked[0]);
            setTimeout(hideCard,1500,cd);
        }
        else {
            disableCardListener();
            setTimeout(resetCard,1500,cd);
            setTimeout(resetCard,1500,clicked[0]);
            setTimeout(enableCardListener,1500);
        }
        clicked = [];
        attempts--;
        updateAttempts(attempts);
        if (attempts == 0) {
            setTimeout(endGame, 1500);
        }
    } else {
        clicked.push(cd);
        clicked.push(game[cd]);
    }
}

/* Manage collected cards */

function updateCollection(card){
    if (!won.includes(card)){
        let cards=Array.from(document.querySelectorAll(".collected-cd"));
        cards[won.length].src="./Images/"+card;
        won.push(card);
    }
}

function clearCollection(){
    won = [];
    let cards=document.querySelectorAll(".collected-cd");
    cards[0].src="./Images/fuzzy-frame.jpg";
    for (let i=1; i<6; i++){
        cards[i].src="";
    }
}


/* Manage card states */

function getRandomImage(setup){
    let randomIndex = Math.floor(Math.random()*(setup.length));
    return ["img"+setup[randomIndex]+".jpg", randomIndex];
}

function hideCard(cdID){
    document.getElementById(cdID).classList.add("hidden");
}

function resetCard(cdID){
    card = document.getElementById(cdID);
    card.src=cardBack;
    card.classList.remove("hidden");
    card.classList.remove("clicked");
}


/* Manage gamestate */

function startGame(){
    // Deal cards
    attempts = maxAttempts;
    updateAttempts(attempts);
    var setup = [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5];
    for (let i=0; i<12; i++) {
        let keyValue = "cd"+i;
        let randImg = getRandomImage(setup);
        game[keyValue] = randImg[0];
        setup.splice(randImg[1],1);
        resetCard(keyValue);
    }
    enableCardListener();
    console.log(game);
}

function updateAttempts(val){
    document.querySelector(".attempts").innerHTML = "Attempts remaining: "+val;
}

function resetGame(){
    startGame();
    clearCollection();
}

function endGame(){
    alert("Game Over");
    disableCardListener();
}


// images: 204x319