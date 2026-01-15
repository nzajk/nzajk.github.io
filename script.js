const track = document.querySelector('[class*="carousel-track"]');
const cards = Array.from(track.querySelectorAll("article"));
let displayCard = document.querySelector(".display-card");

const allCards = [...cards]
const n = allCards.length
const centerIdx = Math.trunc(n / 2)

function updateCards(clickedCard) {
    const newCenter = allCards.indexOf(clickedCard);
    let shift = newCenter - centerIdx;

    // console.log(newCenter, shift)

    // remove current display card
    displayCard.classList.remove('display-card');
    displayCard.classList.add('card');

    // rotate array and DOM
    while (shift != 0) {
        // move based on the image location relative to the center
        if (shift < 0) {
            const lastCard = allCards.pop();
            allCards.unshift(lastCard);
            track.insertBefore(lastCard, track.firstChild);
            shift++;
        } else {
            const firstCard = allCards.shift();
            allCards.push(firstCard);
            track.appendChild(firstCard);
            shift--;
        }
    }

    // set new display card
    displayCard = allCards[centerIdx];
    displayCard.classList.remove('card');
    displayCard.classList.add('display-card');
}

function swapCards(clickedCard) {
    // if clicked card is already center, do nothing
    if (clickedCard === cards[centerIdx]) return;

    // find clicked card index
    const clickedCardIdx = cards.indexOf(clickedCard);

    // swap array elements
    const tmp = cards[centerIdx];
    cards[centerIdx] = clickedCard;
    cards[clickedCardIdx] = tmp;

    // update classes
    cards[clickedCardIdx].classList.remove('display-card');
    cards[clickedCardIdx].classList.add('card');

    cards[centerIdx].classList.remove('card');
    cards[centerIdx].classList.add('display-card');

    // reorder DOM
    const parent = clickedCard.parentElement;
    parent.innerHTML = ''; // clear
    cards.forEach(card => parent.appendChild(card)); // append in new order

    // console.log(cards);
}

// attach listeners
cards.forEach(card => {
    if (card.closest(".carousel-track-fashion")) {
        card.addEventListener("click", () => updateCards(card));
    } else if (card.closest(".carousel-track-coding")) {
        card.addEventListener("click", () => swapCards(card));
  }
});
