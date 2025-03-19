// Class and subject data
const educationData = {
    school: {
        classes: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'],
        streams: {
            '11th': ['Science', 'Commerce', 'Arts'],
            '12th': ['Science', 'Commerce', 'Arts']
        },
        subjects: {
            'Science': {
                '11th': ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'English'],
                '12th': ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'English']
            },
            'Commerce': {
                '11th': ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English'],
                '12th': ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English']
            },
            'Arts': {
                '11th': ['History', 'Political Science', 'Economics', 'Geography', 'English'],
                '12th': ['History', 'Political Science', 'Economics', 'Geography', 'English']
            }
        },
        chapters: {
            'Physics': {
                '11th': [
                    'Physical World',
                    'Units and Measurements',
                    'Motion in a Straight Line',
                    'Motion in a Plane',
                    'Laws of Motion',
                    'Work, Energy and Power',
                    'System of Particles and Rotational Motion',
                    'Gravitation',
                    'Mechanical Properties of Solids',
                    'Mechanical Properties of Fluids',
                    'Thermal Properties of Matter',
                    'Thermodynamics',
                    'Kinetic Theory',
                    'Oscillations',
                    'Waves'
                ],
                '12th': [
                    'Electric Charges and Fields',
                    'Electrostatic Potential and Capacitance',
                    'Current Electricity',
                    'Moving Charges and Magnetism',
                    'Magnetism and Matter',
                    'Electromagnetic Induction',
                    'Alternating Current',
                    'Electromagnetic Waves',
                    'Ray Optics',
                    'Wave Optics',
                    'Dual Nature of Matter and Radiation',
                    'Atoms',
                    'Nuclei',
                    'Semiconductor Electronics',
                    'Communication Systems'
                ]
            },
            'Chemistry': {
                '11th': [
                    'Some Basic Concepts of Chemistry',
                    'Structure of Atom',
                    'Classification of Elements and Periodicity in Properties',
                    'Chemical Bonding and Molecular Structure',
                    'States of Matter',
                    'Thermodynamics',
                    'Equilibrium',
                    'Redox Reactions',
                    'Hydrogen',
                    'The s-Block Elements',
                    'The p-Block Elements',
                    'Organic Chemistry',
                    'Hydrocarbons',
                    'Environmental Chemistry'
                ],
                '12th': [
                    'The Solid State',
                    'Solutions',
                    'Electrochemistry',
                    'Chemical Kinetics',
                    'Surface Chemistry',
                    'General Principles and Processes of Isolation of Elements',
                    'The p-Block Elements',
                    'The d and f Block Elements',
                    'Coordination Compounds',
                    'Haloalkanes and Haloarenes',
                    'Alcohols, Phenols and Ethers',
                    'Aldehydes, Ketones and Carboxylic Acids',
                    'Amines',
                    'Biomolecules',
                    'Polymers',
                    'Chemistry in Everyday Life'
                ]
            },
            'Biology': {
                '11th': [
                    'The Living World',
                    'Biological Classification',
                    'Plant Kingdom',
                    'Animal Kingdom',
                    'Morphology of Flowering Plants',
                    'Anatomy of Flowering Plants',
                    'Structural Organisation in Animals',
                    'Cell: The Unit of Life',
                    'Biomolecules',
                    'Cell Cycle and Cell Division',
                    'Transport in Plants',
                    'Mineral Nutrition',
                    'Photosynthesis in Higher Plants',
                    'Respiration in Plants',
                    'Plant Growth and Development',
                    'Digestion and Absorption',
                    'Breathing and Exchange of Gases',
                    'Body Fluids and Circulation',
                    'Excretory Products and their Elimination',
                    'Locomotion and Movement',
                    'Neural Control and Coordination',
                    'Chemical Coordination and Integration'
                ],
                '12th': [
                    'Reproduction in Organisms',
                    'Sexual Reproduction in Flowering Plants',
                    'Human Reproduction',
                    'Reproductive Health',
                    'Principles of Inheritance and Variation',
                    'Molecular Basis of Inheritance',
                    'Evolution',
                    'Human Health and Disease',
                    'Strategies for Enhancement in Food Production',
                    'Microbes in Human Welfare',
                    'Biotechnology: Principles and Processes',
                    'Biotechnology and its Applications',
                    'Organisms and Populations',
                    'Ecosystem',
                    'Biodiversity and Conservation',
                    'Environmental Issues'
                ]
            },
            'Mathematics': {
                '11th': [
                    'Sets',
                    'Relations and Functions',
                    'Trigonometric Functions',
                    'Principle of Mathematical Induction',
                    'Complex Numbers and Quadratic Equations',
                    'Linear Inequalities',
                    'Permutations and Combinations',
                    'Binomial Theorem',
                    'Sequences and Series',
                    'Straight Lines',
                    'Conic Sections',
                    'Introduction to Three Dimensional Geometry',
                    'Limits and Derivatives',
                    'Mathematical Reasoning',
                    'Statistics',
                    'Probability'
                ],
                '12th': [
                    'Relations and Functions',
                    'Inverse Trigonometric Functions',
                    'Matrices',
                    'Determinants',
                    'Continuity and Differentiability',
                    'Applications of Derivatives',
                    'Integrals',
                    'Applications of Integrals',
                    'Differential Equations',
                    'Vector Algebra',
                    'Three Dimensional Geometry',
                    'Linear Programming',
                    'Probability'
                ]
            },
            'Computer Science': {
                '11th': [
                    'Computer Fundamentals',
                    'Programming Concepts',
                    'Python Basics',
                    'Flow of Control',
                    'Functions',
                    'Strings',
                    'Lists and Tuples',
                    'Dictionaries and Sets',
                    'File Handling',
                    'Data Handling',
                    'SQL and Database Concepts',
                    'Computer Networks',
                    'HTML and Web Pages',
                    'Cyber Ethics and Safety'
                ],
                '12th': [
                    'Python Review',
                    'Object Oriented Programming',
                    'Data Structures',
                    'Sorting and Searching',
                    'File Handling and CSV',
                    'Stack and Queue',
                    'Boolean Algebra',
                    'Computer Networks Advanced',
                    'MySQL and Python Connectivity',
                    'Interface Python with MySQL',
                    'Data Visualization',
                    'Project Work'
                ]
            },
            'English': {
                '11th': [
                    'The Portrait of a Lady',
                    'We\'re Not Afraid to Die',
                    'Discovering Tut',
                    'Landscape of the Soul',
                    'The Ailing Planet',
                    'The Browning Version',
                    'The Adventure',
                    'Silk Road',
                    'Father to Son',
                    'Hornbill Poetry',
                    'Snapshots Stories',
                    'Grammar and Writing Skills'
                ],
                '12th': [
                    'The Last Lesson',
                    'Lost Spring',
                    'Deep Water',
                    'The Rattrap',
                    'Indigo',
                    'Poets and Pancakes',
                    'The Interview',
                    'Going Places',
                    'My Mother at Sixty-six',
                    'Flamingo Poetry',
                    'Vistas Stories',
                    'Advanced Writing Skills'
                ]
            }
        },
        books: {
            'Physics': {
                '11th': [
                    'NCERT Physics Part 1',
                    'NCERT Physics Part 2',
                    'HC Verma Concepts of Physics',
                    'DC Pandey Physics',
                    'Resnick Halliday Physics'
                ],
                '12th': [
                    'NCERT Physics Part 1',
                    'NCERT Physics Part 2',
                    'HC Verma Concepts of Physics',
                    'DC Pandey Physics',
                    'Resnick Halliday Physics'
                ]
            },
            'Chemistry': {
                '11th': [
                    'NCERT Chemistry Part 1',
                    'NCERT Chemistry Part 2',
                    'OP Tandon Chemistry',
                    'MS Chauhan Chemistry',
                    'JD Lee Inorganic Chemistry'
                ],
                '12th': [
                    'NCERT Chemistry Part 1',
                    'NCERT Chemistry Part 2',
                    'OP Tandon Chemistry',
                    'MS Chauhan Chemistry',
                    'JD Lee Inorganic Chemistry'
                ]
            },
            'Biology': {
                '11th': [
                    'NCERT Biology',
                    'NCERT Exemplar Biology',
                    'Pradeep Biology',
                    'MTG Biology',
                    'Arihant Biology'
                ],
                '12th': [
                    'NCERT Biology',
                    'NCERT Exemplar Biology',
                    'Pradeep Biology',
                    'MTG Biology',
                    'Arihant Biology'
                ]
            },
            'Mathematics': {
                '11th': [
                    'NCERT Mathematics Part 1',
                    'NCERT Mathematics Part 2',
                    'RD Sharma Mathematics',
                    'RS Aggarwal Mathematics',
                    'ML Aggarwal Mathematics'
                ],
                '12th': [
                    'NCERT Mathematics Part 1',
                    'NCERT Mathematics Part 2',
                    'RD Sharma Mathematics',
                    'RS Aggarwal Mathematics',
                    'ML Aggarwal Mathematics'
                ]
            },
            'Computer Science': {
                '11th': [
                    'NCERT Computer Science',
                    'Sumita Arora Python',
                    'Preeti Arora Computer Science',
                    'Python Programming by Reema Thareja',
                    'Computer Science with Python by Dhanesh Jain'
                ],
                '12th': [
                    'NCERT Computer Science',
                    'Sumita Arora Python',
                    'Preeti Arora Computer Science',
                    'Python Programming by Reema Thareja',
                    'Computer Science with Python by Dhanesh Jain'
                ]
            },
            'English': {
                '11th': [
                    'NCERT Hornbill',
                    'NCERT Snapshots',
                    'Golden Guide English Core',
                    'Evergreen Practice Papers',
                    'Together with English'
                ],
                '12th': [
                    'NCERT Flamingo',
                    'NCERT Vistas',
                    'Golden Guide English Core',
                    'Evergreen Practice Papers',
                    'Together with English'
                ]
            }
        }
    },
    college: {
        classes: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
        subjects: ['Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics', 'Mathematics', 'Commerce', 'Arts']
    },
    university: {
        classes: ['Bachelor', 'Master', 'PhD'],
        subjects: ['Engineering', 'Medicine', 'Law', 'Business', 'Arts', 'Science', 'Technology']
    }
};

