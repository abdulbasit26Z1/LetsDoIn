/* APPLICATION INITIALISATION */

window.onload = function() {
    if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
        const icon = document.getElementById('theme-icon');
        if (icon) icon.className = 'fa-solid fa-moon text-indigo-400 text-lg';
    }
    renderApp();
    updateGoogleSchema();
};
