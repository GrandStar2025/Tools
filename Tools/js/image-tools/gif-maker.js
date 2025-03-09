// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per image
const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const selectFiles = document.getElementById('selectFiles');
const framesCard = document.getElementById('framesCard');
const framesContainer = document.getElementById('framesContainer');
const emptyFramesMessage = document.getElementById('emptyFramesMessage');
const progressCard = document.getElementById('progressCard');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const resultsCard = document.getElementById('resultsCard');
const gifPreview = document.getElementById('gifPreview');
const gifInfo = document.getElementById('gifInfo');
const downloadBtn = document.getElementById('downloadBtn');
const createGifBtn = document.getElementById('createGifBtn');

// Settings Elements
const gifWidth = document.getElementById('gifWidth');
const gifHeight = document.getElementById('gifHeight');
const gifQuality = document.getElementById('gifQuality');
const defaultDuration = document.getElementById('defaultDuration');

// State
let frames = [];
let gifBlob = null;

// Initialize Sortable
const sortable = new Sortable(framesContainer, {
    animation: 150,
    ghostClass: 'sortable-ghost',
    onEnd: updateFrameNumbers
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

createGifBtn.addEventListener('click', createGif);

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
            addFrame(e.target.result, file.name);
        };
        reader.readAsDataURL(file);
    });
}

function addFrame(dataUrl, filename) {
    const frameNumber = frames.length + 1;
    
    // Create frame element
    const frameElement = document.createElement('div');
    frameElement.className = 'frame-item';
    frameElement.innerHTML = `
        <span class="frame-number">#${frameNumber}</span>
        <button class="remove-frame" title="Remove frame">×</button>
        <img src="${dataUrl}" alt="Frame ${frameNumber}">
        <div class="form-group">
            <label class="form-label small">Duration (ms)</label>
            <input type="number" class="form-control form-control-sm frame-duration" 
                   value="${defaultDuration.value}" min="100" step="100">
        </div>
    `;

    // Add remove functionality
    frameElement.querySelector('.remove-frame').addEventListener('click', () => {
        frameElement.remove();
        frames = frames.filter(f => f.element !== frameElement);
        updateFrameNumbers();
        updateFramesVisibility();
    });

    // Add frame to state
    frames.push({
        element: frameElement,
        dataUrl: dataUrl,
        filename: filename
    });

    // Add to container
    framesContainer.appendChild(frameElement);
    updateFramesVisibility();
    framesCard.style.display = 'block';
}

function updateFrameNumbers() {
    // Update frame numbers based on current order
    frames = Array.from(framesContainer.children).map((element, index) => {
        const frame = frames.find(f => f.element === element);
        element.querySelector('.frame-number').textContent = `#${index + 1}`;
        return frame;
    });
}

function updateFramesVisibility() {
    if (frames.length > 0) {
        emptyFramesMessage.style.display = 'none';
        createGifBtn.disabled = false;
    } else {
        emptyFramesMessage.style.display = 'block';
        createGifBtn.disabled = true;
        framesCard.style.display = 'none';
    }
}

async function createGif() {
    if (frames.length === 0) return;

    try {
        // Show progress
        progressCard.style.display = 'block';
        resultsCard.style.display = 'none';
        createGifBtn.disabled = true;

        // Set smaller default dimensions for better performance
        const targetWidth = Math.min(parseInt(gifWidth.value), 400); // Max width 400px
        const targetHeight = Math.min(parseInt(gifHeight.value), 400); // Max height 400px
        const targetQuality = Math.min(parseInt(gifQuality.value), 5); // Max quality 5

        // Initialize GIF encoder with performance-optimized settings
        const gif = new GIF({
            workers: 1,
            quality: targetQuality,
            width: targetWidth,
            height: targetHeight,
            workerScript: '../../js/image-tools/gif.worker.js',
            dither: false,
            debug: false
        });

        // Process images in smaller chunks
        const CHUNK_SIZE = 3; // Process 3 frames at a time
        const chunks = [];
        
        for (let i = 0; i < frames.length; i += CHUNK_SIZE) {
            chunks.push(frames.slice(i, i + CHUNK_SIZE));
        }

        // Process each chunk
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            
            // Update progress
            progressText.textContent = `Processing chunk ${i + 1} of ${chunks.length}...`;
            progressBar.style.width = `${(i / chunks.length) * 50}%`;

            // Process frames in current chunk
            await Promise.all(chunk.map(async (frame) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        // Create small canvas for resizing
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        // Calculate dimensions maintaining aspect ratio
                        let newWidth = targetWidth;
                        let newHeight = targetHeight;
                        
                        if (img.width > img.height) {
                            newHeight = (img.height * targetWidth) / img.width;
                        } else {
                            newWidth = (img.width * targetHeight) / img.height;
                        }
                        
                        canvas.width = newWidth;
                        canvas.height = newHeight;
                        
                        // Use better image scaling
                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = 'high';
                        
                        // Draw and optimize image
                        ctx.fillStyle = '#FFFFFF';
                        ctx.fillRect(0, 0, newWidth, newHeight);
                        ctx.drawImage(img, 0, 0, newWidth, newHeight);
                        
                        // Add frame to GIF
                        const duration = parseInt(frame.element.querySelector('.frame-duration').value);
                        gif.addFrame(canvas, { delay: duration });
                        
                        resolve();
                    };
                    img.onerror = () => reject(new Error(`Failed to load image: ${frame.filename}`));
                    img.src = frame.dataUrl;
                });
            }));
        }

        // Start rendering
        progressText.textContent = 'Finalizing GIF...';
        
        const blob = await new Promise((resolve, reject) => {
            gif.on('progress', (p) => {
                const progress = 50 + Math.round(p * 50);
                progressBar.style.width = `${progress}%`;
            });

            gif.on('finished', (blob) => {
                resolve(blob);
            });

            gif.on('error', (error) => {
                reject(error);
            });

            // Start rendering with abort capability
            const renderTimeout = setTimeout(() => {
                gif.abort();
                reject(new Error('GIF generation took too long. Try using fewer frames or lower quality.'));
            }, 60000); // 1 minute timeout

            gif.render();

            // Clear timeout if GIF completes successfully
            gif.on('finished', () => clearTimeout(renderTimeout));
        });

        // Update UI with result
        gifBlob = blob;
        gifPreview.src = URL.createObjectURL(blob);
        gifInfo.textContent = `Size: ${formatBytes(blob.size)}`;
        
        // Show results
        progressCard.style.display = 'none';
        resultsCard.style.display = 'block';
        createGifBtn.disabled = false;

        // Setup download button
        downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'animated.gif';
            link.click();
            URL.revokeObjectURL(link.href);
            showToast('success', 'GIF downloaded successfully!');
        };

        showToast('success', 'GIF created successfully!');
    } catch (error) {
        console.error('GIF Creation Error:', error);
        showToast('error', 'Failed to create GIF: ' + (error.message || 'Unknown error'));
        progressCard.style.display = 'none';
        createGifBtn.disabled = false;
    }
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