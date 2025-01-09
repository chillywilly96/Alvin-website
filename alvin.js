fetch('mywork.json')
    .then(response => response.json())
    .then(data => {
        // Add event listeners to the product category
        document.querySelectorAll('.three-videos .product img, .three-videos .product p').forEach((item) => {
            item.addEventListener('click', () => {
                currentCategory = "product";
                mediaItems = [...data[currentCategory]];
                console.log("Product mediaItems:", mediaItems);
                currentMediaIndex = 0;
                modal.style.display = 'block';
                showMedia(currentMediaIndex);
            });
        });

        // Add event listeners to the real-estate category
        document.querySelectorAll('.three-videos .real-estate img, .three-videos .real-estate p').forEach((item) => {
            item.addEventListener('click', () => {
                currentCategory = "real-estate";
                mediaItems = [...data[currentCategory]];
                console.log("Real-estate mediaItems:", mediaItems);
                currentMediaIndex = 0;
                modal.style.display = 'block';
                showMedia(currentMediaIndex);
            });
        });

        // Add event listeners to the artistic category
        document.querySelectorAll('.three-videos .artistic img, .three-videos .artistic p').forEach((item) => {
            item.addEventListener('click', () => {
                currentCategory = "artistic";
                mediaItems = [...data[currentCategory]];
                console.log("Artistic mediaItems:", mediaItems);
                currentMediaIndex = 0;
                modal.style.display = 'block';
                showMedia(currentMediaIndex);
            });
        });
    })
    .catch(error => console.error("Error loading media items:", error));

// Get modal elements
const modal = document.querySelector('.modal');
let modalContentImg = document.getElementById('content-modal');
let modalContentVideo = document.querySelector('.content-video');
const closeModal = document.getElementById('close-modal');
const nextButton = document.getElementById('next2');
const prevButton = document.getElementById('prev2');

let currentMediaIndex = 0;
let mediaItems = [];
let currentCategory = "";
let isTransitioning = false;

// Close modal functionality
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    stopMedia();
});

// Function to stop media playback
function stopMedia() {
    if (modalContentVideo) {
        modalContentVideo.pause();
        modalContentVideo.src = '';
    }
}

// Function to show the current media in the modal
function showMedia(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    const mediaSrc = mediaItems[index];
    const extension = mediaSrc.split('.').pop();

    stopMedia(); // Stop any ongoing media before switching

    if (extension === 'mp4') {
        modalContentImg.style.display = 'none';
        modalContentVideo.style.display = 'block';
        modalContentVideo.src = mediaSrc;
        modalContentVideo.load();
        modalContentVideo.onloadeddata = () => {
            modalContentVideo.play();
            isTransitioning = false;
        };
    } else {
        modalContentVideo.style.display = 'none';
        modalContentImg.style.display = 'block';
        modalContentImg.src = mediaSrc;
        modalContentImg.onload = () => {
            isTransitioning = false;
        };
    }
}

// Show next media
nextButton.addEventListener('click', () => {
    if (mediaItems.length > 0 && !isTransitioning) {
        currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
        showMedia(currentMediaIndex);
    }
});

// Show previous media
prevButton.addEventListener('click', () => {
    if (mediaItems.length > 0 && !isTransitioning) {
        currentMediaIndex = (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
        showMedia(currentMediaIndex);
    }
});


// Existing JS for the Review Section

let currentIndex = 0;
let reviews = [];

// Fetch the reviews from the JSON file
fetch("alvin.json")
    .then(response => response.json())
    .then(data => {
        reviews = data;
        updateReview(); // Load the first review
    })
    .catch(error => console.error("Error loading reviews:", error));

// Update the review content based on the current index
function updateReview() {
    const reviewTitle = document.querySelector(".review-title p");
    const reviewText = document.querySelector(".people-reviews p");

    reviewTitle.textContent = reviews[currentIndex].business;
    reviewText.textContent = reviews[currentIndex].review;
}

// Handle the click event on the left button (Previous review)
document.getElementById("prev").addEventListener("click", function() {
    currentIndex = (currentIndex === 0) ? reviews.length - 1 : currentIndex - 1;
    updateReview();
});

// Handle the click event on the right button (Next review)
document.getElementById("next").addEventListener("click", function() {
    currentIndex = (currentIndex === reviews.length - 1) ? 0 : currentIndex + 1;
    updateReview();
});

// Cambiar video a formato vertical con width 915 px
const presentationVideo = document.querySelector(".presentation-video video");
const horizontalSrc = "./vids/nova.reel.mp4";
const verticalSrc = "./vids/nova.reel.vertical.mp4";

function updateVideoFormat() {
    if (window.innerWidth <= 915) {
        if (presentationVideo.src !== verticalSrc) {
            presentationVideo.src = verticalSrc;
            presentationVideo.load();
        }
    } else {
        if (presentationVideo.src !== horizontalSrc) {
            presentationVideo.src = horizontalSrc;
            presentationVideo.load();
        } 
    }
}

window.addEventListener('load', updateVideoFormat);
window.addEventListener('resize', updateVideoFormat);

// Cambiar text-two a dos lineas con width 915 px y a tres lineas con 428 px
const textTwo = document.querySelector(".text-two");

function updateTextTwo() {
    if (window.innerWidth <= 428) {
        textTwo.innerHTML = "<p>With experience in different styles,<br>portraits and brands, Alvaro has worked<br>and achieved different projects, internationally</p>"
    } else if(window.innerWidth <= 915) {
        textTwo.innerHTML = "<p>With experience in different styles, portraits and brands,<br>Alvaro has worked and achieved different projects, internationally</p>";
    } else {
        textTwo.innerHTML = "<p>With<br>experience<br>in different<br>styles,<br>portraits<br>and brands,<br>Alvaro<br>has worked<br>and achieved<br>different<br>projects,<br>internationally</p>"
    }
}

window.addEventListener('resize', updateTextTwo);
window.addEventListener('load', updateTextTwo);