// DOM Elements
const educationLevelSelect = document.getElementById('educationLevel');
const classSelect = document.getElementById('class');
const streamSelect = document.getElementById('stream');
const subjectSelect = document.getElementById('subject');
const chapterSelect = document.getElementById('chapter');
const bookSelect = document.getElementById('book');
const chapterSearchInput = document.getElementById('chapterSearch');
const loadVideosBtn = document.getElementById('loadVideos');
const videoPlayer = document.getElementById('videoPlayer');
const videoList = document.getElementById('videoList');

// Current state
let currentVideoId = null;
let currentVideos = [];
let currentVideoPlayer = null;

// Initialize YouTube API
let youtubeAPIReady = false;

// This function will be called by YouTube API when it's ready
function onYouTubeIframeAPIReady() {
    youtubeAPIReady = true;
    console.log('YouTube API Ready');
}

// Load YouTube API
function loadYouTubeAPI() {
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}

// Update current timestamp display
function updateCurrentTimestamp() {
    if (currentVideoPlayer && currentVideoPlayer.getCurrentTime) {
        const time = currentVideoPlayer.getCurrentTime();
        const timestampDisplay = document.getElementById('currentTimestamp');
        if (timestampDisplay) {
            timestampDisplay.textContent = formatTimestamp(time);
            // Update the hidden input for notes
            const timestampInput = document.getElementById('noteTimestamp');
            if (timestampInput) {
                timestampInput.value = time;
            }
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load YouTube API when page loads
    loadYouTubeAPI();
    
    // Initialize all select elements
    educationLevelSelect.addEventListener('change', function() {
        updateClassOptions();
        // Reset other selects
        streamSelect.innerHTML = '<option value="">Select Stream</option>';
        subjectSelect.innerHTML = '<option value="">Select Subject</option>';
        bookSelect.innerHTML = '<option value="">Select Book</option>';
        chapterSelect.innerHTML = '<option value="">Select Chapter</option>';
    });

    classSelect.addEventListener('change', function() {
        updateStreamOptions();
        // Reset other selects
        subjectSelect.innerHTML = '<option value="">Select Subject</option>';
        bookSelect.innerHTML = '<option value="">Select Book</option>';
        chapterSelect.innerHTML = '<option value="">Select Chapter</option>';
    });

    streamSelect.addEventListener('change', function() {
        updateSubjectOptions();
        // Reset other selects
        bookSelect.innerHTML = '<option value="">Select Book</option>';
        chapterSelect.innerHTML = '<option value="">Select Chapter</option>';
    });

    subjectSelect.addEventListener('change', function() {
        updateBookOptions();
        // Reset chapter select
        chapterSelect.innerHTML = '<option value="">Select Chapter</option>';
    });

    bookSelect.addEventListener('change', function() {
        updateChapterOptions();
    });

    loadVideosBtn.addEventListener('click', loadVideos);
    videoList.addEventListener('click', handleVideoClick);
    chapterSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loadVideos();
        }
    });

    // Add event listener for Add Note button
    const addNoteBtn = document.getElementById('addNoteBtn');
    if (addNoteBtn) {
        addNoteBtn.addEventListener('click', addNote);
    }
    
    // Add event listener for note text input (Enter key)
    const noteText = document.getElementById('noteText');
    if (noteText) {
        noteText.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                addNote();
            }
        });
    }

    // Initialize voice recording functionality
    const voiceNotesBtn = document.getElementById('voiceNotesBtn');
    if (voiceNotesBtn) {
        voiceNotesBtn.addEventListener('click', toggleVoiceRecording);
    }
});

