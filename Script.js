const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 1. Check if the user had Dark Mode on before
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️ Light Mode';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark'); // Save preference
    } else {
        themeToggle.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light'); // Save preference
    }
});

