// Initialize QR Generator
function initializeQRGenerator() {
    // Check if QRCode library is loaded
    if (typeof QRCode === 'undefined') {
        console.error('QRCode library not loaded');
        showToast('error', 'QR Code library failed to load. Please refresh the page.');
        return false;
    }

    // DOM Elements
    const typeButtons = document.querySelectorAll('.qr-type-selector button');
    const formSections = document.querySelectorAll('.form-section');
    const generateBtn = document.getElementById('generateBtn');
    const resultsCard = document.getElementById('resultsCard');
    const qrPreview = document.getElementById('qrPreview');
    const downloadPngBtn = document.getElementById('downloadPngBtn');
    const downloadSvgBtn = document.getElementById('downloadSvgBtn');

    // Settings Elements
    const qrSize = document.getElementById('qrSize');
    const errorCorrection = document.getElementById('errorCorrection');
    const foregroundColor = document.getElementById('foregroundColor');
    const backgroundColor = document.getElementById('backgroundColor');

    // Current QR type and QR code instance
    let currentType = 'url';
    let qrInstance = null;

    // Event Listeners
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding form
            const type = button.dataset.type;
            currentType = type;
            formSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${type}Form`) {
                    section.classList.add('active');
                }
            });
        });
    });

    generateBtn.addEventListener('click', generateQRCode);
    downloadPngBtn.addEventListener('click', downloadPNG);
    downloadSvgBtn.addEventListener('click', downloadSVG);

    // Functions to get form data based on type
    function getQRData() {
        switch (currentType) {
            case 'url':
                const url = document.getElementById('urlInput').value.trim();
                if (!url) {
                    showToast('error', 'Please enter a valid URL');
                    return null;
                }
                try {
                    new URL(url);
                    return url;
                } catch {
                    showToast('error', 'Please enter a valid URL');
                    return null;
                }
            
            case 'text':
                const text = document.getElementById('textInput').value.trim();
                if (!text) {
                    showToast('error', 'Please enter some text');
                    return null;
                }
                return text;
            
            case 'email':
                const email = document.getElementById('emailInput').value.trim();
                const subject = document.getElementById('emailSubject').value.trim();
                const body = document.getElementById('emailBody').value.trim();
                if (!email) {
                    showToast('error', 'Please enter an email address');
                    return null;
                }
                let emailData = `mailto:${email}`;
                if (subject || body) {
                    emailData += '?';
                    if (subject) emailData += `subject=${encodeURIComponent(subject)}`;
                    if (body) emailData += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;
                }
                return emailData;
            
            case 'phone':
                const phone = document.getElementById('phoneInput').value.trim();
                if (!phone) {
                    showToast('error', 'Please enter a phone number');
                    return null;
                }
                return `tel:${phone}`;
            
            case 'sms':
                const smsPhone = document.getElementById('smsPhone').value.trim();
                const smsMessage = document.getElementById('smsMessage').value.trim();
                if (!smsPhone) {
                    showToast('error', 'Please enter a phone number');
                    return null;
                }
                let smsData = `sms:${smsPhone}`;
                if (smsMessage) smsData += `?body=${encodeURIComponent(smsMessage)}`;
                return smsData;
            
            case 'wifi':
                const ssid = document.getElementById('wifiSsid').value.trim();
                const password = document.getElementById('wifiPassword').value.trim();
                const encryption = document.getElementById('wifiEncryption').value;
                if (!ssid) {
                    showToast('error', 'Please enter a network name');
                    return null;
                }
                let wifiData = `WIFI:T:${encryption};S:${ssid};`;
                if (password && encryption !== 'nopass') wifiData += `P:${password};`;
                wifiData += ';';
                return wifiData;
            
            case 'vcard':
                const firstName = document.getElementById('vcardFirstName').value.trim();
                const lastName = document.getElementById('vcardLastName').value.trim();
                const vcardPhone = document.getElementById('vcardPhone').value.trim();
                const vcardEmail = document.getElementById('vcardEmail').value.trim();
                const org = document.getElementById('vcardOrg').value.trim();
                const address = document.getElementById('vcardAddress').value.trim();
                
                if (!firstName && !lastName) {
                    showToast('error', 'Please enter at least a name');
                    return null;
                }
                
                let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
                vcard += `N:${lastName};${firstName};;;\n`;
                vcard += `FN:${firstName} ${lastName}\n`;
                if (org) vcard += `ORG:${org}\n`;
                if (vcardPhone) vcard += `TEL:${vcardPhone}\n`;
                if (vcardEmail) vcard += `EMAIL:${vcardEmail}\n`;
                if (address) vcard += `ADR:;;${address};;;;\n`;
                vcard += 'END:VCARD';
                return vcard;
        }
    }

    // Generate QR Code
    function generateQRCode() {
        const data = getQRData();
        if (!data) return;
        
        try {
            // Show loading state
            generateBtn.disabled = true;
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Generating...';
            
            // Get settings
            const size = parseInt(qrSize.value);
            const level = errorCorrection.value;
            const dark = foregroundColor.value;
            const light = backgroundColor.value;
            
            // Clear previous QR code
            qrPreview.innerHTML = '';
            
            // Create new QR code instance
            qrInstance = new QRCode(qrPreview, {
                text: data,
                width: size,
                height: size,
                colorDark: dark,
                colorLight: light,
                correctLevel: QRCode.CorrectLevel[level],
                margin: 2
            });
            
            // Show results
            resultsCard.style.display = 'block';
            resultsCard.scrollIntoView({ behavior: 'smooth' });
            
            // Add a small delay to ensure QR code is rendered
            setTimeout(() => {
                const qrImage = qrPreview.querySelector('img');
                if (qrImage) {
                    qrImage.style.display = 'block';
                    qrImage.style.margin = '0 auto';
                }
                showToast('success', 'QR code generated successfully!');
            }, 100);
        } catch (error) {
            console.error('QR Generation Error:', error);
            showToast('error', 'Failed to generate QR code: ' + (error.message || 'Unknown error'));
        } finally {
            // Reset button state
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fas fa-qrcode me-2"></i>Generate QR Code';
        }
    }

    // Download functions
    function downloadPNG() {
        try {
            const canvas = qrPreview.querySelector('canvas');
            if (!canvas) {
                throw new Error('No QR code generated yet');
            }
            
            const link = document.createElement('a');
            link.download = `qr-code-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            showToast('success', 'QR code downloaded as PNG');
        } catch (error) {
            console.error('PNG Download Error:', error);
            showToast('error', 'Failed to download PNG: ' + (error.message || 'Unknown error'));
        }
    }

    function downloadSVG() {
        try {
            const canvas = qrPreview.querySelector('canvas');
            if (!canvas) {
                throw new Error('No QR code generated yet');
            }
            
            const ctx = canvas.getContext('2d');
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            
            // Create SVG
            let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">`;
            svg += `<rect width="100%" height="100%" fill="${backgroundColor.value}"/>`;
            
            // Add QR code modules
            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const i = (y * canvas.width + x) * 4;
                    if (pixels[i] === 0) { // Black pixel
                        svg += `<rect x="${x}" y="${y}" width="1" height="1" fill="${foregroundColor.value}"/>`;
                    }
                }
            }
            svg += '</svg>';
            
            // Create download link
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `qr-code-${Date.now()}.svg`;
            link.href = url;
            link.click();
            
            // Cleanup
            URL.revokeObjectURL(url);
            showToast('success', 'QR code downloaded as SVG');
        } catch (error) {
            console.error('SVG Download Error:', error);
            showToast('error', 'Failed to download SVG: ' + (error.message || 'Unknown error'));
        }
    }

    return true;
}

// Toast notification
function showToast(type, message) {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0 position-fixed bottom-0 end-0 m-3`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
    bsToast.show();
    
    toast.addEventListener('hidden.bs.toast', () => {
        document.body.removeChild(toast);
    });
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeQRGenerator); 