// Update class options based on education level
function updateClassOptions() {
    const level = educationLevelSelect.value;
    classSelect.innerHTML = '<option value="">Select Class</option>';
    
    if (level && educationData[level]) {
        educationData[level].classes.forEach(className => {
            const option = document.createElement('option');
            option.value = className;
            option.textContent = className;
            classSelect.appendChild(option);
        });
    }
    
    // Reset other selects
    streamSelect.innerHTML = '<option value="">Select Stream</option>';
    subjectSelect.innerHTML = '<option value="">Select Subject</option>';
    bookSelect.innerHTML = '<option value="">Select Book</option>';
    chapterSelect.innerHTML = '<option value="">Select Chapter</option>';
}

// Update stream options based on class
function updateStreamOptions() {
    const level = educationLevelSelect.value;
    const className = classSelect.value;
    streamSelect.innerHTML = '<option value="">Select Stream</option>';
    
    if (level === 'school' && educationData.school.streams[className]) {
        educationData.school.streams[className].forEach(stream => {
            const option = document.createElement('option');
            option.value = stream;
            option.textContent = stream;
            streamSelect.appendChild(option);
        });
    }
    
    // Reset subject and chapter selects
    subjectSelect.innerHTML = '<option value="">Select Subject</option>';
    bookSelect.innerHTML = '<option value="">Select Book</option>';
    chapterSelect.innerHTML = '<option value="">Select Chapter</option>';
}

// Update subject options based on stream
function updateSubjectOptions() {
    const level = educationLevelSelect.value;
    const className = classSelect.value;
    const stream = streamSelect.value;
    
    // Clear current options
    subjectSelect.innerHTML = '<option value="">Select Subject</option>';
    
    if (level === 'school' && stream) {
        // For 11th and 12th, use stream-specific subjects
        if ((className === '11th' || className === '12th') && educationData.school.subjects[stream]) {
            educationData.school.subjects[stream][className].forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                subjectSelect.appendChild(option);
            });
        }
    }
    
    // Reset book and chapter selects
    bookSelect.innerHTML = '<option value="">Select Book</option>';
    chapterSelect.innerHTML = '<option value="">Select Chapter</option>';
}

