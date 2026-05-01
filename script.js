document.addEventListener('DOMContentLoaded', () => {
    
    // Dynamic Footer Year Updater
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Intersection Observer for subtle scroll reveals
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; 
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); 
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Terminal typing effect to mimic the hacker aesthetic
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        setTimeout(() => {
            const newLine = document.createElement('p');
            newLine.textContent = '> status: ready. waiting for user action...';
            newLine.style.color = '#10b981';
            terminalBody.appendChild(newLine);
        }, 1200);
    }
});