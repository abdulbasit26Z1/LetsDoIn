/* SINGLE TOOL PAGE VIEW WITH CROSS-INTERLINKING & AUTHORITATIVE CITATIONS */

function renderSingleToolPage(id) {
    const safeTools = (typeof TOOLS !== 'undefined' && Array.isArray(TOOLS)) ? TOOLS : [];
    const safeBlogs = (typeof BLOGS !== 'undefined' && Array.isArray(BLOGS)) ? BLOGS : [];

    const tool = safeTools.find(t => t.id === id) || safeTools[0] || { name: 'Utility Tool', category: 'Utilities', color: 'from-indigo-600 to-blue-600', icon: 'fa-calculator', seoDesc: 'Free online calculation utility tool.', render: () => '<div>Tool loading...</div>' };

    const name = tool.name || 'Utility Tool';
    const category = tool.category || 'Utilities';
    const color = tool.color && tool.color.includes('from-') ? `bg-gradient-to-tr ${tool.color} text-white` : (tool.color || 'bg-indigo-50 text-indigo-600');
    const icon = tool.icon || 'fa-calculator';
    const seoDesc = tool.seoDesc || tool.shortDesc || 'Free online calculation utility tool.';

    const relatedTools = safeTools.filter(t => t.id !== tool.id).slice(0, 4);
    const relatedBlogs = safeBlogs.slice(0, 2);

    return `
        <div class="max-w-4xl mx-auto space-y-6">
            <!-- Breadcrumbs -->
            <div class="text-xs text-slate-500 flex items-center space-x-2">
                <a href="index.html" onclick="navigateTo('home'); return false;" class="hover:underline">Home</a>
                <span>/</span>
                <a href="tools.html" onclick="navigateTo('tools'); return false;" class="hover:underline">Tools</a>
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

                <!-- In-Page SEO Instructions & Authority Citations Section -->
                <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs text-slate-600 dark:text-slate-400">
                    <h3 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Usage & Compliance Guidelines</h3>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>All calculations take place client-side in full compliance with UK regulations.</li>
                        <li>No personal financial data is transmitted or retained on external servers.</li>
                        <li>Updated for the 2025/2026 British financial year and energy regulatory framework.</li>
                    </ul>

                    <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                        <h4 class="font-bold text-slate-800 dark:text-slate-200 uppercase text-[11px] tracking-wider flex items-center">
                            <i class="fa-solid fa-shield-halved text-indigo-600 dark:text-indigo-400 mr-2"></i> Verified Official UK Authority Citations
                        </h4>
                        <div class="flex flex-wrap gap-2 text-[11px]">
                            <a href="https://www.gov.uk/government/organisations/hm-revenue-customs" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition flex items-center gap-1">
                                <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> HMRC Rates & Allowances
                            </a>
                            <a href="https://www.ofgem.gov.uk/" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition flex items-center gap-1">
                                <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Ofgem Energy Regulations
                            </a>
                            <a href="https://www.cisco.com/" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition flex items-center gap-1">
                                <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Cisco Networking Standards
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Related Standalone Tools & Guides Interlinking Grid -->
                <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                    <h3 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Related Standalone Tools &amp; Guides</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        ${relatedTools.map(t => `
                            <a href="${t.id}.html" onclick="navigateTo('tool', '${t.id}'); return false;" class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition block group">
                                <div class="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition">${escapeHtml(t.name)}</div>
                                <div class="text-[10px] text-slate-500 line-clamp-1 mt-0.5">${escapeHtml(t.shortDesc || t.seoDesc)}</div>
                            </a>
                        `).join('')}
                        ${relatedBlogs.map(b => `
                            <a href="${b.id}.html" onclick="navigateTo('blog', '${b.id}'); return false;" class="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 hover:border-indigo-500 transition block group">
                                <div class="font-bold text-xs text-indigo-900 dark:text-indigo-200 group-hover:text-indigo-600 transition"><i class="fa-solid fa-newspaper mr-1 text-indigo-500"></i> ${escapeHtml(b.title)}</div>
                                <div class="text-[10px] text-slate-500 line-clamp-1 mt-0.5">${escapeHtml(b.summary)}</div>
                            </a>
                        `).join('')}
                    </div>
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
        <a href="${tool.id}.html" onclick="navigateTo('tool', '${tool.id}'); return false;" class="group block p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 shadow-sm hover:shadow-md transition space-y-3">
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
        </a>
    `;
}
