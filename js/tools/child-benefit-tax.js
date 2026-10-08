const TOOL_CHILD_BENEFIT_TAX = {
    id: 'child-benefit-tax',
    name: 'UK High Income Child Benefit Charge (HICBC) Calculator 2026',
    category: 'Finance',
    icon: 'fa-children',
    color: 'from-pink-600 to-rose-600',
    shortDesc: 'Calculate High Income Child Benefit Charge (HICBC) tax clawback for individual incomes between £60,000 and £80,000.',
    seoDesc: 'Calculate HMRC High Income Child Benefit Charge (HICBC) tax repayment rates for incomes between £60,000 and £80,000.',
    render: () => `
        <div class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Highest Earner Net Adjusted Income (£)</label>
                    <input type="number" id="hicbc-income" value="68000" step="1000" oninput="calcHICBC()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold outline-none focus:ring-2 focus:ring-rose-500">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Number of Children</label>
                    <input type="number" id="hicbc-children" value="2" min="1" max="10" oninput="calcHICBC()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold outline-none focus:ring-2 focus:ring-rose-500">
                </div>
            </div>

            <div id="hicbc-result" class="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 space-y-3">
                <!-- Result -->
            </div>
        </div>
    `
};

function calcHICBC() {
    const income = parseFloat(document.getElementById('hicbc-income')?.value) || 0;
    const children = parseInt(document.getElementById('hicbc-children')?.value) || 1;

    // Child Benefit 2026 rates: ~£25.60/wk eldest, ~£16.95/wk additional children
    const eldestWeekly = 25.60;
    const addWeekly = 16.95;
    const totalWeekly = eldestWeekly + Math.max(0, children - 1) * addWeekly;
    const annualBenefit = totalWeekly * 52;

    let clawbackPct = 0;
    if (income > 80000) {
        clawbackPct = 100;
    } else if (income > 60000) {
        clawbackPct = ((income - 60000) / 20000) * 100;
    }

    const taxCharge = (annualBenefit * clawbackPct) / 100;
    const netBenefit = annualBenefit - taxCharge;

    const elem = document.getElementById('hicbc-result');
    if (elem) {
        elem.innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-slate-800">
                    <span class="block text-[10px] uppercase font-bold text-slate-500">Annual Child Benefit</span>
                    <span class="text-xl font-extrabold text-pink-600">£${annualBenefit.toFixed(2)}</span>
                </div>
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-slate-800">
                    <span class="block text-[10px] uppercase font-bold text-slate-500">HICBC Tax Clawback (${clawbackPct.toFixed(0)}%)</span>
                    <span class="text-xl font-extrabold text-red-600">£${taxCharge.toFixed(2)}</span>
                </div>
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-slate-800">
                    <span class="block text-[10px] uppercase font-bold text-slate-500">Net Retained Benefit</span>
                    <span class="text-xl font-extrabold text-emerald-600">£${netBenefit.toFixed(2)}</span>
                </div>
            </div>
        `;
    }
}

setTimeout(calcHICBC, 200);
