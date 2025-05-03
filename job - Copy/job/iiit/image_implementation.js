export class ImageService {
    constructor() {
        this.placeholderLogo = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNFNUU3RUIiLz48dGV4dCB4PSI2MCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjUiPkNvbXBhbnk8L3RleHQ+PC9zdmc+';
        this.placeholderAlumni = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNFNUU3RUIiLz48dGV4dCB4PSI2MCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjUiPkFsdW1uaTwvdGV4dD48L3N2Zz4=';
    }

    async checkImageExists(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    getImagePath(path) {
        if (!path) return this.placeholderLogo;
        return path;
    }

    handleCompanyLogo(logoPath) {
        if (!logoPath) return this.placeholderLogo;
        return logoPath;
    }

    handleAlumniPhoto(photoPath) {
        if (!photoPath) return this.placeholderAlumni;
        return photoPath;
    }

    async optimizeImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    // Set canvas dimensions
                    const maxWidth = 200;
                    const maxHeight = 200;
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    // Draw and compress image
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(compressedDataUrl);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
}

export const imageService = new ImageService();

async function implementAlumniImages() {
    const alumniGrid = document.getElementById('alumniGrid');
    if (!alumniGrid) return;

    const alumniData = [
        { id: 1, name: 'Rahul Kumar', batch: '2020', branch: 'CSE', image: 'images/alumni/rahul.jpg' },
        { id: 2, name: 'Priya Sharma', batch: '2019', branch: 'ECE', image: 'images/alumni/priya.jpg' },
        { id: 3, name: 'Amit Patel', batch: '2021', branch: 'CSE', image: 'images/alumni/amit.jpg' },
        { id: 4, name: 'Neha Singh', batch: '2018', branch: 'ECE', image: 'images/alumni/neha.jpg' },
        { id: 5, name: 'Vikram Reddy', batch: '2020', branch: 'CSE', image: 'images/alumni/vikram.jpg' },
        { id: 6, name: 'Sneha Gupta', batch: '2019', branch: 'ECE', image: 'images/alumni/sneha.jpg' },
        { id: 7, name: 'Arjun Kumar', batch: '2021', branch: 'CSE', image: 'images/alumni/arjun.jpg' },
        { id: 8, name: 'Divya Sharma', batch: '2018', branch: 'ECE', image: 'images/alumni/divya.jpg' },
        { id: 9, name: 'Ravi Kumar', batch: '2020', branch: 'CSE', image: 'images/alumni/ravi.jpg' },
        { id: 10, name: 'Anjali Patel', batch: '2019', branch: 'ECE', image: 'images/alumni/anjali.jpg' }
    ];

    alumniGrid.innerHTML = '';

    for (const alumni of alumniData) {
        const imageExists = await imageService.checkImageExists(alumni.image);
        const imagePath = imageExists ? alumni.image : imageService.getImagePath(null);
        
        const card = document.createElement('div');
        card.className = 'alumni-card';
        card.innerHTML = `
            <div class="alumni-image">
                <img src="${imagePath}" alt="${alumni.name}">
            </div>
            <div class="alumni-info">
                <h3>${alumni.name}</h3>
                <p class="alumni-batch">Batch: ${alumni.batch}</p>
                <p class="alumni-branch">Branch: ${alumni.branch}</p>
                <a href="#" class="btn btn-linkedin">View Profile</a>
            </div>
        `;
        alumniGrid.appendChild(card);
    }
}

async function implementCompanyLogos() {
    console.log('Company logos implementation updated to use text-only design');
    
    const companyNames = document.querySelectorAll('.company-name');
    
    companyNames.forEach(name => {
        name.addEventListener('click', function() {
            console.log('Company clicked:', this.textContent);
            
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 500);
        });
    });
}

function savePlaceholderImages() {
    const alumniPlaceholder = imageService.getImagePath(null);
    const alumniLink = document.createElement('a');
    alumniLink.href = alumniPlaceholder;
    alumniLink.download = 'placeholder.jpg';
    alumniLink.click();
    
    const companyPlaceholder = imageService.getImagePath(null);
    const companyLink = document.createElement('a');
    companyLink.href = companyPlaceholder;
    companyLink.download = 'placeholder.png';
    companyLink.click();
}

document.addEventListener('DOMContentLoaded', () => {
    implementAlumniImages();
    implementCompanyLogos();
});