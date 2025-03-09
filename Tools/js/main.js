// Load header and footer
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        });

    // Load footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    // Initialize search functionality
    filterTools();
});

// Filter tools based on search term
function filterTools(searchTerm) {
    const searchInput = document.getElementById('search-tools');
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        // Search in categories
        const categoryCards = document.querySelectorAll('#categories-container .card');
        categoryCards.forEach(card => {
            const title = card.querySelector('.h5').textContent.toLowerCase();
            const description = card.querySelector('.text-muted').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.closest('.col-md-6').style.display = '';
            } else {
                card.closest('.col-md-6').style.display = 'none';
            }
        });

        // Search in featured tools
        const toolCards = document.querySelectorAll('#featured-tools-container .tool-card');
        toolCards.forEach(card => {
            const title = card.querySelector('.h5').textContent.toLowerCase();
            const description = card.querySelector('.tool-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.closest('.col-md-6').style.display = '';
            } else {
                card.closest('.col-md-6').style.display = 'none';
            }
        });
    });
} 