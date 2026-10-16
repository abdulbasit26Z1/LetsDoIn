/* APP STATE MANAGEMENT & DIRECT MULTI-PAGE ROUTER (ZERO 404s / ZERO REDIRECT LOOPS) */

const urlParams = new URLSearchParams(window.location.search);
const initialId = urlParams.get('id');

const state = {
    currentView: window.DEFAULT_VIEW || 'home',
    activeBlogId: initialId || window.DEFAULT_BLOG_ID || 'uk-tax-finance-2026',
    activeToolId: initialId || window.DEFAULT_TOOL_ID || 'uk-take-home-pay',
    activeAppId: initialId || window.DEFAULT_APP_ID || 'capcut-pro-mod-apk',
    theme: localStorage.getItem('theme') || 'light',
    readLog: JSON.parse(localStorage.getItem('uk_read_log') || '[]'),
    currentCategoryFilter: 'all',
    searchQuery: ''
};

// MASTER EXACT MATCH ROUTE MAP
const ROUTE_PAGE_MAP = {
    'home': 'index.html',
    'blogs': 'blogs.html',
    'tools': 'tools.html',
    'apps': 'apps.html',
    'vids': 'vids-editor.html',
    'ai-editor': 'ai-video-editor.html',
    'editor': 'editor.html',

    // Apps & MODs
    'capcut-mod-apk': 'capcut-pro-mod-apk.html',
    'capcut-pro-mod-apk': 'capcut-pro-mod-apk.html',
    'subway-surfers-mod-apk': 'subway-surfers-mod-apk.html',
    'videoshow-mod-apk': 'videoshow-mod-apk.html',
    'helloface-mod-apk': 'helloface-mod-apk.html',
    'vinkle-mod-apk': 'vinkle-mod-apk.html'
};

function navigateTo(view, id = null) {
    state.currentView = view;
    if (view === 'blog' && id) state.activeBlogId = id;
    if (view === 'tool' && id) state.activeToolId = id;
    if (view === 'app' && id) state.activeAppId = id;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    let targetPage = ROUTE_PAGE_MAP[view];

    if (id) {
        targetPage = ROUTE_PAGE_MAP[id] || `${id}.html`;
    }

    // Direct navigation if on a different file
    if (targetPage && currentPage !== targetPage && (currentPage !== '' || targetPage !== 'index.html')) {
        window.location.href = targetPage;
        return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
    if (typeof updatePageSEO === 'function') updatePageSEO();
}

function renderApp() {
    const container = document.getElementById('app-content');
    if (!container) return;
    const progressContainer = document.getElementById('read-progress-container');

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
            if (typeof setupArticleScrollTracker === 'function') setupArticleScrollTracker();
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

    // Trigger Dynamic Ad Banner Execution for All Views
    if (typeof initAdBanners === 'function') {
        initAdBanners();
    }
}

function initActiveTool(id) {
    setTimeout(() => {
        const safeTools = (typeof TOOLS !== 'undefined' && Array.isArray(TOOLS)) ? TOOLS : [];
        const tool = safeTools.find(t => t.id === id);
        if (tool && typeof tool.init === 'function') {
            tool.init();
        }
    }, 50);
}
