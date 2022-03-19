function handleDragCardStart(event) {
    let cardImage = event.target // Gets a reference to the card being dragged
    cardImage.moveToTop(); // Make sure our card stays above any other cards currently in play

    // We need to save the location of the card when the drag begins, so that if the player 
    // drags it to an invalid location we know where to move it back to
    cardImage.dragStartX = cardImage.x()
    cardImage.dragStartY = cardImage.y()
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
            x: cardImage.dragStartX,
            y: cardImage.dragStartY,
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