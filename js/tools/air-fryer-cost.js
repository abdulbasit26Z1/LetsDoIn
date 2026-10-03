/* UK AIR FRYER VS OVEN ENERGY COST SAVER */

const TOOL_AIR_FRYER_COST = {
    id: 'air-fryer-cost',
    name: 'UK Air Fryer vs Oven Energy Cost Saver',
    category: 'Utilities',
    icon: 'fa-kitchen-set',
    color: 'from-orange-500 via-amber-600 to-slate-900',
    shortDesc: 'Calculate exact cooking energy costs in pence and annual savings when using an air fryer instead of a conventional electric oven.',
    seoDesc: 'Free UK Air Fryer vs Oven energy cost calculator. Calculate pence per meal savings using Ninja air fryers vs 2000W electric ovens.'
};

function renderAirFryerTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-600 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-kitchen-set"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Air Fryer vs Oven Energy Cost Saver</h2>
                        <p class="text-xs text-slate-500">Calculate electricity cost per meal and annual savings for air fryers vs conventional ovens.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Air Fryer Power (Watts) &amp; Time (Mins)</label>
                            <div class="grid grid-cols-2 gap-2">
                                <input type="number" id="af-power" value="1500" oninput="calculateAirFryerCost()" placeholder="1500W" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                                <input type="number" id="af-mins" value="25" oninput="calculateAirFryerCost()" placeholder="25 Mins" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Electric Oven Power (Watts) &amp; Time (Mins)</label>
                            <div class="grid grid-cols-2 gap-2">
                                <input type="number" id="oven-power" value="2100" oninput="calculateAirFryerCost()" placeholder="2100W" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                                <input type="number" id="oven-mins" value="45" oninput="calculateAirFryerCost()" placeholder="45 Mins" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Electricity Tariff Rate (p/kWh)</label>
                            <input type="number" id="af-tariff" value="24.5" step="0.1" oninput="calculateAirFryerCost()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-orange-400 font-bold uppercase tracking-wider block">Cost Per Meal Comparison</span>
                            <span class="text-3xl font-black text-amber-400 mt-1 block" id="af-meal-savings">Save 23p / Meal</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="af-per-meal-detail">Air Fryer: 15p vs Oven: 38p</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Annual Savings (1 meal/day):</span>
                                <span class="font-bold text-emerald-400" id="af-annual-savings">£83.95 / yr</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateAirFryerCost() {
    const afWatts = parseFloat(document.getElementById('af-power')?.value) || 1500;
    const afMins = parseFloat(document.getElementById('af-mins')?.value) || 25;
    const ovenWatts = parseFloat(document.getElementById('oven-power')?.value) || 2100;
    const ovenMins = parseFloat(document.getElementById('oven-mins')?.value) || 45;
    const tariff = parseFloat(document.getElementById('af-tariff')?.value) || 24.5;

    const afKwh = (afWatts * (afMins / 60)) / 1000;
    const afCostPence = afKwh * tariff;

    const ovenKwh = (ovenWatts * (ovenMins / 60)) / 1000;
    const ovenCostPence = ovenKwh * tariff;

    const savingsPence = ovenCostPence - afCostPence;
    const annualSavingsPounds = (savingsPence * 365) / 100;

    const msElem = document.getElementById('af-meal-savings');
    const dElem = document.getElementById('af-per-meal-detail');
    const aElem = document.getElementById('af-annual-savings');

    if (msElem) msElem.innerText = `Save ${Math.round(savingsPence)}p / Meal`;
    if (dElem) dElem.innerText = `Air Fryer: ${Math.round(afCostPence)}p vs Oven: ${Math.round(ovenCostPence)}p`;
    if (aElem) aElem.innerText = `£${annualSavingsPounds.toFixed(2)} / yr`;
}

setTimeout(calculateAirFryerCost, 100);
