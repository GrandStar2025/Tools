document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFile');
    const previewSection = document.getElementById('preview-section');
    const resultSection = document.getElementById('result-section');
    const imagePreview = document.getElementById('image-preview');
    const resultPreview = document.getElementById('result-preview');
    const convertBtn = document.getElementById('convert-btn');
    const downloadBtn = document.getElementById('download-btn');
    const convertAnotherBtn = document.getElementById('convert-another-btn');
    const fileName = document.getElementById('file-name');
    const fileSize = document.getElementById('file-size');
    const imageDimensions = document.getElementById('image-dimensions');
    const jpgSize = document.getElementById('jpg-size');
    const compressionRatio = document.getElementById('compression-ratio');
    const qualitySlider = document.getElementById('quality-slider');
    const qualityValue = document.getElementById('quality-value');
    const qualityPresets = document.querySelectorAll('.quality-presets button');

    // Maximum file size (10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    // Supported file types
    const SUPPORTED_TYPES = [
        'image/jpeg',
        'image/jpg',
        'image/webp',
        'image/gif',
        'image/bmp',
        'image/tiff',
        'image/png'
    ];

    let originalFileSize = 0;

    // Event Listeners
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
    selectFileBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    convertBtn.addEventListener('click', convertToJPG);
    downloadBtn.addEventListener('click', downloadJPG);
    convertAnotherBtn.addEventListener('click', resetTool);

    // Quality slider event listener
    qualitySlider.addEventListener('input', function() {
        qualityValue.textContent = this.value + '%';
    });

    // Quality preset buttons
    qualityPresets.forEach(button => {
        button.addEventListener('click', function() {
            const quality = parseFloat(this.dataset.quality) * 100;
            qualitySlider.value = quality;
            qualityValue.textContent = quality + '%';
            
            // Update active state
            qualityPresets.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle drag over
    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('dragover');
    }

    // Handle drag leave
    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('dragover');
    }

    // Handle drop
    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    }

    // Handle file select
    function handleFileSelect(e) {
        const files = e.target.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    }

    // Process the selected file
    function processFile(file) {
        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            showError('File size exceeds 10MB limit');
            return;
        }

        // Validate file type
        if (!SUPPORTED_TYPES.includes(file.type)) {
            showError('Unsupported file type. Please upload an image file.');
            return;
        }

        // Store original file size
        originalFileSize = file.size;

        // Update file info
        fileName.textContent = file.name;
        fileSize.textContent = formatBytes(file.size);

        // Create preview
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                imageDimensions.textContent = `${img.width} × ${img.height} px`;
                imagePreview.src = e.target.result;
                previewSection.style.display = 'block';
                resultSection.style.display = 'none';
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Convert image to JPG
    function convertToJPG() {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            // Fill with white background to handle transparency
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            try {
                const quality = parseFloat(qualitySlider.value) / 100;
                const jpgDataUrl = canvas.toDataURL('image/jpeg', quality);
                resultPreview.src = jpgDataUrl;
                
                // Calculate JPG size and compression ratio
                const jpgSizeBytes = Math.round((jpgDataUrl.length * 3) / 4);
                jpgSize.textContent = formatBytes(jpgSizeBytes);
                
                const ratio = ((originalFileSize - jpgSizeBytes) / originalFileSize * 100).toFixed(1);
                compressionRatio.textContent = ratio + '% smaller';
                
                resultSection.style.display = 'block';
                showToast('Image successfully converted to JPG!');
            } catch (error) {
                showError('Error converting image to JPG');
                console.error(error);
            }
        };
        img.src = imagePreview.src;
    }

    // Download JPG
    function downloadJPG() {
        const link = document.createElement('a');
        link.download = getOutputFileName(fileName.textContent);
        link.href = resultPreview.src;
        link.click();
    }

    // Reset tool
    function resetTool() {
        fileInput.value = '';
        imagePreview.src = '';
        resultPreview.src = '';
        previewSection.style.display = 'none';
        resultSection.style.display = 'none';
        fileName.textContent = '-';
        fileSize.textContent = '-';
        imageDimensions.textContent = '-';
        jpgSize.textContent = '-';
        compressionRatio.textContent = '-';
        originalFileSize = 0;
        
        // Reset quality settings
        qualitySlider.value = 80;
        qualityValue.textContent = '80%';
        qualityPresets.forEach(btn => btn.classList.remove('active'));
    }

    // Helper function to format bytes
    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Helper function to get output filename
    function getOutputFileName(originalName) {
        const baseName = originalName.replace(/\.[^/.]+$/, '');
        return `${baseName}_converted.jpg`;
    }

    // Show error message
    function showError(message) {
        showToast(message, 'danger');
    }

    // Show toast notification
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'position-fixed bottom-0 end-0 p-3';
        toast.style.zIndex = '5';
        
        toast.innerHTML = `
            <div class="toast show" role="alert">
                <div class="toast-header">
                    <strong class="me-auto">Notification</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body ${type === 'danger' ? 'text-danger' : ''}">
                    ${message}
                </div>
            </div>
        `;

        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}); 