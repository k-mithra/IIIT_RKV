import { imageService } from './image_implementation.js';
import { companyAPI } from './api.js';

// API endpoints
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const placementGrid = document.getElementById('placementGrid');
const internshipGrid = document.getElementById('internshipGrid');
const yearFilter = document.getElementById('yearFilter');
const branchFilter = document.getElementById('branchFilter');
const totalPlacements = document.getElementById('totalPlacements');
const totalCompanies = document.getElementById('totalCompanies');
const avgPackage = document.getElementById('avgPackage');

// Mock data for placements and statistics
const mockPlacements = [
    {
        id: 1,
        company: {
            name: "Google",
            logo: "images/Google.png"
        },
        role: "Software Engineer",
        package: {
            amount: 45,
            currency: "INR"
        },
        studentName: "Rahul Kumar",
        branch: "CSE",
        year: "2023",
        placementType: "FULL_TIME"
    },
    {
        id: 2,
        company: {
            name: "Microsoft",
            logo: "images/Microsoft.jpeg"
        },
        role: "Frontend Developer",
        package: {
            amount: 38,
            currency: "INR"
        },
        studentName: "Priya Sharma",
        branch: "CSE",
        year: "2023",
        placementType: "FULL_TIME"
    },
    {
        id: 3,
        company: {
            name: "Amazon",
            logo: "images/Amezon.jpeg"
        },
        role: "Cloud Engineer",
        package: {
            amount: 42,
            currency: "INR"
        },
        studentName: "Amit Patel",
        branch: "ECE",
        year: "2023",
        placementType: "FULL_TIME"
    },
    {
        id: 4,
        company: {
            name: "TCS",
            logo: "images/tcs.jpeg"
        },
        role: "Software Developer",
        package: {
            amount: 7.5,
            currency: "INR"
        },
        studentName: "Neha Singh",
        branch: "CSE",
        year: "2022",
        placementType: "FULL_TIME"
    },
    {
        id: 5,
        company: {
            name: "Infosys",
            logo: "images/infosys.jpeg"
        },
        role: "Systems Engineer",
        package: {
            amount: 6.5,
            currency: "INR"
        },
        studentName: "Vikram Reddy",
        branch: "ECE",
        year: "2022",
        placementType: "FULL_TIME"
    },
    {
        id: 6,
        company: {
            name: "Wipro",
            logo: "images/Wipro.jpeg"
        },
        role: "Project Engineer",
        package: {
            amount: 5.8,
            currency: "INR"
        },
        studentName: "Sneha Gupta",
        branch: "CSE",
        year: "2022",
        placementType: "FULL_TIME"
    },
    {
        id: 7,
        company: {
            name: "IBM",
            logo: "images/ibm.jpeg"
        },
        role: "Data Science Intern",
        package: {
            amount: 30,
            currency: "INR"
        },
        studentName: "Arjun Kumar",
        branch: "CSE",
        year: "2023",
        placementType: "INTERNSHIP"
    },
    {
        id: 8,
        company: {
            name: "Accenture",
            logo: "images/Accenture.jpeg"
        },
        role: "Business Analyst Intern",
        package: {
            amount: 25,
            currency: "INR"
        },
        studentName: "Divya Sharma",
        branch: "ECE",
        year: "2023",
        placementType: "INTERNSHIP"
    },
    {
        id: 9,
        company: {
            name: "Tech Mahindra",
            logo: "images/techmahi.jpeg"
        },
        role: "Software Developer",
        package: {
            amount: 6.2,
            currency: "INR"
        },
        studentName: "Ravi Kumar",
        branch: "CSE",
        year: "2022",
        placementType: "FULL_TIME"
    },
    {
        id: 10,
        company: {
            name: "HCL",
            logo: "images/Hcl.jpeg"
        },
        role: "Systems Analyst",
        package: {
            amount: 5.5,
            currency: "INR"
        },
        studentName: "Anjali Patel",
        branch: "ECE",
        year: "2022",
        placementType: "FULL_TIME"
    },
    {
        id: 11,
        company: {
            name: "Cognizant",
            logo: "images/cognizant.jpeg"
        },
        role: "Programmer Analyst",
        package: {
            amount: 6.8,
            currency: "INR"
        },
        studentName: "Suresh Reddy",
        branch: "CSE",
        year: "2022",
        placementType: "FULL_TIME"
    },
    {
        id: 12,
        company: {
            name: "Capgemini",
            logo: "images/capgemini.jpeg"
        },
        role: "Software Engineer",
        package: {
            amount: 7.2,
            currency: "INR"
        },
        studentName: "Priya Patel",
        branch: "CSE",
        year: "2022",
        placementType: "FULL_TIME"
    },
    {
        id: 13,
        company: {
            name: "Oracle",
            logo: "images/oracle.jpeg"
        },
        role: "Database Intern",
        package: {
            amount: 35,
            currency: "INR"
        },
        studentName: "Rajesh Kumar",
        branch: "CSE",
        year: "2023",
        placementType: "INTERNSHIP"
    },
    {
        id: 14,
        company: {
            name: "Intel",
            logo: "images/intel.jpeg"
        },
        role: "Hardware Intern",
        package: {
            amount: 40,
            currency: "INR"
        },
        studentName: "Meera Sharma",
        branch: "ECE",
        year: "2023",
        placementType: "INTERNSHIP"
    },
    {
        id: 15,
        company: {
            name: "Qualcomm",
            logo: "images/Qualcome.jpeg"
        },
        role: "Embedded Systems Intern",
        package: {
            amount: 45,
            currency: "INR"
        },
        studentName: "Vikram Singh",
        branch: "ECE",
        year: "2023",
        placementType: "INTERNSHIP"
    }
];

