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

// Find the modal elements
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalExplanation = document.getElementById('modalExplanation');

// Your NASA API key
const apiKey = 'deCbWWW1NivCQALy3KbDPEgz4agB3gg62mKNDA0i';

// When the button is clicked, fetch APOD data for the selected date range
getImagesButton.addEventListener('click', () => {
  const startDate = startInput.value;
  const endDate = endInput.value;

  // Build the API URL with our key and date range
  const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

  // Fetch the data from NASA's APOD API
  fetch(apodUrl)
    .then((response) => response.json())
    .then((data) => {
      displayGallery(data);
    });
});

// Build and display the gallery from an array of APOD entries
function displayGallery(images) {
  // Clear out the placeholder or any previous gallery items
  gallery.innerHTML = '';

  // Loop through each image object and create a gallery item for it
  images.forEach((image) => {
    const item = document.createElement('div');
    item.classList.add('gallery-item');

    item.innerHTML = `
      <img src="${image.url}" alt="${image.title}" />
      <p><strong>${image.title}</strong></p>
      <p>${image.date}</p>
    `;

    // When this item is clicked, open the modal with its full details
    item.addEventListener('click', () => {
      openModal(image);
    });

    gallery.appendChild(item);
  });
}

// Fill in the modal with the clicked image's details and show it
function openModal(image) {
  modalImage.src = image.url;
  modalImage.alt = image.title;
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