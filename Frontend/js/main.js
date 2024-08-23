import { showPayInForm, showPayOutForm, displayConfirmation } from './ui.js';
import { fetchPayoutLocations, confirmPayout } from './api.js';

document.addEventListener('DOMContentLoaded', () => {

    const payInButton = document.getElementById('pay-in-button');
    const payOutButton = document.getElementById('pay-out-button');
    const submitButton = document.getElementById('submit-button');
    
    payInButton.addEventListener('click', () => {
        showPayInForm();
    });

    payOutButton.addEventListener('click', () => {
        showPayOutForm();
    });

    submitButton.addEventListener('click', async () => {
        const transactionDetails = gatherFormInputs();
        
        const locations = await fetchPayoutLocations(transactionDetails);
        
        displayLocationsOnMap(locations);
    });

    document.getElementById('locations-list').addEventListener('click', async (event) => {
        const selectedLocation = event.target.dataset.locationId;
        
        const confirmation = await confirmPayout(selectedLocation, transactionDetails);
        
        displayConfirmation(confirmation);
    });

});

function gatherFormInputs() {
    return {
        amount: document.getElementById('amount-input').value,
        currency: document.getElementById('currency-select').value,
        locationType: document.getElementById('location-type-select').value,
        address: document.getElementById('address-input').value,
        zipCode: document.getElementById('zip-code-input').value,
        city: document.getElementById('city-input').value
    };
}
