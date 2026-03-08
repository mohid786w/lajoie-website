const API_BASE_URL = 'http://localhost:3001/api';

document.addEventListener('DOMContentLoaded', () => {
    // Apply initial animations
    document.querySelectorAll('section').forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in');
        }, index * 200);
    });

    // Add scroll animations
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('slide-in');
            }
        });
    });

    // WhatsApp button functionality
    const whatsappBtn = document.getElementById('whatsappBtn');

    // Add pulse effect on load
    setTimeout(() => {
        whatsappBtn.classList.add('pulse');
    }, 2000);

    // Remove pulse effect when user hovers over the button
    whatsappBtn.addEventListener('mouseenter', function () {
        this.classList.remove('pulse');
    });

    // Add pulse effect again when user leaves the button
    whatsappBtn.addEventListener('mouseleave', function () {
        setTimeout(() => {
            this.classList.add('pulse');
        }, 3000);
    });

    // Scroll effect - button becomes more visible when scrolling down
    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            whatsappBtn.style.opacity = "1";
        } else {
            whatsappBtn.style.opacity = "0.9";
        }
    });

    // File upload functionality
    const fileInput = document.getElementById('resume');
    const fileNameDisplay = document.getElementById('file-name');
    let fileName = "";

    if (fileInput && fileNameDisplay) {
        fileInput.addEventListener('change', function () {
            if (this.files && this.files[0]) {
                fileName = this.files[0].name;
                fileNameDisplay.textContent = fileName;

                // Add a visual confirmation
                fileNameDisplay.style.color = "var(--accent-color)";
                setTimeout(() => {
                    fileNameDisplay.style.color = "rgba(255, 255, 255, 0.7)";
                }, 2000);
            } else {
                fileName = "";
                fileNameDisplay.textContent = "No file chosen";
            }
        });
    }

    // Form submission - 
    const careerForm = document.getElementById('career-form');

    if (careerForm) {
        careerForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            // Simple form validation
            const formElements = this.elements;
            let isValid = true;

            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];

                if (element.hasAttribute('required') && !element.value) {
                    isValid = false;
                    element.style.borderColor = "#ff4d4d";

                    // Reset border color after a while
                    setTimeout(() => {
                        element.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    }, 3000);
                }
            }

            if (isValid) {
                // Get form values
                const position = document.getElementById('position').value;
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const experience = document.getElementById('experience').value;
                const coverLetter = document.getElementById('message').value;

                // Create application object
                const application = {
                    position: position,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phone,
                    experience: parseInt(experience),
                    coverLetter: coverLetter,
                    resumeUrl: fileName,  // Using the file name stored earlier
                    date: new Date().toISOString(),
                    status: 'new'
                };

                try {
                    // Send to backend API
                    const response = await fetch(`${API_BASE_URL}/applications`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(application)
                    });

                    if (!response.ok) {
                        throw new Error('Failed to submit application');
                    }

                    const result = await response.json();

                    // Show success message
                    showFormMessage('Application submitted successfully! We will contact you soon.', 'success');

                    // Reset form
                    this.reset();
                    fileNameDisplay.textContent = "No file chosen";
                    fileName = "";

                } catch (error) {
                    console.error('Error submitting application:', error);
                    showFormMessage('There was an error submitting your application. Please try again.', 'error');
                }
            } else {
                showFormMessage('Please fill all required fields.', 'error');
            }
        });
    }

    // Function to show form messages
    function showFormMessage(message, type) {
        const formContainer = document.querySelector('.form-container');

        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;

        // Style the message
        messageEl.style.padding = '12px';
        messageEl.style.marginTop = '20px';
        messageEl.style.borderRadius = '5px';
        messageEl.style.textAlign = 'center';
        messageEl.style.fontWeight = '500';

        if (type === 'success') {
            messageEl.style.backgroundColor = 'rgba(75, 181, 67, 0.2)';
            messageEl.style.color = '#4bb543';
            messageEl.style.border = '1px solid rgba(75, 181, 67, 0.5)';
        } else {
            messageEl.style.backgroundColor = 'rgba(255, 77, 77, 0.2)';
            messageEl.style.color = '#ff4d4d';
            messageEl.style.border = '1px solid rgba(255, 77, 77, 0.5)';
        }

        // Append message to form container
        formContainer.appendChild(messageEl);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transition = 'opacity 0.5s ease';

            setTimeout(() => {
                messageEl.remove();
            }, 500);
        }, 5000);
    }

    // Apply buttons functionality
    const applyButtons = document.querySelectorAll('.apply-btn');

    applyButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Get job title from parent element
            const jobCard = this.closest('.job-card');
            const jobTitle = jobCard.querySelector('.job-title').textContent;

            // Scroll to application form
            document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' });

            // Set the job title in the dropdown
            const positionSelect = document.getElementById('position');

            // Find the option that matches the job title
            for (let i = 0; i < positionSelect.options.length; i++) {
                if (positionSelect.options[i].text === jobTitle) {
                    positionSelect.selectedIndex = i;
                    break;
                }
            }

            // Highlight the form briefly
            const formContainer = document.querySelector('.form-container');
            formContainer.style.boxShadow = '0 0 20px var(--accent-color)';

            setTimeout(() => {
                formContainer.style.boxShadow = 'none';
            }, 2000);
        });
    });

    // Job card hover effect
    const jobCards = document.querySelectorAll('.job-card');

    jobCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Add bounce effect on hover
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';

            // Highlight apply button
            const applyBtn = this.querySelector('.apply-btn');
            applyBtn.style.backgroundColor = '#c5a46c';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';

            const applyBtn = this.querySelector('.apply-btn');
            applyBtn.style.backgroundColor = '';
        });
    });

    // Add hover effects for culture images
    const cultureImages = document.querySelectorAll('.culture-image');

    cultureImages.forEach(img => {
        img.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            this.style.zIndex = '1';
        });

        img.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.zIndex = '';
        });
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Footer search functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add footer search functionality
    const searchInput = document.getElementById('footerSearchInput');
    const searchResults = document.getElementById('searchResults');

    // Sample search data
    const searchData = [
        { title: 'Residential Communities', url: '../Communities/Residential/residential.html', category: 'Communities' },
        { title: 'Commercial Communities', url: '../Communities/Commercial/commercial.html', category: 'Communities' },
        { title: 'Off-Plan Projects', url: '../Communities/Off-plan/offplan.html', category: 'Communities' },
        { title: 'Luxury Estates', url: '../Communities/Luxury Estate/luxury.html', category: 'Communities' },
        { title: 'Properties For Sale', url: '../Properties/Sale/Sale.html', category: 'Properties' },
        { title: 'Properties For Rent', url: '../Properties/Rent/Rent.html', category: 'Properties' },
        { title: 'New Developments', url: '../Properties/New Developments/ND.html', category: 'Properties' },
        { title: 'Featured Listings', url: '../Properties/Featured Listings/FL.html', category: 'Properties' },
        { title: 'Our Team', url: '../../About Us page/about.html#teamSection', category: 'About' },
        { title: 'Company Timeline', url: '../../About Us page/about.html#timelineSection', category: 'About' },
        { title: 'Contact Information', url: '../../Contact Us page/contactus.html', category: 'Contact' },
        { title: 'Career Opportunities', url: '../../Career Page/career.html', category: 'Careers' },
    ];

    // Show search results when input is focused
    searchInput.addEventListener('focus', () => {
        searchResults.classList.add('active');
    });

    // Hide search results when clicking outside
    document.addEventListener('click', (event) => {
        if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.classList.remove('active');
        }
    });

    // Handle search input
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase().trim();

        // Clear previous results
        while (searchResults.firstChild) {
            searchResults.removeChild(searchResults.firstChild);
        }

        if (searchTerm === '') {
            // Show hint when search is empty
            const hintElement = document.createElement('div');
            hintElement.className = 'initial-hint';
            hintElement.textContent = 'Try searching for properties, communities, or career';
            searchResults.appendChild(hintElement);
            return;
        }

        // Filter and display results
        const filteredResults = searchData.filter(item =>
            item.title.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );

        if (filteredResults.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'initial-hint';
            noResults.textContent = 'No results found';
            searchResults.appendChild(noResults);
        } else {
            filteredResults.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';

                // Create icon based on category
                const icon = document.createElement('span');
                icon.className = 'result-icon';

                switch (result.category) {
                    case 'Properties':
                        icon.innerHTML = '<i class="fas fa-home"></i>';
                        break;
                    case 'Communities':
                        icon.innerHTML = '<i class="fas fa-city"></i>';
                        break;
                    case 'About':
                        icon.innerHTML = '<i class="fas fa-info-circle"></i>';
                        break;
                    case 'Contact':
                        icon.innerHTML = '<i class="fas fa-envelope"></i>';
                        break;
                    case 'Careers':
                        icon.innerHTML = '<i class="fas fa-briefcase"></i>';
                        break;
                    default:
                        icon.innerHTML = '<i class="fas fa-search"></i>';
                }

                // Create text content
                const textContent = document.createElement('div');
                textContent.className = 'result-text';
                textContent.innerHTML = `
                    ${result.title}
                    <div class="result-category">${result.category}</div>
                `;

                resultItem.appendChild(icon);
                resultItem.appendChild(textContent);

                // Handle click on result item
                resultItem.addEventListener('click', () => {
                    window.location.href = result.url;
                });

                searchResults.appendChild(resultItem);
            });
        }
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Create toggle button and overlay
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    // Create menu toggle button
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    // Insert elements
    navbar.appendChild(menuToggle);
    document.body.appendChild(overlay);

    // Toggle menu function
    function toggleMenu() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Handle dropdowns on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');

        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                e.stopPropagation();

                // Close all other dropdowns first
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                        otherDropdown.classList.remove('active');
                    }
                });

                // Toggle the clicked dropdown
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close dropdowns when clicking anywhere else on the document
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
            const isClickInsideDropdown = Array.from(dropdowns).some(dropdown =>
                dropdown.contains(e.target) ||
                e.target.classList.contains('menu-toggle') ||
                e.target.closest('.menu-toggle')
            );

            if (!isClickInsideDropdown) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });

    document.querySelectorAll('.mobile-only a').forEach(link => {
        link.addEventListener('click', () => {
            // Close the mobile menu when a mobile-only link is clicked
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            overlay.classList.remove('active');
        });
    });
});