// ui.js

function showLoading() {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';
}

function hideLoading() {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'none';
}

function updateLocationForm(option) {
    const locationForm = document.getElementById('location-form');
    const title = document.getElementById('form-title');

    if (option === 'payIn') {
        title.textContent = 'Enter Pay In Details';
    } else if (option === 'payOut') {
        title.textContent = 'Enter Pay Out Details';
    }

    locationForm.style.display = 'block';
}

function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError() {
    const errorElement = document.getElementById('error-message');
    errorElement.style.display = 'none';
    errorElement.textContent = '';
}

function updateUIAfterResponse(locations) {
    if (locations.length > 0) {
        const resultInfo = document.getElementById('result-info');
        resultInfo.innerHTML = `
            <h5>Location: ${locations[0].name}</h5>
            <p>Address: ${locations[0].address}</p>
        `;
        resultInfo.style.display = 'block';
    } else {
        showError('No locations found for the provided details.');
    }
}

export { showLoading, hideLoading, updateLocationForm, showError, clearError, updateUIAfterResponse };