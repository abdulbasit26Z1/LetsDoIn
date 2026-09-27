function calcApplianceCost() {
    const watts = parseFloat(document.getElementById('app-watts').value) || 0;
    const hours = parseFloat(document.getElementById('app-hours').value) || 0;
    const penceRate = parseFloat(document.getElementById('app-rate').value) || 0;

    const kWhPerDay = (watts * hours) / 1000;
    const dailyCostPounds = (kWhPerDay * penceRate) / 100;

    document.getElementById('app-res-daily').innerText = '£' + dailyCostPounds.toFixed(2);
    document.getElementById('app-res-monthly').innerText = '£' + (dailyCostPounds * 30).toFixed(2);
    document.getElementById('app-res-yearly').innerText = '£' + (dailyCostPounds * 365).toFixed(2);
}

const TOOL_APPLIANCE_COST = {
    id: 'appliance-cost',
    name: 'UK Electrical Appliance Running Cost',
    category: 'Utilities',
    icon: 'fa-bolt',
    color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50',
    shortDesc: 'Estimate electricity running cost per hour, day, and month for household devices.',
    seoDesc: 'Calculate exact electricity costs in British pounds and pence for appliances using Ofgem electricity price cap rates.',
    render: () => `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">Appliance Power (Watts)</label>
                    <input type="number" id="app-watts" value="2000" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-bold outline-none">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">Hours Used / Day</label>
                        <input type="number" id="app-hours" value="2" class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">Electricity Rate (Pence / kWh)</label>
                        <input type="number" id="app-rate" value="24.5" step="0.1" class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none">
                    </div>
                </div>
                <button onclick="calcApplianceCost()" class="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition">
                    Calculate Electricity Cost
                </button>
            </div>
            <div class="bg-amber-50/50 dark:bg-slate-800/80 p-5 rounded-2xl border border-amber-100 dark:border-slate-700 flex flex-col justify-between">
                <div>
                    <span class="text-xs text-slate-500 font-semibold uppercase">Daily Running Cost</span>
                    <div id="app-res-daily" class="text-3xl font-extrabold text-amber-600 dark:text-amber-400 my-1">£0.98</div>
                </div>
                <div class="grid grid-cols-2 gap-2 border-t border-slate-200 dark:border-slate-700 pt-3 text-xs">
                    <div><span class="text-slate-500">Monthly (30 days):</span> <div id="app-res-monthly" class="font-bold text-slate-800 dark:text-slate-100">£29.40</div></div>
                    <div><span class="text-slate-500">Annual (365 days):</span> <div id="app-res-yearly" class="font-bold text-slate-800 dark:text-slate-100">£357.70</div></div>
                </div>
            </div>
        </div>
    `,
    init: () => calcApplianceCost()
};
