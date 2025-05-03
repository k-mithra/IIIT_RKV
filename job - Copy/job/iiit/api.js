// API Service for Companies
const API_BASE_URL = 'http://localhost:5000/api';

// Mock data for companies
let mockCompanies = [
    {
        id: 1,
        name: "Google",
        location: "Mountain View, CA",
        website: "https://www.google.com",
        type: "IT",
        description: "A multinational technology company specializing in Internet-related services and products.",
        logo: "images/Google.png"
    },
    {
        id: 2,
        name: "Microsoft",
        location: "Redmond, WA",
        website: "https://www.microsoft.com",
        type: "IT",
        description: "A multinational technology corporation that develops, manufactures, licenses, supports, and sells computer software.",
        logo: "images/Microsoft.jpeg"
    },
    {
        id: 3,
        name: 'Amazon',
        location: 'Seattle, WA',
        website: 'https://www.amazon.com',
        type: 'IT',
        description: 'An American multinational technology company focusing on e-commerce, cloud computing, and artificial intelligence.',
        logo: "images/Amezon.jpeg"
    }
];

export const companyAPI = {
    async fetchCompanies() {
        try {
            const response = await fetch(`${API_BASE_URL}/companies`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.warn('Using mock data due to API connection error:', error);
            return mockCompanies;
        }
    },
    
    async addCompany(companyData) {
        try {
            const response = await fetch(`${API_BASE_URL}/companies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(companyData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.warn('Using mock data due to API connection error:', error);
            // Generate a new ID for the mock company
            const newId = Math.max(...mockCompanies.map(c => c.id)) + 1;
            const newCompany = {
                id: newId,
                ...companyData
            };
            mockCompanies.push(newCompany);
            return newCompany;
        }
    },

    async updateCompany(id, companyData) {
        try {
            const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(companyData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating company:', error);
            throw error;
        }
    },

    async deleteCompany(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('Error deleting company:', error);
            throw error;
        }
    }
}; 