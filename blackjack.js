let cardsEl = document.getElementById("Cards")
let sumEl = document.getElementById("Sum")
let reportEl = document.getElementById("report")
let firstButtonEl = document.getElementById("firstButton")
let secondButtonEl = document.getElementById("secondButton")
let sum = 0
let blackjack = 21
let gameStatusEl = document.getElementById("gameStatus")
let cards = []
let retryIconEl = document.getElementById('retryIcon')

let firstClickCount = 0

function getRandomCard(){
    let randomNumber = Math.floor(Math.random() * 13 + 1)
    if (randomNumber > 10){
        return 10
    }else if(randomNumber === 1){
        return 11
    }else{ 
        return randomNumber
    }
}

function reload(){
    reportEl.textContent = "Want to play a round?"
    cards = []
    cardsEl.textContent = "Cards: "
    sum = 0
    sumEl.textContent = "Sum: "
    gameStatusEl.textContent = "Game Status: "
    firstButtonEl.textContent = "START GAME"
    firstClickCount = 0
    firstButtonEl.disabled = false
    secondButtonEl.disabled = false
}
function start(){
   
    if (firstButtonEl.textContent === "START GAME"  ){
        reportEl.textContent = "It's a new game"
        firstButtonEl.textContent = "FIRST CARDS"
        firstClickCount += 1
        
    }else{ 
        let card1 = getRandomCard()
        let card2 = getRandomCard()
        cards.push(card1, card2)
        cardsEl.textContent += cards.join(" , ")
        firstClickCount += 1
        sum = card1 + card2
        sumEl.textContent += " " + sum
    }
    if (firstClickCount >= 2) {
        firstButtonEl.disabled = true
    }
    
    gameStatus()
}

function newCard(){
    if (firstButtonEl.disabled === true){
        let card3 = getRandomCard()
        cards.push(card3)
        cardsEl.textContent = "Cards: " + cards.join(" , ")
        secondButtonEl.disabled = true
        sum += card3
        sumEl.textContent = "Sum: " + sum
    }
    else if (cardsEl.textContent === "Cards: " && reportEl.textContent === "It's a new game"){
        reportEl.textContent = "Generate first two cards" 
    }else if (reportEl.textContent === "Want to play a round?"){ 
        reportEl.textContent = "Start game"
    }
    gameStatusEl.textContent = "Game Status: "
    gameStatus()
}

function gameStatus(){
     if (sum >0 && sum < 21){
        gameStatusEl.textContent += "You can pick a new card!"
        secondButtonEl.disabled = false
    }else if (sum == 21){
        gameStatusEl.innerHTML += "You hit blackjack!  <br> <br> <span id='retryIcon'>&#8635;</span> <br> New game "
        secondButtonEl.disabled = true
        document.getElementById('retryIcon').addEventListener('click', reload)
    }else if (sum > 21){
        gameStatusEl.innerHTML += "You're out of the game  <br> <br> <span id='retryIcon'>&#8635;</span> <br> Retry " 
        secondButtonEl.disabled = true
        document.getElementById('retryIcon').addEventListener('click', reload)
    }
}

