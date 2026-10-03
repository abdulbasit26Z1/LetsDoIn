/* UK TRAIN COMMUTE TICKET VS DRIVE COST ESTIMATOR */

const TOOL_COMMUTE_COST = {
    id: 'commute-cost',
    name: 'UK Train Commute Ticket vs Drive Cost Estimator',
    category: 'Utilities',
    icon: 'fa-train-subway',
    color: 'from-blue-600 via-indigo-600 to-slate-900',
    shortDesc: 'Compare annual UK commute costs for train season tickets vs driving (fuel, parking, congestion charge, and vehicle wear).',
    seoDesc: 'Free UK train commute vs driving cost calculator 2026. Compare National Rail season ticket vs driving fuel and parking.'
};

function renderCommuteCostTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-train-subway"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Train Commute Ticket vs Drive Cost Estimator</h2>
                        <p class="text-xs text-slate-500">Compare National Rail season tickets against driving fuel, parking &amp; ULEZ costs.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Annual Train Season Ticket / Flexi (£)</label>
                            <input type="number" id="com-train" value="3200" oninput="calculateCommuteCost()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Daily Return Drive Distance (Miles) &amp; Days/Wk</label>
                            <div class="grid grid-cols-2 gap-2">
                                <input type="number" id="com-miles" value="34" oninput="calculateCommuteCost()" placeholder="Miles/day" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                                <input type="number" id="com-days" value="3" min="1" max="7" oninput="calculateCommuteCost()" placeholder="Days/wk" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Daily Station / City Parking Cost (£)</label>
                            <input type="number" id="com-parking" value="12.00" step="0.5" oninput="calculateCommuteCost()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-indigo-400 font-bold uppercase tracking-wider block">Cheapest Commute Option</span>
                            <span class="text-3xl font-black text-emerald-400 mt-1 block" id="com-cheapest-result">Train Season Ticket is £480 Cheaper</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="com-driving-annual">Annual Driving Cost: £3,680 / yr</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Annual Train Ticket Cost:</span>
                                <span class="font-bold text-indigo-300" id="com-train-annual">£3,200 / yr</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateCommuteCost() {
    const trainCost = parseFloat(document.getElementById('com-train')?.value) || 0;
    const dailyMiles = parseFloat(document.getElementById('com-miles')?.value) || 0;
    const daysPerWeek = parseFloat(document.getElementById('com-days')?.value) || 3;
    const dailyParking = parseFloat(document.getElementById('com-parking')?.value) || 0;

    const weeksPerYear = 46;
    const totalWorkDays = daysPerWeek * weeksPerYear;
    const totalAnnualMiles = dailyMiles * totalWorkDays;

    const costPerMileHmrcRate = 0.45; // HMRC 45p/mile covering fuel, wear & maintenance
    const annualFuelWearCost = totalAnnualMiles * costPerMileHmrcRate;
    const annualParkingCost = dailyParking * totalWorkDays;

    const totalAnnualDriveCost = annualFuelWearCost + annualParkingCost;
    const diff = Math.abs(totalAnnualDriveCost - trainCost);

    const cElem = document.getElementById('com-cheapest-result');
    const dElem = document.getElementById('com-driving-annual');
    const tElem = document.getElementById('com-train-annual');

    if (cElem) {
        if (trainCost < totalAnnualDriveCost) {
            cElem.innerText = `Train is £${Math.round(diff).toLocaleString('en-GB')} Cheaper`;
            cElem.className = 'text-3xl font-black text-emerald-400 mt-1 block';
        } else {
            cElem.innerText = `Driving is £${Math.round(diff).toLocaleString('en-GB')} Cheaper`;
            cElem.className = 'text-3xl font-black text-blue-400 mt-1 block';
        }
    }

    if (dElem) dElem.innerText = `Annual Driving Cost: £${Math.round(totalAnnualDriveCost).toLocaleString('en-GB')} / yr`;
    if (tElem) tElem.innerText = `£${Math.round(trainCost).toLocaleString('en-GB')} / yr`;
}

setTimeout(calculateCommuteCost, 100);
