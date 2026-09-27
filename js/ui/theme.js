/* THEME TOGGLE LOGIC */

function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
        state.theme = 'light';
        if (icon) icon.className = 'fa-solid fa-sun text-amber-500 text-lg';
    } else {
        html.classList.remove('light');
        html.classList.add('dark');
        state.theme = 'dark';
        if (icon) icon.className = 'fa-solid fa-moon text-indigo-400 text-lg';
    }
    localStorage.setItem('theme', state.theme);
}
