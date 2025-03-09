document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFile');
    const optionsCard = document.getElementById('optionsCard');
    const resultsCard = document.getElementById('resultsCard');
    const originalPreview = document.getElementById('originalPreview');
    const resultOriginalPreview = document.getElementById('resultOriginalPreview');
    const compressedPreview = document.getElementById('compressedPreview');
    const originalInfo = document.getElementById('originalInfo');
    const resultOriginalInfo = document.getElementById('resultOriginalInfo');
    const compressedInfo = document.getElementById('compressedInfo');
    const compressionStats = document.getElementById('compressionStats');
    const qualitySlider = document.getElementById('qualitySlider');
    const qualityValue = document.getElementById('qualityValue');
    const convertBtn = document.getElementById('convertBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    // Maximum file size (50MB)
    const MAX_FILE_SIZE = 50 * 1024 * 1024;

    // Supported file types
    const SUPPORTED_TYPES = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
    ];

    let originalImage = null;

    // Event Listeners
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
    selectFileBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    convertBtn.addEventListener('click', compressImage);
    downloadBtn.addEventListener('click', downloadImage);

    // Quality slider
    qualitySlider.addEventListener('input', function() {
        qualityValue.textContent = this.value + '%';
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
            alert('File size exceeds 50MB limit');
            return;
        }

        // Validate file type
        if (!SUPPORTED_TYPES.includes(file.type)) {
            alert('Unsupported file type. Please upload a JPG, PNG, or WebP image.');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                originalImage = img;
                originalPreview.src = e.target.result;
                originalInfo.textContent = `Size: ${formatBytes(file.size)} | Dimensions: ${img.width} × ${img.height}px`;
                optionsCard.style.display = 'block';
                resultsCard.style.display = 'none';
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Compress image
    function compressImage() {
        if (!originalImage) return;

        const quality = parseInt(qualitySlider.value) / 100;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;

        // Draw image with compression
        ctx.drawImage(originalImage, 0, 0);

        try {
            // Convert to compressed data URL
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            
            // Show compressed preview
            resultOriginalPreview.src = originalPreview.src;
            compressedPreview.src = compressedDataUrl;
            
            // Calculate compressed size
            const compressedSize = Math.round((compressedDataUrl.length * 3) / 4);
            const originalSize = Math.round((originalPreview.src.length * 3) / 4);
            
            // Update info
            resultOriginalInfo.textContent = originalInfo.textContent;
            compressedInfo.textContent = `Size: ${formatBytes(compressedSize)} | Dimensions: ${canvas.width} × ${canvas.height}px`;
            
            // Calculate compression ratio
            const ratio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
            compressionStats.textContent = `Compression: ${ratio}% reduction in file size`;
            
            // Show results
            resultsCard.style.display = 'block';
        } catch (error) {
            alert('Error compressing image');
            console.error(error);
        }
    }

    // Download compressed image
    function downloadImage() {
        if (!compressedPreview.src) return;
        
        const link = document.createElement('a');
        link.download = 'compressed_image.jpg';
        link.href = compressedPreview.src;
        link.click();
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