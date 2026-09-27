/* APP STATE MANAGEMENT & MULTI-PAGE ROUTER */

const urlParams = new URLSearchParams(window.location.search);
const initialId = urlParams.get('id');

const state = {
    currentView: window.DEFAULT_VIEW || 'home', // home, blogs, blog, tools, tool, apps, app
    activeBlogId: initialId || window.DEFAULT_BLOG_ID || 'capcut-mod-apk',
    activeToolId: initialId || window.DEFAULT_TOOL_ID || 'uk-take-home-pay',
    activeAppId: initialId || window.DEFAULT_APP_ID || 'capcut-mod-apk',
    theme: localStorage.getItem('theme') || 'light',
    readLog: JSON.parse(localStorage.getItem('uk_read_log') || '[]'),
    currentCategoryFilter: 'all',
    searchQuery: ''
};

function navigateTo(view, id = null) {
    state.currentView = view;
    if (view === 'blog' && id) state.activeBlogId = id;
    if (view === 'tool' && id) state.activeToolId = id;
    if (view === 'app' && id) state.activeAppId = id;

    const pageMap = {
        'home': 'index.html',
        'blogs': 'blogs.html',
        'blog': 'blog.html',
        'tools': 'tools.html',
        'tool': 'tool.html',
        'apps': 'apps.html',
        'app': 'app.html'
    };

    const targetPage = pageMap[view];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // If navigating to a different HTML page, redirect
    if (targetPage && currentPage !== targetPage && (currentPage !== '' || targetPage !== 'index.html')) {
        let url = targetPage;
        if (id) url += `?id=${encodeURIComponent(id)}`;
        window.location.href = url;
        return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
    updateGoogleSchema();
}

function renderApp() {
    const container = document.getElementById('app-content');
    if (!container) return;
    const progressContainer = document.getElementById('read-progress-container');

    // Toggle progress bar visibility
    if (state.currentView === 'blog') {
        if (progressContainer) progressContainer.classList.remove('hidden');
    } else {
        if (progressContainer) progressContainer.classList.add('hidden');
    }

    switch (state.currentView) {
        case 'home':
            container.innerHTML = renderHomePage();
            break;
        case 'blogs':
            container.innerHTML = renderBlogsPage();
            break;
        case 'blog':
            container.innerHTML = renderSingleBlogPage(state.activeBlogId);
            setupArticleScrollTracker();
            break;
        case 'tools':
            container.innerHTML = renderToolsPage();
            break;
        case 'tool':
            container.innerHTML = renderSingleToolPage(state.activeToolId);
            initActiveTool(state.activeToolId);
            break;
        case 'apps':
            container.innerHTML = renderAppsPage();
            break;
        case 'app':
            container.innerHTML = renderSingleAppPage(state.activeAppId);
            break;
        default:
            container.innerHTML = renderHomePage();
    }
}

function initActiveTool(id) {
    setTimeout(() => {
        const tool = TOOLS.find(t => t.id === id);
        if (tool && typeof tool.init === 'function') {
            tool.init();
        }
    }, 50);
}
