document.addEventListener('DOMContentLoaded', () => {
    // Apply initial animations
    setTimeout(() => {
        document.querySelector('.hero').classList.add('fade-in');
    }, 200);

    document.querySelectorAll('.community-section').forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in');
        }, (index + 1) * 300);
    });

    // Add scroll animations
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.community-section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('slide-in');
            }
        });

        // Animate property cards on scroll
        const propertyCards = document.querySelectorAll('.property-card, .luxury-card');
        propertyCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (cardTop < windowHeight * 0.85) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, Math.random() * 300);
            }
        });
    });

    // Initialize property cards with initial hidden state
    document.querySelectorAll('.property-card, .luxury-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
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

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    const horizontalScroll = document.querySelector('#offplan .horizontal-scroll');

    if (scrollLeftBtn && scrollRightBtn && horizontalScroll) {
        const scrollAmount = 300; // Adjust scroll amount as needed

        scrollLeftBtn.addEventListener('click', () => {
            horizontalScroll.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            horizontalScroll.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    // Add hover effect animation to property images
    document.querySelectorAll('.property-image, .luxury-image').forEach(image => {
        image.addEventListener('mouseenter', function () {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });

        image.addEventListener('mouseleave', function () {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Add animation to section headers when they come into view
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-header').forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(header);
    });

    // Add 'active' class to section headers when they are visible in viewport
    document.addEventListener('scroll', () => {
        document.querySelectorAll('.section-header').forEach(header => {
            const headerTop = header.getBoundingClientRect().top;
            if (headerTop < window.innerHeight * 0.8) {
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }
        });
    });
});
// Footer search functionality
document.addEventListener('DOMContentLoaded', () => {
    

    // Add footer search functionality
    const searchInput = document.getElementById('footerSearchInput');
    const searchResults = document.getElementById('searchResults');

  
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