// Update book options based on subject and class
function updateBookOptions() {
    const level = educationLevelSelect.value;
    const className = classSelect.value;
    const subject = subjectSelect.value;
    
    // Clear current options
    bookSelect.innerHTML = '<option value="">Select Book</option>';
    
    if (level === 'school' && subject && className) {
        // Check if books exist for this subject and class
        if (educationData.school.books[subject] && educationData.school.books[subject][className]) {
            educationData.school.books[subject][className].forEach(book => {
                const option = document.createElement('option');
                option.value = book;
                option.textContent = book;
                bookSelect.appendChild(option);
            });
        }
    }
}

// Update chapter options based on selected book and subject
function updateChapterOptions() {
    const level = educationLevelSelect.value;
    const className = classSelect.value;
    const subject = subjectSelect.value;
    const book = bookSelect.value;
    
    // Clear current options
    chapterSelect.innerHTML = '<option value="">Select Chapter</option>';
    
    if (level === 'school' && subject && className && book) {
        // Check if chapters exist for this subject and class
        if (educationData.school.chapters[subject] && educationData.school.chapters[subject][className]) {
            let chapters = educationData.school.chapters[subject][className];
            
            // If NCERT book is selected, filter chapters based on part
            if (book.includes('NCERT')) {
                if (book.includes('Part 1')) {
                    chapters = chapters.slice(0, Math.ceil(chapters.length / 2));
                } else if (book.includes('Part 2')) {
                    chapters = chapters.slice(Math.ceil(chapters.length / 2));
                }
            }
            
            chapters.forEach(chapter => {
                const option = document.createElement('option');
                option.value = chapter;
                option.textContent = chapter;
                chapterSelect.appendChild(option);
            });
        }
    }
}

// Load videos from YouTube
async function loadVideos() {
    const level = educationLevelSelect.value;
    const className = classSelect.value;
    const stream = streamSelect.value;
    const subject = subjectSelect.value;
    const book = bookSelect.value;
    const chapter = chapterSelect.value;
    const chapterSearch = chapterSearchInput.value.trim();
    
    if (!level || !className || !subject || !book) {
        alert('Please select education level, class, subject, and book');
        return;
    }
    
    // Show loading state
    loadVideosBtn.disabled = true;
    loadVideosBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
    
    // Create search query
    let searchQuery = `${className} ${subject}`;
    if (stream) searchQuery += ` ${stream}`;
    if (book) {
        if (book.includes('NCERT')) {
            searchQuery += ` NCERT ${className}`;
        } else {
            searchQuery += ` ${book}`;
        }
    }
    if (chapter) searchQuery += ` ${chapter}`;
    if (chapterSearch) searchQuery += ` ${chapterSearch}`;
    searchQuery += ' tutorial lecture';
    
    try {
        // Create a YouTube search URL
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
        
        // Open in new tab
        window.open(searchUrl, '_blank');
        
        // Show video ID input
        videoList.innerHTML = `
            <div class="text-center p-4">
                <h4>Enter Video ID</h4>
                <p>Copy the video ID from the YouTube URL and paste it below:</p>
                <div class="input-group mb-3">
                    <input type="text" id="videoIdInput" class="form-control" placeholder="Enter video ID">
                    <button class="btn btn-primary" onclick="loadVideoFromId()">
                        <i class="fas fa-play me-2"></i>Watch
                    </button>
                </div>
                <small class="text-muted">Example: If the URL is youtube.com/watch?v=ABC123, enter ABC123</small>
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        videoList.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Error loading videos. Please try again.
            </div>
        `;
    } finally {
        loadVideosBtn.disabled = false;
        loadVideosBtn.innerHTML = '<i class="fas fa-search me-2"></i>Load Videos';
    }
}

// Load video from ID or URL
function loadVideoFromId() {
    const videoIdInput = document.getElementById('videoIdInput');
    const input = videoIdInput.value.trim();
    
    if (!input) {
        showError('Please enter a YouTube URL or video ID');
        return;
    }
    
    // Show loading state
    videoList.innerHTML = `
        <div class="text-center p-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Loading video...</p>
        </div>
    `;
    
    try {
        // Extract video ID from different URL formats
        let videoId = '';
        
        // Remove any @ symbol from the start of the URL
        const cleanInput = input.replace(/^@/, '');
        
        // Handle different YouTube URL formats
        if (cleanInput.includes('youtube.com') || cleanInput.includes('youtu.be')) {
            const url = new URL(cleanInput);
            if (cleanInput.includes('youtube.com/watch')) {
                videoId = url.searchParams.get('v');
            } else if (cleanInput.includes('youtu.be/')) {
                videoId = url.pathname.split('/')[1];
            } else if (cleanInput.includes('youtube.com/embed/')) {
                videoId = url.pathname.split('/')[2];
            } else if (cleanInput.includes('youtube.com/live/')) {
                // Handle live URLs
                videoId = url.pathname.split('/')[2];
                if (videoId && videoId.includes('?')) {
                    videoId = videoId.split('?')[0];
                }
            }
        } else {
            // Clean up input if it's just a video ID
            videoId = cleanInput.replace(/[^a-zA-Z0-9_-]/g, '');
        }
        
        // Validate video ID format (should be 11 characters)
        if (!videoId || videoId.length !== 11) {
            showError(`Invalid YouTube URL or video ID. Please check and try again.`);
            return;
        }
        
        // Load the video player
        loadVideoPlayer(videoId);
        
        // Clear the input
        videoIdInput.value = '';
        
    } catch (error) {
        console.error('Error processing video URL:', error);
        if (error.message.includes('Invalid URL')) {
            // If input is not a valid URL, try treating it as a direct video ID
            const videoId = input.replace(/[^a-zA-Z0-9_-]/g, '');
            if (videoId.length === 11) {
                loadVideoPlayer(videoId);
                videoIdInput.value = '';
                return;
            }
        }
        showError(`Could not process "${input}". Please enter a valid YouTube URL or video ID.`);
    }
}

