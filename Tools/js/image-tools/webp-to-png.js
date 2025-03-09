// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const selectFile = document.getElementById('selectFile');
const previewCard = document.getElementById('previewCard');
const resultsCard = document.getElementById('resultsCard');
const imagePreview = document.getElementById('imagePreview');
const imageInfo = document.getElementById('imageInfo');
const convertBtn = document.getElementById('convertBtn');
const compressionLevel = document.getElementById('compressionLevel');
const compressionValue = document.getElementById('compressionValue');
const originalPreview = document.getElementById('originalPreview');
const convertedPreview = document.getElementById('convertedPreview');
const originalInfo = document.getElementById('originalInfo');
const convertedInfo = document.getElementById('convertedInfo');
const downloadBtn = document.getElementById('downloadBtn');

// State
let currentFile = null;

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

// Compression level slider
compressionLevel.addEventListener('input', (e) => {
    compressionValue.textContent = e.target.value;
});

// Convert button
convertBtn.addEventListener('click', () => {
    if (!currentFile) return;
    
    // Show loading state
    convertBtn.disabled = true;
    convertBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Converting...';
    
    // Create canvas for conversion
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Create image for loading WebP
    const img = new Image();
    img.onload = () => {
        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0);
        
        try {
            // Convert to PNG with specified compression
            const pngData = canvas.toDataURL('image/png', compressionLevel.value / 9);
            
            // Show comparison
            originalPreview.src = URL.createObjectURL(currentFile);
            convertedPreview.src = pngData;
            
            // Update info
            originalInfo.textContent = `Size: ${formatBytes(currentFile.size)}`;
            
            // Get PNG file size
            fetch(pngData)
                .then(res => res.blob())
                .then(blob => {
                    convertedInfo.textContent = `Size: ${formatBytes(blob.size)}`;
                });
            
            // Show results
            resultsCard.style.display = 'block';
            
            // Enable download button
            downloadBtn.onclick = () => {
                const link = document.createElement('a');
                link.href = pngData;
                link.download = currentFile.name.replace('.webp', '.png');
                link.click();
                showToast('success', 'PNG file downloaded successfully!');
            };
            
            // Show success message
            showToast('success', 'Image converted successfully!');
        } catch (error) {
            showToast('error', 'Error converting image. Please try again.');
        }
        
        // Reset button state
        convertBtn.disabled = false;
        convertBtn.innerHTML = '<i class="fas fa-exchange-alt me-2"></i>Convert to PNG';
    };
    
    img.onerror = () => {
        showToast('error', 'Error loading image. Please try again.');
        convertBtn.disabled = false;
        convertBtn.innerHTML = '<i class="fas fa-exchange-alt me-2"></i>Convert to PNG';
    };
    
    // Load the WebP image
    img.src = URL.createObjectURL(currentFile);
});

// Functions
function handleFiles(files) {
    const file = files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/webp')) {
        showToast('error', 'Please select a WebP image file.');
        return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
        showToast('error', 'File is too large. Maximum size is 10MB.');
        return;
    }

    // Store current file
    currentFile = file;

    // Display preview
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imageInfo.textContent = `${file.name} (${formatBytes(file.size)})`;
        previewCard.style.display = 'block';
        resultsCard.style.display = 'none';
    };
    reader.readAsDataURL(file);
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