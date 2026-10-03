/* UK EV CHARGING VS PETROL COST COMPARISON */

const TOOL_EV_PETROL_COST = {
    id: 'ev-petrol-cost',
    name: 'UK EV Charging vs Petrol Cost Comparison',
    category: 'Utilities',
    icon: 'fa-charging-station',
    color: 'from-emerald-600 via-green-600 to-slate-900',
    shortDesc: 'Compare electric car (EV) home charging tariffs against petrol/diesel fuel costs per mile and annual savings.',
    seoDesc: 'Free UK EV vs petrol cost comparison calculator. Calculate per mile savings on EV off-peak overnight tariffs vs petrol.'
};

function renderEvPetrolTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-600 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-charging-station"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK EV Charging vs Petrol Cost Comparison</h2>
                        <p class="text-xs text-slate-500">Calculate per-mile driving costs for Electric Vehicles vs Petrol/Diesel cars.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Annual Driving Mileage</label>
                            <input type="number" id="ev-miles" value="8000" oninput="calculateEvCost()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">EV Home Electricity Rate (p/kWh)</label>
                            <input type="number" id="ev-kwh-rate" value="7.5" step="0.1" oninput="calculateEvCost()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            <span class="text-[10px] text-slate-400">e.g. 7.5p/kWh for Octopus Intelligent Go overnight tariff</span>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Petrol Price (p/litre) &amp; MPG</label>
                            <div class="grid grid-cols-2 gap-2">
                                <input type="number" id="ev-petrol-price" value="142" oninput="calculateEvCost()" placeholder="Pence/Litre" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                                <input type="number" id="ev-petrol-mpg" value="42" oninput="calculateEvCost()" placeholder="MPG" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                            </div>
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Annual Fuel Savings with EV</span>
                            <span class="text-3xl font-black text-emerald-400 mt-1 block" id="ev-annual-savings">£1,068 / yr</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="ev-permile-compare">EV: 2.1p/mi vs Petrol: 15.4p/mi</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Annual EV Electricity Cost:</span>
                                <span class="font-bold text-emerald-400" id="ev-annual-cost">£168</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-400">Annual Petrol Cost:</span>
                                <span class="font-bold text-red-400" id="petrol-annual-cost">£1,236</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateEvCost() {
    const miles = parseFloat(document.getElementById('ev-miles')?.value) || 0;
    const evRate = parseFloat(document.getElementById('ev-kwh-rate')?.value) || 7.5;
    const petrolPence = parseFloat(document.getElementById('ev-petrol-price')?.value) || 142;
    const mpg = parseFloat(document.getElementById('ev-petrol-mpg')?.value) || 42;

    const evEfficiencyMilesPerKwh = 3.5;
    const evCostPerMilePence = evRate / evEfficiencyMilesPerKwh;
    const annualEvCostPounds = (miles * evCostPerMilePence) / 100;

    const litresPerGallon = 4.54609;
    const petrolCostPerGallonPounds = (petrolPence * litresPerGallon) / 100;
    const petrolCostPerMilePounds = petrolCostPerGallonPounds / mpg;
    const petrolCostPerMilePence = petrolCostPerMilePounds * 100;
    const annualPetrolCostPounds = miles * petrolCostPerMilePounds;

    const savings = annualPetrolCostPounds - annualEvCostPounds;

    const sElem = document.getElementById('ev-annual-savings');
    const cElem = document.getElementById('ev-permile-compare');
    const evElem = document.getElementById('ev-annual-cost');
    const petElem = document.getElementById('petrol-annual-cost');

    if (sElem) sElem.innerText = `£${Math.round(savings).toLocaleString('en-GB')} / yr`;
    if (cElem) cElem.innerText = `EV: ${evCostPerMilePence.toFixed(1)}p/mi vs Petrol: ${petrolCostPerMilePence.toFixed(1)}p/mi`;
    if (evElem) evElem.innerText = `£${Math.round(annualEvCostPounds).toLocaleString('en-GB')}`;
    if (petElem) petElem.innerText = `£${Math.round(annualPetrolCostPounds).toLocaleString('en-GB')}`;
}

setTimeout(calculateEvCost, 100);
