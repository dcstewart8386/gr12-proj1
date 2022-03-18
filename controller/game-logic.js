

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

function startComputerTurn() {
    model.state = "compStartTurn"
    let showingCard = getShowingCard()
    for (let i = 0; i < model.compHand.length; i++) {
        let curCard = model.compHand[i]
        if (showingCard.suit == curCard.suit) {
            compPlay(i)
            return
        }
        if (showingCard.value == curCard.value) {
            compPlay(i)
            return
        }
    }
    animateDealToComputer()
}

function compPlay(handIndex) {
    model.compActiveCardIndex = handIndex
    render()
}

function endComputerTurn() {
    let cardArr = model.compHand.splice(model.compActiveCardIndex, 1)
    let card = cardArr[0]
    model.discardPile.push(card)
    model.state = "playerTurn"
    model.compActiveCardIndex = -1
    render()
}

function endComputerDeal() {
    let card = model.deck.pop()
    model.compHand.push(card)
    render()
    setTimeout(startComputerTurn, 500)
}