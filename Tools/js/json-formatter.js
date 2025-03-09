document.addEventListener('DOMContentLoaded', function() {
    const jsonInput = document.getElementById('json-input');
    const jsonOutput = document.getElementById('json-output').querySelector('code');
    const indentSize = document.getElementById('indent-size');
    const sortKeys = document.getElementById('sort-keys');
    const validationResult = document.getElementById('validation-result');
    const pasteSample = document.getElementById('paste-sample');
    const clearInput = document.getElementById('clear-input');
    const copyOutput = document.getElementById('copy-output');
    const downloadOutput = document.getElementById('download-output');

    // Sample JSON data
    const sampleJson = {
        "name": "John Doe",
        "age": 30,
        "isStudent": false,
        "hobbies": ["reading", "music", "sports"],
        "address": {
            "street": "123 Main St",
            "city": "New York",
            "country": "USA"
        },
        "contact": {
            "email": "john@example.com",
            "phone": "+1-234-567-8900"
        }
    };

    // Initialize with empty input
    updateOutput('');

    // Add event listeners
    jsonInput.addEventListener('input', debounce(function(e) {
        updateOutput(e.target.value);
    }, 300));

    indentSize.addEventListener('change', function() {
        updateOutput(jsonInput.value);
    });

    sortKeys.addEventListener('change', function() {
        updateOutput(jsonInput.value);
    });

    // Paste sample JSON
    pasteSample.addEventListener('click', function() {
        jsonInput.value = JSON.stringify(sampleJson, null, 2);
        updateOutput(jsonInput.value);
    });

    // Clear input
    clearInput.addEventListener('click', function() {
        if (jsonInput.value && confirm('Are you sure you want to clear the input?')) {
            jsonInput.value = '';
            updateOutput('');
        }
    });

    // Copy formatted JSON
    copyOutput.addEventListener('click', function() {
        const formattedJson = jsonOutput.textContent;
        navigator.clipboard.writeText(formattedJson).then(() => {
            showToast('JSON copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard');
        });
    });

    // Download formatted JSON
    downloadOutput.addEventListener('click', function() {
        if (!jsonInput.value) {
            alert('Please enter some JSON before downloading.');
            return;
        }

        const formattedJson = jsonOutput.textContent;
        const blob = new Blob([formattedJson], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted.json';
        a.click();
        window.URL.revokeObjectURL(url);
    });

    function updateOutput(input) {
        if (!input.trim()) {
            jsonOutput.textContent = '';
            showValidation('empty');
            return;
        }

        try {
            // Parse JSON to validate it
            let parsed = JSON.parse(input);

            // Sort keys if option is selected
            if (sortKeys.checked) {
                parsed = sortObjectKeys(parsed);
            }

            // Format with selected indentation
            const indent = indentSize.value === 'tab' ? '\t' : ' '.repeat(parseInt(indentSize.value));
            const formatted = JSON.stringify(parsed, null, indent);

            // Update output with syntax highlighting
            jsonOutput.textContent = formatted;
            Prism.highlightElement(jsonOutput);

            showValidation('valid');
        } catch (error) {
            showValidation('invalid', error.message);
            jsonOutput.textContent = input;
        }
    }

    function sortObjectKeys(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.map(sortObjectKeys);
        }

        return Object.keys(obj)
            .sort()
            .reduce((sorted, key) => {
                sorted[key] = sortObjectKeys(obj[key]);
                return sorted;
            }, {});
    }

    function showValidation(status, message = '') {
        let html = '';
        
        switch (status) {
            case 'valid':
                html = `
                    <div class="alert alert-success mb-0">
                        <i class="fas fa-check-circle me-2"></i>
                        Valid JSON
                    </div>`;
                break;
            case 'invalid':
                html = `
                    <div class="alert alert-danger mb-0">
                        <i class="fas fa-exclamation-circle me-2"></i>
                        Invalid JSON: ${message}
                    </div>`;
                break;
            case 'empty':
                html = `
                    <p class="text-muted mb-0">
                        Enter JSON to see validation results
                    </p>`;
                break;
        }

        validationResult.innerHTML = html;
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
}); 