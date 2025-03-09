// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per image
const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const selectFiles = document.getElementById('selectFiles');
const imagesCard = document.getElementById('imagesCard');
const imagesContainer = document.getElementById('imagesContainer');
const emptyMessage = document.getElementById('emptyMessage');
const clearAllBtn = document.getElementById('clearAllBtn');
const progressCard = document.getElementById('progressCard');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const previewCard = document.getElementById('previewCard');
const pdfPreview = document.getElementById('pdfPreview');
const downloadBtn = document.getElementById('downloadBtn');
const createPdfBtn = document.getElementById('createPdfBtn');

// Settings Elements
const pageSize = document.getElementById('pageSize');
const orientation = document.getElementById('orientation');
const imageQuality = document.getElementById('imageQuality');
const margin = document.getElementById('margin');

// State
let images = [];
let pdfBlob = null;

// Initialize Sortable
const sortable = new Sortable(imagesContainer, {
    animation: 150,
    ghostClass: 'sortable-ghost',
    onEnd: updateImageNumbers
});

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

selectFiles.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

clearAllBtn.addEventListener('click', () => {
    images = [];
    imagesContainer.innerHTML = '';
    updateImagesVisibility();
});

createPdfBtn.addEventListener('click', createPdf);

// Functions
function handleFiles(files) {
    if (!files.length) return;

    Array.from(files).forEach(file => {
        // Validate file type
        if (!SUPPORTED_TYPES.includes(file.type)) {
            showToast('error', `${file.name} is not a supported image type.`);
            return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            showToast('error', `${file.name} is too large. Maximum size is 10MB.`);
            return;
        }

        // Read file
        const reader = new FileReader();
        reader.onload = (e) => {
            addImage(e.target.result, file.name);
        };
        reader.readAsDataURL(file);
    });
}

function addImage(dataUrl, filename) {
    const imageNumber = images.length + 1;
    
    // Create image element
    const imageElement = document.createElement('div');
    imageElement.className = 'image-item';
    imageElement.innerHTML = `
        <span class="image-number">#${imageNumber}</span>
        <button class="remove-image" title="Remove image">×</button>
        <img src="${dataUrl}" alt="Image ${imageNumber}">
        <div class="text-muted small text-center">${filename}</div>
    `;

    // Add remove functionality
    imageElement.querySelector('.remove-image').addEventListener('click', () => {
        imageElement.remove();
        images = images.filter(img => img.element !== imageElement);
        updateImageNumbers();
        updateImagesVisibility();
    });

    // Add image to state
    images.push({
        element: imageElement,
        dataUrl: dataUrl,
        filename: filename
    });

    // Add to container
    imagesContainer.appendChild(imageElement);
    updateImagesVisibility();
    imagesCard.style.display = 'block';
}

function updateImageNumbers() {
    // Update image numbers based on current order
    images = Array.from(imagesContainer.children).map((element, index) => {
        const image = images.find(img => img.element === element);
        element.querySelector('.image-number').textContent = `#${index + 1}`;
        return image;
    });
}

function updateImagesVisibility() {
    if (images.length > 0) {
        emptyMessage.style.display = 'none';
        createPdfBtn.disabled = false;
    } else {
        emptyMessage.style.display = 'block';
        createPdfBtn.disabled = true;
        imagesCard.style.display = 'none';
    }
}

async function createPdf() {
    if (images.length === 0) return;

    try {
        // Show progress
        progressCard.style.display = 'block';
        previewCard.style.display = 'none';
        createPdfBtn.disabled = true;

        // Initialize jsPDF
        const marginValue = parseInt(margin.value);
        const isLandscape = orientation.value === 'landscape';
        const doc = new jspdf.jsPDF({
            orientation: orientation.value,
            unit: 'mm',
            format: pageSize.value
        });

        // Get page dimensions
        const pageWidth = isLandscape ? doc.internal.pageSize.getHeight() : doc.internal.pageSize.getWidth();
        const pageHeight = isLandscape ? doc.internal.pageSize.getWidth() : doc.internal.pageSize.getHeight();
        const contentWidth = pageWidth - (marginValue * 2);
        const contentHeight = pageHeight - (marginValue * 2);

        // Process each image
        for (let i = 0; i < images.length; i++) {
            // Update progress
            progressText.textContent = `Processing image ${i + 1} of ${images.length}...`;
            progressBar.style.width = `${((i + 1) / images.length) * 100}%`;

            // Add new page if not first image
            if (i > 0) {
                doc.addPage();
            }

            // Load and process image
            await new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    // Calculate dimensions to fit page while maintaining aspect ratio
                    let imgWidth = img.width;
                    let imgHeight = img.height;
                    
                    if (imgWidth > contentWidth || imgHeight > contentHeight) {
                        const ratio = Math.min(contentWidth / imgWidth, contentHeight / imgHeight);
                        imgWidth *= ratio;
                        imgHeight *= ratio;
                    }

                    // Center image on page
                    const x = marginValue + (contentWidth - imgWidth) / 2;
                    const y = marginValue + (contentHeight - imgHeight) / 2;

                    // Add image to PDF
                    doc.addImage(img.src, 'JPEG', x, y, imgWidth, imgHeight, undefined, 'MEDIUM');
                    resolve();
                };
                img.src = images[i].dataUrl;
            });
        }

        // Generate PDF blob
        pdfBlob = doc.output('blob');

        // Show preview
        const pdfUrl = URL.createObjectURL(pdfBlob);
        pdfPreview.src = pdfUrl;
        
        // Show results
        progressCard.style.display = 'none';
        previewCard.style.display = 'block';
        createPdfBtn.disabled = false;

        // Setup download button
        downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'screenshots.pdf';
            link.click();
            showToast('success', 'PDF downloaded successfully!');
        };

        showToast('success', 'PDF created successfully!');
    } catch (error) {
        console.error('PDF Creation Error:', error);
        showToast('error', 'Failed to create PDF: ' + (error.message || 'Unknown error'));
        progressCard.style.display = 'none';
        createPdfBtn.disabled = false;
    }
}

// Utility Functions
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