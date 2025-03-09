// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const selectFile = document.getElementById('selectFile');
const previewCard = document.getElementById('previewCard');
const resultsCard = document.getElementById('resultsCard');
const imagePreview = document.getElementById('imagePreview');
const imageInfo = document.getElementById('imageInfo');
const convertBtn = document.getElementById('convertBtn');
const base64Output = document.getElementById('base64Output');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

// State
let currentFormat = 'data-url';
let currentBase64 = '';

// Event Listeners
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

selectFile.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// Format selection
document.querySelectorAll('.format-options button').forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        document.querySelectorAll('.format-options button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Update format and convert if we have a base64 string
        currentFormat = button.dataset.format;
        if (currentBase64) {
            displayFormattedOutput(currentBase64);
        }
    });
});

// Convert button
convertBtn.addEventListener('click', () => {
    if (!imagePreview.src) return;
    
    // Show loading state
    convertBtn.disabled = true;
    convertBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Converting...';
    
    // Get base64 string from image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match image
    canvas.width = imagePreview.naturalWidth;
    canvas.height = imagePreview.naturalHeight;
    
    // Draw image on canvas
    ctx.drawImage(imagePreview, 0, 0);
    
    try {
        // Get base64 string
        currentBase64 = canvas.toDataURL();
        
        // Display formatted output
        displayFormattedOutput(currentBase64);
        
        // Show results
        resultsCard.style.display = 'block';
        
        // Show success message
        showToast('success', 'Image converted successfully!');
    } catch (error) {
        showToast('error', 'Error converting image. Please try again.');
    }
    
    // Reset button state
    convertBtn.disabled = false;
    convertBtn.innerHTML = '<i class="fas fa-code me-2"></i>Convert to Base64';
});

// Copy button
copyBtn.addEventListener('click', () => {
    const output = base64Output.textContent;
    navigator.clipboard.writeText(output)
        .then(() => {
            showToast('success', 'Copied to clipboard!');
        })
        .catch(() => {
            showToast('error', 'Failed to copy. Please try again.');
        });
});

// Download button
downloadBtn.addEventListener('click', () => {
    const output = base64Output.textContent;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'base64-image.txt';
    link.click();
    URL.revokeObjectURL(url);
    showToast('success', 'File downloaded successfully!');
});

// Functions
function handleFiles(files) {
    const file = files[0];
    if (!file) return;

    // Validate file
    if (!SUPPORTED_TYPES.includes(file.type)) {
        showToast('error', 'Unsupported file type. Please use JPEG, PNG, WebP, or GIF images.');
        return;
    }

    if (file.size > MAX_FILE_SIZE) {
        showToast('error', 'File is too large. Maximum size is 5MB.');
        return;
    }

    // Read and display image
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imageInfo.textContent = `${file.name} (${formatBytes(file.size)})`;
        previewCard.style.display = 'block';
        resultsCard.style.display = 'none';
        currentBase64 = '';
    };
    reader.readAsDataURL(file);
}

function displayFormattedOutput(base64String) {
    let output = '';
    
    switch (currentFormat) {
        case 'data-url':
            output = base64String;
            break;
        case 'css':
            output = `background-image: url('${base64String}');`;
            break;
        case 'html':
            output = `<img src="${base64String}" alt="Base64 encoded image">`;
            break;
    }
    
    base64Output.textContent = output;
}

// Utility Functions
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

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