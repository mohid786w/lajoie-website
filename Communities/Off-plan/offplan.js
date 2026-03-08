// Off-Plan Communities - JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Format price values
    formatPrices();

    // Initialize animations
    initAnimations();

    // Initialize mobile navigation
    initMobileNav();

    // Smooth scrolling for navigation links
    initSmoothScrolling();

    // Setup WhatsApp button
    setupWhatsAppButton();

    // Setup property cards interaction
    setupPropertyCards();

    // Setup community sections effects
    setupCommunitySections();

    // Setup hero section effects
    setupHeroSection();

    // Setup community images hover effects
    setupCommunityImages();

    // Setup enquire buttons
    setupEnquireButtons();

    // Setup navigation highlighting
    setupNavigationHighlighting();

    // Setup CTA button animations
    setupCTAButtons();

    // Setup detail items animation
    setupDetailItems();

    // Setup scroll to top button
    setupScrollToTopButton();
});

// Format prices with commas
function formatPrices() {
    document.querySelectorAll('.price-value').forEach(price => {
        const priceText = price.textContent;
        const priceNum = parseInt(priceText);
        
        if (!isNaN(priceNum)) {
            // Format with commas for better readability (e.g., $1,200,000)
            price.textContent = priceNum.toLocaleString('en-US');
        } else {
            // Alternative method if parseInt fails
            price.textContent = priceText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    });
}

// Initialize animations
function initAnimations() {
    // Initialize animation classes
    initializeAnimationClasses();
    
    // Animate elements when scrolled into view
    setupScrollAnimations();
    
    // Make hero section visible initially
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('visible');
        }, 100);
    }
}


// Setup smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup WhatsApp button
function setupWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (!whatsappBtn) return;

    function toggleWhatsAppButton() {
        if (window.scrollY > 300) {
            whatsappBtn.classList.add('show');
        } else {
            whatsappBtn.classList.remove('show');
        }
    }

    // Add hover effect
    whatsappBtn.addEventListener('mouseenter', function () {
        this.classList.add('expanded');
    });

    whatsappBtn.addEventListener('mouseleave', function () {
        this.classList.remove('expanded');
    });

    window.addEventListener('scroll', toggleWhatsAppButton);
    toggleWhatsAppButton(); // Initial check
}

// Initialize animation classes
function initializeAnimationClasses() {
    // Community sections
    document.querySelectorAll('.community-section').forEach((section, index) => {
        section.classList.add('animate-on-scroll', 'animate-fade-in');
        section.style.transitionDelay = `${index * 0.1}s`;

        // Add different animation classes based on layout
        if (section.classList.contains('layout-left')) {
            section.querySelector('.community-image')?.classList.add('animate-on-scroll', 'animate-slide-right');
            section.querySelector('.community-info')?.classList.add('animate-on-scroll', 'animate-slide-left');
        } else if (section.classList.contains('layout-right')) {
            section.querySelector('.community-image')?.classList.add('animate-on-scroll', 'animate-slide-left');
            section.querySelector('.community-info')?.classList.add('animate-on-scroll', 'animate-slide-right');
        } else if (section.classList.contains('layout-centered')) {
            section.querySelector('.community-full-image')?.classList.add('animate-on-scroll', 'animate-zoom');
            section.querySelector('.community-info-centered')?.classList.add('animate-on-scroll', 'animate-fade-in');
        }

        // Add animations to property cards
        section.querySelectorAll('.property-card, .property-card-large').forEach((card, cardIndex) => {
            card.classList.add('animate-on-scroll', 'animate-fade-in');
            // Add a slight delay to each card
            card.style.transitionDelay = `${cardIndex * 0.1}s`;
        });
    });

    // Section headers
    document.querySelectorAll('.community-header').forEach(header => {
        header.classList.add('animate-on-scroll', 'animate-fade-in');
    });

    // Features
    document.querySelectorAll('.feature').forEach((feature, index) => {
        feature.classList.add('animate-on-scroll', 'animate-zoom');
        // Add a slight delay to each feature
        feature.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add fade-in animation to all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    function checkElementsInView() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.9;

        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerPoint) {
                element.classList.add('visible');
            }
        });
    }

    // Check elements in view on scroll and on page load
    window.addEventListener('scroll', checkElementsInView);
    window.addEventListener('resize', checkElementsInView);

    // Initial check to animate elements already in view
    setTimeout(checkElementsInView, 100);
}

// Setup property cards interaction
function setupPropertyCards() {
    document.querySelectorAll('.property-card, .property-card-large').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.borderColor = '#c9a45c';
        });

        card.addEventListener('mouseleave', function () {
            this.style.borderColor = '';
        });
    });
}

