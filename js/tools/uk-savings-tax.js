const TOOL_SAVINGS_TAX = {
    id: 'uk-savings-tax',
    name: 'UK Personal Savings Allowance & Interest Tax Calculator',
    category: 'Finance',
    icon: 'fa-piggy-bank',
    color: 'from-emerald-600 to-teal-600',
    shortDesc: 'Calculate tax due on bank savings interest after UK Personal Savings Allowance (£1,000 basic rate / £500 higher rate).',
    seoDesc: 'Calculate UK tax on bank savings interest across basic rate (£1,000 PSA), higher rate (£500 PSA), and additional rate (£0 PSA) taxpayers based on HMRC tax brackets.',
    render: () => `
        <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Annual Taxable Income (£)</label>
                    <input type="number" id="st-income" value="35000" oninput="calcSavingsTax()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold outline-none focus:ring-2 focus:ring-emerald-500">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Total Annual Bank Interest Earned (£)</label>
                    <input type="number" id="st-interest" value="1200" oninput="calcSavingsTax()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold outline-none focus:ring-2 focus:ring-emerald-500">
                </div>
            </div>

            <div id="st-result" class="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
                <!-- Result injected -->
            </div>
        </div>
    `
};

function calcSavingsTax() {
    const income = parseFloat(document.getElementById('st-income')?.value) || 0;
    const interest = parseFloat(document.getElementById('st-interest')?.value) || 0;

    let taxBand = 'Basic Rate (20%)';
    let psa = 1000;
    let taxRate = 0.20;

    if (income > 125140) {
        taxBand = 'Additional Rate (45%)';
        psa = 0;
        taxRate = 0.45;
    } else if (income > 50270) {
        taxBand = 'Higher Rate (40%)';
        psa = 500;
        taxRate = 0.40;
    }

    const taxableInterest = Math.max(0, interest - psa);
    const taxDue = taxableInterest * taxRate;
    const netInterest = interest - taxDue;

    const elem = document.getElementById('st-result');
    if (elem) {
        elem.innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-slate-800">
                    <span class="block text-[10px] uppercase font-bold text-slate-500">Personal Savings Allowance</span>
                    <span class="text-xl font-extrabold text-emerald-600">£${psa.toLocaleString()}</span>
                </div>
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-slate-800">
                    <span class="block text-[10px] uppercase font-bold text-slate-500">Taxable Interest</span>
                    <span class="text-xl font-extrabold text-slate-800 dark:text-white">£${taxableInterest.toLocaleString('en-GB', {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                </div>
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-slate-800">
                    <span class="block text-[10px] uppercase font-bold text-slate-500">HMRC Tax Due</span>
                    <span class="text-xl font-extrabold text-red-600">£${taxDue.toLocaleString('en-GB', {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                </div>
            </div>
            <div class="text-xs text-slate-600 dark:text-slate-400 font-semibold text-center pt-2">
                Tax Band: <strong class="text-emerald-600">${taxBand}</strong> | Net Keep Interest: <strong class="text-slate-800 dark:text-white">£${netInterest.toLocaleString('en-GB', {minimumFractionDigits:2, maximumFractionDigits:2})}</strong>
            </div>
        `;
    }
}

setTimeout(calcSavingsTax, 200);
