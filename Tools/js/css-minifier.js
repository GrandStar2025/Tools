document.addEventListener('DOMContentLoaded', function() {
    // Initialize CodeMirror editors
    const cssInput = CodeMirror.fromTextArea(document.getElementById('css-input'), {
        mode: 'css',
        theme: 'monokai',
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 2,
        autofocus: true
    });

    const cssOutput = CodeMirror.fromTextArea(document.getElementById('css-output'), {
        mode: 'css',
        theme: 'monokai',
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 2,
        readOnly: true
    });

    // Get DOM elements
    const removeComments = document.getElementById('remove-comments');
    const removeWhitespace = document.getElementById('remove-whitespace');
    const combineDuplicates = document.getElementById('combine-duplicates');
    const shortenColors = document.getElementById('shorten-colors');
    const pasteSample = document.getElementById('paste-sample');
    const clearInput = document.getElementById('clear-input');
    const copyOutput = document.getElementById('copy-output');
    const downloadOutput = document.getElementById('download-output');
    const inputCount = document.getElementById('input-count');
    const outputCount = document.getElementById('output-count');
    const savedCount = document.getElementById('saved-count');
    const originalSize = document.getElementById('original-size');
    const minifiedSize = document.getElementById('minified-size');
    const optimizationStats = document.getElementById('optimization-stats');

    // Sample CSS
    const sampleCss = `/* Main Styles */
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
}

/* Header Styles */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    background-color: #f8f9fa;
}

/* Navigation Styles */
.nav-menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-menu li {
    margin-right: 20px;
}

.nav-menu li:last-child {
    margin-right: 0;
}

.nav-menu a {
    color: #333333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-menu a:hover {
    color: #007bff;
}

/* Button Styles */
.button {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #007bff;
    color: #ffffff;
    text-decoration: none;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #0056b3;
}`;

    // Add event listeners
    cssInput.on('change', debounce(minifyCSS, 300));
    cssInput.on('change', updateInputStats);

    removeComments.addEventListener('change', minifyCSS);
    removeWhitespace.addEventListener('change', minifyCSS);
    combineDuplicates.addEventListener('change', minifyCSS);
    shortenColors.addEventListener('change', minifyCSS);

    pasteSample.addEventListener('click', function() {
        cssInput.setValue(sampleCss);
        minifyCSS();
    });

    clearInput.addEventListener('click', function() {
        if (cssInput.getValue() && confirm('Are you sure you want to clear the input?')) {
            cssInput.setValue('');
            minifyCSS();
        }
    });

    copyOutput.addEventListener('click', function() {
        const minified = cssOutput.getValue();
        navigator.clipboard.writeText(minified).then(() => {
            showToast('CSS copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard');
        });
    });

    downloadOutput.addEventListener('click', function() {
        const minified = cssOutput.getValue();
        if (!minified) {
            alert('Please enter some CSS before downloading.');
            return;
        }

        const blob = new Blob([minified], { type: 'text/css' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'minified.css';
        a.click();
        window.URL.revokeObjectURL(url);
    });

    function minifyCSS() {
        let css = cssInput.getValue();
        if (!css) {
            cssOutput.setValue('');
            updateStats('', '');
            return;
        }

        // Remove comments if option is checked
        if (removeComments.checked) {
            css = css.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
        }

        // Remove unnecessary whitespace if option is checked
        if (removeWhitespace.checked) {
            css = css.replace(/\s+/g, ' ')
                    .replace(/\s*({|}|;|,|:)\s*/g, '$1')
                    .replace(/;}/g, '}')
                    .trim();
        }

        // Combine duplicate selectors if option is checked
        if (combineDuplicates.checked) {
            const rules = {};
            const parts = css.match(/[^{}]+{[^}]+}/g) || [];
            
            parts.forEach(part => {
                const [selector, styles] = part.split('{');
                if (!rules[selector]) {
                    rules[selector] = new Set();
                }
                styles.replace('}', '').split(';').forEach(style => {
                    if (style.trim()) {
                        rules[selector].add(style.trim());
                    }
                });
            });

            css = Object.entries(rules)
                .map(([selector, styles]) => 
                    `${selector}{${Array.from(styles).join(';')}}`)
                .join('');
        }

        // Shorten color values if option is checked
        if (shortenColors.checked) {
            css = css.replace(/#([0-9a-f])\1([0-9a-f])\2([0-9a-f])\3/gi, '#$1$2$3')
                    .replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g, function(_, r, g, b) {
                        return '#' + [r, g, b].map(x => {
                            const hex = Number(x).toString(16);
                            return hex.length === 1 ? '0' + hex : hex;
                        }).join('');
                    });
        }

        cssOutput.setValue(css);
        updateStats(cssInput.getValue(), css);
    }

    function updateInputStats() {
        const css = cssInput.getValue();
        inputCount.textContent = css.length;
        originalSize.textContent = formatBytes(new Blob([css]).size);
    }

    function updateStats(original, minified) {
        const originalLength = original.length;
        const minifiedLength = minified.length;
        const originalBytes = new Blob([original]).size;
        const minifiedBytes = new Blob([minified]).size;
        const savedPercentage = originalLength ? 
            Math.round((originalLength - minifiedLength) / originalLength * 100) : 0;

        inputCount.textContent = originalLength;
        outputCount.textContent = minifiedLength;
        savedCount.textContent = savedPercentage;
        originalSize.textContent = formatBytes(originalBytes);
        minifiedSize.textContent = formatBytes(minifiedBytes);

        updateOptimizationStats(originalLength, minifiedLength, savedPercentage);
    }

    function updateOptimizationStats(original, minified, saved) {
        if (!original) {
            optimizationStats.innerHTML = `
                <div class="alert alert-info">
                    Enter CSS code to see optimization statistics
                </div>`;
            return;
        }

        let message = saved > 50 ? 'Excellent optimization!' :
                     saved > 25 ? 'Good optimization!' :
                     saved > 0 ? 'Minor optimization' : 'No optimization possible';
        
        let alertClass = saved > 50 ? 'success' :
                        saved > 25 ? 'primary' :
                        saved > 0 ? 'warning' : 'info';

        optimizationStats.innerHTML = `
            <div class="alert alert-${alertClass}">
                <h4 class="alert-heading">${message}</h4>
                <p class="mb-0">
                    Original size: ${original} characters<br>
                    Minified size: ${minified} characters<br>
                    Space saved: ${saved}%
                </p>
            </div>`;
    }

    function formatBytes(bytes) {
        if (bytes === 0) return '0 KB';
        return (bytes / 1024).toFixed(2) + ' KB';
    }

    // Debounce function to limit update frequency
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
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

    // Initialize with empty input
    minifyCSS();
}); 