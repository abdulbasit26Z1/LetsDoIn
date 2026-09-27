function calcTip() {
    const bill = parseFloat(document.getElementById('tip-bill').value) || 0;
    const pct = parseFloat(document.getElementById('tip-pct').value) || 0;
    const people = parseInt(document.getElementById('tip-people').value) || 1;

    const total = bill * (1 + pct / 100);
    document.getElementById('tip-res-person').innerText = '£' + (total / people).toFixed(2);
}

const TOOL_TIP_SPLITTER = {
    id: 'tip-splitter',
    name: 'Tip & Bill Splitter Utility',
    category: 'Utilities',
    icon: 'fa-calculator',
    color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/50',
    shortDesc: 'Split restaurant bills fairly among friends with custom gratuity percentages.',
    seoDesc: 'Free bill splitter and tip calculator for dining out in the UK.',
    render: () => `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
                <div><label class="block text-xs font-bold uppercase mb-1">Total Bill (£)</label><input type="number" id="tip-bill" value="85.00" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"></div>
                <div><label class="block text-xs font-bold uppercase mb-1">Tip Percentage (%)</label><input type="number" id="tip-pct" value="12.5" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"></div>
                <div><label class="block text-xs font-bold uppercase mb-1">Number of People</label><input type="number" id="tip-people" value="4" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"></div>
                <button onclick="calcTip()" class="w-full py-2.5 bg-violet-600 text-white font-bold rounded-xl">Split Bill</button>
            </div>
            <div class="p-5 bg-violet-50/50 dark:bg-slate-800/80 rounded-2xl border border-violet-100 dark:border-slate-700 flex flex-col justify-center">
                <span class="text-xs text-slate-500 uppercase font-bold">Amount Per Person</span>
                <div id="tip-res-person" class="text-3xl font-extrabold text-violet-600 mt-1">£23.91</div>
            </div>
        </div>
    `,
    init: () => calcTip()
};
