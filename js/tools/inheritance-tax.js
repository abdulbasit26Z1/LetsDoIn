/* UK INHERITANCE TAX (IHT) PLANNER */

const TOOL_INHERITANCE_TAX = {
    id: 'inheritance-tax',
    name: 'UK Inheritance Tax (IHT) Planner',
    category: 'Finance',
    icon: 'fa-landmark',
    color: 'from-amber-600 via-yellow-700 to-slate-900',
    shortDesc: 'Estimate UK Inheritance Tax liability on estates, nil-rate bands (£325k), residence nil-rate bands (£175k), and spouse transfers.',
    seoDesc: 'Free UK Inheritance Tax (IHT) calculator 2026. Calculate 40% IHT rate, £325,000 threshold, and main residence allowance.'
};

function renderInheritanceTaxTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-700 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-landmark"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Inheritance Tax (IHT) Planner</h2>
                        <p class="text-xs text-slate-500">Calculate 40% IHT tax liability and exemptions on estate assets.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Total Net Estate Value (£)</label>
                            <input type="number" id="iht-estate" value="650000" oninput="calculateIhtTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div class="space-y-2">
                            <label class="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                <input type="checkbox" id="iht-home" checked onchange="calculateIhtTax()" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500">
                                <span>Leaving main home to direct descendants (+£175k allowance)</span>
                            </label>

                            <label class="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                <input type="checkbox" id="iht-spouse" onchange="calculateIhtTax()" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500">
                                <span>Transferred unused spouse allowance (Double £500k to £1m)</span>
                            </label>
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-amber-400 font-bold uppercase tracking-wider block">Estimated IHT Bill (40%)</span>
                            <span class="text-3xl font-black text-white mt-1 block" id="iht-result-tax">£60,000</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="iht-result-allowance">Total Tax-Free Allowance: £500,000</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Taxable Estate Value:</span>
                                <span class="font-bold text-amber-400" id="iht-taxable-display">£150,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateIhtTax() {
    const estate = parseFloat(document.getElementById('iht-estate')?.value) || 0;
    const leaveHome = document.getElementById('iht-home')?.checked || false;
    const spouse = document.getElementById('iht-spouse')?.checked || false;

    let allowance = 325000;
    if (leaveHome) allowance += 175000;
    if (spouse) allowance *= 2;

    const taxable = Math.max(0, estate - allowance);
    const tax = taxable * 0.40;

    const tElem = document.getElementById('iht-result-tax');
    const aElem = document.getElementById('iht-result-allowance');
    const tbElem = document.getElementById('iht-taxable-display');

    if (tElem) tElem.innerText = `£${Math.round(tax).toLocaleString('en-GB')}`;
    if (aElem) aElem.innerText = `Total Tax-Free Allowance: £${allowance.toLocaleString('en-GB')}`;
    if (tbElem) tbElem.innerText = `£${Math.round(taxable).toLocaleString('en-GB')}`;
}

setTimeout(calculateIhtTax, 100);
