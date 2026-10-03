/* UK HEAT PUMP VS GAS BOILER COST CALCULATOR */

const TOOL_HEAT_PUMP_COST = {
    id: 'heat-pump-cost',
    name: 'UK Heat Pump vs Gas Boiler Cost Calculator',
    category: 'Utilities',
    icon: 'fa-temperature-arrow-up',
    color: 'from-blue-600 via-teal-600 to-slate-900',
    shortDesc: 'Compare air source heat pump (ASHP) running costs against gas boilers considering COP efficiency and the Boiler Upgrade Scheme (BUS) £7,500 grant.',
    seoDesc: 'Free UK Heat Pump vs Gas Boiler running cost calculator 2026. Calculate COP efficiency savings and BUS £7,500 grant payback.'
};

function renderHeatPumpTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-600 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-temperature-arrow-up"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Heat Pump vs Gas Boiler Cost Calculator</h2>
                        <p class="text-xs text-slate-500">Compare annual heating bills and COP efficiency for Air Source Heat Pumps vs Gas Boilers.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Annual Heating Energy Demand (kWh)</label>
                            <input type="number" id="hp-demand" value="12000" oninput="calculateHeatPumpCost()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Heat Pump COP Efficiency (3.0 to 4.0)</label>
                            <input type="number" id="hp-cop" value="3.4" step="0.1" oninput="calculateHeatPumpCost()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Gas vs Electricity Tariff (p/kWh)</label>
                            <div class="grid grid-cols-2 gap-2">
                                <input type="number" id="hp-gas-rate" value="6.2" step="0.1" oninput="calculateHeatPumpCost()" placeholder="Gas Tariff" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                                <input type="number" id="hp-elec-rate" value="24.5" step="0.1" oninput="calculateHeatPumpCost()" placeholder="Elec Tariff" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                            </div>
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-teal-400 font-bold uppercase tracking-wider block">Heat Pump Annual Heating Cost</span>
                            <span class="text-3xl font-black text-white mt-1 block" id="hp-annual-result">£864 / yr</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="hp-boiler-compare">Gas Boiler Cost: £930 / yr (80% Efficiency)</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">BUS Grant Subsidy:</span>
                                <span class="font-bold text-emerald-400">£7,500 Off Install</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateHeatPumpCost() {
    const demand = parseFloat(document.getElementById('hp-demand')?.value) || 12000;
    const cop = parseFloat(document.getElementById('hp-cop')?.value) || 3.4;
    const gasRate = parseFloat(document.getElementById('hp-gas-rate')?.value) || 6.2;
    const elecRate = parseFloat(document.getElementById('hp-elec-rate')?.value) || 24.5;

    const hpElecKwh = demand / cop;
    const hpCostPounds = (hpElecKwh * elecRate) / 100;

    const boilerGasKwh = demand / 0.80; // 80% boiler efficiency
    const boilerCostPounds = (boilerGasKwh * gasRate) / 100;

    const hElem = document.getElementById('hp-annual-result');
    const bElem = document.getElementById('hp-boiler-compare');

    if (hElem) hElem.innerText = `£${Math.round(hpCostPounds).toLocaleString('en-GB')} / yr`;
    if (bElem) bElem.innerText = `Gas Boiler Cost: £${Math.round(boilerCostPounds).toLocaleString('en-GB')} / yr (80% Efficiency)`;
}

setTimeout(calculateHeatPumpCost, 100);