const mockStatistics = {
    totalPlacements: 500,
    totalCompanies: 50,
    avgPackage: 40
};

// Mock data for alumni
const mockAlumni = [
    {
        id: 1,
        name: "Rahul Kumar",
        batch: "2020",
        branch: "CSE",
        company: "Google",
        position: "Senior Software Engineer",
        location: "Mountain View, CA",
        linkedin: "https://linkedin.com/in/rahulkumar",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 2,
        name: "Priya Sharma",
        batch: "2019",
        branch: "ECE",
        company: "Microsoft",
        position: "Product Manager",
        location: "Redmond, WA",
        linkedin: "https://linkedin.com/in/priyasharma",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 3,
        name: "Amit Patel",
        batch: "2021",
        branch: "CSE",
        company: "Amazon",
        position: "Cloud Solutions Architect",
        location: "Seattle, WA",
        linkedin: "https://linkedin.com/in/amitpatel",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 4,
        name: "Neha Singh",
        batch: "2018",
        branch: "ECE",
        company: "Intel",
        position: "Hardware Engineer",
        location: "Santa Clara, CA",
        linkedin: "https://linkedin.com/in/nehasingh",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 5,
        name: "Vikram Reddy",
        batch: "2020",
        branch: "CSE",
        company: "IBM",
        position: "Data Scientist",
        location: "Bangalore, India",
        linkedin: "https://linkedin.com/in/vikramreddy",
        image: "https://via.placeholder.com/150"
    },
    {
        id: 6,
        name: "Sneha Gupta",
        batch: "2019",
        branch: "ECE",
        currentCompany: "Qualcomm",
        position: "Embedded Systems Engineer",
        location: "San Diego, CA",
        linkedin: "https://linkedin.com/in/snehagupta",
        image: "images/alumni/sneha.jpg"
    },
    {
        id: 7,
        name: "Arjun Kumar",
        batch: "2021",
        branch: "CSE",
        currentCompany: "Oracle",
        position: "Database Administrator",
        location: "Austin, TX",
        linkedin: "https://linkedin.com/in/arjunkumar",
        image: "images/alumni/arjun.jpg"
    },
    {
        id: 8,
        name: "Divya Sharma",
        batch: "2018",
        branch: "ECE",
        currentCompany: "Texas Instruments",
        position: "Analog Design Engineer",
        location: "Dallas, TX",
        linkedin: "https://linkedin.com/in/divyasharma",
        image: "images/alumni/divya.jpg"
    },
    {
        id: 9,
        name: "Ravi Kumar",
        batch: "2020",
        branch: "CSE",
        currentCompany: "Accenture",
        position: "Technology Consultant",
        location: "Mumbai, India",
        linkedin: "https://linkedin.com/in/ravikumar",
        image: "images/alumni/ravi.jpg"
    },
    {
        id: 10,
        name: "Anjali Patel",
        batch: "2019",
        branch: "ECE",
        currentCompany: "Cisco",
        position: "Network Engineer",
        location: "San Jose, CA",
        linkedin: "https://linkedin.com/in/anjali patel",
        image: "images/alumni/anjali.jpg"
    }
];

