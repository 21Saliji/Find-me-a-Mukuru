// Initialize the map
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: -33.936, lng: 18.457 }, // Default coordinates
    });
}

function updateMap(centerCoordinates, title) {
    map.setCenter(centerCoordinates);
    new google.maps.Marker({
        position: centerCoordinates,
        map,
        title,
    });
}

function handleMapError() {
    alert('Failed to load Google Maps. Please try again later.');
}

function setupSearchBar() {
    document.querySelector('.search-bar button').addEventListener('click', async () => {
        const selectElement = document.querySelector('#country-select');
        const selectedValue = selectElement.value;

        if (selectedValue) {
            console.log('Selected location:', selectedValue);
<<<<<<< HEAD
            
            try {
                const response = await fetch(`http://127.0.0.1:5000/get_partners?country=${selectedValue}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        // Example: Center map on the first partner's location (if available)
                        const firstPartner = data[0];
                        updateMap({ lat: parseFloat(firstPartner.latitude), lng: parseFloat(firstPartner.longitude) }, firstPartner.name);
                    } else {
                        alert("No partners found for this country.");
                    }
                } else {
                    alert('Failed to fetch partners.');
                }
            } catch (error) {
                console.error('Error fetching partners:', error);
                alert('Error fetching partners. Please try again later.');
            }
=======
            window.location.href = '/blank-page';
>>>>>>> 6ccd88d830684ce71ae79af77a584817b2ff6620
        }
    });
}

document.addEventListener('DOMContentLoaded', setupSearchBar);

function speech() {
    const dropdown = document.getElementById('country-select');

    if (!dropdown) {
        console.error('Dropdown element not found!');
        return;
    }

    if (!window.speechSynthesis) {
        console.error('SpeechSynthesis not supported by this browser.');
        return;
    }

    dropdown.addEventListener('change', function() {
        const selectedOptionText = dropdown.options[dropdown.selectedIndex].text;

        if (!selectedOptionText) {
            console.error('No text found for the selected option.');
            return;
        }

        console.log('Selected option text:', selectedOptionText);

        const utterance = new SpeechSynthesisUtterance(selectedOptionText);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => console.log('Speaking:', selectedOptionText);
        utterance.onerror = (event) => console.error('Speech synthesis error:', event.error);

        window.speechSynthesis.speak(utterance);
    });
}

document.addEventListener('DOMContentLoaded', speech);

function help() {
    const helpButton = document.querySelector('.need-help');
    
    if (helpButton) {
        helpButton.addEventListener('click', function() {
            window.location.href = 'https://www.mukuru.com/sa/help-support/';
        });
    } else {
        console.warn('Element with class "need-help" not found.');
    }
}

document.addEventListener('DOMContentLoaded', help);

// Initialize the map
window.onload = function() {
    if (typeof google !== 'undefined') {
        initMap();
    } else {
        handleMapError();
    }
};

// Chatbot functionality
document.getElementById('chatbot-toggle').addEventListener('click', function() {
    document.querySelector('.chatbot-container').style.display = 'flex';
    this.style.display = 'none';
});

document.getElementById('close-chatbot').addEventListener('click', function() {
    document.querySelector('.chatbot-container').style.display = 'none';
    document.getElementById('chatbot-toggle').style.display = 'block';
});

document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput) {
        addMessage(userInput, 'user-message');
        generateBotResponse(userInput);
        document.getElementById('user-input').value = '';
    }
});

function addMessage(message, className) {
    const messageContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(className);
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function generateBotResponse(userInput) {
    const botResponses = {
        'hi': 'Hello! How can I help you today?',
        'how are you': 'I am just a bot, but I’m here to assist you!',
        'bye': 'Goodbye! Have a great day!',
    };

    const response = botResponses[userInput.toLowerCase()] || 'Sorry, I didn’t understand that.';
    setTimeout(() => addMessage(response, 'bot-message'), 500);
}
