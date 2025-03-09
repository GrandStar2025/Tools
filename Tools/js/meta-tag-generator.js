document.addEventListener('DOMContentLoaded', function() {
    // Get all input elements
    const pageTitle = document.getElementById('page-title');
    const metaDescription = document.getElementById('meta-description');
    const metaKeywords = document.getElementById('meta-keywords');
    const ogTitle = document.getElementById('og-title');
    const ogDescription = document.getElementById('og-description');
    const ogImage = document.getElementById('og-image');
    const ogUrl = document.getElementById('og-url');
    const includeSocial = document.getElementById('include-social');
    const robotsIndex = document.getElementById('robots-index');
    const robotsFollow = document.getElementById('robots-follow');
    const includeViewport = document.getElementById('include-viewport');
    const includeCharset = document.getElementById('include-charset');
    const metaOutput = document.getElementById('meta-output');
    const copyCode = document.getElementById('copy-code');

    // Character count elements
    const titleCount = document.getElementById('title-count');
    const descriptionCount = document.getElementById('description-count');
    const keywordCount = document.getElementById('keyword-count');

    // Add event listeners for all inputs
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', updateMetaTags);
        input.addEventListener('change', updateMetaTags);
    });

    // Update character counts
    pageTitle.addEventListener('input', function() {
        titleCount.textContent = this.value.length;
        if (this.value.length > 60) {
            titleCount.classList.add('text-danger');
        } else {
            titleCount.classList.remove('text-danger');
        }
    });

    metaDescription.addEventListener('input', function() {
        descriptionCount.textContent = this.value.length;
        if (this.value.length > 160) {
            descriptionCount.classList.add('text-danger');
        } else {
            descriptionCount.classList.remove('text-danger');
        }
    });

    metaKeywords.addEventListener('input', function() {
        const keywords = this.value.split(',').filter(k => k.trim().length > 0);
        keywordCount.textContent = keywords.length;
        if (keywords.length > 10) {
            keywordCount.classList.add('text-danger');
        } else {
            keywordCount.classList.remove('text-danger');
        }
    });

    // Copy generated code
    copyCode.addEventListener('click', function() {
        const code = metaOutput.textContent;
        navigator.clipboard.writeText(code).then(() => {
            showToast('Meta tags copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard');
        });
    });

    // Generate meta tags
    function updateMetaTags() {
        let metaTags = '';

        // Add charset if selected
        if (includeCharset.checked) {
            metaTags += '<meta charset="UTF-8">\n';
        }

        // Add viewport if selected
        if (includeViewport.checked) {
            metaTags += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
        }

        // Add title if provided
        if (pageTitle.value) {
            metaTags += `<title>${escapeHtml(pageTitle.value)}</title>\n`;
        }

        // Add meta description if provided
        if (metaDescription.value) {
            metaTags += `<meta name="description" content="${escapeHtml(metaDescription.value)}">\n`;
        }

        // Add keywords if provided
        if (metaKeywords.value) {
            const keywords = metaKeywords.value
                .split(',')
                .map(k => k.trim())
                .filter(k => k.length > 0)
                .join(', ');
            if (keywords) {
                metaTags += `<meta name="keywords" content="${escapeHtml(keywords)}">\n`;
            }
        }

        // Add robots meta tag
        const robotsDirectives = [];
        if (robotsIndex.checked) {
            robotsDirectives.push('index');
        } else {
            robotsDirectives.push('noindex');
        }
        if (robotsFollow.checked) {
            robotsDirectives.push('follow');
        } else {
            robotsDirectives.push('nofollow');
        }
        metaTags += `<meta name="robots" content="${robotsDirectives.join(', ')}">\n`;

        // Add Open Graph tags if enabled
        if (includeSocial.checked) {
            metaTags += '\n<!-- Open Graph / Social Media Meta Tags -->\n';
            if (ogTitle.value || pageTitle.value) {
                metaTags += `<meta property="og:title" content="${escapeHtml(ogTitle.value || pageTitle.value)}">\n`;
            }
            if (ogDescription.value || metaDescription.value) {
                metaTags += `<meta property="og:description" content="${escapeHtml(ogDescription.value || metaDescription.value)}">\n`;
            }
            if (ogUrl.value) {
                metaTags += `<meta property="og:url" content="${escapeHtml(ogUrl.value)}">\n`;
            }
            if (ogImage.value) {
                metaTags += `<meta property="og:image" content="${escapeHtml(ogImage.value)}">\n`;
            }
            metaTags += '<meta property="og:type" content="website">\n';

            // Add Twitter Card tags
            metaTags += '\n<!-- Twitter Card Meta Tags -->\n';
            metaTags += '<meta name="twitter:card" content="summary_large_image">\n';
            if (ogTitle.value || pageTitle.value) {
                metaTags += `<meta name="twitter:title" content="${escapeHtml(ogTitle.value || pageTitle.value)}">\n`;
            }
            if (ogDescription.value || metaDescription.value) {
                metaTags += `<meta name="twitter:description" content="${escapeHtml(ogDescription.value || metaDescription.value)}">\n`;
            }
            if (ogImage.value) {
                metaTags += `<meta name="twitter:image" content="${escapeHtml(ogImage.value)}">\n`;
            }
        }

        // Update output
        metaOutput.textContent = metaTags.trim();
    }

    // Helper function to escape HTML special characters
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Toast notification function
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'position-fixed bottom-0 end-0 p-3';
        toast.style.zIndex = '5';
        
        toast.innerHTML = `
            <div class="toast show" role="alert">
                <div class="toast-header">
                    <strong class="me-auto">Notification</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;

        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Initialize meta tags
    updateMetaTags();
}); 