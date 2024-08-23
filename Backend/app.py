from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Replace this with your actual API URL
API_URL = "https://api-ubt.mukuru.com/taurus/v1/resources/pay-out-partners/{payOutPartnerGuid}/locations"

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Get the location input from the user
        location = request.form.get('location')

        # Make the API call (dummy URL and parameters)
        # Replace this with actual API call parameters as needed
        response = requests.get(API_URL.format(payOutPartnerGuid=location))

        if response.status_code == 200:
            # Get the JSON response
            data = response.json()
            return render_template('index.html', data=data)
        else:
            error = "API request failed. Please try again."
            return render_template('index.html', error=error)
    
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
