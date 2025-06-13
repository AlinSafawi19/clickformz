// Global variables
let serviceSelect;

// Cookie Consent Management
const cookieBanner = document.getElementById('cookieBanner');
const acceptBtn = document.querySelector('.accept-btn');
const rejectBtn = document.querySelector('.reject-btn');

// Cookie names
const COOKIE_CONSENT = 'cookie_consent';
const SCROLL_POSITION = 'scroll_position';

// Clear all stored data
function clearStoredData() {
    localStorage.clear();
}

// Save scroll position
function saveScrollPosition() {
    if (localStorage.getItem(COOKIE_CONSENT) === 'true') {
        localStorage.setItem(SCROLL_POSITION, window.scrollY.toString());
    }
}

// Restore scroll position
function restoreScrollPosition() {
    const savedPosition = localStorage.getItem(SCROLL_POSITION);
    if (savedPosition) {
        // Use setTimeout to ensure the page is fully loaded
        setTimeout(() => {
            window.scrollTo(0, parseInt(savedPosition));
        }, 100);
    }
}

// Accept cookies
function acceptCookies() {
    localStorage.setItem(COOKIE_CONSENT, 'true');
    if (cookieBanner) cookieBanner.classList.remove('active');
    // Save current scroll position when accepting cookies
    saveScrollPosition();
}

// Reject cookies
function rejectCookies() {
    clearStoredData(); // Clear all stored data
    localStorage.setItem(COOKIE_CONSENT, 'false');
    if (cookieBanner) cookieBanner.classList.remove('active');
}

// Initialize cookie consent
document.addEventListener('DOMContentLoaded', () => {
    //localStorage.clear();
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem(COOKIE_CONSENT);
    if (!hasConsent && cookieBanner) {
        cookieBanner.classList.add('active');
    }

    // Restore scroll position regardless of cookie consent
    restoreScrollPosition();

    // Add scroll event listener to save position
    window.addEventListener('scroll', saveScrollPosition);

    // Log all local storage values
    console.log('All Local Storage Values:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`${key}: ${localStorage.getItem(key)}`);
    }

    // Event listeners for cookie buttons
    if (acceptBtn) acceptBtn.addEventListener('click', acceptCookies);
    if (rejectBtn) rejectBtn.addEventListener('click', rejectCookies);

    // Initialize particles.js only if it's available and the element exists
    if (typeof particlesJS === 'function' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#e65c00'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#e65c00',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    const navLinks = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('.transparent-header');
    const sections = document.querySelectorAll('section');
    const parallaxBg = document.querySelector('.parallax-bg');
    const laptopMockup = document.querySelector('.laptop-mockup');
    const budgetInput = document.getElementById('budget');

    // Function to format budget input with commas
    const formatBudgetInput = (input) => {
        // Remove all non-digit characters
        let value = input.value.replace(/[^\d]/g, '');

        // Add commas for thousands
        if (value.length > 0) {
            value = parseInt(value, 10).toLocaleString('en-US');
        }

        // Update input value
        input.value = value;
    };

    // Add input event listener for budget field
    if (budgetInput) {
        budgetInput.addEventListener('input', () => formatBudgetInput(budgetInput));
    }

    // Function to update header state
    const updateHeaderState = () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition === 0) {
            header.classList.add('transparent');
        } else {
            header.classList.remove('transparent');
        }
    };

    // Function to update active navigation link
    const updateActiveNavLink = () => {
        const scrollPosition = window.scrollY;
        let currentSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // Check if the section is in view with a threshold
            if (scrollPosition >= sectionTop - 150 && scrollPosition < sectionTop + sectionHeight - 150) {
                currentSection = sectionId;
            }
        });

        // Only update if we have a valid section
        if (currentSection) {
            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref === `#${currentSection}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    };

    // Function to handle laptop mockup parallax
    const handleLaptopParallax = () => {
        if (laptopMockup) {
            const scrollPosition = window.scrollY;
            const heroSection = document.querySelector('.hero-section');
            const heroTop = heroSection.offsetTop;
            const heroHeight = heroSection.offsetHeight;

            // Calculate how far we've scrolled through the hero section
            const scrolled = Math.min(Math.max(scrollPosition - heroTop, 0), heroHeight);
            const progress = scrolled / heroHeight;

            // Calculate parallax movement
            const translateY = scrolled * 0.5; // Increased movement
            const translateZ = -100 + (scrolled * 0.1); // Dynamic Z position
            const scale = 1.2 + (progress * 0.1); // Dynamic scale

            // Apply transform with dynamic values
            laptopMockup.style.transform = `translateZ(${translateZ}px) scale(${scale}) translateY(${translateY}px)`;

            // Dynamic opacity based on scroll progress
            const opacity = 0.7 - (progress * 0.2);
            laptopMockup.style.opacity = Math.max(0.5, Math.min(0.7, opacity));

            // Add subtle rotation for more depth
            const rotateX = progress * 2;
            laptopMockup.style.transform += ` rotateX(${rotateX}deg)`;
        }
    };

    // Function to handle about section parallax
    const handleParallax = () => {
        if (parallaxBg) {
            const scrollPosition = window.scrollY;
            const aboutSection = document.querySelector('#about');
            const aboutTop = aboutSection.offsetTop;
            const aboutHeight = aboutSection.offsetHeight;

            if (scrollPosition >= aboutTop - window.innerHeight &&
                scrollPosition <= aboutTop + aboutHeight) {
                const scrolled = scrollPosition - aboutTop;
                const translateY = scrolled * 0.3;
                const scale = 1.5 + (scrolled * 0.0001);

                parallaxBg.style.transform = `translateZ(-4px) scale(${scale}) translateY(${translateY}px)`;

                const opacity = 1 - (Math.abs(scrolled) * 0.001);
                parallaxBg.style.opacity = Math.max(0.7, Math.min(1, opacity));
            }
        }
    };

    // Add smooth scroll behavior
    const smoothScroll = (target) => {
        if (!target) return; // Exit if target is null or undefined

        const headerHeight = document.querySelector('.transparent-header')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    };

    // Handle navigation clicks with smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            // Check if the link is to the current page
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Remove active class from all links
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to clicked link
                    link.classList.add('active');

                    // Smooth scroll to target
                    smoothScroll(targetSection);

                    // Update URL hash without triggering scroll
                    history.pushState(null, null, targetId);
                }
            }
            // If it's a link to another page, let it work normally
        });
    });

    // Add scroll event listener with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            updateHeaderState();
            updateActiveNavLink();
            handleParallax();
            handleLaptopParallax();
        });
    });

    // Set initial states
    updateHeaderState();
    updateActiveNavLink();
    handleParallax();
    handleLaptopParallax();

    // Update states on hash change
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash;
        const targetSection = document.querySelector(hash);

        if (targetSection) {
            smoothScroll(targetSection);
            updateActiveNavLink();
        }
    });

    // Initialize phone input
    const phoneInputField = document.querySelector("#phone");
    if (phoneInputField && typeof window.intlTelInput === 'function') {
        window.phoneInput = window.intlTelInput(phoneInputField, {
            preferredCountries: ["us", "gb", "ca", "ae"],
            separateDialCode: true,
            initialCountry: localStorage.getItem('phone_country') || "auto",
            customContainer: "iti-custom",
            geoIpLookup: function (callback) {
                fetch("/public/json/json.json")
                    .then(res => res.json())
                    .then(data => {
                        // Only use geoIP if no country is stored
                        if (!localStorage.getItem('phone_country')) {
                            callback(data.country_code);
                        } else {
                            callback(localStorage.getItem('phone_country'));
                        }
                    })
                    .catch(() => callback("lb"));
            }
        });

        // Add event listeners for debugging
        phoneInputField.addEventListener("countrychange", function () {
            const countryData = window.phoneInput.getSelectedCountryData();
            const hasConsent = localStorage.getItem(COOKIE_CONSENT);
            if (countryData && countryData.iso2 && hasConsent === 'true') {
                localStorage.setItem('phone_country', countryData.iso2);
            }
        });

        // Listen for clicks on the dropdown
        document.addEventListener("click", function (e) {
            const countryElement = e.target.closest(".iti__country");

            if (countryElement) {
                // Get the country code from the clicked element
                const countryCode = countryElement.getAttribute("data-country-code");

                if (countryCode) {
                    const hasConsent = localStorage.getItem(COOKIE_CONSENT);
                    if (hasConsent === 'true') {
                        localStorage.setItem('phone_country', countryCode);
                    }
                    // Force update the input
                    window.phoneInput.setCountry(countryCode);
                }
            }
        });
    }

    // Search Functionality
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const recentSearchesList = document.querySelector('.recent-searches-list');

    // Load recent searches from localStorage
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

    // Update recent searches display
    function updateRecentSearches() {
        recentSearchesList.innerHTML = recentSearches
            .map(search => `
                <a href="#" class="recent-search-item">
                    <i class="fas fa-history"></i>
                    <span>${search}</span>
                </a>
            `)
            .join('');
    }

    // Initialize recent searches
    updateRecentSearches();

    // Toggle search overlay
    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });

    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });

    // Close search on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });

    // Handle search form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();

        if (searchTerm) {
            // Add to recent searches (max 5)
            recentSearches = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
            updateRecentSearches();

            // Perform search
            performSearch(searchTerm);
        }
    });

    // Handle recent search clicks
    recentSearchesList.addEventListener('click', (e) => {
        if (e.target.closest('.recent-search-item')) {
            e.preventDefault();
            const searchTerm = e.target.closest('.recent-search-item').querySelector('span').textContent;
            searchInput.value = searchTerm;
            performSearch(searchTerm);
        }
    });

    // Handle category tag clicks
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const searchTerm = tag.textContent.trim();
            searchInput.value = searchTerm;
            performSearch(searchTerm);
        });
    });

    // Search function
    function performSearch(term) {
        // Convert search term to lowercase for case-insensitive matching
        const searchTerm = term.toLowerCase();

        // Define searchable sections and their keywords
        const searchableSections = [
            {
                id: 'services',
                keywords: ['web', 'website', 'application', 'app', 'development', 'service', 'services', 'e-commerce', 'ecommerce', 'chatbot', 'ai', 'artificial intelligence']
            },
            {
                id: 'about',
                keywords: ['about', 'company', 'team', 'mission', 'vision', 'story', 'who we are']
            },
            {
                id: 'faq',
                keywords: ['faq', 'question', 'questions', 'help', 'support', 'how to', 'how do', 'what is']
            },
            {
                id: 'contact',
                keywords: ['contact', 'get in touch', 'reach', 'email', 'phone', 'message', 'form', 'submit']
            }
        ];

        // Find the best matching section
        let bestMatch = null;
        let bestMatchScore = 0;

        searchableSections.forEach(section => {
            const score = section.keywords.reduce((total, keyword) => {
                if (searchTerm.includes(keyword)) {
                    return total + 1;
                }
                return total;
            }, 0);

            if (score > bestMatchScore) {
                bestMatchScore = score;
                bestMatch = section;
            }
        });

        // Navigate to the best match or services as fallback
        if (bestMatch && bestMatchScore > 0) {
            window.location.href = `index.html#${bestMatch.id}`;
        } else {
            window.location.href = 'index.html#services';
        }

        searchOverlay.classList.remove('active');
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuClose = document.querySelector('.menu-close');
    
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    if (menuClose) {
        menuClose.addEventListener('click', toggleMobileMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
});