// Mock data for companies
const mockCompanies = [
    {
        id: 1,
        name: "Google",
        location: "Mountain View, CA",
        website: "https://www.google.com",
        type: "IT",
        description: "A multinational technology company specializing in Internet-related services and products.",
        logo: imageService.placeholderLogo
    },
    {
        id: 2,
        name: "Microsoft",
        location: "Redmond, WA",
        website: "https://www.microsoft.com",
        type: "IT",
        description: "A multinational technology corporation that develops, manufactures, licenses, supports, and sells computer software.",
        logo: imageService.placeholderLogo
    },
    {
        id: 3,
        name: 'Amazon',
        location: 'Seattle, WA',
        website: 'https://www.amazon.com',
        type: 'IT',
        description: 'An American multinational technology company focusing on e-commerce, cloud computing, and artificial intelligence.'
    },
    {
        id: 4,
        name: 'Intel',
        location: 'Santa Clara, CA',
        website: 'https://www.intel.com',
        type: 'Manufacturing',
        description: 'An American multinational corporation and technology company that develops and manufactures semiconductor chips.'
    },
    {
        id: 5,
        name: 'IBM',
        location: 'Armonk, NY',
        website: 'https://www.ibm.com',
        type: 'IT',
        description: 'A multinational technology company that provides hardware, software, and consulting services.'
    }
];

