/* ONLINE TOOLS DIRECTORY - PLAIN & SIMPLE MINIMAL DESIGN (INSPIRED BY ONLINETOOLS.COM) */

function renderToolsPage() {
    const safeTools = (typeof TOOLS !== 'undefined' && Array.isArray(TOOLS)) ? TOOLS : [];

    // Group Tools by Category for Plain Categorized Listing
    const categories = {
        'Finance & UK Tax': [],
        'Image & Graphics': [],
        'Developer, Network & Code': [],
        'Text & String Utilities': [],
        'Math & Converters': [],
        'Health & Lifestyle': []
    };

    safeTools.forEach(tool => {
        const cat = tool.category || 'Utilities';
        if (cat.includes('Finance') || cat.includes('Tax')) {
            categories['Finance & UK Tax'].push(tool);
        } else if (cat.includes('Image') || cat.includes('Media') || tool.id.includes('img') || tool.id.includes('qr')) {
            categories['Image & Graphics'].push(tool);
        } else if (cat.includes('Developer') || cat.includes('Text') || tool.id.includes('compiler') || tool.id.includes('packet') || tool.id.includes('json') || tool.id.includes('word') || tool.id.includes('case')) {
            categories['Developer, Network & Code'].push(tool);
        } else if (cat.includes('Health')) {
            categories['Health & Lifestyle'].push(tool);
        } else {
            categories['Math & Converters'].push(tool);
        }
    });

    return `
        <div class="space-y-8 max-w-6xl mx-auto">
            <!-- Plain Minimal Header & Search -->
            <div class="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Free Online Tools Directory</h1>
                        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-mono">Simple, fast, plain-text online utilities with zero clutter.</p>
                    </div>
                    <div class="w-full sm:w-80">
                        <input type="text" id="tool-search-input" onkeyup="filterPlainToolsList()" placeholder="Type to filter tools..." class="w-full p-2.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-mono text-xs outline-none focus:border-indigo-600">
                    </div>
                </div>
            </div>

            <!-- Plain Categorized Tool Lists -->
            <div class="space-y-8">
                ${Object.keys(categories).map(catName => {
                    const toolsInCat = categories[catName];
                    if (toolsInCat.length === 0) return '';
                    return `
                        <div class="tool-cat-block space-y-3">
                            <h2 class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-800 pb-1.5 flex items-center justify-between">
                                <span>${catName}</span>
                                <span class="text-[10px] text-slate-400 font-mono">(${toolsInCat.length} tools)</span>
                            </h2>
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                ${toolsInCat.map(tool => `
                                    <a href="${tool.id}.html" onclick="navigateTo('tool', '${tool.id}'); return false;" class="tool-plain-item p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition flex items-center justify-between group shadow-xs">
                                        <div class="min-w-0 pr-2">
                                            <div class="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition truncate">${escapeHtml(tool.name)}</div>
                                            <div class="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-mono">${escapeHtml(tool.shortDesc || tool.seoDesc)}</div>
                                        </div>
                                        <i class="fa-solid fa-chevron-right text-[10px] text-slate-400 group-hover:text-indigo-600 shrink-0"></i>
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function filterPlainToolsList() {
    const query = document.getElementById('tool-search-input').value.toLowerCase().trim();
    const items = document.querySelectorAll('.tool-plain-item');

    items.forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
    });

    const blocks = document.querySelectorAll('.tool-cat-block');
    blocks.forEach(block => {
        const visibleItems = block.querySelectorAll('.tool-plain-item[style*="display: flex"], .tool-plain-item:not([style*="display"])');
        block.style.display = visibleItems.length > 0 || !query ? 'block' : 'none';
    });
}
