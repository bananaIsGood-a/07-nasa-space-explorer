// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// Find the button and gallery container
const getImagesButton = document.querySelector('.filters button');
const gallery = document.getElementById('gallery');

// Find the space fact container
const spaceFact = document.getElementById('spaceFact');

// Find the modal elements
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
let modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalExplanation = document.getElementById('modalExplanation');

// Your NASA API key
const apiKey = 'deCbWWW1NivCQALy3KbDPEgz4agB3gg62mKNDA0i';

// A list of fun space facts to show above the gallery
const spaceFacts = [
  "A day on Venus is longer than a year on Venus.",
  "Neutron stars can spin at a rate of 600 rotations per second.",
  "There are more stars in the universe than grains of sand on Earth.",
  "The footprints on the Moon will stay there for millions of years.",
  "One million Earths could fit inside the Sun.",
  "Space is completely silent because there's no atmosphere to carry sound.",
  "The Sun accounts for 99.8% of the mass in our solar system.",
  "A year on Mercury is just 88 Earth days long.",
  "Saturn's rings are made mostly of ice and rock.",
  "The largest known star, UY Scuti, is over 1,700 times the size of the Sun."
];

// Show a random space fact when the page loads
function showRandomSpaceFact() {
  const randomIndex = Math.floor(Math.random() * spaceFacts.length);
  const fact = spaceFacts[randomIndex];

  spaceFact.innerHTML = `<p>💡 Did You Know? ${fact}</p>`;
}

// Run this once when the page loads
showRandomSpaceFact();

// When the button is clicked, fetch APOD data for the selected date range
getImagesButton.addEventListener('click', () => {
  const startDate = startInput.value;
  const endDate = endInput.value;

  // Show a loading message while we wait for the data to come back
  showLoadingMessage();

  // Build the API URL with our key and date range
  const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

  // Fetch the data from NASA's APOD API
  fetch(apodUrl)
    .then((response) => response.json())
    .then((data) => {
      displayGallery(data);
    });
});

// Replace the gallery content with a loading message
function showLoadingMessage() {
  gallery.innerHTML = `
    <div class="loading">
      <div class="loading-icon">🔄</div>
      <p>Loading space photos...</p>
    </div>
  `;
}

// Build and display the gallery from an array of APOD entries
function displayGallery(images) {
  // Clear out the loading message or any previous gallery items
  gallery.innerHTML = '';

  // Loop through each image object and create a gallery item for it
  images.forEach((image) => {
    const item = document.createElement('div');
    item.classList.add('gallery-item');

    // Some entries are videos instead of images, so we handle them differently
    if (image.media_type === 'video') {
      item.innerHTML = `
        <div class="video-placeholder">
          <div class="video-icon">▶️</div>
          <p>This entry is a video</p>
        </div>
        <p><strong>${image.title}</strong></p>
        <p>${image.date}</p>
      `;
    } else {
      item.innerHTML = `
        <img src="${image.url}" alt="${image.title}" />
        <p><strong>${image.title}</strong></p>
        <p>${image.date}</p>
      `;
    }

    // When this item is clicked, open the modal with its full details
    item.addEventListener('click', () => {
      openModal(image);
    });

    gallery.appendChild(item);
  });
}

// Fill in the modal with the clicked image's (or video's) details and show it
function openModal(image) {
  // Always grab the current modalImage element fresh, since a previous
  // openModal call may have replaced it with a different element via outerHTML
  modalImage = document.getElementById('modalImage');

  // Videos need an embedded iframe instead of an img tag
  if (image.media_type === 'video') {
    modalImage.outerHTML = `<iframe id="modalImage" src="${image.url}" frameborder="0" allowfullscreen></iframe>`;
  } else {
    modalImage.outerHTML = `<img id="modalImage" src="${image.url}" alt="${image.title}" />`;
  }

  // Re-select modalImage again since outerHTML just replaced it in the DOM
  modalImage = document.getElementById('modalImage');

  modalTitle.textContent = image.title;
  modalDate.textContent = image.date;
  modalExplanation.textContent = image.explanation;

  modal.classList.remove('hidden');
}

// Close the modal when the close button is clicked
modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Close the modal when clicking outside the modal content
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
});