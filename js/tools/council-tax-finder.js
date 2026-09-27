function calcCouncilTax() {
    const val = parseFloat(document.getElementById('ct-val').value) || 0;
    let band = 'Band A';
    if (val > 40000) band = 'Band B';
    if (val > 52000) band = 'Band C';
    if (val > 68000) band = 'Band D';
    if (val > 88000) band = 'Band E';
    document.getElementById('ct-res-band').innerText = band;
}

const TOOL_COUNCIL_TAX_FINDER = {
    id: 'council-tax-finder',
    name: 'UK Council Tax Band Estimator',
    category: 'Finance',
    icon: 'fa-building-columns',
    color: 'text-slate-600 bg-slate-100 dark:bg-slate-800',
    shortDesc: 'Estimate UK municipal Council Tax band categories A through H.',
    seoDesc: 'UK Council tax band valuation estimator and local authority charge bands.',
    render: () => `
        <div class="space-y-4">
            <div>
                <label class="block text-xs font-bold uppercase mb-1">Estimated 1991 Property Value (£)</label>
                <input type="number" id="ct-val" value="75000" oninput="calcCouncilTax()" class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
            </div>
            <div class="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <span class="text-xs text-slate-500 uppercase font-bold">Estimated Tax Band</span>
                <div id="ct-res-band" class="text-2xl font-extrabold text-indigo-600 mt-1">Band C</div>
            </div>
        </div>
    `,
    init: () => calcCouncilTax()
};
