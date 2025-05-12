// script.js
document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.scrolling-container');
  const imagesWrapper = document.querySelector('.images-wrapper');

  // Clone the images to ensure a seamless loop
  const images = Array.from(imagesWrapper.children);
  const imageCount = images.length;

  // Clone images and append to the end of the wrapper
  images.forEach(img => {
    const clone = img.cloneNode(true);
    imagesWrapper.appendChild(clone);
  });

  // Adjust the container's width to accommodate all images
  const imageWidth = images[0].offsetWidth;
  const totalWidth = imageWidth * imagesWrapper.children.length;
  container.style.width = `${totalWidth}px`;
});


let firstCard, secondCard;
        let lockBoard = false;
        let matches = 0;
        const totalMatches = document.querySelectorAll('.card').length / 2;

        function initializeBoard() {
            const gameBoard = document.getElementById('game-board');
            const cards = Array.from(gameBoard.children);

            cards.forEach(card => {
                card.style.order = Math.floor(Math.random() * cards.length);
                card.classList.remove('flipped');
                card.addEventListener('click', flipCard);
            });

            matches = 0; // Reset matches counter
        }

        function flipCard() {
            if (lockBoard || this === firstCard) return;
            this.classList.add('flipped');

            if (!firstCard) {
                firstCard = this;
                return;
            }

            secondCard = this;
            checkForMatch();
        }

        function checkForMatch() {
            const isMatch = firstCard.dataset.name === secondCard.dataset.name;

            isMatch ? disableCards() : unflipCards();
        }

        function disableCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            matches++;

            if (matches === totalMatches) {
                setTimeout(() => {
                    alert('Congratulations! You won!');
                    initializeBoard(); // Restart the game
                }, 500);
            }

            resetBoard();
        }

        function unflipCards() {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetBoard();
            }, 1000);
        }

        function resetBoard() {
            [firstCard, secondCard, lockBoard] = [null, null, false];
        }

        document.addEventListener('DOMContentLoaded', () => {
            initializeBoard();

            document.getElementById('restart').addEventListener('click', initializeBoard);
        });