/* eslint-disable no-plusplus */

// Handling user-profile toggle
const avatar = document.querySelector('.avatar');

const userCard = document.querySelector('.user-card');

avatar.addEventListener('click', handletoggleUserCard);

// handle toggle user card
function handletoggleUserCard() {
  userCard.style.visibility = 'visible';
}

userCard.addEventListener('mouseenter', () => {
  userCard.style.visibility = 'visible';
});

userCard.addEventListener('mouseleave', () => {
  userCard.style.visibility = 'hidden';
});

avatar.addEventListener('mouseleave', () => {
  userCard.style.visibility = 'hidden';
});
