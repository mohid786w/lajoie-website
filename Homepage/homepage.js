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



    // About Us Tab System
    setupAboutTabs();

    // News Carousel
    setupNewsCarousel();

    // Property Gallery
    setupPropertyGallery();

    // Ensure video autoplays
    ensureVideoAutoplay();

    // Map interaction
    setupMap();
    
    // Add hover effects to buttons and interactive elements
    addHoverEffects();
    
    // Initialize load more button
    setupLoadMoreButton();
});

// Ensure video autoplays continuously 
function ensureVideoAutoplay() {
    const video = document.querySelector('video');
    
    // Make sure video autoplays
    video.play();
    
    // Ensure video restarts when it ends (as a backup to loop attribute)
    video.addEventListener('ended', () => {
        video.play();
    });
    
    // Handle visibility change to ensure video keeps playing when tab becomes visible again
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            video.play();
        }
    });
}
function setupSeeMoreButton() {
    const seeMoreBtn = document.querySelector('.see-more-btn');

    seeMoreBtn.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        // Get the properties section element
        const propertiesSection = document.getElementById('properties-section');

        // Scroll to the properties section smoothly
        if (propertiesSection) {
            propertiesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Add this function call to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    

    // Setup See More button
    setupSeeMoreButton();

});

// Map Interaction
function setupMap() {
    const mapImage = document.getElementById('map-image');
    
    mapImage.addEventListener('click', function () {
                window.open('https://www.google.com/maps/place/Abu+Dhabi,+UAE/', '_blank');
            });
}

// Hover Effects
function addHoverEffects() {
    // Add subtle scale effect to clickable elements
    const clickableElements = document.querySelectorAll('button, .news-card, .thumbnail, .nav-links li a');
    
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'transform 0.3s ease';
            element.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });
}

// Load More Button
function setupLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    loadMoreBtn.addEventListener('click', () => {
      
        loadMoreBtn.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            loadMoreBtn.style.animation = '';
            alert('This would navigate to the Properties page');
        }, 500);
    });
}

// About Us Tab System
function setupAboutTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const aboutImg = document.getElementById('about-img');
    const aboutText = document.getElementById('about-text');
    const aboutTitle = document.querySelector('.about-content h2');

    // Content for each tab
    const tabContent = {
        mission: {
            title: 'Our Mission',
            text: '"Our mission is to deliver reliable, transparent, and personalized real estate services that empower our clients to make confident and informed property decisions. We are committed to building lasting relationships based on trust, integrity, and clear communication. By combining local market expertise with a client-first approach, we strive to simplify the real estate journey, whether you are buying, selling, or investing. "',
            image: 'Gallery/our mission.jpg'
        },
        story: {
            title: 'Our Story',
            text: ' " Founded in 2015, La Joie began with a bold vision: to transform the real estate experience in the UAE by putting people and purpose at the heart of every transaction. What started as a small team of just five passionate agents has evolved into a thriving company of over 50 dedicated professionals, each committed to delivering excellence across all areas of property services. "',
            image: 'Gallery/our story.jpg'
        },
        vision: {
            title: 'Our Vision',
            text: '" Our vision is to become the most trusted and respected real estate partner in the UAE, setting new benchmarks for client satisfaction, transparency, and service excellence. We aim to redefine the real estate experience by embracing innovation, upholding the highest standards of integrity, and consistently delivering exceptional results. "',
            image: 'Gallery/our vision.jpg'
        }
    };

    // Add click event to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the tab content based on data attribute
            const tabName = button.getAttribute('data-tab');
            const content = tabContent[tabName];
            
            // Update content with animation
            aboutTitle.style.opacity = 0;
            aboutText.style.opacity = 0;
            aboutImg.style.opacity = 0;
            
            setTimeout(() => {
                aboutTitle.textContent = content.title;
                aboutText.textContent = content.text;
                aboutImg.src = content.image;
                
                aboutTitle.style.opacity = 1;
                aboutText.style.opacity = 1;
                aboutImg.style.opacity = 1;
            }, 300);
        });
    });
}

// News Carousel System
function setupNewsCarousel() {
    const carousel = document.querySelector('.news-carousel');
    const cards = document.querySelectorAll('.news-card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 20; // Card width + gap
    const visibleCards = Math.floor(carousel.offsetWidth / cardWidth);
    const maxIndex = cards.length - visibleCards;
    
    // Initialize autoplay interval
    let autoplayInterval = setInterval(moveToNext, 8000);
    
    // Move to specific slide
    function moveToSlide(index) {
        // Ensure index is within bounds
        if (index < 0) index = 0;
        if (index > maxIndex) index = maxIndex;
        
        currentIndex = index;
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === Math.floor(currentIndex / Math.max(1, Math.floor(cards.length / indicators.length))));
        });
        
        // Reset autoplay
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(moveToNext, 8000);
    }
    
    // Move to next slide
    function moveToNext() {
        const newIndex = currentIndex + 1;
        if (newIndex > maxIndex) {
            // Smooth loop back to first slide
            moveToSlide(0);
        } else {
            moveToSlide(newIndex);
        }
    }
    
    // Move to previous slide
    function moveToPrev() {
        moveToSlide(currentIndex - 1);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', moveToNext);
    prevBtn.addEventListener('click', moveToPrev);
    
    // Indicator clicks
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            const targetIndex = i * Math.max(1, Math.floor(cards.length / indicators.length));
            moveToSlide(targetIndex);
        });
    });
    
    // Make news cards clickable
    cards.forEach(card => {
        card.addEventListener('click', () => {
          
            card.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                card.style.animation = '';
            }, 500);
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Recalculate values
        const newCardWidth = cards[0].offsetWidth + 20;
        const newVisibleCards = Math.floor(carousel.offsetWidth / newCardWidth);
        const newMaxIndex = cards.length - newVisibleCards;
        
        // Update variables
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
        }
        
        // Update position
        carousel.style.transform = `translateX(-${currentIndex * newCardWidth}px)`;
    });
}

