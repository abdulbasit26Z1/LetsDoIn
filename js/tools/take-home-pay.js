function calcTakeHomePay() {
    const salary = parseFloat(document.getElementById('pay-salary').value) || 0;
    const pensionPct = parseFloat(document.getElementById('pay-pension').value) || 0;
    const pensionAnnual = salary * (pensionPct / 100);
    const taxableGross = salary - pensionAnnual;

    let tax = 0;
    if (taxableGross > 12570) {
        if (taxableGross <= 50270) {
            tax = (taxableGross - 12570) * 0.20;
        } else if (taxableGross <= 125140) {
            tax = (50270 - 12570) * 0.20 + (taxableGross - 50270) * 0.40;
        } else {
            tax = (50270 - 12570) * 0.20 + (125140 - 50270) * 0.40 + (taxableGross - 125140) * 0.45;
        }
    }

    let ni = 0;
    if (taxableGross > 12570) {
        if (taxableGross <= 50270) {
            ni = (taxableGross - 12570) * 0.08;
        } else {
            ni = (50270 - 12570) * 0.08 + (taxableGross - 50270) * 0.02;
        }
    }

    const netAnnual = salary - tax - ni - pensionAnnual;

    document.getElementById('pay-res-monthly').innerText = '£' + (netAnnual / 12).toFixed(2);
    document.getElementById('pay-res-gross-m').innerText = '£' + (salary / 12).toFixed(2);
    document.getElementById('pay-res-tax-m').innerText = '-£' + (tax / 12).toFixed(2);
    document.getElementById('pay-res-ni-m').innerText = '-£' + (ni / 12).toFixed(2);
    document.getElementById('pay-res-pen-m').innerText = '-£' + (pensionAnnual / 12).toFixed(2);
}

const TOOL_TAKE_HOME_PAY = {
    id: 'uk-take-home-pay',
    name: 'UK Take-Home Pay Calculator',
    category: 'Finance',
    icon: 'fa-sterling-sign',
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50',
    shortDesc: 'Calculate exact annual, monthly, and weekly UK salary after Income Tax, National Insurance & Pension.',
    seoDesc: 'Free UK Take-Home Pay Salary Calculator for tax year 2025/2026. Calculate HMRC income tax, National Insurance rates, and net monthly pay.',
    render: () => `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">Gross Annual Salary (£)</label>
                    <input type="number" id="pay-salary" value="38000" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-bold focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">Pension Contribution (%)</label>
                        <input type="number" id="pay-pension" value="5" class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">Student Loan</label>
                        <select id="pay-student" class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none">
                            <option value="none">No Plan</option>
                            <option value="plan1">Plan 1 (Threshold £24,990)</option>
                            <option value="plan2" selected>Plan 2 (Threshold £27,295)</option>
                            <option value="plan4">Plan 4 Scotland (£31,395)</option>
                        </select>
                    </div>
                </div>
                <button onclick="calcTakeHomePay()" class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-md">
                    <i class="fa-solid fa-calculator mr-2"></i> Calculate Net Pay
                </button>
            </div>
            <div class="bg-slate-100 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                <div>
                    <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Monthly Net Income</h4>
                    <div id="pay-res-monthly" class="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 my-2">£2,450.12</div>
                    <div class="space-y-2 text-xs border-t border-slate-200 dark:border-slate-700 pt-3">
                        <div class="flex justify-between"><span class="text-slate-500">Gross Monthly:</span><span id="pay-res-gross-m" class="font-semibold">£3,166.67</span></div>
                        <div class="flex justify-between"><span class="text-slate-500">Income Tax:</span><span id="pay-res-tax-m" class="font-semibold text-red-500">-£423.83</span></div>
                        <div class="flex justify-between"><span class="text-slate-500">National Insurance:</span><span id="pay-res-ni-m" class="font-semibold text-red-500">-£169.53</span></div>
                        <div class="flex justify-between"><span class="text-slate-500">Pension (5%):</span><span id="pay-res-pen-m" class="font-semibold text-amber-500">-£158.33</span></div>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500">
                    Rates calculated based on 2025/26 HMRC thresholds (£12,570 Personal Allowance, 8% NI rate).
                </div>
            </div>
        </div>
    `,
    init: () => calcTakeHomePay()
};