// Fetch and display placements
async function fetchPlacements(filters = {}) {
    try {
        const queryParams = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE_URL}/placements?${queryParams}`);
        const placements = await response.json();
        
        // Update statistics
        const statsResponse = await fetch(`${API_BASE_URL}/placements/statistics`);
        const stats = await statsResponse.json();
        
        updateStatistics(stats);
        displayPlacements(placements);
    } catch (error) {
        console.error('Error fetching placements:', error);
    }
}

// Display placements in the grid
function displayPlacements(placements) {
    if (!placementGrid || !internshipGrid) {
        console.error('Placement or internship grid not found');
        return;
    }
    
    // Clear existing content
    placementGrid.innerHTML = '';
    internshipGrid.innerHTML = '';

    console.log('Displaying placements:', placements);
    
    // Add placements to the appropriate grid
    placements.forEach(placement => {
        const card = createPlacementCard(placement);
        
        if (placement.placementType === 'INTERNSHIP') {
            console.log('Adding to internship grid:', placement.studentName, 'Type:', placement.placementType);
            internshipGrid.appendChild(card);
        } else if (placement.placementType === 'FULL_TIME') {
            console.log('Adding to full-time grid:', placement.studentName, 'Type:', placement.placementType);
            placementGrid.appendChild(card);
        } else {
            console.error('Unknown placement type:', placement.placementType, 'for student:', placement.studentName);
        }
    });
    
    const internshipCount = placements.filter(p => p.placementType === 'INTERNSHIP').length;
    const fullTimeCount = placements.filter(p => p.placementType === 'FULL_TIME').length;
    
    console.log(`Displayed ${placements.length} placements (${internshipCount} internships, ${fullTimeCount} full-time)`);
    console.log('Internship grid children:', internshipGrid.children.length);
    console.log('Full-time grid children:', placementGrid.children.length);
}

// Create placement card
function createPlacementCard(placement) {
    const card = document.createElement('div');
    card.className = 'placement-card';
    
    // Add data attributes for filtering
    card.dataset.year = placement.year;
    card.dataset.branch = placement.branch;
    card.dataset.type = placement.placementType;
    
    // Set default image if logo is not available
    const logoUrl = placement.company.logo || 'images/default-company.png';
    
    card.innerHTML = `
        <div class="company-logo">
            <img src="${logoUrl}" alt="${placement.company.name}">
        </div>
        <div class="placement-details">
            <h3>${placement.company.name}</h3>
            <p class="role">${placement.role}</p>
            <p class="package">${placement.package.amount} ${placement.package.currency} LPA</p>
            <p class="student">${placement.studentName} - ${placement.branch}</p>
            <p class="year">${placement.year}</p>
            <p class="type">${placement.placementType === 'INTERNSHIP' ? 'Internship' : 'Full Time'}</p>
        </div>
    `;
    
    return card;
}

// Update statistics
function updateStatistics(stats) {
    totalPlacements.textContent = stats.totalPlacements;
    totalCompanies.textContent = stats.totalCompanies;
    avgPackage.textContent = `${stats.avgPackage} LPA`;
}

// Event listeners for filters
yearFilter.addEventListener('change', () => {
    const filters = {
        year: yearFilter.value,
        branch: branchFilter.value
    };
    fetchPlacements(filters);
});

branchFilter.addEventListener('change', () => {
    const filters = {
        year: yearFilter.value,
        branch: branchFilter.value
    };
    fetchPlacements(filters);
});

// IIIT RGUKT RK Valley - Placements Portal
// Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing components...');
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize dropdowns
    initDropdowns();
    
    // Initialize filters
    initFilters();
    
    // Initialize charts
    initCharts();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize add student form
    initAddStudentForm();
    
    // Initialize add alumni form
    initAddAlumniForm();
    
    // Load mock data
    loadMockData();
    
    console.log('All components initialized successfully');
});

// Load mock data instead of API calls
function loadMockData() {
    console.log('Loading mock data...');
    
    // Update statistics
    updateStatistics(mockStatistics);
    
    // Display placements
    displayPlacements(mockPlacements);
    
    // Display alumni
    displayAlumni(mockAlumni);
    console.log('Total alumni:', mockAlumni.length);
    
    // Display companies
    displayCompanies();
    
    // Populate the companies dropdown
    populateCompanies();
    
    // Set up filter event listeners
    setupFilterListeners();
    
    console.log('Mock data loaded successfully');
    console.log('Available companies:', mockCompanies.map(c => c.name).join(', '));
    console.log('Total placements:', mockPlacements.length);
    console.log('Internships:', mockPlacements.filter(p => p.placementType === 'INTERNSHIP').length);
    console.log('Full-time:', mockPlacements.filter(p => p.placementType === 'FULL_TIME').length);
}

// Display alumni in the grid
function displayAlumni(alumni) {
    const alumniGrid = document.getElementById('alumniGrid');
    
    if (!alumniGrid) {
        console.error('Alumni grid not found');
        return;
    }
    
    // Clear existing content
    alumniGrid.innerHTML = '';
    
    console.log('Displaying alumni:', alumni);
    
    // Add alumni cards
    alumni.forEach(alum => {
        const card = createAlumniCard(alum);
        
        // Add data attributes for filtering
        card.dataset.batch = alum.batch;
        card.dataset.branch = alum.branch;
        
        // Add to grid
        alumniGrid.appendChild(card);
    });
    
    console.log(`Displayed ${alumni.length} alumni`);
    console.log('Alumni grid children:', alumniGrid.children.length);
}

// Create an alumni card
function createAlumniCard(alum) {
    const card = document.createElement('div');
    card.className = 'alumni-card';
    
    // Set default image if not provided
    const imageUrl = alum.image || 'https://via.placeholder.com/150';
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${alum.name}" class="alumni-image">
        <div class="alumni-details">
            <h3>${alum.name}</h3>
            <p>Batch: ${alum.batch}</p>
            <p>Branch: ${alum.branch}</p>
            <p>Company: ${alum.company}</p>
            <p>Position: ${alum.position}</p>
            <p>Location: ${alum.location}</p>
            ${alum.linkedin ? `<a href="${alum.linkedin}" target="_blank" class="linkedin-link">LinkedIn Profile</a>` : ''}
        </div>
    `;
    
    return card;
}