const translations = {
    'en': {
        'home': 'Home',
        'services': 'Services',
        'about': 'About',
        'faq': 'FAQ',
        'contact': 'Contact',
        'hero-title': 'Crafting Digital Solutions',
        'hero-subtitle': 'Web applications, websites, e-commerce, AI chatbots',
        'get-started': 'Get Started',
        'services-title': 'Our Services',
        'web-dev-title': 'Web Development',
        'web-dev-desc': 'Custom websites and web applications built with modern technologies and best practices.',
        'ecommerce-title': 'E-Commerce',
        'ecommerce-desc': 'Powerful online stores with secure payment systems and inventory management.',
        'ai-title': 'AI ChatBots',
        'ai-desc': 'Intelligent chatbots and AI-powered features to enhance user experience.',
        'web-apps-title': 'Web Apps',
        'web-apps-desc': 'Custom web applications built with modern frameworks and technologies.',
        'about-title': 'About Us',
        'about-subtitle': 'Your Digital Partner',
        'about-desc': 'We are a team of passionate developers and designers dedicated to creating exceptional digital experiences. With years of expertise in web development, e-commerce, and AI solutions, we help businesses transform their digital presence.',
        'support': 'Support',
        'dedication': 'Dedication',
        'potential': 'Potential',
        'years-exp': 'Years Experience',
        'projects': 'Projects Completed',
        'clients': 'Happy Clients',
        'responsive-design': 'Responsive Design',
        'seo-optimization': 'SEO Optimization',
        'performance': 'Performance Optimization',
        'payment-gateways': 'Payment Gateways',
        'inventory': 'Inventory Management',
        'analytics': 'Analytics & Reporting',
        'custom-ai': 'Custom AI Solutions',
        'chatbot': 'Chatbot Integration',
        'automation': 'Process Automation',
        'custom-apps': 'Custom Applications',
        'api-integration': 'API Integration',
        'cloud-solutions': 'Cloud Solutions',
        'contact-title': 'Contact Us',
        'firstname': 'First name',
        'lastname': 'Last name',
        'email': 'Email',
        'phone': 'Phone',
        'service': 'What service are you interested in?',
        'budget': 'Budget (USD)',
        'project-details': 'In short, what is this project about?',
        'website': 'Do you have a current website? If yes, please provide the URL:',
        'deadline': 'How soon do you need the project completed?',
        'hosting': 'Do you need hosting and email?',
        'notes': 'Additional notes',
        'send': 'Send',
        'select-service': 'Select a service',
        'web-applications': 'Web Applications',
        'websites': 'Websites',
        'ai-chatbots': 'AI Chatbots Development',
        'e-commerce': 'E-commerce Platform',
        'yes': 'Yes',
        'no': 'No',
        'firstname-placeholder': 'First name',
        'lastname-placeholder': 'Last name',
        'email-placeholder': 'Email address',
        'phone-placeholder': 'Phone number',
        'budget-placeholder': 'Enter your budget',
        'project-details-placeholder': 'Describe your project',
        'website-placeholder': 'https://yourwebsite.com',
        'deadline-placeholder': 'Enter your timeline',
        'notes-placeholder': 'Any extra information',
        'select2-placeholder': 'Select a service',
        'quick-links': 'Quick Links',
        'our-services': 'Our Services',
        'contact-us': 'Contact Us',
        'privacy-policy': 'Privacy Policy',
        'terms-conditions': 'Terms & Conditions',
        'cookie-policy': 'Cookie Policy',
        'remote-business': 'Worldwide Service',
        'all-rights-reserved': 'All rights reserved.',
        'footer-cta-text': 'Take your business to the next level with our expert digital solutions. Start your journey today!',
        'search-placeholder': 'Search...',
        'search-categories': 'Categories',
        'recent-searches': 'Recent Searches',
        'submit-search': 'Submit search',
        'close-search': 'Close search',
        'cookie-description': 'We use cookies to enhance your browsing experience. By clicking "Accept", you consent to our use of necessary cookies. For more information, please read our <a href="legal/privacy-policy.html">Privacy Policy</a>, <a href="legal/terms-conditions.html">Terms & Conditions</a>, and <a href="legal/cookie-policy.html">Cookie Policy</a>.',
        'necessary-cookies': 'Necessary Cookies',
        'necessary-cookies-desc': 'Required for the website to function properly. Cannot be disabled.',
        'accept': 'Accept',
        'reject': 'Reject',
        'footer-description': 'Crafting exceptional digital experiences with cutting-edge technology and innovative solutions.',
        'faq-title': 'Frequently Asked Questions',
        'web-dev-faq': 'Web Development',
        'web-dev-q1': 'What technologies do you use for web development?',
        'web-dev-a1': 'We use modern technologies including HTML5, CSS3, JavaScript (React, Vue.js, Angular), Node.js, and various backend frameworks. Our choice of technology depends on your specific project requirements and goals.',
        'web-dev-q2': 'How long does it take to develop a website?',
        'web-dev-a2': 'The timeline varies based on project complexity, features, and requirements. A basic website might take 2-4 weeks, while complex web applications can take 3-6 months. We\'ll provide a detailed timeline during our initial consultation.',
        'ecommerce-faq': 'E-Commerce',
        'ecommerce-q1': 'What payment gateways do you support?',
        'ecommerce-a1': 'We integrate with major payment gateways including PayPal, Stripe, Square, and regional payment providers. We can also implement custom payment solutions based on your specific needs.',
        'ecommerce-q2': 'Do you provide inventory management systems?',
        'ecommerce-a2': 'Yes, we develop comprehensive inventory management systems that integrate with your e-commerce platform. This includes stock tracking, automated reordering, and detailed reporting features.',
        'ai-faq': 'AI & Chatbots',
        'ai-q1': 'How intelligent are your AI chatbots?',
        'ai-a1': 'Our AI chatbots are built using advanced natural language processing and machine learning technologies. They can understand context, learn from interactions, and provide personalized responses based on your business needs.',
        'ai-q2': 'Can chatbots integrate with my existing systems?',
        'ai-a2': 'Yes, our chatbots can integrate with various systems including CRM, ERP, and customer support platforms. We ensure seamless integration with your existing infrastructure while maintaining security standards.',
        'general-faq': 'General Questions',
        'general-q1': 'What is your pricing structure?',
        'general-a1': 'Our pricing is project-based and depends on your specific requirements. We provide detailed quotes after understanding your needs. We also offer maintenance and support packages for ongoing services.',
        'general-q2': 'Do you provide post-launch support?',
        'general-a2': 'Yes, we offer comprehensive post-launch support including maintenance, updates, and technical assistance. We provide different support packages to match your needs and ensure your digital solution remains optimal.',
        'required-field': 'Required Field',
        'please-select': 'Please select',
        'please-enter': 'Please enter',
        'invalid-email': 'Invalid Email',
        'please-enter-valid-email': 'Please enter a valid email address',
        'invalid-budget': 'Invalid Budget',
        'please-enter-valid-budget': 'Please enter a valid budget amount (numbers and commas only)',
        'form-submitted': 'Form Submitted!',
        'thank-you-message': 'Thank you for contacting us. We will get back to you soon.',
        'support-24-7': '24/7',
        'dedication-100': '100%',
        'cookie-policy-title': 'Cookie Policy',
        'cookie-usage-title': 'How We Use Cookies',
        'cookie-intro': 'At ClickFormz, we use cookies to enhance your browsing experience and provide essential functionality. Here\'s how we use cookies on our website:',
        'essential-cookies': 'Essential Cookies',
        'essential-cookies-desc': 'These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.',
        'cookie-consent': 'Cookie consent preferences',
        'language-pref': 'Language preferences',
        'session-cookies': 'Session management',
        'preference-cookies': 'Preference Cookies',
        'preference-cookies-desc': 'These cookies enable the website to remember information that changes the way the website behaves or looks, like your preferred language or the region you are in.',
        'language-settings': 'Language settings (English/Arabic)',
        'recent-searches': 'Recent searches',
        'form-preferences': 'Form preferences and settings',
        'analytics-cookies': 'Analytics Cookies',
        'analytics-cookies-desc': 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
        'page-visits': 'Page visit statistics',
        'user-behavior': 'User behavior analysis',
        'performance-metrics': 'Website performance metrics',
        'cookie-controls-title': 'Managing Your Cookie Preferences',
        'cookie-controls-desc': 'You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit our website and some services and functionalities may not work.',
        'accept-all': 'Accept All Cookies',
        'reject-all': 'Reject All Cookies',
        'cookie-updates-title': 'Updates to This Policy',
        'cookie-updates-desc': 'We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.',
        'terms-conditions-title': 'Terms & Conditions',
        'terms-intro-title': 'Introduction',
        'terms-intro': 'Welcome to ClickFormz. By accessing our website and using our services, you agree to these terms and conditions. Please read them carefully before proceeding with any of our services.',
        'services-title': 'Our Services',
        'services-desc': 'ClickFormz provides the following services:',
        'web-dev-service': 'Web Development - Custom websites and web applications',
        'ecommerce-service': 'E-Commerce Solutions - Online stores and payment systems',
        'ai-service': 'AI Chatbots - Intelligent automation and customer service solutions',
        'web-apps-service': 'Web Applications - Custom software solutions',
        'intellectual-property-title': 'Intellectual Property',
        'intellectual-property-desc': 'All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of ClickFormz and is protected by international copyright laws. The use of our content without permission is strictly prohibited.',
        'user-obligations-title': 'User Obligations',
        'user-obligations-desc': 'When using our services, you agree to:',
        'provide-accurate-info': 'Provide accurate and complete information',
        'maintain-security': 'Maintain the security of your account',
        'comply-laws': 'Comply with all applicable laws and regulations',
        'respect-intellectual': 'Respect intellectual property rights',
        'service-terms-title': 'Service Terms',
        'service-terms-desc': 'Our services are provided on an "as is" and "as available" basis. We reserve the right to:',
        'modify-services': 'Modify or discontinue any service',
        'update-pricing': 'Update pricing and service packages',
        'maintenance': 'Perform maintenance and updates',
        'terminate-service': 'Terminate service for violations of these terms',
        'payment-terms-title': 'Payment Terms',
        'payment-terms-desc': 'Payment terms for our services include:',
        'project-based': 'Project-based pricing for custom development',
        'maintenance-fees': 'Maintenance and support fees',
        'hosting-fees': 'Hosting and infrastructure costs',
        'payment-schedule': 'Agreed payment schedules for projects',
        'limitation-liability-title': 'Limitation of Liability',
        'limitation-liability-desc': 'ClickFormz shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.',
        'privacy-title': 'Privacy and Data Protection',
        'privacy-desc': 'We are committed to protecting your privacy. Our data collection and usage practices are detailed in our Privacy Policy. By using our services, you consent to our data practices as described in our Privacy Policy.',
        'changes-terms-title': 'Changes to Terms',
        'changes-terms-desc': 'We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our website. Continued use of our services after such changes constitutes acceptance of the new terms.',
        'contact-info-title': 'Contact Information',
        'contact-info-desc': 'For any questions regarding these terms and conditions, please contact us at:',
        'email-contact': 'Email: info@clickformz.com',
        'phone-contact': 'Phone: +1 (234) 567-890',
        'privacy-policy-title': 'Privacy Policy',
        'last-updated': 'Last Updated: June 13, 2025',
        'privacy-intro': 'At ClickFormz, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.',
        'information-collection': 'Information We Collect',
        'collection-details': 'We collect information that you provide directly to us, including:',
        'personal-info': 'Personal information (name, email address, phone number)',
        'project-details': 'Project details and requirements',
        'communication': 'Communication preferences',
        'technical-info': 'Technical information about your device and internet connection',
        'cookies-usage': 'Cookies and Tracking Technologies',
        'cookies-details': 'We use cookies and similar tracking technologies to:',
        'cookies-essential': 'Provide essential website functionality',
        'cookies-analytics': 'Analyze website usage and performance',
        'cookies-preferences': 'Remember your preferences and settings',
        'cookies-security': 'Enhance security and prevent fraud',
        'information-usage': 'How We Use Your Information',
        'usage-details': 'We use the collected information to:',
        'usage-provide': 'Provide and maintain our services',
        'usage-communicate': 'Communicate with you about your projects',
        'usage-improve': 'Improve our website and services',
        'usage-marketing': 'Send marketing communications (with your consent)',
        'information-sharing': 'Information Sharing and Disclosure',
        'sharing-details': 'We may share your information with:',
        'sharing-service': 'Service providers and business partners',
        'sharing-legal': 'Legal authorities when required by law',
        'sharing-consent': 'Third parties with your explicit consent',
        'data-security': 'Data Security',
        'security-details': 'We implement appropriate security measures to protect your personal information, including:',
        'security-encryption': 'Encryption of sensitive data',
        'security-access': 'Access controls and authentication',
        'security-monitoring': 'Regular security monitoring and updates',
        'your-rights': 'Your Rights and Choices',
        'rights-details': 'You have the right to:',
        'rights-access': 'Access your personal information',
        'rights-correct': 'Correct inaccurate data',
        'rights-delete': 'Request deletion of your data',
        'rights-optout': 'Opt-out of marketing communications',
        'international-transfers': 'International Data Transfers',
        'transfers-details': 'Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers.',
        'children-privacy': 'Children\'s Privacy',
        'children-details': 'Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.',
        'policy-changes': 'Changes to This Policy',
        'changes-details': 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.',
        'contact-privacy': 'Contact Us',
        'contact-details': 'If you have any questions about this Privacy Policy, please contact us at:'
    },
    'ar': {
        'home': 'الرئيسية',
        'services': 'الخدمات',
        'about': 'من نحن',
        'faq': 'الأسئلة الشائعة',
        'contact': 'اتصل بنا',
        'hero-title': 'نصنع الحلول الرقمية',
        'hero-subtitle': 'تطبيقات الويب، المواقع الإلكترونية، التجارة الإلكترونية، روبوتات الذكاء الاصطناعي',
        'get-started': 'ابدأ الآن',
        'services-title': 'خدماتنا',
        'web-dev-title': 'تطوير المواقع',
        'web-dev-desc': 'مواقع وتطبيقات ويب مخصصة مبنية بأحدث التقنيات وأفضل الممارسات.',
        'ecommerce-title': 'التجارة الإلكترونية',
        'ecommerce-desc': 'متاجر إلكترونية قوية مع أنظمة دفع آمنة وإدارة المخزون.',
        'ai-title': 'روبوتات المحادثة',
        'ai-desc': 'روبوتات محادثة ذكية وميزات مدعومة بالذكاء الاصطناعي لتحسين تجربة المستخدم.',
        'web-apps-title': 'تطبيقات الويب',
        'web-apps-desc': 'تطبيقات ويب مخصصة مبنية بأحدث الأطر والتقنيات.',
        'about-title': 'من نحن',
        'about-subtitle': 'شريكك الرقمي',
        'about-desc': 'نحن فريق من المطورين والمصممين المتحمسين المكرسين لخلق تجارب رقمية استثنائية. مع سنوات من الخبرة في تطوير الويب والتجارة الإلكترونية وحلول الذكاء الاصطناعي، نساعد الشركات على تحويل وجودها الرقمي.',
        'support': 'دعم',
        'dedication': 'التزام',
        'potential': 'إمكانيات',
        'years-exp': 'سنوات الخبرة',
        'projects': 'مشروع مكتمل',
        'clients': 'عميل سعيد',
        'responsive-design': 'تصميم متجاوب',
        'seo-optimization': 'تحسين محركات البحث',
        'performance': 'تحسين الأداء',
        'payment-gateways': 'بوابات الدفع',
        'inventory': 'إدارة المخزون',
        'analytics': 'التحليلات والتقارير',
        'custom-ai': 'حلول الذكاء الاصطناعي المخصصة',
        'chatbot': 'تكامل روبوت المحادثة',
        'automation': 'أتمتة العمليات',
        'custom-apps': 'تطبيقات مخصصة',
        'api-integration': 'تكامل واجهة برمجة التطبيقات',
        'cloud-solutions': 'حلول سحابية',
        'contact-title': 'اتصل بنا',
        'firstname': 'الاسم الأول',
        'lastname': 'الاسم الأخير',
        'email': 'البريد الإلكتروني',
        'phone': 'رقم الهاتف',
        'service': 'ما هي الخدمة التي تهتم بها؟',
        'budget': 'الميزانية (دولار أمريكي)',
        'project-details': 'باختصار، ما هو هذا المشروع؟',
        'website': 'هل لديك موقع ويب حالي؟ إذا كان الأمر كذلك، يرجى تقديم الرابط:',
        'deadline': 'متى تحتاج إلى إكمال المشروع؟',
        'hosting': 'هل تحتاج إلى استضافة وبريد إلكتروني؟',
        'notes': 'ملاحظات إضافية',
        'send': 'إرسال',
        'select-service': 'اختر خدمة',
        'web-applications': 'تطبيقات الويب',
        'websites': 'المواقع الإلكترونية',
        'ai-chatbots': 'تطوير روبوتات المحادثة',
        'e-commerce': 'منصة التجارة الإلكترونية',
        'yes': 'نعم',
        'no': 'لا',
        'firstname-placeholder': 'الاسم الأول',
        'lastname-placeholder': 'الاسم الأخير',
        'email-placeholder': 'البريد الإلكتروني',
        'phone-placeholder': 'رقم الهاتف',
        'budget-placeholder': 'أدخل ميزانيتك',
        'project-details-placeholder': 'صف مشروعك',
        'website-placeholder': 'https://موقعك.com',
        'deadline-placeholder': 'أدخل الجدول الزمني',
        'notes-placeholder': 'أي معلومات إضافية',
        'select2-placeholder': 'اختر خدمة',
        'quick-links': 'روابط سريعة',
        'our-services': 'خدماتنا',
        'contact-us': 'اتصل بنا',
        'privacy-policy': 'سياسة الخصوصية',
        'terms-conditions': 'الشروط والأحكام',
        'cookie-policy': 'سياسة ملفات تعريف الارتباط',
        'remote-business': 'خدمة عالمية',
        'all-rights-reserved': 'جميع الحقوق محفوظة.',
        'footer-cta-text': 'ارتقِ بأعمالك إلى المستوى التالي مع حلولنا الرقمية المتخصصة. ابدأ رحلتك اليوم!',
        'search-placeholder': 'بحث...',
        'search-categories': 'التصنيفات',
        'recent-searches': 'عمليات البحث الأخيرة',
        'submit-search': 'إرسال البحث',
        'close-search': 'إغلاق البحث',
        'cookie-description': 'نحن نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك. بالنقر على "قبول"، فإنك توافق على استخدامنا لملفات تعريف الارتباط الضرورية. لمزيد من المعلومات، يرجى قراءة <a href="legal/privacy-policy.html">سياسة الخصوصية</a>، <a href="legal/terms-conditions.html">الشروط والأحكام</a>، و<a href="legal/cookie-policy.html">سياسة ملفات تعريف الارتباط</a>.',
        'necessary-cookies': 'ملفات تعريف الارتباط الضرورية',
        'necessary-cookies-desc': 'مطلوبة لكي يعمل الموقع بشكل صحيح. لا يمكن تعطيلها.',
        'accept': 'قبول',
        'reject': 'رفض',
        'footer-description': 'نصنع تجارب رقمية استثنائية باستخدام أحدث التقنيات وحلول مبتكرة.',
        'faq-title': 'الأسئلة الشائعة',
        'web-dev-faq': 'تطوير المواقع',
        'ecommerce-faq': 'التجارة الإلكترونية',
        'ai-faq': 'الذكاء الاصطناعي وروبوتات المحادثة',
        'general-faq': 'أسئلة عامة',
        'web-dev-q1': 'ما هي التقنيات التي تستخدمونها في تطوير المواقع؟',
        'web-dev-a1': 'نستخدم تقنيات حديثة تشمل HTML5 و CSS3 و JavaScript (React و Vue.js و Angular) و Node.js ومختلف أطر العمل الخلفية. يعتمد اختيارنا للتقنية على متطلبات مشروعك وأهدافه المحددة.',
        'web-dev-q2': 'كم من الوقت يستغرق تطوير موقع؟',
        'web-dev-a2': 'يختلف الجدول الزمني بناءً على تعقيد المشروع والميزات والمتطلبات. قد يستغرق الموقع الأساسي من 2-4 أسابيع، بينما قد تستغرق تطبيقات الويب المعقدة من 3-6 أشهر. سنقدم جدولاً زمنياً مفصلاً خلال استشارتنا الأولية.',
        'ecommerce-q1': 'ما هي بوابات الدفع التي تدعمونها؟',
        'ecommerce-a1': 'نقوم بدمج بوابات الدفع الرئيسية بما في ذلك PayPal و Stripe و Square ومزودي الدفع الإقليميين. يمكننا أيضًا تنفيذ حلول دفع مخصصة بناءً على احتياجاتك المحددة.',
        'ecommerce-q2': 'هل تقدمون أنظمة إدارة المخزون؟',
        'ecommerce-a2': 'نعم، نقوم بتطوير أنظمة شاملة لإدارة المخزون تتكامل مع منصة التجارة الإلكترونية الخاصة بك. يشمل ذلك تتبع المخزون وإعادة الطلب التلقائي وميزات التقارير التفصيلية.',
        'ai-q1': 'ما مدى ذكاء روبوتات المحادثة الخاصة بكم؟',
        'ai-a1': 'تم بناء روبوتات المحادثة الخاصة بنا باستخدام تقنيات متقدمة لمعالجة اللغة الطبيعية والتعلم الآلي. يمكنها فهم السياق والتعلم من التفاعلات وتقديم ردود مخصصة بناءً على احتياجات عملك.',
        'ai-q2': 'هل يمكن لروبوتات المحادثة التكامل مع أنظمتي الحالية؟',
        'ai-a2': 'نعم، يمكن لروبوتات المحادثة الخاصة بنا التكامل مع مختلف الأنظمة بما في ذلك CRM و ERP ومنصات دعم العملاء. نضمن التكامل السلس مع البنية التحتية الحالية مع الحفاظ على معايير الأمان.',
        'general-q1': 'ما هي هيكلية الأسعار لديكم؟',
        'general-a1': 'تستند أسعارنا إلى المشروع وتعتمد على متطلباتك المحددة. نقدم عروض أسعار مفصلة بعد فهم احتياجاتك. كما نقدم حزم الصيانة والدعم للخدمات المستمرة.',
        'general-q2': 'هل تقدمون دعم ما بعد الإطلاق؟',
        'general-a2': 'نعم، نقدم دعمًا شاملاً بعد الإطلاق يشمل الصيانة والتحديثات والمساعدة التقنية. نقدم حزم دعم مختلفة لتتناسب مع احتياجاتك وضمان بقاء حلولك الرقمية في حالة مثالية.',
        'required-field': 'حقل مطلوب',
        'please-select': 'الرجاء اختيار',
        'please-enter': 'الرجاء إدخال',
        'invalid-email': 'بريد إلكتروني غير صالح',
        'please-enter-valid-email': 'الرجاء إدخال عنوان بريد إلكتروني صالح',
        'invalid-budget': 'ميزانية غير صالحة',
        'please-enter-valid-budget': 'الرجاء إدخال مبلغ ميزانية صالح (أرقام وفواصل فقط)',
        'form-submitted': 'تم إرسال النموذج!',
        'thank-you-message': 'شكراً لتواصلكم معنا. سنتواصل معكم قريباً.',
        'support-24-7': '٢٤/٧',
        'dedication-100': '١٠٠٪',
        'cookie-policy-title': 'سياسة ملفات تعريف الارتباط',
        'cookie-usage-title': 'كيف نستخدم ملفات تعريف الارتباط',
        'cookie-intro': 'في ClickFormz، نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك وتوفير الوظائف الأساسية. إليك كيف نستخدم ملفات تعريف الارتباط على موقعنا:',
        'essential-cookies': 'ملفات تعريف الارتباط الضرورية',
        'essential-cookies-desc': 'هذه الملفات ضرورية لكي يعمل الموقع بشكل صحيح. إنها تمكن الميزات الأساسية مثل التنقل بين الصفحات والوصول إلى المناطق الآمنة من الموقع. لا يمكن للموقع العمل بشكل صحيح بدون هذه الملفات.',
        'cookie-consent': 'تفضيلات موافقة ملفات تعريف الارتباط',
        'language-pref': 'تفضيلات اللغة',
        'session-cookies': 'إدارة الجلسة',
        'preference-cookies': 'ملفات تعريف الارتباط التفضيلية',
        'preference-cookies-desc': 'تتيح هذه الملفات للموقع تذكر المعلومات التي تغير طريقة عمل الموقع أو مظهره، مثل لغتك المفضلة أو المنطقة التي تتواجد فيها.',
        'language-settings': 'إعدادات اللغة (الإنجليزية/العربية)',
        'recent-searches': 'عمليات البحث الأخيرة',
        'form-preferences': 'تفضيلات النموذج والإعدادات',
        'analytics-cookies': 'ملفات تعريف الارتباط التحليلية',
        'analytics-cookies-desc': 'تساعدنا هذه الملفات على فهم كيفية تفاعل الزوار مع موقعنا من خلال جمع المعلومات وإعداد التقارير بشكل مجهول.',
        'page-visits': 'إحصائيات زيارة الصفحات',
        'user-behavior': 'تحليل سلوك المستخدم',
        'performance-metrics': 'مقاييس أداء الموقع',
        'cookie-controls-title': 'إدارة تفضيلات ملفات تعريف الارتباط',
        'cookie-controls-desc': 'يمكنك التحكم في ملفات تعريف الارتباط و/أو حذفها كما تريد. يمكنك حذف جميع ملفات تعريف الارتباط الموجودة بالفعل على جهاز الكمبيوتر الخاص بك ويمكنك تعيين معظم المتصفحات لمنع وضعها. ومع ذلك، إذا قمت بذلك، قد تضطر إلى ضبط بعض التفضيلات يدويًا في كل مرة تزور فيها موقعنا وقد لا تعمل بعض الخدمات والوظائف.',
        'accept-all': 'قبول جميع ملفات تعريف الارتباط',
        'reject-all': 'رفض جميع ملفات تعريف الارتباط',
        'cookie-updates-title': 'تحديثات هذه السياسة',
        'cookie-updates-desc': 'قد نقوم بتحديث سياسة ملفات تعريف الارتباط هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب تشغيلية أو قانونية أو تنظيمية أخرى. يرجى زيارة سياسة ملفات تعريف الارتباط هذه بانتظام للبقاء على اطلاع حول استخدامنا لملفات تعريف الارتباط والتقنيات ذات الصلة.',
        'terms-conditions-title': 'الشروط والأحكام',
        'terms-intro-title': 'مقدمة',
        'terms-intro': 'مرحباً بك في ClickFormz. من خلال الوصول إلى موقعنا الإلكتروني واستخدام خدماتنا، فإنك توافق على هذه الشروط والأحكام. يرجى قراءتها بعناية قبل المتابعة مع أي من خدماتنا.',
        'services-title': 'خدماتنا',
        'services-desc': 'تقدم ClickFormz الخدمات التالية:',
        'web-dev-service': 'تطوير المواقع - مواقع وتطبيقات ويب مخصصة',
        'ecommerce-service': 'حلول التجارة الإلكترونية - متاجر إلكترونية وأنظمة دفع',
        'ai-service': 'روبوتات المحادثة - حلول ذكية للأتمتة وخدمة العملاء',
        'web-apps-service': 'تطبيقات الويب - حلول برمجية مخصصة',
        'intellectual-property-title': 'الملكية الفكرية',
        'intellectual-property-desc': 'جميع المحتويات على هذا الموقع، بما في ذلك على سبيل المثال لا الحصر النصوص والرسومات والشعارات والصور والبرمجيات، هي ملك لـ ClickFormz ومحمية بموجب قوانين حقوق النشر الدولية. يُحظر استخدام محتوانا دون إذن.',
        'user-obligations-title': 'التزامات المستخدم',
        'user-obligations-desc': 'عند استخدام خدماتنا، فإنك توافق على:',
        'provide-accurate-info': 'تقديم معلومات دقيقة وكاملة',
        'maintain-security': 'الحفاظ على أمان حسابك',
        'comply-laws': 'الامتثال لجميع القوانين واللوائح المعمول بها',
        'respect-intellectual': 'احترام حقوق الملكية الفكرية',
        'service-terms-title': 'شروط الخدمة',
        'service-terms-desc': 'يتم تقديم خدماتنا "كما هي" و"كما هي متاحة". نحتفظ بالحق في:',
        'modify-services': 'تعديل أو إيقاف أي خدمة',
        'update-pricing': 'تحديث الأسعار وحزم الخدمات',
        'maintenance': 'إجراء الصيانة والتحديثات',
        'terminate-service': 'إنهاء الخدمة لانتهاك هذه الشروط',
        'payment-terms-title': 'شروط الدفع',
        'payment-terms-desc': 'تشمل شروط الدفع لخدماتنا:',
        'project-based': 'تسعير قائم على المشروع للتطوير المخصص',
        'maintenance-fees': 'رسوم الصيانة والدعم',
        'hosting-fees': 'تكاليف الاستضافة والبنية التحتية',
        'payment-schedule': 'جداول الدفع المتفق عليها للمشاريع',
        'limitation-liability-title': 'تحديد المسؤولية',
        'limitation-liability-desc': 'لن تكون ClickFormz مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية ناتجة عن استخدامك أو عدم قدرتك على استخدام خدماتنا.',
        'privacy-title': 'الخصوصية وحماية البيانات',
        'privacy-desc': 'نحن ملتزمون بحماية خصوصيتك. تم تفصيل ممارسات جمع البيانات واستخدامها في سياسة الخصوصية الخاصة بنا. باستخدام خدماتنا، فإنك توافق على ممارسات البيانات الخاصة بنا كما هو موضح في سياسة الخصوصية الخاصة بنا.',
        'changes-terms-title': 'التغييرات في الشروط',
        'changes-terms-desc': 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنقوم بإخطار المستخدمين بأي تغييرات جوهرية عبر البريد الإلكتروني أو من خلال موقعنا. استمرار استخدام خدماتنا بعد هذه التغييرات يشكل قبولاً للشروط الجديدة.',
        'contact-info-title': 'معلومات الاتصال',
        'contact-info-desc': 'لأي أسئلة بخصوص هذه الشروط والأحكام، يرجى الاتصال بنا على:',
        'email-contact': 'البريد الإلكتروني: info@clickformz.com',
        'phone-contact': 'الهاتف: +1 (234) 567-890',
        'privacy-policy-title': 'سياسة الخصوصية',
        'last-updated': 'آخر تحديث: 13 يونيو 2025',
        'privacy-intro': 'في ClickFormz، نحن نأخذ خصوصيتك على محمل الجد. توضح سياسة الخصوصية هذه كيفية جمع معلوماتك واستخدامها والكشف عنها وحمايتها عند زيارة موقعنا الإلكتروني واستخدام خدماتنا.',
        'information-collection': 'المعلومات التي نجمعها',
        'collection-details': 'نقوم بجمع المعلومات التي تقدمها لنا مباشرة، بما في ذلك:',
        'personal-info': 'المعلومات الشخصية (الاسم، البريد الإلكتروني، رقم الهاتف)',
        'project-details': 'تفاصيل المشروع والمتطلبات',
        'communication': 'تفضيلات الاتصال',
        'technical-info': 'المعلومات التقنية حول جهازك واتصال الإنترنت',
        'cookies-usage': 'ملفات تعريف الارتباط وتقنيات التتبع',
        'cookies-details': 'نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة لـ:',
        'cookies-essential': 'توفير وظائف الموقع الأساسية',
        'cookies-analytics': 'تحليل استخدام الموقع وأدائه',
        'cookies-preferences': 'تذكر تفضيلاتك وإعداداتك',
        'cookies-security': 'تعزيز الأمان ومنع الاحتيال',
        'information-usage': 'كيفية استخدام معلوماتك',
        'usage-details': 'نستخدم المعلومات المجمعة لـ:',
        'usage-provide': 'توفير وصيانة خدماتنا',
        'usage-communicate': 'التواصل معك بشأن مشاريعك',
        'usage-improve': 'تحسين موقعنا وخدماتنا',
        'usage-marketing': 'إرسال رسائل تسويقية (بموافقتك)',
        'information-sharing': 'مشاركة المعلومات والكشف عنها',
        'sharing-details': 'قد نشارك معلوماتك مع:',
        'sharing-service': 'مقدمي الخدمات والشركاء التجاريين',
        'sharing-legal': 'السلطات القانونية عند الحاجة بموجب القانون',
        'sharing-consent': 'أطراف ثالثة بموافقتك الصريحة',
        'data-security': 'أمن البيانات',
        'security-details': 'نقوم بتنفيذ إجراءات أمنية مناسبة لحماية معلوماتك الشخصية، بما في ذلك:',
        'security-encryption': 'تشفير البيانات الحساسة',
        'security-access': 'ضوابط الوصول والمصادقة',
        'security-monitoring': 'المراقبة الأمنية والتحديثات المنتظمة',
        'your-rights': 'حقوقك وخياراتك',
        'rights-details': 'لديك الحق في:',
        'rights-access': 'الوصول إلى معلوماتك الشخصية',
        'rights-correct': 'تصحيح البيانات غير الدقيقة',
        'rights-delete': 'طلب حذف بياناتك',
        'rights-optout': 'الانسحاب من الرسائل التسويقية',
        'international-transfers': 'التحويلات الدولية للبيانات',
        'transfers-details': 'قد يتم نقل معلوماتك ومعالجتها في بلدان غير بلد إقامتك. نتأكد من وجود ضمانات مناسبة لمثل هذه التحويلات.',
        'children-privacy': 'خصوصية الأطفال',
        'children-details': 'خدماتنا ليست مخصصة للأطفال دون سن 13 عاماً. نحن لا نقوم بجمع معلومات شخصية من الأطفال دون سن 13 عاماً.',
        'policy-changes': 'التغييرات على هذه السياسة',
        'changes-details': 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإخطارك بأي تغييرات عن طريق نشر سياسة الخصوصية الجديدة على هذه الصفحة وتحديث تاريخ "آخر تحديث".',
        'contact-privacy': 'اتصل بنا',
        'contact-details': 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على:'
    }
};

