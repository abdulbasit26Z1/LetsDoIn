/* UTILITY HELPERS & READ LOG TRACKER */

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'p-3 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold rounded-xl shadow-xl transition opacity-0 transform translate-y-2';
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => { toast.classList.remove('opacity-0', 'translate-y-2'); }, 50);
    setTimeout(() => { toast.remove(); }, 3000);
}

function copyToClipboard(text) {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    showToast('Copied to clipboard!');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

function setupArticleScrollTracker() {
    window.onscroll = function() {
        if (state.currentView !== 'blog') return;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const bar = document.getElementById('read-progress-bar');
        if (bar) bar.style.width = scrolled + "%";
    };
}

function recordReadLog(blog) {
    const existingIndex = state.readLog.findIndex(item => item.id === blog.id);
    const entry = {
        id: blog.id,
        title: blog.title,
        category: blog.category,
        readTime: blog.readTime,
        timestamp: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        scrollDepth: '100%'
    };

    if (existingIndex > -1) {
        state.readLog[existingIndex] = entry;
    } else {
        state.readLog.push(entry);
    }

    localStorage.setItem('uk_read_log', JSON.stringify(state.readLog));
}

function updateGoogleSchema() {
    if (typeof updatePageSEO === 'function') {
        updatePageSEO();
    }
}
