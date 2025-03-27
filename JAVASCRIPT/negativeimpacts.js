const images = document.querySelectorAll('#news-banner img');
const anchors = document.querySelectorAll('#news-banner a[href]');
let currentImage = 0;

function changeImage() {
    images[currentImage].classList.remove('active');
    currentImage = (currentImage + 1) % images.length;
    images[currentImage].classList.add('active');

    // Update the active-anchor classes
    anchors.forEach((anchor, index) => {
        if (index === currentImage) {
            anchor.classList.add('active-anchor');
        } else {
            anchor.classList.remove('active-anchor');
        }
    });

    // Update the href attributes (External URLs)
    anchors[0].href = images[0].classList.contains('active') ? 'https://www.elle.com.au/fashion/fashion-news/why-is-shein-so-bad-27846/#:~:text=Why%20Is%20Shein,impacts%20of%20microplastics.' : 
                      images[1].classList.contains('active') ? 'https://thefashionglobe.com/zara-can-never-be-sustainable/#:~:text=Zara%E2%80%99s%20Unsustainability%3A%20A,and%20social%20costs.' : 'https://www.brandingmag.com/2019/12/12/hms-greenwashing-short-sighted-and-unethical/#:~:text=Duped,in%20any%20way.';
    anchors[1].href = images[1].classList.contains('active') ? 'https://thefashionglobe.com/zara-can-never-be-sustainable/#:~:text=Zara%E2%80%99s%20Unsustainability%3A%20A,and%20social%20costs.' : 
                      images[0].classList.contains('active') ? 'https://www.elle.com.au/fashion/fashion-news/why-is-shein-so-bad-27846/#:~:text=Why%20Is%20Shein,impacts%20of%20microplastics.' : 'https://www.brandingmag.com/2019/12/12/hms-greenwashing-short-sighted-and-unethical/#:~:text=Duped,in%20any%20way.';
    anchors[2].href = images[2].classList.contains('active') ? 'https://www.brandingmag.com/2019/12/12/hms-greenwashing-short-sighted-and-unethical/#:~:text=Duped,in%20any%20way.' : 
                      images[0].classList.contains('active') ? 'https://www.elle.com.au/fashion/fashion-news/why-is-shein-so-bad-27846/#:~:text=Why%20Is%20Shein,impacts%20of%20microplastics.' : 'https://thefashionglobe.com/zara-can-never-be-sustainable/#:~:text=Zara%E2%80%99s%20Unsustainability%3A%20A,and%20social%20costs.';
}

window.onload = function() {
    images[currentImage].classList.add('active');
    anchors[currentImage].classList.add('active-anchor');

    setTimeout(changeImage, 100);
    setInterval(changeImage, 4000);
};

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
});

var degree = 1800;

let hasSpun = false; // Flag to track if the wheel has been spun
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
    var sections = ['No Luck', 'No Luck', 'No Luck', 'No Luck', 'No Luck', 'No Luck'];

    // Corrected mapping for the sectionIndex to the actual section name
    if (sectionIndex === 0) return sections[5];
    if (sectionIndex === 1) return sections[4];
    if (sectionIndex === 2) return sections[3];
    if (sectionIndex === 3) return sections[2];
    if (sectionIndex === 4) return sections[1];
    if (sectionIndex === 5) return sections[0];
}

function showPopup(section) {
    if (section === 'No Luck') {
        $('#popup-negative').show();
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

document.addEventListener('DOMContentLoaded', function() {
    const returntohomeButton = document.getElementById('show-result-button');

    returntohomeButton.addEventListener('click', function() {
        window.location.href = 'Results.html';
    });
});