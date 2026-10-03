/* UK MATERNITY & PATERNITY PAY CALCULATOR */

const TOOL_MATERNITY_PAY = {
    id: 'maternity-pay',
    name: 'UK Maternity & Paternity Pay Calculator',
    category: 'Finance',
    icon: 'fa-baby',
    color: 'from-pink-600 via-purple-600 to-slate-900',
    shortDesc: 'Calculate UK Statutory Maternity Pay (SMP) for 39 weeks (90% average weekly earnings for first 6 weeks + £184.03 standard rate).',
    seoDesc: 'Free UK Statutory Maternity Pay (SMP) calculator 2026. Calculate 39 weeks SMP pay rates and average weekly earnings.'
};

function renderMaternityPayTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-purple-600 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-baby"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Maternity &amp; Paternity Pay Calculator</h2>
                        <p class="text-xs text-slate-500">Calculate 39-week Statutory Maternity Pay (SMP) and Paternity entitlement.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Average Weekly Earnings Before Tax (£)</label>
                            <input type="number" id="smp-weekly" value="650" oninput="calculateSmpPay()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-pink-400 font-bold uppercase tracking-wider block">Total Estimated 39-Week SMP Pay</span>
                            <span class="text-3xl font-black text-white mt-1 block" id="smp-total-result">£9,582.99</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="smp-first6-rate">First 6 Weeks: £585.00 / week (90%)</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Next 33 Weeks Standard Rate:</span>
                                <span class="font-bold text-emerald-400" id="smp-next33-rate">£184.03 / week</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateSmpPay() {
    const weeklyEarnings = parseFloat(document.getElementById('smp-weekly')?.value) || 0;

    const first6WeeksRate = weeklyEarnings * 0.90;
    const first6WeeksTotal = first6WeeksRate * 6;

    const standardRate = 184.03;
    const next33WeeksRate = Math.min(first6WeeksRate, standardRate);
    const next33WeeksTotal = next33WeeksRate * 33;

    const totalSmp = first6WeeksTotal + next33WeeksTotal;

    const tElem = document.getElementById('smp-total-result');
    const fElem = document.getElementById('smp-first6-rate');
    const nElem = document.getElementById('smp-next33-rate');

    if (tElem) tElem.innerText = `£${totalSmp.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (fElem) fElem.innerText = `First 6 Weeks: £${first6WeeksRate.toFixed(2)} / week (90%)`;
    if (nElem) nElem.innerText = `Next 33 Weeks: £${next33WeeksRate.toFixed(2)} / week`;
}

setTimeout(calculateSmpPay, 100);
