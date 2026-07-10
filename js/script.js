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
      // For now, just log the data so we can see what we get back
      console.log(data);
    });
});