// Language update function
function updateLanguage(lang) {
    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Show loader
    const loader = document.querySelector('.language-loader');
    if (loader) loader.classList.add('active');

    // Create a promise to handle all updates
    const updatePromise = new Promise((resolve) => {
        // Update active state of language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Force a reflow to ensure DOM is ready
        document.body.offsetHeight;

        // Update text content based on language
        const elements = document.querySelectorAll('[data-lang]');
        elements.forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang] && translations[lang][key]) {
                if (key === 'cookie-description') {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // Force another reflow
        document.body.offsetHeight;

        // Update placeholders
        document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
            const key = element.getAttribute('data-lang-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // Update aria-labels
        document.querySelectorAll('[data-lang-aria-label]').forEach(element => {
            const key = element.getAttribute('data-lang-aria-label');
            if (translations[lang] && translations[lang][key]) {
                element.setAttribute('aria-label', translations[lang][key]);
            }
        });

        // Store the selected language
        const hasConsent = localStorage.getItem(COOKIE_CONSENT);
        if (hasConsent === 'true') {
            localStorage.setItem('selectedLanguage', lang);
        }

        // Force final reflow
        document.body.offsetHeight;

        // Dispatch custom event for language change
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));

        resolve();
    });

    // Handle the update completion
    updatePromise.then(() => {
        // Double-check all translations after a short delay
        setTimeout(() => {
            document.querySelectorAll('[data-lang]').forEach(element => {
                const key = element.getAttribute('data-lang');
                if (translations[lang] && translations[lang][key]) {
                    if (key === 'cookie-description') {
                        element.innerHTML = translations[lang][key];
                    } else {
                        element.textContent = translations[lang][key];
                    }
                }
            });

            // Hide loader after all updates are complete
            if (loader) loader.classList.remove('active');
        }, 500);
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function () {
    // Get stored language or default to 'en'
    const storedLang = localStorage.getItem('selectedLanguage') || 'en';

    // Update language immediately
    updateLanguage(storedLang);

    // Add click event listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            const loader = document.querySelector('.language-loader');
            if (loader) loader.classList.add('active'); // Show loader

            updateLanguage(lang);
            setTimeout(() => {
                if (loader) loader.classList.remove('active');
            }, 400);
        });
    });
});

