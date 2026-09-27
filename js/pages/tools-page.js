/* TOOLS HUB PAGE VIEW */

function renderToolsPage() {
    return `
        <div class="space-y-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">Daily Life Utility Tools</h1>
                    <p class="text-sm text-slate-500 mt-1">${TOOLS.length}+ free browser-based tools designed for everyday British life and productivity.</p>
                </div>
                <input type="text" id="tool-search" onkeyup="filterToolsList()" placeholder="Search tools (e.g., Image, VAT, Salary)..." class="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm w-full md:w-72 focus:ring-2 focus:ring-indigo-500 outline-none">
            </div>

            <!-- Category Filters -->
            <div class="flex flex-wrap gap-2 pb-2">
                <button onclick="filterToolCategory('all')" class="tool-cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white">All Tools (${TOOLS.length})</button>
                <button onclick="filterToolCategory('Finance')" class="tool-cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Finance</button>
                <button onclick="filterToolCategory('Utilities')" class="tool-cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Utilities</button>
                <button onclick="filterToolCategory('Health')" class="tool-cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Health</button>
                <button onclick="filterToolCategory('Developer & Text')" class="tool-cat-btn px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Text & Dev</button>
            </div>

            <!-- Tools Grid -->
            <div id="tools-grid-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                ${TOOLS.map(tool => renderToolCard(tool)).join('')}
            </div>
        </div>
    `;
}

function filterToolsList() {
    const query = document.getElementById('tool-search').value.toLowerCase();
    const cards = document.querySelectorAll('#tools-grid-container > div');
    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
    });
}

function filterToolCategory(cat) {
    const cards = document.querySelectorAll('#tools-grid-container > div');
    cards.forEach(card => {
        if (cat === 'all') {
            card.style.display = 'block';
        } else {
            const matches = card.innerText.includes(cat);
            card.style.display = matches ? 'block' : 'none';
        }
    });
}