// Property Gallery System
function setupPropertyGallery() {
    const mainImage = document.getElementById('main-property-img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const propertyDescription = document.getElementById('property-description');
    
    // Property data
    const properties = [
        {
            mainImage: 'Gallery/p1.jpg',
            description: 'Abu Dhabi is home to some of the most luxurious and sought-after properties in the world, offering a unique blend of modernity, sophistication, and traditional Arabian charm. From sleek high-rise apartments with breathtaking waterfront views to expansive villas nestled in serene, master-planned communities, the capital city caters to a diverse range of lifestyle preferences.Its real estate landscape is characterized by world- class architecture, premium amenities, and a strong emphasis on sustainability and innovation.'
        },
        {
            mainImage: 'Gallery/p2.jpg',
            description: 'High - rise luxury apartment in the heart of Abu Dhabi, featuring expansive floor- to - ceiling windows that offer breathtaking panoramic views of the city skyline.Designed with elegance and comfort in mind, this modern residence boasts spacious interiors, high - end finishes, and smart home technology for seamless living.'
        },
        {
            mainImage: 'Gallery/p3.jpg',
            description: 'Stunning penthouse with a spacious wraparound terrace offering unobstructed views of the sparkling Arabian Gulf, creating the perfect setting for sunset evenings and outdoor entertaining. This exceptional residence features a custom-designed Italian kitchen with top-of-the-line appliances, sleek cabinetry, and elegant finishes tailored for both functionality and style.'
        },
        {
            mainImage: 'Gallery/p4.jpg',
            description: 'Contemporary downtown residence ideally situated within walking distance of premium shopping destinations, gourmet dining establishments, and vibrant cultural attractions. This stylish urban home offers open-concept living spaces that are perfect for both relaxation and entertaining, enhanced by floor-to-ceiling windows that flood the interior with natural light and showcase stunning cityscape views. '
        },
        {
            mainImage: 'Gallery/p5.jpg',
            description: 'Exclusive island estate offering unparalleled privacy and luxury, set in one of Abu Dhabi’s most elite and serene waterfront enclaves. This exceptional property features a private white-sand beach, a dedicated yacht dock for effortless access to the open waters, and meticulously landscaped gardens that create a tranquil, resort-like ambiance.'
        }
    ];
    
    let currentPropertyIndex = 0;
    let propertyInterval;
    
    // Function to change property
    function changeProperty(index) {
        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');
        
        // Fade out
        mainImage.style.opacity = 0;
        propertyDescription.style.opacity = 0;
        
        setTimeout(() => {
            // Update content
            mainImage.src = properties[index].mainImage;
            propertyDescription.textContent = properties[index].description;
            
            // Fade in
            mainImage.style.opacity = 1;
            propertyDescription.style.opacity = 1;
            
            currentPropertyIndex = index;
        }, 300);
        
        // Reset interval
        clearInterval(propertyInterval);
        propertyInterval = setInterval(rotateProperty, 8000);
    }
    
    // Auto rotate properties
    function rotateProperty() {
        const nextIndex = (currentPropertyIndex + 1) % properties.length;
        changeProperty(nextIndex);
    }
    
    // Start auto rotation
    propertyInterval = setInterval(rotateProperty, 8000);
    
    // Add click events to thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            changeProperty(index);
        });
    });
    
    // Set random images for thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.src = properties[index].mainImage;
    });
    document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    // Add pulse effect on load
    setTimeout(() => {
        whatsappBtn.classList.add('pulse');
    }, 2000);

    // Remove pulse effect when user hovers over the button
    whatsappBtn.addEventListener('mouseenter', function() {
        this.classList.remove('pulse');
    });

    // Add pulse effect again when user leaves the button
    whatsappBtn.addEventListener('mouseleave', function() {
        setTimeout(() => {
            this.classList.add('pulse');
        }, 3000);
    });

    // Scroll effect - button becomes more visible when scrolling down
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            whatsappBtn.style.opacity = "1";
        } else {
            whatsappBtn.style.opacity = "0.9";
        }
    });

    
    whatsappBtn.href = "https://wa.me/+971527111305"; 
});

}
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