// Global variables
let serviceSelect;

// Cookie Consent Management
const cookieBanner = document.getElementById('cookieBanner');
const acceptBtn = document.querySelector('.accept-btn');
const rejectBtn = document.querySelector('.reject-btn');

// Cookie names
const COOKIE_CONSENT = 'cookie_consent';

// Clear all stored data
function clearStoredData() {
    localStorage.clear();
}

// Accept cookies
function acceptCookies() {
    localStorage.setItem(COOKIE_CONSENT, 'true');
    cookieBanner.style.display = 'none';
}

// Reject cookies
function rejectCookies() {
    localStorage.setItem(COOKIE_CONSENT, 'false');
    cookieBanner.style.display = 'none';
}

// Initialize cookie consent
document.addEventListener('DOMContentLoaded', () => {
    // Clear any existing stored data
    clearStoredData();

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
        const scrollPosition = window.scrollY + 100; // Offset for better UX

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
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
            e.preventDefault();
            const targetId = link.getAttribute('href');

            // Check if we're on the same page
            const isSamePage = targetId.startsWith('#');
            const targetSection = document.querySelector(targetId);

            if (isSamePage && targetSection) {
                // Same page navigation - use smooth scroll
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                updateHeaderState();
                smoothScroll(targetSection);
            } else {
                // Cross-page navigation - redirect to the page
                window.location.href = targetId;
            }
        });
    });

    // Add scroll event listeners with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeaderState();
                updateActiveNavLink();
                handleParallax();
                handleLaptopParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Set initial states
    updateHeaderState();
    updateActiveNavLink();
    handleParallax();
    handleLaptopParallax();

    // Update states on hash change
    window.addEventListener('hashchange', () => {
        updateHeaderState();
        updateActiveNavLink();
        handleParallax();
        handleLaptopParallax();
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
                    .catch(() => callback("us"));
            }
        });

        // Add event listeners for debugging
        phoneInputField.addEventListener("countrychange", function () {
            const countryData = window.phoneInput.getSelectedCountryData();
            if (countryData && countryData.iso2) {
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
                    localStorage.setItem('phone_country', countryCode);
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
        // First check if it's a category tag
        const categoryTags = document.querySelectorAll('.category-tag');
        for (const tag of categoryTags) {
            if (tag.textContent.toLowerCase().trim() === term.toLowerCase()) {
                // Navigate to the services section on the main page
                window.location.href = 'index.html#services';
                searchOverlay.classList.remove('active');
                return;
            }
        }

        // Then check for section matches
        const sections = {
            'home': 'index.html#home',
            'services': 'index.html#services',
            'about': 'index.html#about',
            'contact': 'index.html#contact'
        };

        // Direct section match
        if (sections[term.toLowerCase()]) {
            window.location.href = sections[term.toLowerCase()];
            searchOverlay.classList.remove('active');
            return;
        }

        // Search through section content
        const allSections = document.querySelectorAll('section');
        let bestMatch = null;
        let bestMatchScore = 0;

        allSections.forEach(section => {
            let score = 0;
            const sectionId = section.id;
            const sectionTitle = section.querySelector('h1, h2, h3');
            const sectionContent = section.textContent.toLowerCase();
            const searchTerm = term.toLowerCase();

            // Score based on different criteria
            if (sectionId === searchTerm) score += 5;
            if (sectionTitle && sectionTitle.textContent.toLowerCase().includes(searchTerm)) score += 3;
            if (sectionContent.includes(searchTerm)) score += 1;

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
    en: {
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
        'cookie-description': 'We use cookies to enhance your browsing experience. By clicking "Accept", you consent to our use of necessary cookies.',
        'necessary-cookies': 'Necessary Cookies',
        'necessary-cookies-desc': 'Required for the website to function properly. Cannot be disabled.',
        'accept': 'Accept',
        'reject': 'Reject',
        'footer-description': 'Crafting exceptional digital experiences with cutting-edge technology and innovative solutions.',
        'cookie-policy-title': 'Cookie Policy',
        'last-updated': 'Last Updated: June 2025',
        'what-are-cookies': 'What Are Cookies',
        'cookies-definition': 'Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide a better user experience.',
        'how-we-use-cookies': 'How We Use Cookies',
        'cookies-usage': 'We use cookies for the following purposes:',
        'cookies-essential': 'Essential cookies: Required for the website to function properly',
        'cookies-preferences': 'Preference cookies: Remember your settings and preferences',
        'cookies-analytics': 'Analytics cookies: Help us understand how visitors interact with our website',
        'cookies-marketing': 'Marketing cookies: Used to deliver relevant advertisements',
        'types-of-cookies': 'Types of Cookies We Use',
        'session-cookies': 'Session Cookies',
        'session-cookies-desc': 'Temporary cookies that expire when you close your browser. They help maintain your session while using our website.',
        'persistent-cookies': 'Persistent Cookies',
        'persistent-cookies-desc': 'Remain on your device for a specified period or until you delete them. They help remember your preferences and settings.',
        'managing-cookies': 'Managing Cookies',
        'managing-cookies-desc': 'You can control and manage cookies in your browser settings. However, please note that disabling certain cookies may affect the functionality of our website.',
        'browser-settings': 'Browser Settings',
        'chrome-settings': 'Google Chrome',
        'firefox-settings': 'Mozilla Firefox',
        'edge-settings': 'Microsoft Edge',
        'safari-settings': 'Safari',
        'third-party-cookies': 'Third-Party Cookies',
        'third-party-cookies-desc': 'We may use third-party services that place cookies on your device. These services help us analyze website usage, provide social media features, and deliver relevant advertisements.',
        'terms-conditions-title': 'Terms & Conditions',
        'agreement': 'Agreement to Terms',
        'agreement-desc': 'By accessing and using ClickFormz\'s services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.',
        'services': 'Services',
        'services-desc': 'ClickFormz provides web development, e-commerce solutions, AI chatbot development, and related services. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.',
        'intellectual-property': 'Intellectual Property',
        'ip-desc': 'All content, features, and functionality of our services are owned by ClickFormz and are protected by international copyright, trademark, and other intellectual property laws.',
        'user-obligations': 'User Obligations',
        'user-obligations-desc': 'When using our services, you agree to:',
        'obligation-1': 'Provide accurate and complete information',
        'obligation-2': 'Maintain the security of your account',
        'obligation-3': 'Not use our services for any illegal purposes',
        'obligation-4': 'Not interfere with the proper functioning of our services',
        'payment-terms': 'Payment Terms',
        'payment-desc': 'Payment terms and conditions for our services include:',
        'payment-1': 'All prices are in USD unless otherwise specified',
        'payment-2': 'Payment is due according to the agreed schedule',
        'payment-3': 'We reserve the right to suspend services for non-payment',
        'payment-4': 'Refunds are subject to our refund policy',
        'limitation-liability': 'Limitation of Liability',
        'liability-desc': 'ClickFormz shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.',
        'termination': 'Termination',
        'termination-desc': 'We may terminate or suspend your access to our services immediately, without prior notice, for any breach of these Terms and Conditions.',
        'table-of-contents': 'Table of Contents',
        'toc-collection': '1. Information We Collect',
        'toc-use': '2. How We Use Your Information',
        'toc-sharing': '3. Information Sharing',
        'toc-security': '4. Data Security',
        'toc-rights': '5. Your Rights',
        'toc-cookies': '6. Cookies and Tracking',
        'toc-retention': '7. Data Retention',
        'toc-transfers': '8. International Data Transfers',
        'toc-changes': '9. Changes to This Policy',
        'toc-contact': '10. Contact Us',
        'data-retention': 'Data Retention',
        'retention-desc': 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. Our retention periods are based on:',
        'retention-1': 'The nature of the personal information',
        'retention-2': 'The purposes for which we process it',
        'retention-3': 'Legal and regulatory requirements',
        'retention-4': 'Business needs and obligations',
        'international-transfers': 'International Data Transfers',
        'transfers-desc': 'Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place to protect your information, including:',
        'transfers-1': 'Standard contractual clauses approved by relevant authorities',
        'transfers-2': 'Binding corporate rules',
        'transfers-3': 'Adequacy decisions by relevant authorities',
        'transfers-4': 'Other legal mechanisms to ensure data protection',
        'policy-changes': 'Changes to This Policy',
        'changes-desc': 'We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by:',
        'changes-1': 'Posting the new privacy policy on this page',
        'changes-2': 'Updating the "Last Updated" date',
        'changes-3': 'Sending you an email notification for significant changes',
        'contact-privacy': 'Contact Us',
        'contact-privacy-desc': 'If you have any questions about this privacy policy or our data practices, please contact our Data Protection Officer:',
        'privacy-policy-title': 'Privacy Policy',
        'toc-agreement': '1. Agreement to Terms',
        'toc-services': '2. Services',
        'toc-ip': '3. Intellectual Property',
        'toc-obligations': '4. User Obligations',
        'toc-payment': '5. Payment Terms',
        'toc-data': '6. Data Protection',
        'toc-modifications': '7. Service Modifications',
        'toc-liability': '8. Limitation of Liability',
        'toc-dispute': '9. Dispute Resolution',
        'toc-law': '10. Governing Law',
        'toc-termination': '11. Termination',
        'data-protection': 'Data Protection',
        'data-protection-desc': 'We are committed to protecting your data and privacy. Our data protection practices include:',
        'data-1': 'Implementation of appropriate security measures',
        'data-2': 'Regular security assessments and updates',
        'data-3': 'Compliance with applicable data protection laws',
        'data-4': 'Secure data storage and transmission',
        'service-modifications': 'Service Modifications',
        'modifications-desc': 'We reserve the right to modify our services at any time. This includes:',
        'mod-1': 'Changes to service features and functionality',
        'mod-2': 'Updates to pricing and payment terms',
        'mod-3': 'Modifications to service availability',
        'mod-4': 'Changes to technical requirements',
        'dispute-resolution': 'Dispute Resolution',
        'dispute-desc': 'Any disputes arising from these terms shall be resolved through:',
        'dispute-1': 'Initial consultation and negotiation',
        'dispute-2': 'Mediation if required',
        'dispute-3': 'Arbitration as a final resolution method',
        'dispute-4': 'Exclusive jurisdiction in the courts of our jurisdiction',
        'governing-law': 'Governing Law',
        'law-desc': 'These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which ClickFormz is registered, without regard to its conflict of law provisions.',
        'contact-info': 'Contact Information',
        'contact-desc': 'If you have any questions about these Terms and Conditions, please contact us at:',
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
    },
    ar: {
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
        'cookie-description': 'نحن نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتقديم محتوى مخصص وتحليل حركة المرور لدينا. بالنقر على "قبول الكل"، فإنك توافق على استخدامنا لملفات تعريف الارتباط.',
        'necessary-cookies': 'ملفات تعريف الارتباط الضرورية',
        'necessary-cookies-desc': 'مطلوبة لكي يعمل الموقع بشكل صحيح. لا يمكن تعطيلها.',
        'accept': 'قبول',
        'reject': 'رفض',
        'footer-description': 'نصنع تجارب رقمية استثنائية باستخدام أحدث التقنيات وحلول مبتكرة.',
        'cookie-policy-title': 'سياسة ملفات تعريف الارتباط',
        'last-updated': 'آخر تحديث: يونيو 2025',
        'what-are-cookies': 'ما هي ملفات تعريف الارتباط',
        'cookies-definition': 'ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم وضعها على جهاز الكمبيوتر أو الجهاز المحمول الخاص بك عند زيارة موقعنا. يتم استخدامها على نطاق واسع لجعل المواقع تعمل بكفاءة أكبر وتقديم تجربة مستخدم أفضل.',
        'how-we-use-cookies': 'كيف نستخدم ملفات تعريف الارتباط',
        'cookies-usage': 'نستخدم ملفات تعريف الارتباط للأغراض التالية:',
        'cookies-essential': 'ملفات تعريف الارتباط الأساسية: مطلوبة لكي يعمل الموقع بشكل صحيح',
        'cookies-preferences': 'ملفات تعريف الارتباط التفضيلية: تذكر إعداداتك وتفضيلاتك',
        'cookies-analytics': 'ملفات تعريف الارتباط التحليلية: تساعدنا في فهم كيفية تفاعل الزوار مع موقعنا',
        'cookies-marketing': 'ملفات تعريف الارتباط التسويقية: تستخدم لتقديم إعلانات ذات صلة',
        'types-of-cookies': 'أنواع ملفات تعريف الارتباط التي نستخدمها',
        'session-cookies': 'ملفات تعريف الارتباط المؤقتة',
        'session-cookies-desc': 'ملفات تعريف ارتباط مؤقتة تنتهي عند إغلاق المتصفح. تساعد في الحفاظ على جلستك أثناء استخدام موقعنا.',
        'persistent-cookies': 'ملفات تعريف الارتباط الدائمة',
        'persistent-cookies-desc': 'تبقى على جهازك لفترة محددة أو حتى تقوم بحذفها. تساعد في تذكر تفضيلاتك وإعداداتك.',
        'managing-cookies': 'إدارة ملفات تعريف الارتباط',
        'managing-cookies-desc': 'يمكنك التحكم في ملفات تعريف الارتباط وإدارتها في إعدادات المتصفح. ومع ذلك، يرجى ملاحظة أن تعطيل بعض ملفات تعريف الارتباط قد يؤثر على وظائف موقعنا.',
        'browser-settings': 'إعدادات المتصفح',
        'chrome-settings': 'جوجل كروم',
        'firefox-settings': 'موزيلا فايرفوكس',
        'edge-settings': 'مايكروسوفت إيدج',
        'safari-settings': 'سفاري',
        'third-party-cookies': 'ملفات تعريف الارتباط من جهات خارجية',
        'third-party-cookies-desc': 'قد نستخدم خدمات من جهات خارجية تضع ملفات تعريف الارتباط على جهازك. تساعدنا هذه الخدمات في تحليل استخدام الموقع وتقديم ميزات وسائل التواصل الاجتماعي وتقديم إعلانات ذات صلة.',
        'terms-conditions-title': 'الشروط والأحكام',
        'agreement': 'الموافقة على الشروط',
        'agreement-desc': 'باستخدام خدمات ClickFormz، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فلا يجوز لك استخدام خدماتنا.',
        'services': 'الخدمات',
        'services-desc': 'تقدم ClickFormz خدمات تطوير الويب، وحلول التجارة الإلكترونية، وتطوير روبوتات المحادثة الذكية، والخدمات ذات الصلة. نحتفظ بالحق في تعديل أو تعليق أو إنهاء أي جانب من جوانب خدماتنا في أي وقت.',
        'intellectual-property': 'الملكية الفكرية',
        'ip-desc': 'جميع المحتويات والميزات والوظائف في خدماتنا مملوكة لـ ClickFormz ومحمية بموجب قوانين حقوق النشر والعلامات التجارية والملكية الفكرية الدولية.',
        'user-obligations': 'التزامات المستخدم',
        'user-obligations-desc': 'عند استخدام خدماتنا، فإنك توافق على:',
        'obligation-1': 'تقديم معلومات دقيقة وكاملة',
        'obligation-2': 'الحفاظ على أمان حسابك',
        'obligation-3': 'عدم استخدام خدماتنا لأي أغراض غير قانونية',
        'obligation-4': 'عدم التدخل في الأداء السليم لخدماتنا',
        'payment-terms': 'شروط الدفع',
        'payment-desc': 'تشمل شروط وأحكام الدفع لخدماتنا:',
        'payment-1': 'جميع الأسعار بالدولار الأمريكي ما لم يذكر خلاف ذلك',
        'payment-2': 'يستحق الدفع وفقًا للجدول المتفق عليه',
        'payment-3': 'نحتفظ بالحق في تعليق الخدمات لعدم الدفع',
        'payment-4': 'تخضع المبالغ المستردة لسياسة الاسترداد الخاصة بنا',
        'limitation-liability': 'تحديد المسؤولية',
        'liability-desc': 'لن تكون ClickFormz مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية ناتجة عن استخدامك أو عدم قدرتك على استخدام خدماتنا.',
        'termination': 'إنهاء الخدمة',
        'termination-desc': 'يجوز لنا إنهاء أو تعليق وصولك إلى خدماتنا فورًا، دون إشعار مسبق، لأي مخالفة لهذه الشروط والأحكام.',
        'table-of-contents': 'جدول المحتويات',
        'toc-collection': '1. المعلومات التي نجمعها',
        'toc-use': '2. كيفية استخدام معلوماتك',
        'toc-sharing': '3. مشاركة المعلومات',
        'toc-security': '4. أمن البيانات',
        'toc-rights': '5. حقوقك',
        'toc-cookies': '6. ملفات تعريف الارتباط والتتبع',
        'toc-retention': '7. الاحتفاظ بالبيانات',
        'toc-transfers': '8. نقل البيانات الدولية',
        'toc-changes': '9. التغييرات على هذه السياسة',
        'toc-contact': '10. اتصل بنا',
        'data-retention': 'الاحتفاظ بالبيانات',
        'retention-desc': 'نحتفظ بمعلوماتك الشخصية طالما كان ذلك ضروريًا لتحقيق الأغراض الموضحة في سياسة الخصوصية هذه، ما لم تكن هناك حاجة إلى فترة احتفاظ أطول أو يسمح بها القانون. تستند فترات الاحتفاظ لدينا إلى:',
        'retention-1': 'طبيعة المعلومات الشخصية',
        'retention-2': 'الأغراض التي نعالجها من أجلها',
        'retention-3': 'المتطلبات القانونية والتنظيمية',
        'retention-4': 'احتياجات والتزامات العمل',
        'international-transfers': 'نقل البيانات الدولية',
        'transfers-desc': 'قد يتم نقل معلوماتك ومعالجتها في بلدان غير بلد إقامتك. قد يكون لهذه البلدان قوانين حماية بيانات مختلفة. نتأكد من وجود ضمانات مناسبة لحماية معلوماتك، بما في ذلك:',
        'transfers-1': 'الشروط التعاقدية القياسية المعتمدة من قبل السلطات المختصة',
        'transfers-2': 'القواعد المؤسسية الملزمة',
        'transfers-3': 'قرارات الكفاية من قبل السلطات المختصة',
        'transfers-4': 'آليات قانونية أخرى لضمان حماية البيانات',
        'policy-changes': 'التغييرات على هذه السياسة',
        'changes-desc': 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب تشغيلية أو قانونية أو تنظيمية أخرى. سنخطرك بأي تغييرات جوهرية من خلال:',
        'changes-1': 'نشر سياسة الخصوصية الجديدة على هذه الصفحة',
        'changes-2': 'تحديث تاريخ "آخر تحديث"',
        'changes-3': 'إرسال إشعار بالبريد الإلكتروني للتغييرات المهمة',
        'contact-privacy': 'اتصل بنا',
        'contact-privacy-desc': 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات البيانات لدينا، يرجى الاتصال بمسؤول حماية البيانات لدينا:',
        'information-collection': 'المعلومات التي نجمعها',
        'collection-desc': 'نقوم بجمع المعلومات التي تقدمها لنا مباشرة، بما في ذلك:',
        'collection-1': 'المعلومات الشخصية (الاسم، البريد الإلكتروني، رقم الهاتف)',
        'collection-2': 'معلومات العمل (اسم الشركة، الصناعة)',
        'collection-3': 'متطلبات ومواصفات المشروع',
        'collection-4': 'تفضيلات الاتصال',
        'information-use': 'كيفية استخدام معلوماتك',
        'use-desc': 'نستخدم المعلومات المجمعة من أجل:',
        'use-1': 'تقديم وتحسين خدماتنا',
        'use-2': 'التواصل معك بشأن مشاريعك',
        'use-3': 'إرسال التحديثات والإشعارات المهمة',
        'use-4': 'تحليل وتعزيز تجربة المستخدم',
        'information-sharing': 'مشاركة المعلومات',
        'sharing-desc': 'قد نشارك معلوماتك مع:',
        'sharing-1': 'مقدمي الخدمات الذين يساعدون في عملياتنا',
        'sharing-2': 'المستشارين والمستشارين المهنيين',
        'sharing-3': 'جهات إنفاذ القانون عندما يقتضي القانون ذلك',
        'data-security': 'أمن البيانات',
        'security-desc': 'نقوم بتنفيذ إجراءات أمنية مناسبة لحماية معلوماتك، بما في ذلك:',
        'security-1': 'تشفير البيانات الحساسة',
        'security-2': 'التقييمات الأمنية المنتظمة',
        'security-3': 'ضوابط الوصول والمصادقة',
        'security-4': 'تخزين ونقل البيانات الآمن',
        'user-rights': 'حقوقك',
        'rights-desc': 'لديك الحق في:',
        'rights-1': 'الوصول إلى معلوماتك الشخصية',
        'rights-2': 'تصحيح البيانات غير الدقيقة',
        'rights-3': 'طلب حذف بياناتك',
        'rights-4': 'الانسحاب من الرسائل التسويقية',
        'cookies-tracking': 'ملفات تعريف الارتباط والتتبع',
        'cookies-desc': 'نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة من أجل:',
        'cookies-1': 'تذكر تفضيلاتك',
        'cookies-2': 'تحليل استخدام الموقع',
        'cookies-3': 'تحسين خدماتنا',
        'cookies-4': 'تقديم محتوى مخصص',
        'contact-info': 'اتصل بنا',
        'contact-desc': 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على:',
        'contact-email': 'البريد الإلكتروني: privacy@clickformz.com',
        'contact-phone': 'الهاتف: +1 (234) 567-890',
        'table-of-contents': 'جدول المحتويات',
        'toc-collection': '1. المعلومات التي نجمعها',
        'toc-use': '2. كيفية استخدام معلوماتك',
        'toc-sharing': '3. مشاركة المعلومات',
        'toc-security': '4. أمن البيانات',
        'toc-rights': '5. حقوقك',
        'toc-cookies': '6. ملفات تعريف الارتباط والتتبع',
        'toc-retention': '7. الاحتفاظ بالبيانات',
        'toc-transfers': '8. نقل البيانات الدولية',
        'toc-changes': '9. التغييرات على هذه السياسة',
        'toc-contact': '10. اتصل بنا',
        'data-retention': 'الاحتفاظ بالبيانات',
        'retention-desc': 'نحتفظ بمعلوماتك الشخصية طالما كان ذلك ضروريًا لتحقيق الأغراض الموضحة في سياسة الخصوصية هذه، ما لم تكن هناك حاجة إلى فترة احتفاظ أطول أو يسمح بها القانون. تستند فترات الاحتفاظ لدينا إلى:',
        'retention-1': 'طبيعة المعلومات الشخصية',
        'retention-2': 'الأغراض التي نعالجها من أجلها',
        'retention-3': 'المتطلبات القانونية والتنظيمية',
        'retention-4': 'احتياجات والتزامات العمل',
        'international-transfers': 'نقل البيانات الدولية',
        'transfers-desc': 'قد يتم نقل معلوماتك ومعالجتها في بلدان غير بلد إقامتك. قد يكون لهذه البلدان قوانين حماية بيانات مختلفة. نتأكد من وجود ضمانات مناسبة لحماية معلوماتك، بما في ذلك:',
        'transfers-1': 'الشروط التعاقدية القياسية المعتمدة من قبل السلطات المختصة',
        'transfers-2': 'القواعد المؤسسية الملزمة',
        'transfers-3': 'قرارات الكفاية من قبل السلطات المختصة',
        'transfers-4': 'آليات قانونية أخرى لضمان حماية البيانات',
        'policy-changes': 'التغييرات على هذه السياسة',
        'changes-desc': 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب تشغيلية أو قانونية أو تنظيمية أخرى. سنخطرك بأي تغييرات جوهرية من خلال:',
        'changes-1': 'نشر سياسة الخصوصية الجديدة على هذه الصفحة',
        'changes-2': 'تحديث تاريخ "آخر تحديث"',
        'changes-3': 'إرسال إشعار بالبريد الإلكتروني للتغييرات المهمة',
        'contact-privacy': 'اتصل بنا',
        'contact-privacy-desc': 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات البيانات لدينا، يرجى الاتصال بمسؤول حماية البيانات لدينا:',
        'privacy-policy-title': 'سياسة الخصوصية',
        'toc-agreement': '1. الموافقة على الشروط',
        'toc-services': '2. الخدمات',
        'toc-ip': '3. الملكية الفكرية',
        'toc-obligations': '4. التزامات المستخدم',
        'toc-payment': '5. شروط الدفع',
        'toc-data': '6. حماية البيانات',
        'toc-modifications': '7. تعديلات الخدمة',
        'toc-liability': '8. تحديد المسؤولية',
        'toc-dispute': '9. حل النزاعات',
        'toc-law': '10. القانون الحاكم',
        'toc-termination': '11. إنهاء الخدمة',
        'data-protection': 'حماية البيانات',
        'data-protection-desc': 'نحن ملتزمون بحماية بياناتك وخصوصيتك. تشمل ممارسات حماية البيانات لدينا:',
        'data-1': 'تنفيذ إجراءات أمنية مناسبة',
        'data-2': 'تقييمات وتحديثات أمنية منتظمة',
        'data-3': 'الامتثال لقوانين حماية البيانات المعمول بها',
        'data-4': 'تخزين ونقل البيانات بشكل آمن',
        'service-modifications': 'تعديلات الخدمة',
        'modifications-desc': 'نحتفظ بالحق في تعديل خدماتنا في أي وقت. وهذا يشمل:',
        'mod-1': 'التغييرات في ميزات ووظائف الخدمة',
        'mod-2': 'تحديثات الأسعار وشروط الدفع',
        'mod-3': 'تعديلات توفر الخدمة',
        'mod-4': 'التغييرات في المتطلبات التقنية',
        'dispute-resolution': 'حل النزاعات',
        'dispute-desc': 'يتم حل أي نزاعات تنشأ عن هذه الشروط من خلال:',
        'dispute-1': 'الاستشارة والتفاوض الأولي',
        'dispute-2': 'الوساطة إذا لزم الأمر',
        'dispute-3': 'التحكيم كطريقة نهائية للحل',
        'dispute-4': 'الاختصاص الحصري في محاكم ولايتنا القضائية',
        'governing-law': 'القانون الحاكم',
        'law-desc': 'تخضع هذه الشروط وتفسر وفقًا لقوانين الولاية القضائية التي تم تسجيل ClickFormz فيها، بغض النظر عن أحكام تعارض القوانين.',
        'contact-info': 'معلومات الاتصال',
        'contact-desc': 'إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى الاتصال بنا على:',
        'faq-title': 'الأسئلة الشائعة',
        'web-dev-faq': 'تطوير المواقع',
        'web-dev-q1': 'ما هي التقنيات التي تستخدمونها في تطوير المواقع؟',
        'web-dev-a1': 'نستخدم تقنيات حديثة تشمل HTML5 و CSS3 و JavaScript (React و Vue.js و Angular) و Node.js ومختلف أطر العمل الخلفية. يعتمد اختيارنا للتقنية على متطلبات وأهداف مشروعك المحددة.',
        'web-dev-q2': 'كم من الوقت يستغرق تطوير موقع؟',
        'web-dev-a2': 'يختلف الجدول الزمني بناءً على تعقيد المشروع والميزات والمتطلبات. قد يستغرق الموقع الأساسي من 2-4 أسابيع، بينما قد تستغرق تطبيقات الويب المعقدة من 3-6 أشهر. سنقدم جدولاً زمنياً مفصلاً خلال استشارتنا الأولية.',
        'ecommerce-faq': 'التجارة الإلكترونية',
        'ecommerce-q1': 'ما هي بوابات الدفع التي تدعمونها؟',
        'ecommerce-a1': 'نقوم بدمج بوابات الدفع الرئيسية بما في ذلك PayPal و Stripe و Square ومقدمي الدفع الإقليميين. يمكننا أيضًا تنفيذ حلول دفع مخصصة بناءً على احتياجاتك المحددة.',
        'ecommerce-q2': 'هل تقدمون أنظمة إدارة المخزون؟',
        'ecommerce-a2': 'نعم، نقوم بتطوير أنظمة شاملة لإدارة المخزون تتكامل مع منصة التجارة الإلكترونية الخاصة بك. يشمل ذلك تتبع المخزون وإعادة الطلب التلقائي وميزات التقارير التفصيلية.',
        'ai-faq': 'الذكاء الاصطناعي وروبوتات المحادثة',
        'ai-q1': 'ما مدى ذكاء روبوتات المحادثة الخاصة بكم؟',
        'ai-a1': 'تم بناء روبوتات المحادثة الخاصة بنا باستخدام تقنيات متقدمة في معالجة اللغة الطبيعية والتعلم الآلي. يمكنها فهم السياق والتعلم من التفاعلات وتقديم ردود مخصصة بناءً على احتياجات عملك.',
        'ai-q2': 'هل يمكن لروبوتات المحادثة التكامل مع أنظمتي الحالية؟',
        'ai-a2': 'نعم، يمكن لروبوتات المحادثة التكامل مع مختلف الأنظمة بما في ذلك CRM و ERP ومنصات دعم العملاء. نضمن التكامل السلس مع البنية التحتية الحالية مع الحفاظ على معايير الأمان.',
        'general-faq': 'أسئلة عامة',
        'general-q1': 'ما هي هيكلية الأسعار لديكم؟',
        'general-a1': 'تستند أسعارنا إلى المشروع وتعتمد على متطلباتك المحددة. نقدم عروض أسعار مفصلة بعد فهم احتياجاتك. كما نقدم حزم الصيانة والدعم للخدمات المستمرة.',
        'general-q2': 'هل تقدمون دعم ما بعد الإطلاق؟',
        'general-a2': 'نعم، نقدم دعمًا شاملاً لما بعد الإطلاق يشمل الصيانة والتحديثات والمساعدة التقنية. نقدم حزم دعم مختلفة لتتناسب مع احتياجاتك وضمان بقاء حلولك الرقمية في حالة مثالية.',
    }
};

// Language update function
function updateLanguage(lang) {
    // Store language preference
    localStorage.setItem('preferred_language', lang);

    // Show loader
    const loader = document.querySelector('.language-loader');
    if (loader) {
        loader.classList.add('active');
    }

    // Update document language
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

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

    // Handle Select2 if it exists
    if (serviceSelect && serviceSelect.length) {
        serviceSelect.select2('destroy');
        serviceSelect.select2({
            theme: 'bootstrap-5',
            width: '100%',
            placeholder: function () {
                return $(this).data('placeholder');
            },
            allowClear: true,
            minimumResultsForSearch: Infinity
        });
    }

    // Hide loader after a short delay
    setTimeout(() => {
        if (loader) {
            loader.classList.remove('active');
        }
    }, 300);
}

// Check for saved language preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferred_language');
    if (savedLanguage) {
        updateLanguage(savedLanguage);
    }
});

// Language Switcher
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        // Remove active class from all buttons
        langButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        updateLanguage(lang);
    });
});

// Set initial active state for language button
const initialLang = document.documentElement.lang || 'en';
const activeLangButton = document.querySelector(`.lang-btn[data-lang="${initialLang}"]`);
if (activeLangButton) {
    activeLangButton.classList.add('active');
}

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