// Display companies in the grid
export async function displayCompanies() {
    const companiesContainer = document.getElementById('companies-container');
    if (!companiesContainer) {
        console.error('Companies container not found');
        return;
    }

    try {
        const companies = await companyAPI.fetchCompanies();
        companiesContainer.innerHTML = '';
        
        if (!Array.isArray(companies)) {
            console.error('Invalid companies data');
            return;
        }

        companies.forEach(company => {
            const companyCard = createCompanyCard(company);
            if (companyCard) {
                companiesContainer.appendChild(companyCard);
            }
        });

        // Update the total companies count
        const totalCompaniesElement = document.getElementById('totalCompanies');
        if (totalCompaniesElement) {
            totalCompaniesElement.textContent = companies.length;
        }
    } catch (error) {
        console.error('Error displaying companies:', error);
    }
}

// Create company card
function createCompanyCard(company) {
    if (!company) {
        console.error('Invalid company data');
        return null;
    }

    const card = document.createElement('div');
    card.className = 'company-card';
    
    const logo = company.logo || imageService.placeholderLogo;
    const website = company.website || '#';
    const location = company.location || 'Location not specified';
    const type = company.type || 'Type not specified';
    const description = company.description || 'No description available';

    card.innerHTML = `
        <div class="company-logo">
            <img src="${logo}" alt="${company.name} logo" onerror="this.src='${imageService.placeholderLogo}'">
        </div>
        <div class="company-info">
            <h3>${company.name}</h3>
            <p class="location">${location}</p>
            <p class="type">${type}</p>
            <p class="description">${description}</p>
            <a href="${website}" class="website-link" target="_blank">Visit Website</a>
        </div>
    `;

    return card;
}

// Set up filter event listeners
function setupFilterListeners() {
    const yearFilter = document.getElementById('yearFilter');
    const branchFilter = document.getElementById('branchFilter');
    const typeFilter = document.getElementById('typeFilter');
    const alumniBranchFilter = document.getElementById('alumniBranchFilter');
    const alumniBatchFilter = document.getElementById('alumniBatchFilter');
    
    if (yearFilter) {
        yearFilter.addEventListener('change', applyFilters);
    }
    
    if (branchFilter) {
        branchFilter.addEventListener('change', applyFilters);
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', applyFilters);
    }
    
    if (alumniBranchFilter) {
        alumniBranchFilter.addEventListener('change', applyAlumniFilters);
    }
    
    if (alumniBatchFilter) {
        alumniBatchFilter.addEventListener('change', applyAlumniFilters);
    }
}

// Apply filters to placements
function applyFilters() {
    const yearFilter = document.getElementById('yearFilter');
    const branchFilter = document.getElementById('branchFilter');
    const typeFilter = document.getElementById('typeFilter');
    
    const yearValue = yearFilter ? yearFilter.value : 'all';
    const branchValue = branchFilter ? branchFilter.value : 'all';
    const typeValue = typeFilter ? typeFilter.value : 'all';
    
    // Filter placements based on selected values
    const filteredPlacements = mockPlacements.filter(placement => {
        const yearMatch = yearValue === 'all' || placement.year === yearValue;
        const branchMatch = branchValue === 'all' || placement.branch.toLowerCase() === branchValue;
        const typeMatch = typeValue === 'all' || placement.placementType === typeValue;
        
        return yearMatch && branchMatch && typeMatch;
    });
    
    // Display filtered placements
    displayPlacements(filteredPlacements);
}

// Apply filters to alumni
function applyAlumniFilters() {
    const alumniBranchFilter = document.getElementById('alumniBranchFilter');
    const alumniBatchFilter = document.getElementById('alumniBatchFilter');
    
    const branchValue = alumniBranchFilter ? alumniBranchFilter.value : 'all';
    const batchValue = alumniBatchFilter ? alumniBatchFilter.value : 'all';
    
    // Filter alumni based on selected values
    const filteredAlumni = mockAlumni.filter(alum => {
        const branchMatch = branchValue === 'all' || alum.branch.toLowerCase() === branchValue;
        const batchMatch = batchValue === 'all' || alum.batch === batchValue;
        
        return branchMatch && batchMatch;
    });
    
    // Display filtered alumni
    displayAlumni(filteredAlumni);
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}

// Dropdown Menus
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (link && menu) {
            // For mobile devices
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    menu.classList.toggle('active');
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    menu.classList.remove('active');
                }
            });
        }
    });
}

