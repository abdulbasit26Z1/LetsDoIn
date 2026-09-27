function formatJSON() {
    const inp = document.getElementById('json-input');
    try {
        inp.value = JSON.stringify(JSON.parse(inp.value), null, 2);
    } catch(e) {
        showToast('Invalid JSON syntax!');
    }
}

function minifyJSON() {
    const inp = document.getElementById('json-input');
    try {
        inp.value = JSON.stringify(JSON.parse(inp.value));
    } catch(e) {
        showToast('Invalid JSON syntax!');
    }
}

const TOOL_JSON_FORMATTER = {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    category: 'Developer & Text',
    icon: 'fa-code',
    color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50',
    shortDesc: 'Validate and format raw JSON code with syntax checking and clean indentation.',
    seoDesc: 'Free online JSON formatter, validator, and minifier tool for web developers.',
    render: () => `
        <div class="space-y-3">
            <textarea id="json-input" rows="6" placeholder='{"name": "LetsDoIn UK", "active": true}' class="w-full p-3 font-mono text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none"></textarea>
            <div class="flex space-x-2">
                <button onclick="formatJSON()" class="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg">Prettify JSON</button>
                <button onclick="minifyJSON()" class="px-4 py-2 bg-slate-700 text-white font-bold text-xs rounded-lg">Minify</button>
            </div>
        </div>
    `,
    init: () => {}
};