// Load video player with improved error handling
function loadVideoPlayer(videoId) {
    if (!videoId) {
        showError('Invalid video ID');
        return;
    }
    
    try {
        currentVideoId = videoId;
        const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&origin=${window.location.origin}`;
        
        // Clear previous player
        videoPlayer.innerHTML = '';
        
        // Create new iframe
        const iframe = document.createElement('iframe');
        iframe.id = 'youtubePlayer';
        iframe.width = '100%';
        iframe.height = '400';
        iframe.src = embedUrl;
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        
        videoPlayer.appendChild(iframe);

        // Initialize player after iframe is loaded
        iframe.onload = function() {
            // Wait for YouTube API to be ready
            function initializePlayer() {
                if (window.YT && window.YT.Player) {
                    try {
                        currentVideoPlayer = new YT.Player('youtubePlayer', {
                            events: {
                                'onReady': onPlayerReady,
                                'onStateChange': onPlayerStateChange,
                                'onError': onPlayerError
                            }
                        });
                    } catch (error) {
                        console.error('YouTube player initialization error:', error);
                    }
                } else {
                    // If API is not ready yet, try again in 100ms
                    setTimeout(initializePlayer, 100);
                }
            }
            initializePlayer();
        };
        
        // Hide any error messages since video loaded successfully
        videoList.innerHTML = `
            <div class="alert alert-success" role="alert">
                <i class="fas fa-check-circle me-2"></i>Video loaded successfully!
                <div class="mt-2">
                    <small class="text-muted">You can now take notes while watching the video.</small>
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('Error loading video:', error);
        showError('Error loading video. Please try again.');
    }
}

// Show error message with more details and examples
function showError(message) {
    videoList.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <h5 class="alert-heading"><i class="fas fa-exclamation-circle me-2"></i>Error</h5>
            <p class="mb-0">${message}</p>
            <hr>
            <div class="mt-3">
                <p class="mb-2">Examples of valid formats:</p>
                <div class="bg-light p-3 rounded mb-3">
                    <p class="mb-2"><strong>Full URL:</strong><br>
                    <code>https://www.youtube.com/watch?v=dQw4w9WgXcQ</code></p>
                    
                    <p class="mb-2"><strong>Short URL:</strong><br>
                    <code>https://youtu.be/dQw4w9WgXcQ</code></p>
                    
                    <p class="mb-2"><strong>Live URL:</strong><br>
                    <code>https://www.youtube.com/live/BHcOvp6CYDU</code></p>
                    
                    <p class="mb-0"><strong>Video ID:</strong><br>
                    <code>dQw4w9WgXcQ</code> (11 characters)</p>
                </div>
                <div class="input-group">
                    <input type="text" id="videoIdInput" class="form-control form-control-lg" 
                           placeholder="Paste YouTube URL or video ID here"
                           onpaste="setTimeout(loadVideoFromId, 100)">
                    <button class="btn btn-primary btn-lg" onclick="loadVideoFromId()">
                        <i class="fas fa-play me-2"></i>Load Video
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Focus the input field
    setTimeout(() => {
        const input = document.getElementById('videoIdInput');
        if (input) {
            input.focus();
        }
    }, 100);
}

// Player error event handler
function onPlayerError(event) {
    let errorMessage = 'An error occurred while playing the video.';
    switch (event.data) {
        case 2:
            errorMessage = 'Invalid video ID. Please check and try again.';
            break;
        case 5:
            errorMessage = 'HTML5 player error. Please try a different browser.';
            break;
        case 100:
            errorMessage = 'Video not found or removed.';
            break;
        case 101:
        case 150:
            errorMessage = 'Video playback not allowed on embedded players.';
            break;
    }
    showError(errorMessage);
}

