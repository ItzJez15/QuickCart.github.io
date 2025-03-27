document.addEventListener('DOMContentLoaded', () => {
    let interactions = JSON.parse(localStorage.getItem('userInteractions')) || {};
    let score = 0;

    // Function to record an interaction and update the score
    function recordInteraction(interactionName) {
        if (!interactions[interactionName]) {
            interactions[interactionName] = true;
            localStorage.setItem('userInteractions', JSON.stringify(interactions));
            score++;
            console.log("Interaction recorded:", interactionName, "Score:", score);
        } else {
            console.log("Interaction already recorded:", interactionName);
        }
    }

    // Add event listeners for each interactive element
    if (document.getElementById('fashion-banner')) {
        document.getElementById('fashion-banner').addEventListener('click', () => {
            console.log("fashion-banner clicked");
            recordInteraction('fashion-banner');
        });
    }

    if (document.getElementById('flip-card')) {
    document.getElementById('flip-card').addEventListener('click', () => {
        console.log("flip-card clicked");
        recordInteraction('flip-card');
    });
    }

    if (document.getElementById('wheel')) {
    document.getElementById('wheel').addEventListener('click', () => {
        console.log("wheel clicked");
        recordInteraction('spin-wheel');
    });
    }

    if (document.getElementById('product-row-flashsales')) {
    document.getElementById('product-row-flashsales').addEventListener('click', () => {
        console.log("product-row-flashsales clicked");
        recordInteraction('flash-sales');
    });
    }

    if (document.getElementById('product-selected-for-you')) {
    document.getElementById('product-selected-for-you').addEventListener('click', () => {
        console.log("product-selected-for-you clicked");
        recordInteraction('selected-for-you');
    });
    }
    if (document.getElementById('suggestions')) {
    document.getElementById('suggestions').addEventListener('click', () => {
        console.log("suggestions clicked");
        recordInteraction('suggestions-for-you');
    });
    }
    if (document.getElementById('you-may-also-like')) {
    document.getElementById('you-may-also-like').addEventListener('click', () => {
        console.log("you-may-also-like clicked");
        recordInteraction('you-may-also-like');
    });
    }
});