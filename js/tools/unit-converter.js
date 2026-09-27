const TOOL_UNIT_CONVERTER = {
    id: 'unit-converter',
    name: 'Universal Unit Converter',
    category: 'Utilities',
    icon: 'fa-arrow-right-arrow-left',
    color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50',
    shortDesc: 'Convert metric and imperial units for length, mass, and temperature.',
    seoDesc: 'Free online unit converter for length, mass, and temperature conversions.',
    render: () => `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold uppercase mb-1">Miles to Kilometres</label>
                <input type="number" id="uc-miles" value="10" oninput="document.getElementById('uc-km').value = (this.value * 1.60934).toFixed(2)" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
            </div>
            <div>
                <label class="block text-xs font-bold uppercase mb-1">Kilometres</label>
                <input type="number" id="uc-km" value="16.09" readonly class="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold">
            </div>
        </div>
    `,
    init: () => {}
};
