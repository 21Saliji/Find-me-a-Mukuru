function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: -33.936, lng: 18.457 }, // Example coordinates for Mowbray, Cape Town
    });

    // Example marker
    new google.maps.Marker({
        position: { lat: -33.936, lng: 18.457 },
        map,
        title: 'Mowbray',
    });
}

function handleMapError() {
    alert('Failed to load Google Maps. Please try again later.');
}

function setupSearchBar() {
    document.querySelector('.search-bar button').addEventListener('click', () => {
        const selectElement = document.querySelector('#country-select');
        const selectedValue = selectElement.value;

        if (selectedValue) {
            console.log('Selected location:', selectedValue);
        }
    });
}
document.addEventListener('DOMContentLoaded', setupSearchBar);

if (!window.speechSynthesis) {
    console.error('SpeechSynthesis not supported');
    return;
}


function speech() {
    const dropdown = document.getElementById('country-select');

    if (!dropdown) {
        console.error('Dropdown element not found!');
        return;
    }

    // Check if speech synthesis is supported
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

        console.log('Selected option text:', selectedOptionText); // Debugging line

        const utterance = new SpeechSynthesisUtterance(selectedOptionText);

        // Optional: Configure the utterance properties
        utterance.rate = 1; // Normal speed
        utterance.pitch = 1; // Default pitch
        utterance.volume = 1; // Full volume

        // Log utterance being spoken
        utterance.onstart = () => console.log('Speaking:', selectedOptionText);
        utterance.onerror = (event) => console.error('Speech synthesis error:', event.error);

        // Speak the text
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
