const TOOL_UNIVERSAL_CREDIT = {
    id: 'universal-credit-calc',
    name: 'UK Universal Credit Allowance & Taper Rate Estimator',
    category: 'Finance',
    icon: 'fa-hand-holding-hand',
    color: 'from-amber-600 to-orange-600',
    shortDesc: 'Calculate estimated UK Universal Credit monthly entitlement after work allowance (£404/£673) and 55% earnings taper rate.',
    seoDesc: 'Calculate DWP Universal Credit monthly payment entitlement including standard allowance, child elements, and 55% earnings taper reduction.',
    render: () => `
        <div class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Circumstance</label>
                    <select id="uc-status" onchange="calcUC()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold outline-none focus:ring-2 focus:ring-amber-500">
                        <option value="single_25">Single (25 or over) - £393.45</option>
                        <option value="single_under25">Single (under 25) - £311.68</option>
                        <option value="couple_25">Couple (25 or over) - £617.60</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Monthly Net Take-Home Earnings (£)</label>
                    <input type="number" id="uc-earnings" value="1200" oninput="calcUC()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold outline-none focus:ring-2 focus:ring-amber-500">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Work Allowance</label>
                    <select id="uc-allowance" onchange="calcUC()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold outline-none focus:ring-2 focus:ring-amber-500">
                        <option value="404">Higher (£404/mo - with housing)</option>
                        <option value="673">Lower (£673/mo - no housing)</option>
                        <option value="0">No Work Allowance (£0)</option>
                    </select>
                </div>
            </div>

            <div id="uc-result" class="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-3">
                <!-- Result -->
            </div>
        </div>
    `
};

function calcUC() {
    const status = document.getElementById('uc-status')?.value || 'single_25';
    const earnings = parseFloat(document.getElementById('uc-earnings')?.value) || 0;
    const allowance = parseFloat(document.getElementById('uc-allowance')?.value) || 0;

    let base = 393.45;
    if (status === 'single_under25') base = 311.68;
    if (status === 'couple_25') base = 617.60;

    const netTaperEarnings = Math.max(0, earnings - allowance);
    const taperDeduction = netTaperEarnings * 0.55;
    const finalUC = Math.max(0, base - taperDeduction);

    const elem = document.getElementById('uc-result');
    if (elem) {
        elem.innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-800">
                    <span class="block text-[10px] uppercase font-bold text-slate-500">Standard Allowance</span>
                    <span class="text-xl font-extrabold text-amber-600">£${base.toFixed(2)}</span>
                </div>
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-800">
                    <span class="block text-[10px] uppercase font-bold text-slate-500">55% Taper Reduction</span>
                    <span class="text-xl font-extrabold text-red-600">-£${taperDeduction.toFixed(2)}</span>
                </div>
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-800">
                    <span class="block text-[10px] uppercase font-bold text-slate-500">Est. Monthly Universal Credit</span>
                    <span class="text-xl font-extrabold text-emerald-600">£${finalUC.toFixed(2)}</span>
                </div>
            </div>
        `;
    }
}

setTimeout(calcUC, 200);
