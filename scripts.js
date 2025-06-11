// একটি DOMContentLoaded এর মধ্যে সমস্ত কোড রাখা হয়েছে
document.addEventListener('DOMContentLoaded', function () {

    // --- মোবাইল নেভিগেশন মেন্যু লজিক ---
    const menuButton = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('main-nav');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', function (e) {
            e.stopPropagation(); // বাটন ক্লিকে ডকুমেন্ট ক্লিক যেন ট্রিগার না হয়
            navMenu.classList.toggle('mobile-menu-open');
        });

        // মেন্যুর বাইরে ক্লিক করলে মেন্যু বন্ধ হয়ে যাবে
        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && navMenu.classList.contains('mobile-menu-open')) {
                navMenu.classList.remove('mobile-menu-open');
            }
        });
    }

    // --- স্মুথ স্ক্রলিং লজিক ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // স্টিকি হেডারের জন্য অফসেট (হেডারের উচ্চতা প্রায় 70-80px)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // মোবাইল মেন্যু খোলা থাকলে লিঙ্ক ক্লিকে বন্ধ হয়ে যাবে
                if (navMenu && navMenu.classList.contains('mobile-menu-open')) {
                    navMenu.classList.remove('mobile-menu-open');
                }
            }
        });
    });

    // --- রিসাইজ হ্যান্ডলিং ---
    // যখন স্ক্রিন বড় হবে, তখন মোবাইল মেন্যুর ক্লাস स्वतঃ সরে যাবে 
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            if (navMenu && navMenu.classList.contains('mobile-menu-open')) {
                navMenu.classList.remove('mobile-menu-open');
            }
        }
    });

// --- fade-in animation trigger when section comes into view ---
const fadeInElements = document.querySelectorAll('.fade-in');

    if (fadeInElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeInElements.forEach(el => {
            observer.observe(el);
        });
    }

});
