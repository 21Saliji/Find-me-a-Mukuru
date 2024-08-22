import requests
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/location/<string:location>', methods=['GET'])
def get_location_address(location):
    # API endpoint and authentication details (if needed)
    base_url = 'https://api-ubt.mukuru.com/taurus/v1/resources/pay-out-partners?=orange'
    locations_url_template = 'https://api-ubt.mukuru.com/taurus/v1/resources/pay-out-partners/{payOutPartnerGuid}/locations'

    # Find the partner based on the provided location (e.g., city or country)
    response = requests.get(base_url)
    data = response.json()
    # matching_partner = next((partner for partner in data['items'] if location in partner['countryCodes']), None)
    # Case-insensitive search for location in countryCodes
    matching_partner = next((partner for partner in data['items'] if location.lower() in [country.lower() for country in partner['countryCodes']]), None)

    if matching_partner:
        payout_partner_guid = matching_partner['guid']
        location = ', '.join(matching_partner['countryCodes'])

        # Make a separate API call to retrieve locations for the partner
        locations_url = locations_url_template.format(base_url=base_url, payOutPartnerGuid=payout_partner_guid)
        locations_response = requests.get(locations_url)  # Assuming no authentication is needed for this endpoint

        # Parse locations data to extract address (logic depends on API response structure)
        if locations_response.status_code == 200:
            locations_data = locations_response.json()
            # ... (implement logic to extract address from locations_data)
            address = "..."  # Replace with the extracted address
            return jsonify(location=location, address=address)
        else:
            return jsonify(error="Error retrieving locations", status=locations_response.status_code)
    else:
        return jsonify(error="Location not found", status=404)

if __name__ == '__main__':
    app.run(debug=True)