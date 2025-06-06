// Mobile Navigation Menu Logic
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.ri-menu-line').parentElement;
    const nav = document.querySelector('nav');
    
    menuButton.addEventListener('click', function() {
        if (nav.classList.contains('hidden')) {
            nav.classList.remove('hidden');
            nav.classList.add('flex', 'flex-col', 'absolute', 'top-16', 'right-4', 'bg-white', 'shadow-lg', 'p-4', 'rounded-lg', 'space-y-4');
        } else {
            nav.classList.add('hidden');
            nav.classList.remove('flex', 'flex-col', 'absolute', 'top-16', 'right-4', 'bg-white', 'shadow-lg', 'p-4', 'rounded-lg', 'space-y-4');
        }
    });

    // Close mobile menu when clicking elsewhere
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuButton.contains(event.target) && !nav.classList.contains('hidden') && window.innerWidth < 768) {
            nav.classList.add('hidden');
            nav.classList.remove('flex', 'flex-col', 'absolute', 'top-16', 'right-4', 'bg-white', 'shadow-lg', 'p-4', 'rounded-lg', 'space-y-4');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            nav.classList.remove('hidden', 'flex-col', 'absolute', 'top-16', 'right-4', 'bg-white', 'shadow-lg', 'p-4', 'rounded-lg', 'space-y-4');
            nav.classList.add('flex');
        } else if (!menuButton.classList.contains('active')) {
            nav.classList.add('hidden');
            nav.classList.remove('flex');
        }
    });
});

// Smooth Scrolling Logic
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Special case for 'home' to scroll to the top
            if (targetId === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for the sticky header
                    behavior: 'smooth'
                });

                // Close mobile menu if open after clicking a link
                const nav = document.querySelector('nav');
                if (window.innerWidth < 768 && !nav.classList.contains('hidden')) {
                    nav.classList.add('hidden');
                    nav.classList.remove('flex', 'flex-col', 'absolute', 'top-16', 'right-4', 'bg-white', 'shadow-lg', 'p-4', 'rounded-lg', 'space-y-4');
                }
            }
        });
    });
});