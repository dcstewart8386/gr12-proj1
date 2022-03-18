

function dealCardToPlayer() {
    let card = model.deck.pop()
    model.playerHand.push(card)
}

function playerPlay(handIndex) {
    let cardArr = model.playerHand.splice(handIndex, 1)
    let card = cardArr[0]
    model.discardPile.push(card)
    model.state = "compTurn"
}


function compPlay() {
    // This will start an infinite loop
    while (true) {

        // This "if" statement will call the "compTryPlay" function, then use its
        // return value to determine if we should return from this function or keep
        // on looping
        if (compTryPlay()) {
            return
        }
        dealCardToComp() // If we get here, the computer has no valid card to play
    }
}

function compTryPlay() {
    let showingCard = getShowingCard()
    for (let i = 0; i < model.compHand.length; i++) {
        let curCard = model.compHand[i]
        if (showingCard.suit == curCard.suit) {
            compUseCard(i)
            return true
        }
        if (showingCard.value == curCard.value) {
            compUseCard(i)
            return true
        }
    }
    return false // Didn't find a valid card to play
}

function compUseCard(i) {
    let cardArr = model.compHand.splice(model.compActiveCardIndex, 1)
    let card = cardArr[0]
    model.discardPile.push(card)
    model.state = "playerTurn"
}

function dealCardToComp() {
    let card = model.deck.pop()
    model.compHand.push(card)
}