// Player ready event
function onPlayerReady(event) {
    console.log('Player ready');
    // Start timestamp update interval with more frequent updates
    const timestampInterval = setInterval(updateCurrentTimestamp, 100); // Update every 100ms for smoother display
    
    // Store interval ID in the player object for cleanup
    currentVideoPlayer.timestampInterval = timestampInterval;
    
    // Add the timestamp input to the notes form
    const noteForm = document.querySelector('#noteForm');
    if (noteForm) {
        // Add hidden input for timestamp if it doesn't exist
        if (!document.getElementById('noteTimestamp')) {
            const timestampInput = document.createElement('input');
            timestampInput.type = 'hidden';
            timestampInput.id = 'noteTimestamp';
            noteForm.appendChild(timestampInput);
        }
        
        // Add live timestamp display if it doesn't exist
        if (!document.getElementById('liveTimestamp')) {
            const liveTimestampDiv = document.createElement('div');
            liveTimestampDiv.className = 'live-timestamp-container mb-2';
            liveTimestampDiv.innerHTML = `
                <div class="d-flex align-items-center">
                    <span class="badge bg-primary me-2">
                        <i class="fas fa-clock me-1"></i>Current Time
                    </span>
                    <span id="currentTimestamp" class="font-monospace">00:00</span>
                </div>
            `;
            noteForm.insertBefore(liveTimestampDiv, noteForm.firstChild);
        }
    }
}

// Player state change event
function onPlayerStateChange(event) {
    // Update UI based on player state
    updateCurrentTimestamp();
}

// Extract video IDs from YouTube search results
function extractVideoIds(html) {
    const videoIds = [];
    const regex = /"videoId":"([^"]+)"/g;
    let match;
    
    while ((match = regex.exec(html)) !== null) {
        videoIds.push(match[1]);
    }
    
    return videoIds.slice(0, 20); // Limit to 20 videos
}

// Display videos in the list
function displayVideos(videos) {
    videoList.innerHTML = '';
    
    videos.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        if (index === 0) {
            videoItem.classList.add('active');
            currentVideoId = video.id.videoId;
            loadVideoPlayer(currentVideoId);
        }
        
        videoItem.innerHTML = `
            <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}" class="video-thumbnail">
            <div class="video-title">${video.snippet.title}</div>
            <div class="video-duration">${video.snippet.channelTitle}</div>
        `;
        
        videoList.appendChild(videoItem);
    });
}

// Handle video click
function handleVideoClick(e) {
    const videoItem = e.target.closest('.video-item');
    if (!videoItem) return;
    
    const index = Array.from(videoList.children).indexOf(videoItem);
    if (index !== -1 && currentVideos[index]) {
        currentVideoId = currentVideos[index].id.videoId;
        loadVideoPlayer(currentVideoId);
        
        // Update active state
        videoList.querySelectorAll('.video-item').forEach(item => item.classList.remove('active'));
        videoItem.classList.add('active');
    }
}

