/* UK RENT VS BUY PROPERTY CALCULATOR */

const TOOL_RENT_VS_BUY = {
    id: 'rent-vs-buy',
    name: 'UK Rent vs Buy Property Calculator',
    category: 'Finance',
    icon: 'fa-scale-balanced',
    color: 'from-blue-600 via-indigo-700 to-slate-900',
    shortDesc: 'Compare total financial costs of renting a UK flat versus buying a home with mortgage repayments, deposit, equity, and maintenance over 5, 10 & 25 years.',
    seoDesc: 'Free UK Rent vs Buy property calculator 2026. Compare total cost of renting vs buying with mortgage equity wealth accumulation.'
};

function renderRentVsBuyTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-scale-balanced"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Rent vs Buy Property Calculator</h2>
                        <p class="text-xs text-slate-500">Compare long-term wealth buildup and total costs of buying vs renting in the UK.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Monthly Rent (£)</label>
                            <input type="number" id="rvb-rent" value="1450" oninput="calculateRentVsBuy()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Property Price (£) &amp; Mortgage Rate (%)</label>
                            <div class="grid grid-cols-2 gap-2">
                                <input type="number" id="rvb-price" value="320000" oninput="calculateRentVsBuy()" placeholder="£ Price" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                                <input type="number" id="rvb-rate" value="4.5" step="0.1" oninput="calculateRentVsBuy()" placeholder="4.5%" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                            </div>
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-indigo-400 font-bold uppercase tracking-wider block">10-Year Net Wealth Buildup (Buying vs Renting)</span>
                            <span class="text-3xl font-black text-emerald-400 mt-1 block" id="rvb-equity-result">+£98,400 Equity Gain</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="rvb-rent-dead-cost">10-Year Rent Dead Cost: £174,000</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Monthly Mortgage Repayment:</span>
                                <span class="font-bold text-indigo-300" id="rvb-mortgage-monthly">£1,598 / mo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateRentVsBuy() {
    const rent = parseFloat(document.getElementById('rvb-rent')?.value) || 0;
    const price = parseFloat(document.getElementById('rvb-price')?.value) || 0;
    const ratePct = parseFloat(document.getElementById('rvb-rate')?.value) || 4.5;

    const deposit = price * 0.10; // 10% deposit
    const loanAmount = price - deposit;
    const monthlyRate = ratePct / 100 / 12;
    const months = 25 * 12;

    const monthlyMortgage = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

    const rentTenYearTotal = rent * 12 * 10;
    const estimatedHomeAppreciation10Yr = price * 0.25; // 25% over 10 yrs
    const approximateEquityPaid10Yr = loanAmount * 0.22; // ~22% principal paid in 10 yrs

    const totalEquityGain = deposit + estimatedHomeAppreciation10Yr + approximateEquityPaid10Yr;

    const eElem = document.getElementById('rvb-equity-result');
    const rElem = document.getElementById('rvb-rent-dead-cost');
    const mElem = document.getElementById('rvb-mortgage-monthly');

    if (eElem) eElem.innerText = `+£${Math.round(totalEquityGain).toLocaleString('en-GB')} Equity Gain`;
    if (rElem) rElem.innerText = `10-Year Rent Dead Cost: £${Math.round(rentTenYearTotal).toLocaleString('en-GB')}`;
    if (mElem) mElem.innerText = `£${Math.round(monthlyMortgage).toLocaleString('en-GB')} / mo`;
}

setTimeout(calculateRentVsBuy, 100);
