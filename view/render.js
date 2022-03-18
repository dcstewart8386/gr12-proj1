// Set up the stage and layer
let stage = new Konva.Stage({
    container: 'konvaCanvas',
    width: window.innerWidth,
    height: window.innerHeight
});

let layer;
function render() {
    stage.destroyChildren()
    layer = new Konva.Layer()
    stage.add(layer)
    
    // Add a grid while developing
    addGrid(Konva, layer) 

    renderPlayerHand()
    renderComputerHand()
    renderDiscardPile()
    renderDeck()

}


function renderPlayerHand() {
    for (let i = 0; i < model.playerHand.length; i++) {
        let cardImage = new Konva.Image({
            x: i*80,
            y: 0,
            image: getRawCardImage(model.playerHand[i]), 
            draggable: true,
        })
        layer.add(cardImage)

        // Add event listeners
        cardImage.on('dragstart', handleDragCardStart)
        cardImage.on('dragend', function() {
            handleDragCardEnd(cardImage, i)
        })
    }
}

function renderComputerHand() {
    for (let i = 0; i < model.compHand.length; i++) {
        let image = rawCardBackImage
        if (i == model.compActiveCardIndex) {
            image = getRawCardImage(model.compHand[i])
        }
        let cardImage = new Konva.Image({
            x: i*80,
            y: 500,
            image: image
        })
        layer.add(cardImage)
        if (i == model.compActiveCardIndex) {
            setTimeout(function() { 
                animateComputerPlay(cardImage) 
            }, 500)
        }
    }
}

function renderDiscardPile() {

    // We just need to show the top card
    let topCard = getShowingCard()
    let cardImage = new Konva.Image({
        x: 250,
        y: 250,
        image: getRawCardImage(topCard)
    })
    layer.add(cardImage)
}

function renderDeck() {
    let cardImage = new Konva.Image({
        x: 350,
        y: 250,
        image: rawCardBackImage
    })
    cardImage.on('click', handleDeckClick)
    layer.add(cardImage)
}

function animateComputerPlay(cardImage) {
    cardImage.moveToTop()
    let tween = new Konva.Tween({
        node: cardImage,
        x: 250,
        y: 250,
        duration: 0.5,
        onFinish: endComputerTurn
    })
    tween.play()
}

function animateDealToComputer() {
    let cardImage = new Konva.Image({
        x: 350,
        y: 250,
        image: rawCardBackImage
    })
    layer.add(cardImage)

    cardImage.moveToTop()
    let tween = new Konva.Tween({
        node: cardImage,
        x: model.compHand.length * 80,
        y: 500,
        duration: 0.5,
        onFinish: endComputerDeal
    })
    tween.play()
}

// function renderDealPlayerCard(layer) {
//     let card = model.deck[0]
//     let cardImage = new Konva.Image({
//         x: 370,
//         y: 230,
//         image: getRawCardImage(card.value, card.suit),
//         draggable: true
//     })
//     layer.add(cardImage)
//     cardImage.moveToTop()

//     let tween = new Konva.Tween({
//         node: cardImage,
//         x: model.playerHand.length * 80,
//         y: 0,
//         duration: 0.5,
//         onFinish: dealCardToPlayer
//     })
//     tween.play()
// }
