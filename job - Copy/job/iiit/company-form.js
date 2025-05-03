import { companyAPI } from './api.js';
import { imageService } from './image_implementation.js';
import { displayCompanies } from './script.js';

class CompanyForm {
    constructor() {
        this.form = document.getElementById('companyForm');
        this.modal = document.getElementById('companyModal');
        this.closeBtn = document.querySelector('.close');
        this.addCompanyBtn = document.getElementById('addCompanyBtn');
        this.logoPreview = document.getElementById('logoPreview');
        this.logoInput = document.getElementById('companyLogo');
        this.submitBtn = document.getElementById('submitCompany');
        this.cancelBtn = document.getElementById('cancelCompany');

        if (!this.form || !this.modal || !this.closeBtn || !this.addCompanyBtn || !this.submitBtn || !this.cancelBtn) {
            console.error('Required form elements not found');
            return;
        }

        this.init();
    }

    init() {
        // Event listeners
        this.addCompanyBtn.addEventListener('click', () => this.showModal());
        this.closeBtn.addEventListener('click', () => this.hideModal());
        this.cancelBtn.addEventListener('click', () => this.hideModal());
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        if (this.logoInput && this.logoPreview) {
            this.logoInput.addEventListener('change', (e) => this.handleLogoPreview(e));
        }

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
    }

    showModal() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    hideModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
        this.form.reset();
        if (this.logoPreview) {
            this.logoPreview.src = '';
            this.logoPreview.style.display = 'none';
        }
    }

    handleLogoPreview(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.logoPreview.src = e.target.result;
                this.logoPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    }

    validateForm(formData) {
        const errors = [];
        
        if (!formData.get('companyName')) {
            errors.push('Company name is required');
        }
        
        if (!formData.get('companyLocation')) {
            errors.push('Company location is required');
        }
        
        const website = formData.get('companyWebsite');
        if (website && !this.isValidUrl(website)) {
            errors.push('Please enter a valid website URL');
        }

        return errors;
    }

    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        // Disable submit button
        this.submitBtn.disabled = true;
        this.submitBtn.textContent = 'Adding...';
        
        try {
            const formData = new FormData(this.form);
            const errors = this.validateForm(formData);

            if (errors.length > 0) {
                this.showNotification(errors.join(', '), 'error');
                return;
            }

            const companyData = {
                name: formData.get('companyName'),
                location: formData.get('companyLocation'),
                website: formData.get('companyWebsite'),
                type: formData.get('companyType'),
                description: formData.get('companyDescription')
            };

            // Handle logo upload if present
            const logoFile = formData.get('companyLogo');
            if (logoFile && logoFile.size > 0) {
                const optimizedLogo = await imageService.optimizeImage(logoFile);
                companyData.logo = optimizedLogo;
            }

            await companyAPI.addCompany(companyData);
            this.showNotification('Company added successfully!');
            this.hideModal();
            
            // Refresh the companies list
            const companiesContainer = document.getElementById('companies-container');
            if (companiesContainer) {
                await displayCompanies();
            }
        } catch (error) {
            console.error('Error adding company:', error);
            this.showNotification('Failed to add company. Please try again.', 'error');
        } finally {
            // Re-enable submit button
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Add Company';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CompanyForm();
});