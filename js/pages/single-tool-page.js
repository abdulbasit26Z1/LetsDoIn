/* SINGLE TOOL PAGE VIEW */

function renderSingleToolPage(id) {
    const safeTools = (typeof TOOLS !== 'undefined' && Array.isArray(TOOLS)) ? TOOLS : [];
    const tool = safeTools.find(t => t.id === id) || safeTools[0] || { name: 'Utility Tool', category: 'Utilities', color: 'from-indigo-600 to-blue-600', icon: 'fa-calculator', seoDesc: 'Free online calculation utility tool.', render: () => '<div>Tool loading...</div>' };

    const name = tool.name || 'Utility Tool';
    const category = tool.category || 'Utilities';
    const color = tool.color && tool.color.includes('from-') ? `bg-gradient-to-tr ${tool.color} text-white` : (tool.color || 'bg-indigo-50 text-indigo-600');
    const icon = tool.icon || 'fa-calculator';
    const seoDesc = tool.seoDesc || tool.shortDesc || 'Free online calculation utility tool.';

    return `
        <div class="max-w-4xl mx-auto space-y-6">
            <!-- Breadcrumbs & Tool Header -->
            <div class="text-xs text-slate-500 flex items-center space-x-2">
                <a href="javascript:void(0)" onclick="navigateTo('home')" class="hover:underline">Home</a>
                <span>/</span>
                <a href="javascript:void(0)" onclick="navigateTo('tools')" class="hover:underline">Tools</a>
                <span>/</span>
                <span class="text-slate-800 dark:text-slate-200 font-semibold">${escapeHtml(name)}</span>
            </div>

            <div class="bg-white dark:bg-slate-900 p-5 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-start justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-2xl shadow-md shrink-0">
                            <i class="fa-solid ${icon}"></i>
                        </div>
                        <div>
                            <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">${escapeHtml(category)} Tool</span>
                            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">${escapeHtml(name)}</h1>
                        </div>
                    </div>
                </div>

                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${escapeHtml(seoDesc)}</p>

                <!-- Tool Interactive Container -->
                <div class="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                    ${typeof tool.render === 'function' ? tool.render() : (typeof window[`render${tool.id.replace(/-/g, '_').toUpperCase()}`] === 'function' ? window[`render${tool.id.replace(/-/g, '_').toUpperCase()}`]() : '<div>Tool component initializing...</div>')}
                </div>

                <!-- In-Page SEO Instructions & Feature Section -->
                <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs text-slate-600 dark:text-slate-400">
                    <h3 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">How to Use This Utility</h3>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>Input required variables into the fields above.</li>
                        <li>All calculations take place client-side in standard UK parameters.</li>
                        <li>No personal data is transmitted or stored on external servers.</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function renderToolCard(tool) {
    if (!tool) return '';
    const name = tool.name || 'Utility Tool';
    const category = tool.category || 'Utilities';
    const color = tool.color && tool.color.includes('from-') ? `bg-gradient-to-tr ${tool.color} text-white` : (tool.color || 'bg-indigo-50 text-indigo-600');
    const icon = tool.icon || 'fa-calculator';
    const shortDesc = tool.shortDesc || tool.seoDesc || 'Free online utility tool.';

    return `
        <div data-category="${escapeHtml(category)}" onclick="navigateTo('tool', '${tool.id}')" class="group cursor-pointer p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 shadow-sm hover:shadow-md transition space-y-3">
            <div class="flex items-center justify-between">
                <div class="w-10 h-10 rounded-xl ${color} flex items-center justify-center text-lg shadow-sm shrink-0">
                    <i class="fa-solid ${icon}"></i>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">${escapeHtml(category)}</span>
            </div>
            <div>
                <h3 class="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 transition">${escapeHtml(name)}</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">${escapeHtml(shortDesc)}</p>
            </div>
        </div>
    `;
}
