const API_BASE_URL = 'http://localhost:5001';  


export async function fetchPartners(country) {
    try {
        const url = `${API_BASE_URL}/get_partners?country=${encodeURIComponent(country)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch partners');
        }
        const data = await response.text(); 
        document.getElementById('partners-container').innerHTML = data; 
    } catch (error) {
        console.error('Error fetching partners:', error);
    }
}


export async function fetchLocations(partnerGuid) {
    try {
        const url = `${API_BASE_URL}/get_locations?partner_guid=${encodeURIComponent(partnerGuid)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch locations');
        }
        const data = await response.text(); 
        document.getElementById('locations-container').innerHTML = data; 
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
}