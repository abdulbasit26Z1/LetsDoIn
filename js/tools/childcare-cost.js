/* UK CHILDCARE COST & FREE HOURS CALCULATOR */

const TOOL_CHILDCARE_COST = {
    id: 'childcare-cost',
    name: 'UK Childcare Cost & Free Hours Calculator',
    category: 'Finance',
    icon: 'fa-child-reaching',
    color: 'from-purple-600 via-pink-600 to-slate-900',
    shortDesc: 'Calculate government funding savings for UK childcare including 15 & 30 free hours scheme for 9-month to 4-year-olds and Tax-Free Childcare (£2,000/yr bonus).',
    seoDesc: 'Free UK childcare cost calculator 2026. Calculate 30 free hours funding savings and Tax-Free Childcare £2,000 annual top-up.'
};

function renderChildcareTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-child-reaching"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Childcare Cost &amp; Free Hours Calculator</h2>
                        <p class="text-xs text-slate-500">Calculate 15 &amp; 30 free hours funding savings + £2,000 Tax-Free Childcare top-up.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Monthly Nursery Bill Before Funding (£)</label>
                            <input type="number" id="cc-bill" value="1100" oninput="calculateChildcareSavings()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Entitlement Scheme</label>
                            <select id="cc-scheme" onchange="calculateChildcareSavings()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="30" selected>30 Free Hours (Working Parents - 38 Term Weeks)</option>
                                <option value="15">15 Free Hours (Universal / Under 2s)</option>
                            </select>
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-pink-400 font-bold uppercase tracking-wider block">Net Monthly Nursery Bill After Funding</span>
                            <span class="text-3xl font-black text-emerald-400 mt-1 block" id="cc-net-bill">£420 / mo</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="cc-annual-savings">Annual Savings: £8,160 / yr</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Tax-Free Childcare Government Top-Up:</span>
                                <span class="font-bold text-indigo-300" id="cc-tfc-topup">£166 / mo (£2,000 / yr max)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateChildcareSavings() {
    const grossBill = parseFloat(document.getElementById('cc-bill')?.value) || 0;
    const hoursScheme = document.getElementById('cc-scheme')?.value || '30';

    const hourlyNurseryRate = 7.50;
    const freeHoursPerWeek = hoursScheme === '30' ? 30 : 15;
    const termWeeks = 38;

    const annualFreeHoursSubsidy = freeHoursPerWeek * hourlyNurseryRate * termWeeks;
    const monthlySubsidy = annualFreeHoursSubsidy / 12;

    const billAfterHours = Math.max(0, grossBill - monthlySubsidy);

    // Tax-Free childcare gives £2 for every £8 paid (20% top up up to £2,000/yr)
    const tfcMonthlyTopUp = Math.min(166.66, billAfterHours * 0.20);
    const finalNetBill = Math.max(0, billAfterHours - tfcMonthlyTopUp);

    const annualTotalSavings = (monthlySubsidy + tfcMonthlyTopUp) * 12;

    const nElem = document.getElementById('cc-net-bill');
    const aElem = document.getElementById('cc-annual-savings');
    const tElem = document.getElementById('cc-tfc-topup');

    if (nElem) nElem.innerText = `£${Math.round(finalNetBill)} / mo`;
    if (aElem) aElem.innerText = `Annual Govt Funding: £${Math.round(annualTotalSavings).toLocaleString('en-GB')} / yr`;
    if (tElem) tElem.innerText = `+£${Math.round(tfcMonthlyTopUp)} / mo (£2,000 / yr max)`;
}

setTimeout(calculateChildcareSavings, 100);