// FAQ Section
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Toggle aria-expanded attribute
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            question.setAttribute('aria-expanded', !isExpanded);

            // Toggle active class on answer
            const answer = question.nextElementSibling;
            answer.classList.toggle('active');

            // Close other answers in the same category
            const category = question.closest('.faq-category');
            const otherQuestions = category.querySelectorAll('.faq-question');
            otherQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherQuestion.nextElementSibling.classList.remove('active');
                }
            });
        });
    });
}

function initializeCubeInteraction() {
    const cube = document.querySelector('.tech-cube');
    if (!cube) return; // Guard clause in case cube isn't found
    
    let isDragging = false;
    let previousPosition = { x: 0, y: 0 };
    let rotation = { x: 0, y: 0 };

    // Set initial transform
    cube.style.transform = 'rotateX(0deg) rotateY(0deg)';

    // Mouse events
    cube.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevent text selection
        isDragging = true;
        previousPosition = {
            x: e.clientX,
            y: e.clientY
        };
        cube.style.animation = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaMove = {
            x: e.clientX - previousPosition.x,
            y: e.clientY - previousPosition.y
        };

        rotation.x += deltaMove.y * 0.5;
        rotation.y += deltaMove.x * 0.5;

        cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;

        previousPosition = {
            x: e.clientX,
            y: e.clientY
        };
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    // Touch events
    cube.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent scrolling
        isDragging = true;
        const touch = e.touches[0];
        previousPosition = {
            x: touch.clientX,
            y: touch.clientY
        };
        cube.style.animation = 'none';
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevent scrolling

        const touch = e.touches[0];
        const deltaMove = {
            x: touch.clientX - previousPosition.x,
            y: touch.clientY - previousPosition.y
        };

        rotation.x += deltaMove.y * 0.5;
        rotation.y += deltaMove.x * 0.5;

        cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;

        previousPosition = {
            x: touch.clientX,
            y: touch.clientY
        };
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    document.addEventListener('touchcancel', () => {
        isDragging = false;
    });
}

