/* HOME PAGE VIEW - PLAIN MINIMAL HIGH-DENSITY NETWORK DESIGN (INSPIRED BY ONLINETOOLS.COM) */

function renderHomePage() {
    const safeTools = (typeof TOOLS !== 'undefined' && Array.isArray(TOOLS)) ? TOOLS : [];
    const safeBlogs = (typeof BLOGS !== 'undefined' && Array.isArray(BLOGS)) ? BLOGS : [];
    const safeApps = (typeof APPS !== 'undefined' && Array.isArray(APPS)) ? APPS : [];

    return `
        <div class="space-y-8 max-w-6xl mx-auto">
            <!-- Plain Minimal Header & Hero -->
            <div class="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-4">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">LetsDoIn UK Network</h1>
                        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-mono">${safeTools.length}+ free standalone online tools, Cisco simulator, CapCut web studio, and UK tax calculators.</p>
                    </div>
                    <div class="w-full md:w-80">
                        <input type="text" id="home-search-input" onkeyup="filterHomeToolsList()" placeholder="Filter all tools..." class="w-full p-2.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-mono text-xs outline-none focus:border-indigo-600">
                    </div>
                </div>

                <!-- Featured Core Studios Ribbon -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    <a href="cisco-packet-tracer.html" onclick="navigateTo('tool', 'cisco-packet-tracer'); return false;" class="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 hover:border-indigo-500 transition text-center block">
                        <div class="font-bold text-xs text-indigo-700 dark:text-indigo-300"><i class="fa-solid fa-cube mr-1"></i> Cisco Simulator</div>
                        <div class="text-[9px] text-slate-500 font-mono mt-0.5">3D WebGL Labs</div>
                    </a>

                    <a href="vids-editor.html" onclick="navigateTo('vids'); return false;" class="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 hover:border-purple-500 transition text-center block">
                        <div class="font-bold text-xs text-purple-700 dark:text-purple-300"><i class="fa-solid fa-film mr-1"></i> CapCut Studio</div>
                        <div class="text-[9px] text-slate-500 font-mono mt-0.5">Free 4K Web Studio</div>
                    </a>

                    <a href="online-compiler.html" onclick="navigateTo('tool', 'online-compiler'); return false;" class="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 hover:border-sky-500 transition text-center block">
                        <div class="font-bold text-xs text-sky-700 dark:text-sky-300"><i class="fa-solid fa-code mr-1"></i> VS Code IDE</div>
                        <div class="text-[9px] text-slate-500 font-mono mt-0.5">13 Languages & MySQL</div>
                    </a>

                    <a href="capcut-pro-mod-apk.html" onclick="navigateTo('app', 'capcut-mod-apk'); return false;" class="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-500 transition text-center block">
                        <div class="font-bold text-xs text-emerald-700 dark:text-emerald-300"><i class="fa-solid fa-mobile-screen mr-1"></i> CapCut MOD APK</div>
                        <div class="text-[9px] text-slate-500 font-mono mt-0.5">v19.7.0 Pro Unlocked</div>
                    </a>
                </div>
            </div>

            <!-- Plain Standalone Tools List Grid -->
            <div class="space-y-4">
                <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <h2 class="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">Full Online Utility Directory</h2>
                    <a href="tools.html" onclick="navigateTo('tools'); return false;" class="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">View All ${safeTools.length}+ Tools &rarr;</a>
                </div>

                <div id="home-tools-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    ${safeTools.map(tool => `
                        <a href="${tool.id}.html" onclick="navigateTo('tool', '${tool.id}'); return false;" class="home-tool-item p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition flex items-center justify-between group shadow-xs">
                            <div class="min-w-0 pr-2">
                                <div class="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition truncate">${escapeHtml(tool.name)}</div>
                                <div class="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-mono">${escapeHtml(tool.shortDesc || tool.seoDesc)}</div>
                            </div>
                            <i class="fa-solid fa-chevron-right text-[10px] text-slate-400 group-hover:text-indigo-600 shrink-0"></i>
                        </a>
                    `).join('')}
                </div>
            </div>

            <!-- Plain Editorial Guides Index -->
            <div class="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <h2 class="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">UK Personal Finance &amp; Tax Guides</h2>
                    <a href="blogs.html" onclick="navigateTo('blogs'); return false;" class="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">All Guides &rarr;</a>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    ${safeBlogs.map(blog => `
                        <a href="${blog.id}.html" onclick="navigateTo('blog', '${blog.id}'); return false;" class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition block group">
                            <span class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase font-mono">${escapeHtml(blog.category || 'Guide')}</span>
                            <h3 class="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition mt-0.5 line-clamp-1">${escapeHtml(blog.title)}</h3>
                            <p class="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">${escapeHtml(blog.summary)}</p>
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function filterHomeToolsList() {
    const query = document.getElementById('home-search-input').value.toLowerCase().trim();
    const items = document.querySelectorAll('.home-tool-item');

    items.forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
    });
}
