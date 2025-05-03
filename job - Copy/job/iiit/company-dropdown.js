// Import API functions
import { companyAPI } from './api.js';

// Mock data for companies
const mockCompanies = [
    { name: 'Google' },
    { name: 'Microsoft' },
    { name: 'Amazon' },
    { name: 'Intel' },
    { name: 'IBM' },
    { name: 'Qualcomm' },
    { name: 'Oracle' },
    { name: 'Texas Instruments' },
    { name: 'Accenture' },
    { name: 'Cisco' },
    { name: 'Infosys' },
    { name: 'TCS' },
    { name: 'Wipro' },
    { name: 'Tech Mahindra' },
    { name: 'HCL' },
    { name: 'Capgemini' },
    { name: 'Deloitte' },
    { name: 'EY' },
    { name: 'KPMG' },
    { name: 'PwC' }
];

// Populate the companies dropdown
async function populateCompanies() {
    const dropdown = document.getElementById('selectedCompany');
    if (!dropdown) {
        console.error('Company dropdown element not found');
        return;
    }

    try {
        // Clear existing options
        dropdown.innerHTML = '<option value="">Select Company</option>';

        // Try to fetch companies from API
        let companies;
        try {
            companies = await companyAPI.getCompanies();
            console.log('Fetched companies from API:', companies);
        } catch (error) {
            console.warn('Using mock companies data due to API error:', error);
            companies = mockCompanies;
        }

        // Add companies to dropdown
        companies.forEach(company => {
            const option = document.createElement('option');
            option.value = company.name;
            option.textContent = company.name;
            dropdown.appendChild(option);
        });

        console.log(`Companies dropdown populated with ${companies.length} companies`);
    } catch (error) {
        console.error('Error populating companies dropdown:', error);
        // Fallback to mock data
        populateWithMockData();
    }
}

function populateWithMockData() {
    const dropdown = document.getElementById('selectedCompany');
    if (!dropdown) return;

    // Clear existing options
    dropdown.innerHTML = '<option value="">Select Company</option>';

    // Add mock companies
    mockCompanies.forEach(company => {
        const option = document.createElement('option');
        option.value = company.name;
        option.textContent = company.name;
        dropdown.appendChild(option);
    });

    console.log('Companies dropdown populated with mock data');
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, populating companies dropdown...');
    populateCompanies();
}); 