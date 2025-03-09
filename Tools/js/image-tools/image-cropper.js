document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFile');
    const cropperContainer = document.getElementById('cropperContainer');
    const imageElement = document.getElementById('imageElement');
    const resultContainer = document.getElementById('resultContainer');
    const croppedImage = document.getElementById('croppedImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const cropAnotherBtn = document.getElementById('cropAnotherBtn');
    const rotateLeftBtn = document.getElementById('rotateLeftBtn');
    const rotateRightBtn = document.getElementById('rotateRightBtn');
    const flipHorizontalBtn = document.getElementById('flipHorizontalBtn');
    const flipVerticalBtn = document.getElementById('flipVerticalBtn');
    const resetBtn = document.getElementById('resetBtn');
    const cropBtn = document.getElementById('cropBtn');

    // Maximum file size (10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    // Supported file types
    const SUPPORTED_TYPES = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/gif'
    ];

    let cropper = null;

    // Event Listeners
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
    selectFileBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    
    // Image control buttons
    if (rotateLeftBtn) rotateLeftBtn.addEventListener('click', () => cropper && cropper.rotate(-90));
    if (rotateRightBtn) rotateRightBtn.addEventListener('click', () => cropper && cropper.rotate(90));
    if (flipHorizontalBtn) flipHorizontalBtn.addEventListener('click', () => cropper && cropper.scaleX(cropper.getData().scaleX * -1));
    if (flipVerticalBtn) flipVerticalBtn.addEventListener('click', () => cropper && cropper.scaleY(cropper.getData().scaleY * -1));
    if (resetBtn) resetBtn.addEventListener('click', () => cropper && cropper.reset());
    if (cropBtn) cropBtn.addEventListener('click', cropImage);
    if (downloadBtn) downloadBtn.addEventListener('click', downloadImage);
    if (cropAnotherBtn) cropAnotherBtn.addEventListener('click', resetTool);

    // Aspect ratio buttons
    document.querySelectorAll('[data-aspect-ratio]').forEach(button => {
        button.addEventListener('click', function() {
            if (!cropper) return;
            
            const ratio = this.dataset.aspectRatio;
            cropper.setAspectRatio(ratio === 'free' ? NaN : eval(ratio));
            
            // Update active state
            document.querySelectorAll('[data-aspect-ratio]').forEach(btn => {
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
            alert('Unsupported file type. Please upload a JPG, PNG, WebP, or GIF image.');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = function(e) {
            // Set image source
            imageElement.src = e.target.result;
            
            // Initialize cropper
            if (cropper) {
                cropper.destroy();
            }
            
            cropper = new Cropper(imageElement, {
                viewMode: 2,
                dragMode: 'move',
                autoCropArea: 1,
                restore: false,
                modal: true,
                guides: true,
                center: true,
                highlight: true,
                cropBoxMovable: true,
                cropBoxResizable: true,
                toggleDragModeOnDblclick: true,
            });

            // Show cropper container
            dropZone.style.display = 'none';
            cropperContainer.style.display = 'block';
            resultContainer.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }

    // Crop image
    function cropImage() {
        if (!cropper) return;

        try {
            // Get cropped canvas
            const canvas = cropper.getCroppedCanvas();
            
            // Convert to data URL
            const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
            
            // Show result
            croppedImage.src = croppedDataUrl;
            cropperContainer.style.display = 'none';
            resultContainer.style.display = 'block';
        } catch (error) {
            alert('Error cropping image');
            console.error(error);
        }
    }

    // Download cropped image
    function downloadImage() {
        if (!croppedImage.src) return;
        
        const link = document.createElement('a');
        link.download = 'cropped_image.jpg';
        link.href = croppedImage.src;
        link.click();
    }

    // Reset tool
    function resetTool() {
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
        
        fileInput.value = '';
        imageElement.src = '';
        croppedImage.src = '';
        dropZone.style.display = 'block';
        cropperContainer.style.display = 'none';
        resultContainer.style.display = 'none';

        // Reset aspect ratio buttons
        document.querySelectorAll('[data-aspect-ratio]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('[data-aspect-ratio="free"]').classList.add('active');
    }
});