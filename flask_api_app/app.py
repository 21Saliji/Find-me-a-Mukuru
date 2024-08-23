from flask import Flask, request, render_template, jsonify
import requests

app = Flask(__name__)

# Mock data for partners (replace with actual API call)
partners_data = {
    "ZW": [{"guid": "partner1-guid", "name": "Partner 1 ZW"}, {"guid": "partner2-guid", "name": "Partner 2 ZW"}],
    "MW": [{"guid": "partner3-guid", "name": "Partner 1 MW"}, {"guid": "partner4-guid", "name": "Partner 2 MW"}],
    "ZM": [{"guid": "partner5-guid", "name": "Partner 1 ZM"}, {"guid": "partner6-guid", "name": "Partner 2 ZM"}]
}

@app.route('/get_partners', methods=['GET'])
def get_partners():
    country = request.args.get('country')
    
    if not country:
        return "Country code is required", 400
    
    # API call to get payout partners
    url = "https://api-ubt.mukuru.com/taurus/v1/resources/pay-out-partners"
    params = {
        "Country": country
    }
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        partners = response.json()
        print(partners)
        if not partners:
        # No partners available for the selected country
            return render_template('partners.html', partners=[], country=country, message="No cash collection points available for this country.")
        return render_template('partners.html', partners=partners, country=country)
    else:
        return "Failed to retrieve partners", response.status_code


@app.route('/get_locations', methods=['GET'])
def get_locations():
    partner_guid = request.args.get('partner_guid')
    
    if not partner_guid:
        return "Partner GUID is required", 400
    
    # API call to get payout locations linked to the selected partner
    url = f"https://api-ubt.mukuru.com/taurus/v1/resources/pay-out-partners/{partner_guid}/locations"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raises an error for 4XX/5XX responses
        locations = response.json()
        return render_template('locations.html', locations=locations)
    except requests.exceptions.HTTPError as err:
        return f"HTTP error occurred: {err}", response.status_code
    except requests.exceptions.RequestException as err:
        return f"Error occurred: {err}", 500


@app.route('/')
def home():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, port=5001)

