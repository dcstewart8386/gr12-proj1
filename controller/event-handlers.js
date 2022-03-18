

function handleDragCardStart(event) {
    let cardImage = event.target
    cardImage.moveToTop();
    cardImage.prevX = cardImage.x()
    cardImage.prevY = cardImage.y()
}

function handleDragCardEnd(cardImage, handIndex) {

    if (isOverDiscardPile(cardImage) && isPlayerMoveValid(handIndex)) {
        playerPlay(handIndex)
        setTimeout(handleComputerTurn, 500)
        render()
    }
    else {
        let tween = new Konva.Tween({
            node: cardImage,
            x: cardImage.prevX,
            y: cardImage.prevY,
            duration: 0.2
        })
        tween.play()
    }     
}

function handleDeckClick() {

    // Do nothing if it's not the player's turn
    if (model.state !== "playerTurn")
        return;

    dealCardToPlayer()
    render()
}

function handleComputerTurn() {
    compPlay()
    render()
}