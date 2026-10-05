/* SINGLE BLOG ARTICLE PAGE VIEW */

function renderSingleBlogPage(id) {
    const safeBlogs = (typeof BLOGS !== 'undefined' && Array.isArray(BLOGS)) ? BLOGS : [];
    const blog = safeBlogs.find(b => b.id === id) || safeBlogs[0] || {
        id: 'uk-tax-finance-2026',
        title: 'UK Personal Finance Guide',
        category: 'Personal Finance',
        readTime: '8 min read',
        wordCount: 1500,
        author: 'LetsDoIn Editorial Team',
        date: '2026',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
        content: '<p>UK Personal Finance Guide...</p>'
    };

    const title = blog.title || blog.name || 'Editorial Guide';
    const category = blog.category || 'Guide';
    const readTime = blog.readTime || '5 min read';
    const wordCount = blog.wordCount || 1000;
    const author = blog.author || 'LetsDoIn Editorial Team';
    const date = blog.date || '2026';
    const image = blog.image || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80';

    if (typeof recordReadLog === 'function') {
        recordReadLog(blog);
    }

    return `
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            <!-- Article Sidebar Table of Contents -->
            <div class="lg:col-span-1 order-2 lg:order-1 space-y-6">
                <div class="sticky top-24 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center">
                        <i class="fa-solid fa-list-ul text-indigo-500 mr-2"></i> Table of Contents
                    </h4>
                    <nav class="space-y-2 text-xs">
                        <a href="#key-takeaways" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600">Key Takeaways</a>
                        <a href="#section-1" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600">1. Core Section Overview</a>
                        <a href="#section-2" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600">2. Deep Analysis &amp; Strategy</a>
                        <a href="#section-3" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600">3. Implementation Rules</a>
                        <a href="#article-faq" class="block text-slate-600 dark:text-slate-400 hover:text-indigo-600">Article FAQs</a>
                    </nav>
                    <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500">
                        <div><i class="fa-solid fa-clock mr-1"></i> ${escapeHtml(readTime)}</div>
                        <div class="mt-1"><i class="fa-solid fa-file-word mr-1"></i> ${wordCount} words</div>
                    </div>
                </div>
            </div>

            <!-- Main Article Body -->
            <article class="lg:col-span-3 order-1 lg:order-2 space-y-6 bg-white dark:bg-slate-900 p-5 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <!-- Breadcrumbs -->
                <div class="text-xs text-slate-500 flex flex-wrap items-center gap-1.5">
                    <a href="index.html" onclick="navigateTo('home'); return false;" class="hover:underline">Home</a>
                    <span>/</span>
                    <a href="blogs.html" onclick="navigateTo('blogs'); return false;" class="hover:underline">Guides</a>
                    <span>/</span>
                    <span class="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[200px] sm:max-w-md">${escapeHtml(title)}</span>
                </div>

                <!-- Header Info -->
                <div class="space-y-3">
                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300 inline-block">${escapeHtml(category)}</span>
                    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">${escapeHtml(title)}</h1>
                    <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <span><i class="fa-solid fa-user-pen mr-1"></i> ${escapeHtml(author)}</span>
                        <span>•</span>
                        <span><i class="fa-solid fa-calendar mr-1"></i> ${escapeHtml(date)}</span>
                    </div>
                </div>

                <!-- Main Banner Image -->
                <div class="rounded-2xl overflow-hidden aspect-video shadow-md bg-slate-100 dark:bg-slate-800">
                    <img src="${image}" alt="${escapeHtml(title)}" width="1000" height="562" fetchpriority="high" class="w-full h-full object-cover">
                </div>

                <!-- Article Body Content -->
                <div class="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 space-y-4">
                    ${blog.content}
                </div>
            </article>
        </div>
    `;
}

function renderBlogCard(blog) {
    if (!blog) return '';
    const title = blog.title || blog.name || 'Editorial Guide';
    const summary = blog.summary || blog.shortDesc || 'In-depth British guide.';
    let image = blog.image || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=60';
    if (image.includes('w=1000')) {
        image = image.replace('w=1000', 'w=600&q=60');
    }
    const category = blog.category || 'Guide';
    const readTime = blog.readTime || '5 min read';

    return `
        <div onclick="navigateTo('blog', '${blog.id}')" class="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
                <div class="h-44 sm:h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img src="${image}" alt="${escapeHtml(title)}" loading="lazy" decoding="async" width="600" height="350" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                </div>
                <div class="p-4 sm:p-5 space-y-2">
                    <div class="flex justify-between items-center text-xs text-slate-500">
                        <span class="font-bold text-indigo-700 dark:text-indigo-400">${escapeHtml(category)}</span>
                        <span>${escapeHtml(readTime)}</span>
                    </div>
                    <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-700 transition leading-snug">${escapeHtml(title)}</h3>
                    <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">${escapeHtml(summary)}</p>
                </div>
            </div>
            <div class="p-4 sm:p-5 pt-0 text-xs font-semibold text-indigo-700 dark:text-indigo-400 flex items-center">
                Read Full Article <i class="fa-solid fa-arrow-right ml-1 text-xs"></i>
            </div>
        </div>
    `;
}
