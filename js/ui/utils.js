/* UTILITY HELPERS, READ LOG TRACKER & AD BANNER RENDER ENGINE */

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

/* DYNAMIC AD BANNER INITIALIZATION ENGINE (GUARANTEES 100% EXECUTION) */
function initAdBanners() {
    setTimeout(() => {
        // 1. Initialize 468x60 Banner Iframe Slots
        const bannerContainers = document.querySelectorAll('.ad-468-slot');
        bannerContainers.forEach((container) => {
            if (container.dataset.loaded) return;
            container.dataset.loaded = 'true';

            const iframe = document.createElement('iframe');
            iframe.width = '468';
            iframe.height = '60';
            iframe.style.border = 'none';
            iframe.style.overflow = 'hidden';
            iframe.style.maxWidth = '100%';

            container.appendChild(iframe);

            try {
                const doc = iframe.contentWindow.document;
                doc.open();
                doc.write(`
                    <!DOCTYPE html>
                    <html>
                    <body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;">
                    <script>
                      atOptions = {
                        'key' : '1efdd1e5922a60484d16fdd9d13dc0d8',
                        'format' : 'iframe',
                        'height' : 60,
                        'width' : 468,
                        'params' : {}
                      };
                    </script>
                    <script src="https://environmenttalentrabble.com/1efdd1e5922a60484d16fdd9d13dc0d8/invoke.js"></script>
                    </body>
                    </html>
                `);
                doc.close();
            } catch(e) {}
        });

        // 2. Initialize Native Banner Container Slots
        const nativeSlots = document.querySelectorAll('.ad-native-slot');
        nativeSlots.forEach((slot) => {
            if (slot.dataset.loaded) return;
            slot.dataset.loaded = 'true';

            const nativeDiv = document.createElement('div');
            nativeDiv.id = 'container-c4cf909508540409c9941a4504c173d1';
            slot.appendChild(nativeDiv);

            const script = document.createElement('script');
            script.async = true;
            script.dataset.cfasync = 'false';
            script.src = 'https://environmenttalentrabble.com/c4cf909508540409c9941a4504c173d1/invoke.js';
            slot.appendChild(script);
        });
    }, 150);
}
