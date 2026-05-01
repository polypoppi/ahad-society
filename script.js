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

    // --- AHAD SOCIETY SUNDAY COUNTER ---
    const sundayNumberEl = document.getElementById('sunday-number');
    const sundayDateEl = document.getElementById('sunday-date');

    if (sundayNumberEl && sundayDateEl) {
        const today = new Date();
        const nextSunday = new Date(today);
        
        // Find how many days until the next Sunday (Sunday is 0 in JS)
        // If today is Sunday, it will point to today. 
        let daysUntilNext = (7 - today.getDay()) % 7;
        
        // If you strictly want the *next* Sunday even if today is Sunday, 
        // uncomment the next line:
        // if (daysUntilNext === 0) daysUntilNext = 7;
        
        nextSunday.setDate(today.getDate() + daysUntilNext);

        // Get the very first day of the current year
        const year = nextSunday.getFullYear();
        const startOfYear = new Date(year, 0, 1);
        
        // Find the first Sunday of this year
        const firstSunday = new Date(startOfYear);
        firstSunday.setDate(startOfYear.getDate() + (7 - startOfYear.getDay()) % 7);
        
        // Calculate the difference in weeks between the first Sunday and the upcoming Sunday
        const diffTime = nextSunday.getTime() - firstSunday.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); 
        const occurrence = Math.floor(diffDays / 7) + 1;

        // Figure out the correct suffix (st, nd, rd, th)
        const j = occurrence % 10;
        const k = occurrence % 100;
        let suffix = "th";
        if (j == 1 && k != 11) suffix = "st";
        else if (j == 2 && k != 12) suffix = "nd";
        else if (j == 3 && k != 13) suffix = "rd";

        // Inject the number into the HTML
        sundayNumberEl.textContent = occurrence + suffix;
        
        // Format the date to match the site's lowercase aesthetic (e.g., "may 03, 2026")
        const options = { month: 'short', day: '2-digit', year: 'numeric' };
        let formattedDate = nextSunday.toLocaleDateString('en-US', options).toLowerCase();
        
        // Inject the pure date into the HTML brackets
        sundayDateEl.textContent = formattedDate;
    }
});