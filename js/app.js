/* APPLICATION INITIALISATION */

function initApp() {
    // Unregister legacy third-party service workers if present
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            for (let registration of registrations) {
                registration.unregister();
            }
        }).catch(() => {});
    }

    if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
        const icon = document.getElementById('theme-icon');
        if (icon) icon.className = 'fa-solid fa-moon text-indigo-400 text-lg';
    }

    renderApp();
    updateGoogleSchema();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

window.addEventListener('load', initApp);
