function calcCompoundInterest() {
    const init = parseFloat(document.getElementById('ci-init').value) || 0;
    const monthly = parseFloat(document.getElementById('ci-monthly').value) || 0;
    const rate = parseFloat(document.getElementById('ci-rate').value) / 100 / 12;
    const months = parseInt(document.getElementById('ci-years').value) * 12;

    let total = init;
    for (let i = 0; i < months; i++) {
        total = (total + monthly) * (1 + rate);
    }
    document.getElementById('ci-res-total').innerText = '£' + Math.round(total).toLocaleString();
}

const TOOL_COMPOUND_INTEREST = {
    id: 'compound-interest',
    name: 'Compound Interest & Savings Growth',
    category: 'Finance',
    icon: 'fa-chart-line',
    color: 'text-green-600 bg-green-50 dark:bg-green-950/50',
    shortDesc: 'Project long-term UK savings and investment growth with monthly contributions.',
    seoDesc: 'Compound interest calculator for UK savers and ISA investors. Model investment growth.',
    render: () => `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
                <div><label class="block text-xs font-bold uppercase mb-1">Initial Balance (£)</label><input type="number" id="ci-init" value="5000" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"></div>
                <div><label class="block text-xs font-bold uppercase mb-1">Monthly Deposit (£)</label><input type="number" id="ci-monthly" value="250" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"></div>
                <div><label class="block text-xs font-bold uppercase mb-1">Annual Return (%)</label><input type="number" id="ci-rate" value="6" step="0.5" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"></div>
                <div><label class="block text-xs font-bold uppercase mb-1">Duration (Years)</label><input type="number" id="ci-years" value="10" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"></div>
                <button onclick="calcCompoundInterest()" class="w-full py-2.5 bg-green-600 text-white font-bold rounded-xl">Calculate Future Value</button>
            </div>
            <div class="p-5 bg-green-50/50 dark:bg-slate-800/80 rounded-2xl border border-green-100 dark:border-slate-700 flex flex-col justify-center">
                <span class="text-xs text-slate-500 uppercase font-bold">Estimated Portfolio Value</span>
                <div id="ci-res-total" class="text-3xl font-extrabold text-green-600 mt-1">£48,214</div>
            </div>
        </div>
    `,
    init: () => calcCompoundInterest()
};
