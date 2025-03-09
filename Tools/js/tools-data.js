// Categories data
const categories = [
    {
        id: 'image-tools',
        name: 'Image Tools',
        icon: 'fas fa-images',
        description: 'Convert, resize, compress, and edit images',
        link: 'tools/image-tools/',
        featured: true,
        tools: [
            {
                name: 'Image to PNG Converter',
                description: 'Convert images to PNG format. Supports JPG, JPEG, WebP, GIF, and other formats.',
                link: 'tools/image-tools/image-to-png.html',
                icon: 'fas fa-file-image'
            },
            {
                name: 'Image to JPG Converter',
                description: 'Convert images to JPG format with adjustable quality settings.',
                link: 'tools/image-tools/image-to-jpg.html',
                icon: 'fas fa-file-image'
            },
            {
                name: 'Image Resizer',
                description: 'Resize images by pixels, percentage, or choose from preset sizes.',
                link: 'tools/image-tools/image-resizer.html',
                icon: 'fas fa-expand'
            },
            {
                name: 'Image Compressor',
                description: 'Compress images to reduce file size while maintaining quality.',
                link: 'tools/image-tools/image-compressor.html',
                icon: 'fas fa-compress-arrows-alt'
            },
            {
                name: 'Image Cropper',
                description: 'Crop and adjust images with precise control and aspect ratios.',
                link: 'tools/image-tools/image-cropper.html',
                icon: 'fas fa-crop-alt'
            },
            {
                name: 'Image to Base64',
                description: 'Convert images to Base64 format for use in CSS or HTML.',
                link: 'tools/image-tools/image-to-base64.html',
                icon: 'fas fa-code'
            },
            {
                name: 'WebP to PNG Converter',
                description: 'Convert WebP images to PNG format for better compatibility.',
                link: 'tools/image-tools/webp-to-png.html',
                icon: 'fas fa-exchange-alt'
            },
            {
                name: 'GIF Maker',
                description: 'Create animated GIFs from multiple images or video clips.',
                link: 'tools/image-tools/gif-maker.html',
                icon: 'fas fa-film'
            },
            {
                name: 'QR Code Generator',
                description: 'Generate QR codes for text, URLs, or contact information.',
                link: 'tools/image-tools/qr-generator.html',
                icon: 'fas fa-qrcode'
            },
            {
                name: 'Screenshot to PDF',
                description: 'Convert screenshots or images to PDF format.',
                link: 'tools/image-tools/screenshot-to-pdf.html',
                icon: 'fas fa-file-pdf'
            }
        ]
    },
    {
        id: 'math-calculators',
        name: 'Math & Calculators',
        icon: 'fas fa-calculator',
        description: 'Free online math and calculator tools',
        link: 'tools/math-calculators/',
        featured: true,
        tools: [
            {
                name: 'Percentage Calculator',
                description: 'Calculate percentages easily. Find percentage of numbers, percentage change, and more.',
                link: 'tools/math-calculators/percentage-calculator.html',
                icon: 'fas fa-percent'
            },
            {
                name: 'Age Calculator',
                description: 'Calculate exact age between two dates. Get years, months, and days.',
                link: 'tools/math-calculators/age-calculator.html',
                icon: 'fas fa-calendar-alt'
            },
            {
                name: 'BMI Calculator',
                description: 'Calculate Body Mass Index (BMI) and check your weight category.',
                link: 'tools/math-calculators/bmi-calculator.html',
                icon: 'fas fa-weight'
            },
            {
                name: 'Loan EMI Calculator',
                description: 'Calculate EMI for loans with detailed payment schedule and charts.',
                link: 'tools/math-calculators/loan-emi-calculator.html',
                icon: 'fas fa-money-bill-wave'
            },
            {
                name: 'Scientific Calculator',
                description: 'Advanced calculator with scientific functions and unit conversions.',
                link: 'tools/math-calculators/scientific-calculator.html',
                icon: 'fas fa-calculator'
            },
            {
                name: 'Discount Calculator',
                description: 'Calculate discounts, final prices, and savings on purchases.',
                link: 'tools/math-calculators/discount-calculator.html',
                icon: 'fas fa-tags'
            },
            {
                name: 'Currency Converter',
                description: 'Convert between different currencies with live exchange rates.',
                link: 'tools/math-calculators/currency-converter.html',
                icon: 'fas fa-exchange-alt'
            },
            {
                name: 'Time Zone Converter',
                description: 'Convert times between different time zones worldwide.',
                link: 'tools/math-calculators/time-zone-converter.html',
                icon: 'fas fa-clock'
            },
            {
                name: 'Binary to Decimal',
                description: 'Convert numbers between binary, decimal, and other number systems.',
                link: 'tools/math-calculators/binary-decimal-converter.html',
                icon: 'fas fa-binary'
            },
            {
                name: 'Tip Calculator',
                description: 'Calculate tips and split bills among multiple people.',
                link: 'tools/math-calculators/tip-calculator.html',
                icon: 'fas fa-receipt'
            }
        ]
    }
    // Other categories will be added here
];

// Function to load categories
function loadCategories() {
    const container = document.getElementById('categories-container');
    if (!container) return;

    categories.forEach(category => {
        const categoryHtml = `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <div class="card-body text-center">
                        <i class="${category.icon} fa-3x mb-3 text-primary"></i>
                        <h3 class="h5">${category.name}</h3>
                        <p class="text-muted mb-4">${category.description}</p>
                        <a href="${category.link}" class="btn btn-primary">
                            View Tools <i class="fas fa-arrow-right ms-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += categoryHtml;
    });
}

// Function to load featured tools
function loadFeaturedTools() {
    const container = document.getElementById('featured-tools-container');
    if (!container) return;

    // Add featured section styles
    const style = document.createElement('style');
    style.textContent = `
        .tool-card {
            transition: transform 0.2s, box-shadow 0.2s;
            height: 100%;
        }
        .tool-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .tool-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #0d6efd;
        }
        .tool-description {
            color: #6c757d;
            font-size: 0.9rem;
        }
        .featured-header {
            background: linear-gradient(45deg, #0d6efd, #0099ff);
            color: white;
            padding: 2rem 0;
            margin-bottom: 2rem;
            text-align: center;
            border-radius: 0.5rem;
        }
        .featured-description {
            max-width: 800px;
            margin: 1rem auto;
        }
    `;
    document.head.appendChild(style);

    // Add featured section header
    const headerHtml = `
        <div class="featured-header mb-4">
            <h2 class="h3">Featured Tools</h2>
            <p class="featured-description">
                Discover our most popular and useful tools
            </p>
        </div>
    `;
    container.innerHTML = headerHtml;

    // Add tools grid container
    const gridContainer = document.createElement('div');
    gridContainer.className = 'row g-4';
    container.appendChild(gridContainer);

    const featuredTools = categories
        .filter(cat => cat.featured)
        .flatMap(cat => cat.tools.slice(0, 3));

    featuredTools.forEach(tool => {
        const toolHtml = `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card tool-card">
                    <div class="card-body text-center">
                        <i class="${tool.icon} tool-icon"></i>
                        <h3 class="h5">${tool.name}</h3>
                        <p class="tool-description mb-4">${tool.description}</p>
                        <a href="${tool.link}" class="btn btn-primary">
                            Open Tool <i class="fas fa-arrow-right ms-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        gridContainer.innerHTML += toolHtml;
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadFeaturedTools();
}); 