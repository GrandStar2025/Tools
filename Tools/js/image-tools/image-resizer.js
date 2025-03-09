document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFile');
    const previewSection = document.getElementById('preview-section');
    const resultSection = document.getElementById('result-section');
    const imagePreview = document.getElementById('image-preview');
    const resultPreview = document.getElementById('result-preview');
    const resizeBtn = document.getElementById('resize-btn');
    const downloadBtn = document.getElementById('download-btn');
    const resizeAnotherBtn = document.getElementById('resize-another-btn');
    const fileName = document.getElementById('file-name');
    const fileSize = document.getElementById('file-size');
    const imageDimensions = document.getElementById('image-dimensions');
    const newDimensions = document.getElementById('new-dimensions');
    const newSize = document.getElementById('new-size');

    // Get resize method elements
    const byPixels = document.getElementById('byPixels');
    const byPercentage = document.getElementById('byPercentage');
    const pixelInputs = document.getElementById('pixelInputs');
    const percentageInput = document.getElementById('percentageInput');
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');
    const percentageValue = document.getElementById('percentageValue');
    const maintainAspectRatio = document.getElementById('maintainAspectRatio');

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

    let originalWidth = 0;
    let originalHeight = 0;
    let aspectRatio = 0;

    // Event Listeners
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
    selectFileBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    resizeBtn.addEventListener('click', resizeImage);
    downloadBtn.addEventListener('click', downloadImage);
    resizeAnotherBtn.addEventListener('click', resetTool);

    // Method radio buttons
    byPixels.addEventListener('change', updateMethodInputs);
    byPercentage.addEventListener('change', updateMethodInputs);

    // Dimension inputs for aspect ratio
    widthInput.addEventListener('input', function() {
        if (maintainAspectRatio.checked && aspectRatio) {
            heightInput.value = Math.round(widthInput.value / aspectRatio);
        }
    });

    heightInput.addEventListener('input', function() {
        if (maintainAspectRatio.checked && aspectRatio) {
            widthInput.value = Math.round(heightInput.value * aspectRatio);
        }
    });

    // Preset size buttons
    document.querySelectorAll('.preset-sizes .btn').forEach(button => {
        button.addEventListener('click', function() {
            const width = parseInt(this.dataset.width);
            const height = parseInt(this.dataset.height);
            
            // Update pixel inputs
            widthInput.value = width;
            heightInput.value = height;
            
            // Update active state
            document.querySelectorAll('.preset-sizes .btn').forEach(btn => {
                btn.classList.remove('active');
            });
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
            alert('File size exceeds 10MB limit');
            return;
        }

        // Validate file type
        if (!SUPPORTED_TYPES.includes(file.type)) {
            alert('Unsupported file type. Please upload an image file.');
            return;
        }

        // Update file info
        fileName.textContent = file.name;
        fileSize.textContent = formatBytes(file.size);

        // Create preview
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                originalWidth = img.width;
                originalHeight = img.height;
                aspectRatio = originalWidth / originalHeight;
                
                imageDimensions.textContent = `${originalWidth} × ${originalHeight} px`;
                imagePreview.src = e.target.result;
                
                // Set initial width/height inputs
                widthInput.value = originalWidth;
                heightInput.value = originalHeight;
                
                previewSection.style.display = 'block';
                resultSection.style.display = 'none';
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Update method inputs visibility
    function updateMethodInputs() {
        pixelInputs.style.display = byPixels.checked ? 'block' : 'none';
        percentageInput.style.display = byPercentage.checked ? 'block' : 'none';
    }

    // Calculate new dimensions
    function calculateNewDimensions() {
        let newWidth, newHeight;

        if (byPixels.checked) {
            newWidth = parseInt(widthInput.value) || originalWidth;
            newHeight = parseInt(heightInput.value) || originalHeight;
        } else if (byPercentage.checked) {
            const scale = parseFloat(percentageValue.value) / 100;
            newWidth = Math.round(originalWidth * scale);
            newHeight = Math.round(originalHeight * scale);
        }

        return { width: newWidth, height: newHeight };
    }

    // Resize image
    function resizeImage() {
        const img = new Image();
        img.onload = function() {
            const dimensions = calculateNewDimensions();
            const canvas = document.createElement('canvas');
            canvas.width = dimensions.width;
            canvas.height = dimensions.height;

            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // Draw image with new dimensions
            ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);

            try {
                // Convert to data URL
                const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
                resultPreview.src = resizedDataUrl;
                
                // Update info
                newDimensions.textContent = `${dimensions.width} × ${dimensions.height} px`;
                const newSizeBytes = Math.round((resizedDataUrl.length * 3) / 4);
                newSize.textContent = formatBytes(newSizeBytes);
                
                resultSection.style.display = 'block';
                alert('Image successfully resized!');
            } catch (error) {
                alert('Error resizing image');
                console.error(error);
            }
        };
        img.src = imagePreview.src;
    }

    // Download image
    function downloadImage() {
        const link = document.createElement('a');
        link.download = `resized_${fileName.textContent}`;
        link.href = resultPreview.src;
        link.click();
    }

    // Reset tool
    function resetTool() {
        fileInput.value = '';
        imagePreview.src = '';
        resultPreview.src = '';
        fileName.textContent = '-';
        fileSize.textContent = '-';
        imageDimensions.textContent = '-';
        newDimensions.textContent = '-';
        newSize.textContent = '-';
        widthInput.value = '';
        heightInput.value = '';
        percentageValue.value = '100';
        previewSection.style.display = 'none';
        resultSection.style.display = 'none';
        document.querySelectorAll('.preset-sizes .btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }

    // Format bytes to human readable size
    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}); 