
let rawCardImages = {};
let rawCardBackImage;

function loadImages() {
    let cardNames = [
        "10-Clubs",
        "10-Diamonds",
        "10-Hearts",
        "10-Spades",
        "2-Clubs",
        "2-Diamonds",
        "2-Hearts",
        "2-Spades",
        "3-Clubs",
        "3-Diamonds",
        "3-Hearts",
        "3-Spades",
        "4-Clubs",
        "4-Diamonds",
        "4-Hearts",
        "4-Spades",
        "5-Clubs",
        "5-Diamonds",
        "5-Hearts",
        "5-Spades",
        "6-Clubs",
        "6-Diamonds",
        "6-Hearts",
        "6-Spades",
        "7-Clubs",
        "7-Diamonds",
        "7-Hearts",
        "7-Spades",
        "8-Clubs",
        "8-Diamonds",
        "8-Hearts",
        "8-Spades",
        "9-Clubs",
        "9-Diamonds",
        "9-Hearts",
        "9-Spades",
        "Ace-Clubs",
        "Ace-Diamonds",
        "Ace-Hearts",
        "Ace-Spades",
        "Jack-Clubs",
        "Jack-Diamonds",
        "Jack-Hearts",
        "Jack-Spades",
        "Joker-Black",
        "Joker-Red",
        "King-Clubs",
        "King-Diamonds",
        "King-Hearts",
        "King-Spades",
        "Queen-Clubs",
        "Queen-Diamonds",
        "Queen-Hearts",
        "Queen-Spades",
    ]

    rawCardBackImage = new Image()
    rawCardBackImage.src = "view/card-images/b1fv.png"

    for (let i = 0; i < cardNames.length; i++) {
        let curName = cardNames[i]
        rawCardImages[curName] = new Image()
        rawCardImages[curName].src = `view/card-images/${curName}.png`
    }

    return Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; })))
}

function getRawCardImage(card) {
    let keyName = `${card.value}-${card.suit}`
    return rawCardImages[keyName]
}