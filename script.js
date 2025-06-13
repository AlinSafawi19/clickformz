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
    if (cookieBanner) cookieBanner.style.display = 'none';
    // Save current scroll position when accepting cookies
    saveScrollPosition();
}

// Reject cookies
function rejectCookies() {
    clearStoredData(); // Clear all stored data
    localStorage.setItem(COOKIE_CONSENT, 'false');
    if (cookieBanner) cookieBanner.style.display = 'none';
}

// Initialize cookie consent
document.addEventListener('DOMContentLoaded', () => {
    //localStorage.clear();
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem(COOKIE_CONSENT);
    if (hasConsent && cookieBanner) {
        cookieBanner.style.display = 'none';
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

    // Initialize particles.js only if it's available
    if (typeof particlesJS === 'function') {
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
        'cookie-description': 'We use cookies to enhance your browsing experience. By clicking "Accept", you consent to our use of necessary cookies. For more information, please read our <a href="#">Privacy Policy</a>, <a href="#">Terms & Conditions</a>, and <a href="#">Cookie Policy</a>.',
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
        'dedication-100': '100%'
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
        'cookie-description': 'نحن نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك. بالنقر على "قبول"، فإنك توافق على استخدامنا لملفات تعريف الارتباط الضرورية. لمزيد من المعلومات، يرجى قراءة <a href="#">سياسة الخصوصية</a>، <a href="#">الشروط والأحكام</a>، و<a href="#">سياسة ملفات تعريف الارتباط</a>.',
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
        'dedication-100': '١٠٠٪'
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

// Initialize FAQ when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeFAQ();
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