// Setup community sections effects
function setupCommunitySections() {
    document.querySelectorAll('.community-section').forEach(section => {
        // Parallax effect on section backgrounds
        window.addEventListener('scroll', function () {
            const scrollPos = window.scrollY;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // Check if section is in view
            if (scrollPos > sectionTop - window.innerHeight &&
                scrollPos < sectionTop + sectionHeight) {

                // Calculate parallax amount
                const distance = scrollPos - sectionTop;
                const parallaxValue = distance * 0.1;

                // Apply subtle parallax to section background
                section.style.backgroundPositionY = `-${parallaxValue}px`;
            }
        });

        // Add subtle shadow effect on hover
        section.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });

        section.addEventListener('mouseleave', function () {
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Setup hero section effects
function setupHeroSection() {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        window.addEventListener('scroll', function () {
            const scrollPos = window.scrollY;
            if (scrollPos < window.innerHeight) {
                // Parallax effect on hero background
                heroSection.style.backgroundPositionY = `${scrollPos * 0.4}px`;

                // Fade effect on hero content
                const heroContent = heroSection.querySelector('.section-container');
                if (heroContent) {
                    heroContent.style.opacity = 1 - (scrollPos / (window.innerHeight * 0.7));
                }
            }
        });
    }
}

// Setup community images hover effects
function setupCommunityImages() {
    document.querySelectorAll('.community-image, .community-full-image').forEach(image => {
        image.addEventListener('mouseenter', function () {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.03)';
            }
        });

        image.addEventListener('mouseleave', function () {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = '';
            }
        });
    });
}

// Setup enquire buttons
function setupEnquireButtons() {
    document.querySelectorAll('.enquire-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            // Add click animation
            this.classList.add('clicked');

            // Optional: Track property enquiries
            let propertyName = '';
            let propertyLocation = '';

            // Try to get property details from closest parent elements
            const propertyDetails = this.closest('.property-details') || this.closest('.property-details-large');
            if (propertyDetails) {
                const nameElement = propertyDetails.querySelector('h4');
                const locationElement = propertyDetails.querySelector('.property-location');

                if (nameElement) propertyName = nameElement.textContent;
                if (locationElement) propertyLocation = locationElement.textContent;

                console.log(`Enquiry for: ${propertyName} at ${propertyLocation}`);
            }

            // Remove animation class after transition
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
}

// Setup navigation highlighting
function setupNavigationHighlighting() {
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;

        // Find all sections that could be currently viewed
        const sections = [
            { id: 'hero', element: document.getElementById('hero') },
            { id: 'introduction', element: document.getElementById('introduction') },
            { id: 'communities', element: document.getElementById('communities') },
            { id: 'cta', element: document.getElementById('cta') }
        ];

        // Determine which section is currently in view
        let currentSection = null;
        for (const section of sections) {
            if (!section.element) continue;

            const sectionTop = section.element.offsetTop;
            const sectionHeight = section.element.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
                break;
            }
        }

        // Update navigation links
        if (currentSection) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                // Remove active from all links
                link.classList.remove('active');

                // Check if link points to current section
                const href = link.getAttribute('href');
                if (href && href.includes(currentSection)) {
                    link.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial check
}

// Setup CTA button animations
function setupCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.letterSpacing = '1px';
        });

        button.addEventListener('mouseleave', function () {
            this.style.letterSpacing = '';
        });
    });
}



// Setup scroll to top button
function setupScrollToTopButton() {
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 100px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--accent-color);
        color: white;
        border: none;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(scrollToTopButton);

    // Show/hide scroll to top button
    function toggleScrollButton() {
        if (window.scrollY > 500) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.transform = 'translateY(0)';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.transform = 'translateY(20px)';
        }
    }

    window.addEventListener('scroll', toggleScrollButton);

    // Scroll to top when button is clicked
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
// Footer search functionality
document.addEventListener('DOMContentLoaded', () => {
   

    // Add footer search functionality
    const searchInput = document.getElementById('footerSearchInput');
    const searchResults = document.getElementById('searchResults');

   
    const searchData = [
        { title: 'Residential Communities', url: '../../Communities/Residential/residential.html', category: 'Communities' },
        { title: 'Commercial Communities', url: '../../Communities/Commercial/commercial.html', category: 'Communities' },
        { title: 'Off-Plan Projects', url: '../../Communities/Off-plan/offplan.html', category: 'Communities' },
        { title: 'Luxury Estates', url: '../../Communities/Luxury Estate/luxury.html', category: 'Communities' },
        { title: 'Properties For Sale', url: '../../Properties/Sale/Sale.html', category: 'Properties' },
        { title: 'Properties For Rent', url: '../../Properties/Rent/Rent.html', category: 'Properties' },
        { title: 'New Developments', url: '../../Properties/New Developments/ND.html', category: 'Properties' },
        { title: 'Featured Listings', url: '../../Properties/Featured Listings/FL.html', category: 'Properties' },
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