// Filter Functionality
function initFilters() {
    const filterGroups = document.querySelectorAll('.filter-group select');
    
    filterGroups.forEach(select => {
        select.addEventListener('change', function() {
            const filterType = this.dataset.filter;
            const filterValue = this.value;
            
            // Get the grid container
            const grid = this.closest('.section').querySelector('.placement-grid, .internship-grid, .alumni-grid');
            
            if (grid) {
                const items = grid.querySelectorAll('.placement-card, .internship-card, .alumni-card');
                
                items.forEach(item => {
                    const itemValue = item.dataset[filterType];
                    
                    if (filterValue === 'all' || itemValue === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });
}

// Charts Initialization
function initCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart !== 'undefined') {
        // Placement Statistics Chart
        const placementCtx = document.getElementById('placementChart');
        if (placementCtx) {
            new Chart(placementCtx, {
                type: 'bar',
                data: {
                    labels: ['2019', '2020', '2021', '2022', '2023'],
                    datasets: [{
                        label: 'Placement Rate (%)',
                        data: [85, 88, 92, 95, 98],
                        backgroundColor: '#1a237e',
                        borderColor: '#0d47a1',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
        
        // Package Distribution Chart
        const packageCtx = document.getElementById('packageChart');
        if (packageCtx) {
            new Chart(packageCtx, {
                type: 'pie',
                data: {
                    labels: ['3-5 LPA', '5-8 LPA', '8-12 LPA', '12+ LPA'],
                    datasets: [{
                        data: [20, 35, 30, 15],
                        backgroundColor: [
                            '#1a237e',
                            '#0d47a1',
                            '#1976d2',
                            '#2196f3'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Validate form
            if (validateForm(data)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    // Show success message
                    showNotification('Message sent successfully!', 'success');
                    
                    // Reset form
                    this.reset();
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
}

// Form Validation
function validateForm(data) {
    let isValid = true;
    const errors = [];
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (minimum 10 characters)');
        isValid = false;
    }
    
    // Show errors if any
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
    }
    
    return isValid;
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Add show class after a small delay for animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.section-header, .placement-card, .internship-card, .alumni-card, .stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize add student form toggle
function initAddStudentForm() {
    const showAddStudentFormBtn = document.getElementById('showAddStudentForm');
    const addStudentForm = document.getElementById('addStudentForm');
    const cancelAddStudentBtn = document.getElementById('cancelAddStudent');
    const newStudentForm = document.getElementById('newStudentForm');
    
    if (showAddStudentFormBtn && addStudentForm) {
        // Show form when button is clicked
        showAddStudentFormBtn.addEventListener('click', function() {
            addStudentForm.style.display = 'block';
            showAddStudentFormBtn.style.display = 'none';
        });
        
        // Hide form when cancel button is clicked
        if (cancelAddStudentBtn) {
            cancelAddStudentBtn.addEventListener('click', function() {
                addStudentForm.style.display = 'none';
                showAddStudentFormBtn.style.display = 'block';
            });
        }
        
        // Handle form submission
        if (newStudentForm) {
            newStudentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get the selected company name from the dropdown
                const companySelect = document.getElementById('selectedCompany');
                const selectedCompanyName = companySelect.options[companySelect.selectedIndex].text;
                
                // Get the placement type
                const placementType = document.getElementById('placementType').value;
                console.log('Selected placement type:', placementType);
                
                // Create a new placement object
                const newPlacement = {
                    id: mockPlacements.length + 1,
                    studentName: document.getElementById('studentName').value,
                    rollNumber: document.getElementById('rollNumber').value,
                    branch: document.getElementById('studentBranch').value,
                    year: document.getElementById('studentYear').value,
                    company: {
                        name: selectedCompanyName,
                        logo: `images/${selectedCompanyName.toLowerCase().replace(/\s+/g, '')}.jpeg`
                    },
                    package: {
                        amount: parseFloat(document.getElementById('package').value),
                        currency: "INR"
                    },
                    role: "Software Engineer", // Default role
                    placementType: placementType
                };

                console.log('Adding new student:', newPlacement);
                
                // Add to mock data
                mockPlacements.push(newPlacement);
                
                // Update the display
                displayPlacements(mockPlacements);
                
                // Update statistics
                updateStatistics({
                    totalPlacements: mockPlacements.length,
                    totalCompanies: new Set(mockPlacements.map(p => p.company.name)).size,
                    avgPackage: mockPlacements.reduce((acc, curr) => acc + curr.package.amount, 0) / mockPlacements.length
                });

                console.log('New student added successfully');
                console.log('Total placements now:', mockPlacements.length);
                console.log('Internships:', mockPlacements.filter(p => p.placementType === 'INTERNSHIP').length);
                console.log('Full-time:', mockPlacements.filter(p => p.placementType === 'FULL_TIME').length);
                
                // Hide the form and show the button
                addStudentForm.style.display = 'none';
                showAddStudentFormBtn.style.display = 'block';
                
                showNotification('Student added successfully');
                newStudentForm.reset();
            });
        }
    }
}

// Initialize add alumni form toggle
function initAddAlumniForm() {
    console.log('Initializing alumni form...');
    
    const showAddAlumniFormBtn = document.getElementById('showAddAlumniForm');
    console.log('Show button found:', !!showAddAlumniFormBtn);
    
    const addAlumniForm = document.getElementById('addAlumniForm');
    console.log('Form found:', !!addAlumniForm);
    
    const cancelAddAlumniBtn = document.getElementById('cancelAddAlumni');
    console.log('Cancel button found:', !!cancelAddAlumniBtn);
    
    const newAlumniForm = document.getElementById('newAlumniForm');
    console.log('New alumni form found:', !!newAlumniForm);
    
    if (!showAddAlumniFormBtn || !addAlumniForm) {
        console.error('Alumni form elements not found');
        return;
    }
    
    console.log('Setting up event listeners for alumni form...');
    
    // Show form when button is clicked
    showAddAlumniFormBtn.addEventListener('click', function() {
        console.log('Add Alumni button clicked');
        addAlumniForm.style.display = 'block';
        showAddAlumniFormBtn.style.display = 'none';
        console.log('Form display style:', addAlumniForm.style.display);
        console.log('Button display style:', showAddAlumniFormBtn.style.display);
    });
    
    // Hide form when cancel button is clicked
    if (cancelAddAlumniBtn) {
        cancelAddAlumniBtn.addEventListener('click', function() {
            console.log('Cancel button clicked');
            addAlumniForm.style.display = 'none';
            showAddAlumniFormBtn.style.display = 'block';
            console.log('Form display style:', addAlumniForm.style.display);
            console.log('Button display style:', showAddAlumniFormBtn.style.display);
        });
    } else {
        console.error('Cancel button not found');
    }
    
    // Handle form submission
    if (newAlumniForm) {
        console.log('Setting up form submission handler...');
        newAlumniForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            // Create a new alumni object
            const newAlumni = {
                id: mockAlumni.length + 1,
                name: document.getElementById('alumniName').value,
                batch: document.getElementById('alumniBatch').value,
                branch: document.getElementById('alumniBranch').value,
                company: document.getElementById('currentCompany').value,
                position: document.getElementById('position').value,
                location: document.getElementById('location').value,
                linkedin: document.getElementById('linkedin').value,
                image: 'https://via.placeholder.com/150' // Default image
            };

            console.log('New alumni data:', newAlumni);
            
            // Add to mock data
            mockAlumni.push(newAlumni);
            
            // Update the display
            displayAlumni(mockAlumni);
            
            console.log('New alumni added successfully');
            console.log('Total alumni now:', mockAlumni.length);
            
            // Hide the form and show the button
            addAlumniForm.style.display = 'none';
            showAddAlumniFormBtn.style.display = 'block';
            
            showNotification('Alumni added successfully', 'success');
            newAlumniForm.reset();
        });
    } else {
        console.error('Alumni form not found');
    }
    
    console.log('Alumni form initialization complete');
}

// API Service
const apiService = {
    async fetchCompanies() {
        try {
            const response = await fetch(`${API_BASE_URL}/companies`);
            if (!response.ok) throw new Error('Failed to fetch companies');
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
            if (!response.ok) throw new Error('Failed to add company');
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
    }
};

// Export the apiService
export { apiService };

// Initialize logout button
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html';
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadMockData();
    setupFilterListeners();
    initMobileMenu();
    initDropdowns();
    initFilters();
    initCharts();
    initContactForm();
    initScrollAnimations();
    initAddStudentForm();
    initAddAlumniForm();
    initLogout();
}); 