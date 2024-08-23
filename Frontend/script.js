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
