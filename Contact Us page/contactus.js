
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

    // Team member hover animations
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 25px rgba(177, 147, 90, 0.4)';
            const image = this.querySelector('.image-placeholder');
            image.style.backgroundColor = 'rgba(177, 147, 90, 0.2)';
        });

        member.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
            const image = this.querySelector('.image-placeholder');
            image.style.backgroundColor = '';
        });
    });

    // Form validation and animations
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add focus animation to form fields
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function () {
                this.parentElement.classList.add('focused');
                this.style.borderColor = 'var(--accent-color)';
            });

            input.addEventListener('blur', function () {
                this.parentElement.classList.remove('focused');
                this.style.borderColor = '';
                // Add validation classes if needed
                if (this.value.trim() !== '') {
                    this.classList.add('valid');
                } else {
                    this.classList.remove('valid');
                }
            });
        });

        // Form submission with validation
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (field.value.trim() === '') {
                    isValid = false;
                    field.classList.add('error');
                    field.style.borderColor = '#FF4136';

                    // Create error message if it doesn't exist
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'This field is required';
                        errorMsg.style.color = '#FF4136';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.marginTop = '5px';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);

                        // Remove error message on input
                        field.addEventListener('input', function () {
                            if (this.value.trim() !== '') {
                                this.classList.remove('error');
                                this.style.borderColor = '';
                                if (this.nextElementSibling && this.nextElementSibling.classList.contains('error-message')) {
                                    this.nextElementSibling.remove();
                                }
                            }
                        });
                    }
                } else {
                    field.classList.remove('error');
                    field.style.borderColor = '';

                    // Remove error message if it exists
                    if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                        field.nextElementSibling.remove();
                    }
                }
            });

            // Specific validation for email format
            const emailField = document.getElementById('email');
            if (emailField && emailField.value.trim() !== '') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                    emailField.style.borderColor = '#FF4136';

                    if (!emailField.nextElementSibling || !emailField.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'Please enter a valid email address';
                        errorMsg.style.color = '#FF4136';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.marginTop = '5px';
                        emailField.parentNode.insertBefore(errorMsg, emailField.nextSibling);
                    }
                }
            }

            // If form is valid, send to backend
            if (isValid) {
                // Get form data
                const formData = {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    phoneNumber: document.getElementById('phoneNumber').value,
                    email: document.getElementById('email').value,
                    homeAddress: document.getElementById('homeAddress').value,
                    inquiryType: document.getElementById('inquiryType').value,
                    message: document.getElementById('message').value,
                    notifications: document.getElementById('notifications').checked,
                    date: new Date().toISOString(),
                    status: 'new'
                };

                try {
                    // Send to backend API
                    const response = await fetch(`${API_BASE_URL}/contacts`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });

                    if (!response.ok) {
                        throw new Error('Failed to submit form');
                    }

                    const result = await response.json();

                    // Create success message
                    const successMsg = document.createElement('div');
                    successMsg.classList.add('success-message');
                    successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully! We will contact you soon.';
                    successMsg.style.backgroundColor = 'rgba(46, 204, 113, 0.2)';
                    successMsg.style.color = '#2ecc71';
                    successMsg.style.padding = '15px';
                    successMsg.style.borderRadius = '5px';
                    successMsg.style.marginTop = '20px';
                    successMsg.style.textAlign = 'center';
                    successMsg.style.fontWeight = 'bold';

                    // Insert before submit button
                    const submitBtn = contactForm.querySelector('.submit-btn');
                    contactForm.insertBefore(successMsg, submitBtn);

                    // Animate submit button
                    submitBtn.textContent = 'SENT!';
                    submitBtn.style.backgroundColor = '#2ecc71';

                    // Reset form after delay
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.textContent = 'SUBMIT';
                        submitBtn.style.backgroundColor = '';
                        successMsg.remove();
                    }, 3000);

                } catch (error) {
                    console.error('Error submitting form:', error);

                    // Show error message
                    const errorMsg = document.createElement('div');
                    errorMsg.classList.add('error-message');
                    errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> There was an error submitting your form. Please try again.';
                    errorMsg.style.backgroundColor = 'rgba(255, 77, 77, 0.2)';
                    errorMsg.style.color = '#ff4d4d';
                    errorMsg.style.padding = '15px';
                    errorMsg.style.borderRadius = '5px';
                    errorMsg.style.marginTop = '20px';
                    errorMsg.style.textAlign = 'center';
                    errorMsg.style.fontWeight = 'bold';

                    const submitBtn = contactForm.querySelector('.submit-btn');
                    contactForm.insertBefore(errorMsg, submitBtn);

                    setTimeout(() => {
                        errorMsg.remove();
                    }, 5000);
                }
            }
        });
    }
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