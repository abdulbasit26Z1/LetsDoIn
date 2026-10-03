/* UK BROADBAND & MOBILE CONTRACT INFLATION ESTIMATOR */

const TOOL_BROADBAND_PRICE_HIKE = {
    id: 'broadband-price-hike',
    name: 'UK Broadband & Mobile Contract Inflation Estimator',
    category: 'Utilities',
    icon: 'fa-arrow-trend-up',
    color: 'from-purple-600 via-pink-600 to-slate-900',
    shortDesc: 'Calculate mid-contract price rises for UK broadband and mobile deals based on CPI inflation + 3.9% annual increases.',
    seoDesc: 'Free UK broadband mid-contract price rise calculator 2026. Calculate BT, Virgin Media, EE, Sky CPI inflation price hikes.'
};

function renderBroadbandPriceHikeTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-arrow-trend-up"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Broadband &amp; Mobile Contract Price Rise Calculator</h2>
                        <p class="text-xs text-slate-500">Calculate April mid-contract price increases for BT, EE, Sky, Virgin Media, and O2.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Current Monthly Bill (£)</label>
                            <input type="number" id="bh-bill" value="35.00" step="0.5" oninput="calculatePriceHike()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Contract Provider Hike Formula</label>
                            <select id="bh-provider" onchange="calculatePriceHike()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="cpi39" selected>Standard CPI + 3.9% (Approx 6.9% Total Rise)</option>
                                <option value="flat3">Flat £3.00 / month increase</option>
                                <option value="flat4">Flat £4.00 / month increase</option>
                            </select>
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-pink-400 font-bold uppercase tracking-wider block">New Monthly Price After April Hike</span>
                            <span class="text-3xl font-black text-white mt-1 block" id="bh-new-bill">£37.42 / mo</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="bh-extra-annual">Extra Cost: +£29.04 per year</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Monthly Increase:</span>
                                <span class="font-bold text-red-400" id="bh-monthly-increase">+£2.42 / mo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculatePriceHike() {
    const bill = parseFloat(document.getElementById('bh-bill')?.value) || 0;
    const formula = document.getElementById('bh-provider')?.value || 'cpi39';

    let increase = 0;
    if (formula === 'cpi39') {
        increase = bill * 0.069; // 6.9%
    } else if (formula === 'flat3') {
        increase = 3.00;
    } else if (formula === 'flat4') {
        increase = 4.00;
    }

    const newBill = bill + increase;
    const annualExtra = increase * 12;

    const nElem = document.getElementById('bh-new-bill');
    const aElem = document.getElementById('bh-extra-annual');
    const mElem = document.getElementById('bh-monthly-increase');

    if (nElem) nElem.innerText = `£${newBill.toFixed(2)} / mo`;
    if (aElem) aElem.innerText = `Extra Cost: +£${annualExtra.toFixed(2)} per year`;
    if (mElem) mElem.innerText = `+£${increase.toFixed(2)} / mo`;
}

setTimeout(calculatePriceHike, 100);
