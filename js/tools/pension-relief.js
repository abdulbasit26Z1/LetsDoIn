/* UK PENSION TAX RELIEF & SALARY SACRIFICE CALCULATOR */

const TOOL_PENSION_RELIEF = {
    id: 'pension-relief',
    name: 'UK Pension Tax Relief & Salary Sacrifice Calculator',
    category: 'Finance',
    icon: 'fa-piggy-bank',
    color: 'from-blue-700 via-indigo-800 to-slate-900',
    shortDesc: 'Calculate 20%, 40%, and 45% HMRC tax relief on pension contributions and National Insurance savings via salary sacrifice.',
    seoDesc: 'Free UK pension tax relief calculator 2026. Calculate 20% basic and 40% higher rate pension tax relief plus NI savings.'
};

function renderPensionReliefTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-800 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-piggy-bank"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Pension Tax Relief &amp; Salary Sacrifice Calculator</h2>
                        <p class="text-xs text-slate-500">Calculate HMRC 20%/40%/45% tax relief top-ups and NI savings on Workplace &amp; SIPP pensions.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Annual Gross Salary (£)</label>
                            <input type="number" id="pen-salary" value="55000" oninput="calculatePensionRelief()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Monthly Net Pension Contribution (£)</label>
                            <input type="number" id="pen-contrib" value="300" oninput="calculatePensionRelief()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-indigo-400 font-bold uppercase tracking-wider block">Total Added to Pension Pot (Inc. Relief)</span>
                            <span class="text-3xl font-black text-emerald-400 mt-1 block" id="pen-pot-total">£375 / mo</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="pen-annual-tax-saved">Annual HMRC Tax Relief Claimed: £900 / yr</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Basic Rate Top-Up (20%):</span>
                                <span class="font-bold text-emerald-400" id="pen-basic-topup">+£75 / mo</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-400">Higher Rate Self-Assessment Rebate (20%):</span>
                                <span class="font-bold text-blue-400" id="pen-higher-rebate">+£75 / mo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculatePensionRelief() {
    const salary = parseFloat(document.getElementById('pen-salary')?.value) || 0;
    const monthlyNet = parseFloat(document.getElementById('pen-contrib')?.value) || 0;

    const basicTopUpMonthly = monthlyNet * 0.25; // Net £80 -> Gross £100
    const grossMonthlyPot = monthlyNet + basicTopUpMonthly;

    let higherRateRebateMonthly = 0;
    if (salary > 50270) {
        higherRateRebateMonthly = grossMonthlyPot * 0.20;
    }

    const totalAnnualRelief = (basicTopUpMonthly + higherRateRebateMonthly) * 12;

    const pElem = document.getElementById('pen-pot-total');
    const aElem = document.getElementById('pen-annual-tax-saved');
    const bElem = document.getElementById('pen-basic-topup');
    const hElem = document.getElementById('pen-higher-rebate');

    if (pElem) pElem.innerText = `£${Math.round(grossMonthlyPot)} / mo`;
    if (aElem) aElem.innerText = `Annual HMRC Tax Relief: £${Math.round(totalAnnualRelief).toLocaleString('en-GB')} / yr`;
    if (bElem) bElem.innerText = `+£${Math.round(basicTopUpMonthly)} / mo`;
    if (hElem) hElem.innerText = salary > 50270 ? `+£${Math.round(higherRateRebateMonthly)} / mo` : `£0 (Basic Taxpayer)`;
}

setTimeout(calculatePensionRelief, 100);