// Add note with current timestamp
function addNote() {
    const noteText = document.getElementById('noteText');
    const noteForm = document.getElementById('noteForm');
    
    if (!noteText || !currentVideoId) {
        alert('Please enter a note and make sure a video is playing');
        return;
    }
    
    const text = noteText.value.trim();
    if (!text) {
        alert('Please enter some text for your note');
        return;
    }

    // Get the current timestamp
    const timestamp = currentVideoPlayer ? currentVideoPlayer.getCurrentTime() : 0;
    
    // Create note object
    const note = {
        id: Date.now(),
        text: text,
        timestamp: parseFloat(timestamp),
        formattedTime: formatTimestamp(timestamp),
        videoId: currentVideoId,
        dateAdded: new Date().toLocaleString(),
        lastModified: new Date().toLocaleString()
    };
    
    // Save note
    const notes = getNotes();
    notes.push(note);
    localStorage.setItem('studyNotes', JSON.stringify(notes));
    
    // Clear input
    noteText.value = '';
    
    // Display updated notes
    displayNotes();
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success mt-2';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>Note added at ${formatTimestamp(timestamp)}
    `;
    noteForm.appendChild(successMessage);
    setTimeout(() => successMessage.remove(), 3000);
}

// Format timestamp to HH:MM:SS
function formatTimestamp(seconds) {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
        return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
}

// Get notes from localStorage
function getNotes() {
    const notes = localStorage.getItem('studyNotes');
    return notes ? JSON.parse(notes) : [];
}

// Display notes for current video
function displayNotes() {
    const notesSection = document.getElementById('notesSection');
    if (!notesSection) return;

    const notes = getNotes().filter(note => note.videoId === currentVideoId);
    
    if (notes.length === 0) {
        notesSection.innerHTML = `
            <div class="text-center p-4 text-muted">
                <i class="fas fa-sticky-note fa-2x mb-2"></i>
                <p>No notes yet. Start adding notes while watching the video!</p>
            </div>
        `;
        return;
    }
    
    // Sort notes by timestamp
    notes.sort((a, b) => a.timestamp - b.timestamp);
    
    notesSection.innerHTML = notes.map(note => `
        <div class="note-item mb-3 card" data-note-id="${note.id}">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <button class="btn btn-link timestamp-btn p-0 me-2" onclick="jumpToTimestamp(${note.timestamp})">
                        <i class="fas fa-clock me-1"></i>${note.formattedTime}
                    </button>
                    <div class="btn-group">
                        ${!note.isVoiceNote ? `
                            <button class="btn btn-sm btn-outline-primary" onclick="editNote(${note.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                        ` : ''}
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteNote(${note.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="note-content" id="noteContent-${note.id}">
                    ${note.isVoiceNote ? `
                        <div class="voice-note">
                            <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-microphone me-2"></i>
                                <span>Voice Note</span>
                            </div>
                            <audio controls class="w-100">
                                <source src="${note.audioUrl}" type="audio/wav">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    ` : `
                        <p class="mb-1">${note.text}</p>
                    `}
                    <small class="text-muted d-block mt-2">Added: ${note.dateAdded}</small>
                    ${note.lastModified !== note.dateAdded ? `
                        <small class="text-muted d-block">Modified: ${note.lastModified}</small>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');

    // Update notes statistics
    updateNotesStatistics(notes);
}

// Jump to timestamp in video
function jumpToTimestamp(timestamp) {
    if (!currentVideoPlayer) return;
    
    try {
        currentVideoPlayer.seekTo(timestamp);
        currentVideoPlayer.playVideo();
        
        // Flash the timestamp display
        const timestampDisplay = document.getElementById('currentTimestamp');
        if (timestampDisplay) {
            timestampDisplay.classList.add('timestamp-flash');
            setTimeout(() => timestampDisplay.classList.remove('timestamp-flash'), 500);
        }
        
        // Highlight the clicked note
        const noteElement = event.target.closest('.note-item');
        if (noteElement) {
            noteElement.classList.add('note-highlight');
            setTimeout(() => noteElement.classList.remove('note-highlight'), 1000);
        }
    } catch (error) {
        console.error('Error jumping to timestamp:', error);
    }
}

// Delete note
function deleteNote(noteId) {
    const notes = getNotes();
    const updatedNotes = notes.filter(note => note.id !== noteId);
    localStorage.setItem('studyNotes', JSON.stringify(updatedNotes));
    displayNotes();
}

// Edit note function
function editNote(noteId) {
    const notes = getNotes();
    const note = notes.find(n => n.id === noteId);
    if (!note) return;
    
    const noteContent = document.getElementById(`noteContent-${noteId}`);
    if (!noteContent) return;
    
    // Save the original content to restore if cancelled
    noteContent.dataset.originalContent = noteContent.innerHTML;
    
    // Replace content with edit form
    noteContent.innerHTML = `
        <div class="edit-note-form">
            <textarea class="form-control mb-2" rows="3">${note.text}</textarea>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-success" onclick="saveEdit(${noteId})">
                    <i class="fas fa-save me-1"></i>Save
                </button>
                <button class="btn btn-sm btn-secondary" onclick="cancelEdit(${noteId})">
                    <i class="fas fa-times me-1"></i>Cancel
                </button>
            </div>
        </div>
    `;
    
    // Focus and select the textarea content
    const textarea = noteContent.querySelector('textarea');
    textarea.focus();
    textarea.select();
}

// Save edited note
function saveEdit(noteId) {
    const notes = getNotes();
    const noteIndex = notes.findIndex(n => n.id === noteId);
    if (noteIndex === -1) return;
    
    const noteContent = document.getElementById(`noteContent-${noteId}`);
    if (!noteContent) return;
    
    const textarea = noteContent.querySelector('textarea');
    const newText = textarea.value.trim();
    
    if (!newText) {
        alert('Note cannot be empty');
        return;
    }
    
    // Update note
    notes[noteIndex].text = newText;
    notes[noteIndex].lastModified = new Date().toLocaleString();
    
    // Save to localStorage
    localStorage.setItem('studyNotes', JSON.stringify(notes));
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success mt-2';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>Note updated successfully
    `;
    noteContent.appendChild(successMessage);
    
    // Refresh the notes display after a short delay
    setTimeout(() => displayNotes(), 1000);
}

// Cancel edit and restore original content
function cancelEdit(noteId) {
    const noteContent = document.getElementById(`noteContent-${noteId}`);
    if (!noteContent || !noteContent.dataset.originalContent) return;
    
    noteContent.innerHTML = noteContent.dataset.originalContent;
}

// Add CSS styles for live timestamp and note highlighting
const style = document.createElement('style');
style.textContent = `
    .live-timestamp-container {
        background: #f8f9fa;
        padding: 8px;
        border-radius: 4px;
        margin-bottom: 1rem;
    }
    
    #currentTimestamp {
        font-size: 1.2rem;
        font-weight: 500;
        color: #0d6efd;
    }
    
    .timestamp-flash {
        animation: timestamp-flash 0.5s ease;
    }
    
    @keyframes timestamp-flash {
        0% { background-color: #0d6efd; color: white; }
        100% { background-color: transparent; }
    }
    
    .note-highlight {
        animation: note-highlight 1s ease;
    }
    
    @keyframes note-highlight {
        0% { background-color: #e7f1ff; }
        100% { background-color: transparent; }
    }
    
    .timestamp-btn {
        color: #0d6efd;
        text-decoration: none;
        transition: color 0.2s;
    }
    
    .timestamp-btn:hover {
        color: #0a58ca;
        text-decoration: underline;
    }
`;
document.head.appendChild(style);

// Voice recording variables
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;

// Toggle voice recording
async function toggleVoiceRecording() {
    const voiceNotesBtn = document.getElementById('voiceNotesBtn');
    if (!voiceNotesBtn) return;

    if (!isRecording) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                await saveVoiceNote(audioBlob);
            };

            mediaRecorder.start();
            isRecording = true;
            voiceNotesBtn.classList.add('recording');
            voiceNotesBtn.innerHTML = '<i class="fas fa-stop"></i>';
            voiceNotesBtn.title = 'Click to stop recording';
            
            // Show recording indicator
            showRecordingStatus(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please check permissions.');
        }
    } else {
        stopVoiceRecording();
    }
}

// Stop voice recording
function stopVoiceRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        isRecording = false;
        
        const voiceNotesBtn = document.getElementById('voiceNotesBtn');
        if (voiceNotesBtn) {
            voiceNotesBtn.classList.remove('recording');
            voiceNotesBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceNotesBtn.title = 'Click to start recording';
        }
        
        // Hide recording indicator
        showRecordingStatus(false);
    }
}

