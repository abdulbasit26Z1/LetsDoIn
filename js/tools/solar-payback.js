/* UK SOLAR PANEL ROI & BATTERY SAVER */

const TOOL_SOLAR_PAYBACK = {
    id: 'solar-payback',
    name: 'UK Solar Panel ROI & Battery Saver',
    category: 'Utilities',
    icon: 'fa-solar-panel',
    color: 'from-amber-500 via-orange-600 to-slate-900',
    shortDesc: 'Calculate payback years and annual savings for UK solar PV installations with Smart Export Guarantee (SEG) and battery storage.',
    seoDesc: 'Free UK solar panel ROI calculator 2026. Estimate solar payback period, battery storage savings, and SEG tariff income.'
};

function renderSolarPaybackTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-solar-panel"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Solar Panel ROI &amp; Battery Saver</h2>
                        <p class="text-xs text-slate-500">Calculate annual energy savings, Smart Export Guarantee (SEG) income, and system payback.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Solar Array Size (kWp)</label>
                            <input type="number" id="solar-kwp" value="4.0" step="0.5" oninput="calculateSolarPayback()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Total System Install Cost (£)</label>
                            <input type="number" id="solar-cost" value="6500" oninput="calculateSolarPayback()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Electricity Rate &amp; SEG Export (p/kWh)</label>
                            <div class="grid grid-cols-2 gap-2">
                                <input type="number" id="solar-grid-rate" value="24.5" step="0.1" oninput="calculateSolarPayback()" placeholder="Grid Tariff" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                                <input type="number" id="solar-seg-rate" value="15.0" step="0.1" oninput="calculateSolarPayback()" placeholder="SEG Export" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                            </div>
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-amber-400 font-bold uppercase tracking-wider block">Estimated Payback Period</span>
                            <span class="text-3xl font-black text-amber-400 mt-1 block" id="solar-payback-years">6.8 Years</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="solar-annual-total">Annual Total Benefit: £956 / yr</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Direct Bill Savings:</span>
                                <span class="font-bold text-emerald-400" id="solar-bill-savings">£735 / yr</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-400">SEG Export Income:</span>
                                <span class="font-bold text-blue-400" id="solar-seg-income">£221 / yr</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateSolarPayback() {
    const kwp = parseFloat(document.getElementById('solar-kwp')?.value) || 4.0;
    const cost = parseFloat(document.getElementById('solar-cost')?.value) || 6500;
    const gridRate = parseFloat(document.getElementById('solar-grid-rate')?.value) || 24.5;
    const segRate = parseFloat(document.getElementById('solar-seg-rate')?.value) || 15.0;

    const annualGenerationKwh = kwp * 850; // UK average 850 kWh per kWp
    const selfConsumpPct = 0.50; // 50% self consumption without battery

    const selfUsedKwh = annualGenerationKwh * selfConsumpPct;
    const exportedKwh = annualGenerationKwh * (1 - selfConsumpPct);

    const billSavingsPounds = (selfUsedKwh * gridRate) / 100;
    const segIncomePounds = (exportedKwh * segRate) / 100;
    const totalAnnualBenefit = billSavingsPounds + segIncomePounds;

    const paybackYears = totalAnnualBenefit > 0 ? (cost / totalAnnualBenefit).toFixed(1) : 'N/A';

    const pElem = document.getElementById('solar-payback-years');
    const aElem = document.getElementById('solar-annual-total');
    const bElem = document.getElementById('solar-bill-savings');
    const sElem = document.getElementById('solar-seg-income');

    if (pElem) pElem.innerText = `${paybackYears} Years`;
    if (aElem) aElem.innerText = `Annual Total Benefit: £${Math.round(totalAnnualBenefit).toLocaleString('en-GB')} / yr`;
    if (bElem) bElem.innerText = `£${Math.round(billSavingsPounds).toLocaleString('en-GB')} / yr`;
    if (sElem) sElem.innerText = `£${Math.round(segIncomePounds).toLocaleString('en-GB')} / yr`;
}

setTimeout(calculateSolarPayback, 100);
