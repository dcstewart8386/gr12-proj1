function dealCardToPlayer() {
    let card = model.deck.pop()

    // All JavaScript arrays have a built-in "push" method that will add an item to
    // the end of the array. This is how we handle adding a card to a player's hand
    model.playerHand.push(card)
}

// This function will take one parameter, indicating the index of the card (within the
// player's hand) that the player has chosen to play. The card will be removed from the
// player's hand and added to the discard pile.
function playerPlay(handIndex) {

    // All JavaScript arrays have a built-in "splice" method that will remove and return a 
    // specific chunk of the array. The first parameter indicates where to start the 
    // splice, and the second parameter indicates the length of the splice. In this case,
    // we want to remove the 1 item at "handIndex".
    let cardArr = model.playerHand.splice(handIndex, 1)

    // The splice will have returned an array of length 1, containing the card that was spliced.
    // This next line will give us a reference to that card.
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
    let cardArr = model.compHand.splice(i, 1)
    let card = cardArr[0]
    model.discardPile.push(card)
    model.state = "playerTurn"
}

function dealCardToComp() {
    let card = model.deck.pop()
    model.compHand.push(card)
}