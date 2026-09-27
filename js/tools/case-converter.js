function convertCase(type) {
    const input = document.getElementById('case-input');
    if (type === 'upper') input.value = input.value.toUpperCase();
    if (type === 'lower') input.value = input.value.toLowerCase();
    if (type === 'title') {
        input.value = input.value.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {
            return match.toUpperCase();
        });
    }
    if (type === 'kebab') input.value = input.value.toLowerCase().replace(/\s+/g, '-');
}

const TOOL_CASE_CONVERTER = {
    id: 'case-converter',
    name: 'Text Case Converter',
    category: 'Developer & Text',
    icon: 'fa-font-case',
    color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/50',
    shortDesc: 'Convert text to UPPERCASE, lowercase, Title Case, camelCase, and kebab-case.',
    seoDesc: 'Free online text case converter tool. Instantly transform text formatting.',
    render: () => `
        <div class="space-y-4">
            <textarea id="case-input" rows="4" placeholder="Enter text to convert..." class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none"></textarea>
            <div class="flex flex-wrap gap-2">
                <button onclick="convertCase('upper')" class="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-xs font-bold rounded-lg">UPPERCASE</button>
                <button onclick="convertCase('lower')" class="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-xs font-bold rounded-lg">lowercase</button>
                <button onclick="convertCase('title')" class="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-xs font-bold rounded-lg">Title Case</button>
                <button onclick="convertCase('kebab')" class="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-xs font-bold rounded-lg">kebab-case</button>
            </div>
        </div>
    `,
    init: () => {}
};