// Show recording status
function showRecordingStatus(isRecording) {
    let statusDiv = document.getElementById('recordingStatus');
    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.id = 'recordingStatus';
        statusDiv.className = 'recording-status';
        document.querySelector('.notes-input-section .card-body').appendChild(statusDiv);
    }
    
    if (isRecording) {
        statusDiv.innerHTML = `
            <div class="alert alert-danger mb-0 mt-2">
                <i class="fas fa-microphone-alt me-2"></i>Recording in progress...
            </div>
        `;
    } else {
        statusDiv.innerHTML = '';
    }
}

// Save voice note with improved handling
async function saveVoiceNote(audioBlob) {
    if (!currentVideoId) {
        alert('Please load a video first');
        return;
    }

    const timestamp = currentVideoPlayer ? currentVideoPlayer.getCurrentTime() : 0;
    
    try {
        // Create audio URL
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Create note object with audio
        const note = {
            id: Date.now(),
            text: 'Voice Note',
            timestamp: parseFloat(timestamp),
            formattedTime: formatTimestamp(timestamp),
            videoId: currentVideoId,
            dateAdded: new Date().toLocaleString(),
            lastModified: new Date().toLocaleString(),
            audioUrl: audioUrl,
            isVoiceNote: true
        };
        
        // Save note
        const notes = getNotes();
        notes.push(note);
        localStorage.setItem('studyNotes', JSON.stringify(notes));
        
        // Display updated notes
        displayNotes();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-2';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>Voice note added at ${formatTimestamp(timestamp)}
        `;
        document.querySelector('.notes-input-section .card-body').appendChild(successMessage);
        setTimeout(() => successMessage.remove(), 3000);
        
    } catch (error) {
        console.error('Error saving voice note:', error);
        alert('Error saving voice note. Please try again.');
    }
}

// Update notes statistics
function updateNotesStatistics(notes) {
    const totalNotes = notes.length;
    const voiceNotes = notes.filter(note => note.isVoiceNote).length;
    const textNotes = totalNotes - voiceNotes;
    
    document.getElementById('totalNotes').textContent = `${totalNotes} (${textNotes} Text, ${voiceNotes} Voice)`;
    
    // Update time covered
    if (currentVideoPlayer && currentVideoPlayer.getDuration) {
        const videoDuration = currentVideoPlayer.getDuration();
        const timeCovered = notes.length > 0 ? Math.max(...notes.map(note => note.timestamp)) : 0;
        document.getElementById('timeCovered').textContent = formatTimestamp(timeCovered);
        
        // Update progress bar
        const coverage = (timeCovered / videoDuration) * 100;
        const progressBar = document.getElementById('notesCoverage');
        if (progressBar) {
            progressBar.style.width = `${Math.min(coverage, 100)}%`;
            progressBar.setAttribute('aria-valuenow', Math.min(coverage, 100));
        }
    }
}

// Add CSS styles for voice notes
const voiceStyles = document.createElement('style');
voiceStyles.textContent = `
    #voiceNotesBtn {
        padding: 0.375rem 0.75rem;
        border-radius: 0.25rem;
        transition: all 0.3s ease;
    }
    
    #voiceNotesBtn.recording {
        background-color: #dc3545;
        color: white;
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .recording-status {
        transition: all 0.3s ease;
    }
    
    .voice-note {
        background: #f8f9fa;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 5px;
    }
    
    .voice-note audio {
        width: 100%;
        height: 40px;
        margin-top: 5px;
        border-radius: 20px;
    }
    
    .voice-note audio::-webkit-media-controls-panel {
        background-color: #ffffff;
    }
    
    .voice-note audio::-webkit-media-controls-play-button {
        background-color: #0d6efd;
        border-radius: 50%;
        color: white;
    }
    
    .voice-note audio::-webkit-media-controls-current-time-display,
    .voice-note audio::-webkit-media-controls-time-remaining-display {
        color: #0d6efd;
        font-weight: bold;
    }
    
    .voice-note i {
        color: #0d6efd;
    }
`;
document.head.appendChild(voiceStyles);

// Add CSS styles for note editing
const editStyles = document.createElement('style');
editStyles.textContent = `
    .edit-note-form textarea {
        width: 100%;
        border: 1px solid #ced4da;
        border-radius: 4px;
        padding: 8px;
        margin-bottom: 8px;
        font-size: 14px;
    }
    
    .edit-note-form textarea:focus {
        border-color: #86b7fe;
        box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
        outline: none;
    }
    
    .note-item .btn-group {
        opacity: 0.6;
        transition: opacity 0.2s;
    }
    
    .note-item:hover .btn-group {
        opacity: 1;
    }
    
    .note-item .btn-outline-primary:hover {
        background-color: #0d6efd;
        color: white;
    }
    
    .note-item .btn-outline-danger:hover {
        background-color: #dc3545;
        color: white;
    }
`;
document.head.appendChild(editStyles); 