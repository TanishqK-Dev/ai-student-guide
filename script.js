// --- 1. DARK MODE LOGIC ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved user preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️ Light Mode';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️ Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '🌙 Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });
}

// --- 2. QUOTE GENERATOR LOGIC ---
// --- QUOTE LOGIC ---
async function getQuote() {
    const textEl = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');
    
    if (!textEl) return;

    console.log("Button clicked! Fetching new quote..."); // Check Acode console
    textEl.textContent = "Loading...";

    try {
        // We use a random number + timestamp to definitely break the cache
        const randomNum = Math.floor(Math.random() * 100000);
        const response = await fetch(`https://api.adviceslip.com/advice?cachebust=${randomNum}`);
        
        if (!response.ok) throw new Error();
        
        const data = await response.json();
        textEl.textContent = `"${data.slip.advice}"`;
        if(authorEl) authorEl.textContent = "- Wise Words";
        
    } catch (error) {
        textEl.textContent = "Keep pushing forward!";
    }
}

// THE TRIGGER (The most reliable way to link them)
document.addEventListener('click', function (event) {
    if (event.target.id === 'new-quote-btn') {
        getQuote();
    }
});

// Initial load
getQuote();

// --- COPY TO CLIPBOARD LOGIC ---
document.addEventListener('click', function (event) {
    if (event.target.id === 'copy-quote-btn') {
        const text = document.getElementById('quote-text').textContent;
        const author = document.getElementById('quote-author').textContent;
        const fullText = `${text} ${author}`;

        // The actual command to copy
        navigator.clipboard.writeText(fullText).then(() => {
            // Visual feedback so the user knows it worked
            const originalText = event.target.textContent;
            event.target.textContent = "✅ Copied!";
            
            // Reset the button text after 2 seconds
            setTimeout(() => {
                event.target.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
});
