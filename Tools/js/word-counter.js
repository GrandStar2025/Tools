document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const wordCount = document.getElementById('word-count');
    const charCount = document.getElementById('char-count');
    const sentenceCount = document.getElementById('sentence-count');
    const paragraphCount = document.getElementById('paragraph-count');
    const readingTime = document.getElementById('reading-time');
    const speakingTime = document.getElementById('speaking-time');
    const keywordDensity = document.getElementById('keyword-density');
    const copyButton = document.getElementById('copy-text');
    const clearButton = document.getElementById('clear-text');
    const downloadButton = document.getElementById('download-text');

    // Constants for time calculations
    const WORDS_PER_MINUTE_READING = 225; // Average reading speed
    const WORDS_PER_MINUTE_SPEAKING = 130; // Average speaking speed

    // Initialize with empty text
    updateCounts('');

    // Add event listener for text input
    textInput.addEventListener('input', debounce(function(e) {
        const text = e.target.value;
        updateCounts(text);
    }, 300));

    // Copy text button
    copyButton.addEventListener('click', function() {
        textInput.select();
        document.execCommand('copy');
        showToast('Text copied to clipboard!');
    });

    // Clear text button
    clearButton.addEventListener('click', function() {
        if (textInput.value && confirm('Are you sure you want to clear all text?')) {
            textInput.value = '';
            updateCounts('');
        }
    });

    // Download text button
    downloadButton.addEventListener('click', function() {
        if (!textInput.value) {
            alert('Please enter some text before downloading.');
            return;
        }
        
        const blob = new Blob([textInput.value], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'text-content.txt';
        a.click();
        window.URL.revokeObjectURL(url);
    });

    function updateCounts(text) {
        // Update word count
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        wordCount.textContent = words;

        // Update character count
        const chars = text.length;
        charCount.textContent = chars;

        // Update sentence count
        const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
        sentenceCount.textContent = sentences;

        // Update paragraph count
        const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0;
        paragraphCount.textContent = paragraphs;

        // Update reading and speaking time
        updateReadingTime(words);

        // Update keyword density
        updateKeywordDensity(text);
    }

    function updateReadingTime(wordCount) {
        const readingMinutes = Math.ceil(wordCount / WORDS_PER_MINUTE_READING);
        const speakingMinutes = Math.ceil(wordCount / WORDS_PER_MINUTE_SPEAKING);

        readingTime.textContent = formatTime(readingMinutes);
        speakingTime.textContent = formatTime(speakingMinutes);
    }

    function formatTime(minutes) {
        if (minutes < 1) {
            return 'Less than a minute';
        } else if (minutes === 1) {
            return '1 minute';
        } else {
            return `${minutes} minutes`;
        }
    }

    function updateKeywordDensity(text) {
        if (!text.trim()) {
            keywordDensity.innerHTML = '<p class="text-muted">Enter text to see keyword density</p>';
            return;
        }

        // Get all words and count their occurrences
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const wordFreq = {};
        let totalWords = words.length;

        words.forEach(word => {
            if (word.length > 2) { // Only count words longer than 2 characters
                wordFreq[word] = (wordFreq[word] || 0) + 1;
            }
        });

        // Sort words by frequency
        const sortedWords = Object.entries(wordFreq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5); // Get top 5 words

        // Create HTML for keyword density
        let html = '<div class="table-responsive"><table class="table table-sm">';
        html += '<thead><tr><th>Word</th><th>Count</th><th>Density</th></tr></thead><tbody>';
        
        sortedWords.forEach(([word, count]) => {
            const density = ((count / totalWords) * 100).toFixed(1);
            html += `<tr>
                <td>${word}</td>
                <td>${count}</td>
                <td>${density}%</td>
            </tr>`;
        });

        html += '</tbody></table></div>';
        keywordDensity.innerHTML = html;
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