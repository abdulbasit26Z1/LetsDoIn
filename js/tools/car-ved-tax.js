/* UK CAR TAX (VED) BAND FINDER */

const TOOL_CAR_VED_TAX = {
    id: 'car-ved-tax',
    name: 'UK Car Tax (VED) Band Finder',
    category: 'Utilities',
    icon: 'fa-car-side',
    color: 'from-blue-700 via-indigo-700 to-slate-900',
    shortDesc: 'Find UK Vehicle Excise Duty (VED) car road tax bands, first-year CO2 rates, standard £190 annual rate, and £40,000 expensive car supplement.',
    seoDesc: 'Free UK Car Tax (VED) road tax calculator 2026. Calculate VED rates, CO2 emissions bands, and luxury car surcharge.'
};

function renderCarVedTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-700 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-car-side"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Car Tax (VED) Band Finder</h2>
                        <p class="text-xs text-slate-500">Calculate annual Vehicle Excise Duty (VED) road tax based on CO2 emissions and list price.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Fuel / Engine Type</label>
                            <select id="ved-fuel" onchange="calculateVedTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="petrol" selected>Petrol / Diesel</option>
                                <option value="ev">Electric Vehicle (EV)</option>
                                <option value="hybrid">Alternative Fuel / Hybrid</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Original Vehicle List Price (£)</label>
                            <input type="number" id="ved-list-price" value="32000" oninput="calculateVedTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-indigo-400 font-bold uppercase tracking-wider block">Standard Annual VED Road Tax</span>
                            <span class="text-3xl font-black text-white mt-1 block" id="ved-annual-result">£190 / yr</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="ved-luxury-note">List Price Under £40,000 (No Luxury Surcharge)</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Expensive Car Supplement (>£40k):</span>
                                <span class="font-bold text-amber-400" id="ved-supplement-display">£0 / yr</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateVedTax() {
    const fuel = document.getElementById('ved-fuel')?.value || 'petrol';
    const price = parseFloat(document.getElementById('ved-list-price')?.value) || 0;

    let baseRate = 190;
    if (fuel === 'ev') baseRate = 10; // EV standard rate from 2025/26
    else if (fuel === 'hybrid') baseRate = 180;

    let supplement = 0;
    if (price > 40000) {
        supplement = 410; // £410 expensive car supplement for years 2-6
    }

    const totalVed = baseRate + supplement;

    const aElem = document.getElementById('ved-annual-result');
    const lElem = document.getElementById('ved-luxury-note');
    const sElem = document.getElementById('ved-supplement-display');

    if (aElem) aElem.innerText = `£${totalVed} / yr`;
    if (lElem) {
        if (price > 40000) {
            lElem.innerText = `Includes £410 Luxury Car Surcharge (Price > £40k)`;
            lElem.className = 'text-xs text-amber-400 font-bold mt-1 block';
        } else {
            lElem.innerText = `List Price Under £40,000 (Standard VED Rate)`;
            lElem.className = 'text-xs text-slate-400 mt-1 block';
        }
    }
    if (sElem) sElem.innerText = `£${supplement} / yr`;
}

setTimeout(calculateVedTax, 100);
