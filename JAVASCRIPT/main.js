document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded'); // Target the body element
});

const images = document.querySelectorAll('.fashion-banner img');
let currentImage = 0;
let hasSpun = false; // Flag to track if the wheel has been spun

function changeImage() {
    images[currentImage].classList.remove('active');
    currentImage = (currentImage + 1) % images.length;
    images[currentImage].classList.add('active');
}

window.onload = function() {
    images[currentImage].classList.add('active'); // Ensure initial image is active

    // Initial change after 800ms
    setTimeout(changeImage, 800);

    // Change every 4000ms afterwards
    setInterval(changeImage, 4000);
};

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    let cardFlipped = false; // Flag to track if any card has been flipped

        // Add click event listener to each card
        cards.forEach(card => {
            card.addEventListener('click', () => {
                if (!cardFlipped) {
                    // Flip the card and set the flag
                    card.classList.toggle('flipped');
                    cardFlipped = true;
                }
                // If a card is already flipped, do nothing for other cards
            });
        });
});

var degree = 1800;

$(document).ready(function() {
    $('#spin').on('click', function() {
        if (hasSpun) { // Prevent multiple spins
            return;
        }
        hasSpun = true; // Set flag to true after the spin

        var extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
        var totalDegree = degree + extraDegree;

        $('#inner-wheel').css({
            'transform': 'rotate(' + totalDegree + 'deg)'
        });

        // Determine the winning section after the spin
        setTimeout(function() {
            var winningSection = getWinningSection(totalDegree);
            showPopup(winningSection);
        }, 6250); // Adjust timeout to match the CSS transition duration
    });

    // Close pop-up function
    $('.close-popup').on('click', function() {
        $(this).closest('.popup').hide();
    });
});

function getWinningSection(degree) {
    var normalizedDegree = degree % 360;
    var sectionAngle = 360 / 6; // 6 sections
    var adjustedDegree = normalizedDegree + (sectionAngle / 2); // Shift by half a section
    var sectionIndex = Math.floor(adjustedDegree / sectionAngle) % 6; // Wrap around if needed
    
    // Adjust sectionIndex based on your wheel layout
    var sections = ['No Luck', '$5 OFF', 'No Luck', '$10 OFF', 'No Luck', '$1 OFF'];

    // Corrected mapping for the sectionIndex to the actual section name
    if (sectionIndex === 0) return sections[5];
    if (sectionIndex === 1) return sections[4];
    if (sectionIndex === 2) return sections[3];
    if (sectionIndex === 3) return sections[2];
    if (sectionIndex === 4) return sections[1];
    if (sectionIndex === 5) return sections[0];
}

function showPopup(section) {
    if (section === '$10 OFF') {
        $('#popup-10').show();
    } else if (section === '$5 OFF') {
        $('#popup-5').show();
    } else if (section === '$1 OFF') {
        $('#popup-1').show();
    }
}

const Hours = document.getElementById('hours');
const Minutes = document.getElementById('minutes');
const Seconds = document.getElementById('seconds');

let targetDate; // Declare targetDate globally

function startTimer() {
    targetDate = new Date().getTime() + (60 * 60 * 1000); // 1 hour from now
    updateTimer(); // Run immediately
    setInterval(updateTimer, 1000); // Run every second
}

function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000)) % 60;

    Hours.innerHTML = hours < 10 ? "0" + hours : hours;
    Minutes.innerHTML = minutes < 10 ? "0" + minutes : minutes;
    Seconds.innerHTML = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
        Hours.innerHTML = "00";
        Minutes.innerHTML = "00";
        Seconds.innerHTML = "00";
        startTimer(); // Restart the timer when it reaches 0
    }

    console.log(hours + ":" + minutes + ":" + seconds);
}

startTimer(); // Start the initial timer