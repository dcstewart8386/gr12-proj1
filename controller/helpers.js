function isPlayerMoveValid(handIndex) {
    playerCard = model.playerHand[handIndex]
    showingCard = getShowingCard()

    if (model.state != "playerTurn")
        return false

    if (playerCard.suit == showingCard.suit)
        return true

    if (playerCard.value == showingCard.value)
        return true

    if (playerCard.value == 8)
        return true

    return false
}

function isOverDiscardPile(cardImage) {
    if (cardImage.x() < 230 || cardImage.x() > 270)
        return false
    if (cardImage.y() < 230 || cardImage.y() > 270)
        return false
    return true
}