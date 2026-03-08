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

    // Enquire buttons - redirect to contact page
    document.querySelectorAll('.enquire-btn').forEach(button => {
        button.addEventListener('click', function () {
            const propertyName = this.getAttribute('data-property');

            // Store the property name in localStorage to be accessed on contact page
            if (propertyName) {
                localStorage.setItem('selectedProperty', propertyName);
            }

            // Redirect to contact page
            window.location.href = '../../Contact Us page/contactus.html';
        });
    });

    // Learn more buttons - expand community information
    document.querySelectorAll('.learn-more-btn').forEach(button => {
        button.addEventListener('click', function () {
            // Get the parent community section
            const communityInfo = this.closest('.community-info');
            const communityDescription = communityInfo.querySelector('.community-description');

            // Toggle expanded class for longer description
            if (communityDescription.classList.contains('expanded')) {
                // If already expanded, collapse
                communityDescription.classList.remove('expanded');
                this.textContent = 'LEARN MORE';

                // Animate scroll back to the community section
                const communitySection = this.closest('section');
                communitySection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // If collapsed, expand
                communityDescription.classList.add('expanded');
                this.textContent = 'SHOW LESS';
            }
        });
    });

    // Community image hover effects
    document.querySelectorAll('.community-image').forEach(image => {
        image.addEventListener('mouseenter', function () {
            this.querySelector('img').style.transform = 'scale(1.05)';
        });

        image.addEventListener('mouseleave', function () {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // Property cards hover effects
    document.querySelectorAll('.property-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Add shadow and lift effect
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';

            // Highlight the enquire button
            const enquireBtn = this.querySelector('.enquire-btn');
            if (enquireBtn) {
                enquireBtn.style.backgroundColor = '#c7a76d';
            }
        });

        card.addEventListener('mouseleave', function () {
            // Reset shadow
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';

            // Reset the enquire button
            const enquireBtn = this.querySelector('.enquire-btn');
            if (enquireBtn) {
                enquireBtn.style.backgroundColor = '#B1935A';
            }
        });
    });

    // Initial check to trigger animations for elements already in viewport
    const triggerInitialAnimations = () => {
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.75) {
                setTimeout(() => {
                    section.classList.add('slide-in');
                }, 300);
            }
        });
    };

    triggerInitialAnimations();
});
// Footer search functionality
document.addEventListener('DOMContentLoaded', () => {
    // Existing code remains...

    // Add footer search functionality
    const searchInput = document.getElementById('footerSearchInput');
    const searchResults = document.getElementById('searchResults');

    // Sample search data - replace with your actual site pages
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