// Initialize FAQ when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeFAQ();
    initializeCubeInteraction();
});

// Form validation function
function validateForm() {
    const requiredFields = {
        'firstname': translations[document.documentElement.lang]['firstname'],
        'lastname': translations[document.documentElement.lang]['lastname'],
        'email': translations[document.documentElement.lang]['email'],
        'service': translations[document.documentElement.lang]['service'],
        'budget': translations[document.documentElement.lang]['budget'],
        'project-details': translations[document.documentElement.lang]['project-details'],
        'deadline': translations[document.documentElement.lang]['deadline'],
        'hosting': translations[document.documentElement.lang]['hosting']
    };

    // Check each required field
    for (const [fieldId, fieldName] of Object.entries(requiredFields)) {
        if (fieldId === 'hosting') {
            // Special handling for radio buttons
            const radioButtons = document.getElementsByName('hosting');
            const isChecked = Array.from(radioButtons).some(radio => radio.checked);

            if (!isChecked) {
                Swal.fire({
                    icon: 'error',
                    title: translations[document.documentElement.lang]['required-field'],
                    text: `${translations[document.documentElement.lang]['please-select']} ${fieldName}`,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    position: 'top-end',
                    toast: true,
                    width: 'auto',
                    padding: '0.5rem',
                    customClass: {
                        popup: 'colored-toast'
                    },
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });
                return false;
            }
        } else {
            const field = document.getElementById(fieldId);
            if (!field || !field.value.trim()) {
                Swal.fire({
                    icon: 'error',
                    title: translations[document.documentElement.lang]['required-field'],
                    text: `${translations[document.documentElement.lang]['please-enter']} ${fieldName}`,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    position: 'top-end',
                    toast: true,
                    width: 'auto',
                    padding: '0.5rem',
                    customClass: {
                        popup: 'colored-toast'
                    },
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });
                if (field) field.focus();
                return false;
            }
        }
    }

    // Validate email format
    const emailField = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value.trim())) {
        Swal.fire({
            icon: 'error',
            title: translations[document.documentElement.lang]['invalid-email'],
            text: translations[document.documentElement.lang]['please-enter-valid-email'],
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            position: 'top-end',
            toast: true,
            width: 'auto',
            padding: '0.5rem',
            customClass: {
                popup: 'colored-toast'
            },
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        emailField.focus();
        return false;
    }

    // Validate budget format (numbers and commas only)
    const budgetField = document.getElementById('budget');
    const budgetRegex = /^[0-9,]+$/;
    if (!budgetRegex.test(budgetField.value.trim())) {
        Swal.fire({
            icon: 'error',
            title: translations[document.documentElement.lang]['invalid-budget'],
            text: translations[document.documentElement.lang]['please-enter-valid-budget'],
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            position: 'top-end',
            toast: true,
            width: 'auto',
            padding: '0.5rem',
            customClass: {
                popup: 'colored-toast'
            },
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        budgetField.focus();
        return false;
    }

    return true;
}

// Initialize EmailJS if it exists
if (typeof emailjs !== 'undefined') {
    (function () {
        emailjs.init("NxCZGoWrfQBLjkYnf"); // public key
    })();
}

// Add form submit event listener if contact form exists
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Show the language-loader while sending
        const loader = document.querySelector('.language-loader');
        if (loader) loader.classList.add('active');

        if (validateForm()) {
            // Get phone dial country code if available
            let phoneCountryCode = '';
            if (window.phoneInput && typeof window.phoneInput.getSelectedCountryData === 'function') {
                const countryData = window.phoneInput.getSelectedCountryData();
                if (countryData && countryData.dialCode) {
                    phoneCountryCode = `+${countryData.dialCode}`;
                }
            }

            // Get form data
            const formData = {
                to_email: 'alinsafawi19@gmail.com',
                from_name: `${document.getElementById('firstname').value} ${document.getElementById('lastname').value}`,
                from_email: document.getElementById('email').value,
                firstname: document.getElementById('firstname').value,
                lastname: document.getElementById('lastname').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                phone_country_code: phoneCountryCode,
                service: document.getElementById('service').value,
                budget: document.getElementById('budget').value,
                projectDetails: document.getElementById('project-details').value,
                website: document.getElementById('website').value,
                deadline: document.getElementById('deadline').value,
                hosting: document.querySelector('input[name="hosting"]:checked')?.value,
                notes: document.getElementById('notes').value,
                message: `New contact form submission from ${document.getElementById('firstname').value} ${document.getElementById('lastname').value}`
            };

            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.send("service_4hi3osc", "template_w1q40ia", formData)
                    .then(function () {
                        // Hide the loader after sending
                        if (loader) loader.classList.remove('active');
                        // Show success message
                        Swal.fire({
                            icon: 'success',
                            title: translations[document.documentElement.lang]['form-submitted'],
                            text: translations[document.documentElement.lang]['thank-you-message'],
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            position: 'top-end',
                            toast: true,
                            width: 'auto',
                            padding: '0.5rem',
                            customClass: {
                                popup: 'colored-toast'
                            },
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            },
                            willClose: () => {
                                // Reset form
                                e.target.reset();
                                // Reset Select2 if it exists
                                if ($('#service').data('select2')) {
                                    $('#service').val('').trigger('change');
                                }
                            }
                        });
                    })
                    .catch(function (error) {
                        // Hide the loader on error
                        if (loader) loader.classList.remove('active');
                        // Show error message
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Failed to send message. Please try again later.',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            position: 'top-end',
                            toast: true,
                            width: 'auto',
                            padding: '0.5rem',
                            customClass: {
                                popup: 'colored-toast'
                            }
                        });
                        console.error('EmailJS error:', error);
                    });
            } else {
                // Hide the loader if EmailJS is not available
                if (loader) loader.classList.remove('active');
            }
        } else {
            // Hide the loader if validation fails
            if (loader) loader.classList.remove('active');
        }
    });
}