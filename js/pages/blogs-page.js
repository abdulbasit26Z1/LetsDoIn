/* BLOGS HUB PAGE VIEW - PLAIN MINIMAL DESIGN */

function renderBlogsPage() {
    const safeBlogs = (typeof BLOGS !== 'undefined' && Array.isArray(BLOGS)) ? BLOGS : [];

    return `
        <div class="space-y-6 max-w-6xl mx-auto">
            <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h1 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">UK Editorial Articles &amp; Financial Guides</h1>
                <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-mono">In-depth British analysis on HMRC tax bands, Ofgem energy price tariffs, and business compliance.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${safeBlogs.map(blog => `
                    <a href="${blog.id}.html" onclick="navigateTo('blog', '${blog.id}'); return false;" class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition block group shadow-xs">
                        <div class="flex justify-between items-center text-[10px] text-slate-500 font-mono mb-1">
                            <span class="font-bold text-indigo-600 dark:text-indigo-400 uppercase">${escapeHtml(blog.category || 'Guide')}</span>
                            <span>${escapeHtml(blog.readTime || '5 min read')}</span>
                        </div>
                        <h3 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition leading-snug">${escapeHtml(blog.title)}</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">${escapeHtml(blog.summary)}</p>
                    </a>
                `).join('')}
            </div>
        </div>
    `;
}
