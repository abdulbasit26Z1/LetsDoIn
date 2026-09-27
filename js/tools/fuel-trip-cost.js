function calcFuelCost() {
    const miles = parseFloat(document.getElementById('fuel-miles').value) || 0;
    const mpg = parseFloat(document.getElementById('fuel-mpg').value) || 1;
    const pence = parseFloat(document.getElementById('fuel-pence').value) || 0;

    const gallons = miles / mpg;
    const litres = gallons * 4.54609;
    const cost = (litres * pence) / 100;

    document.getElementById('fuel-res-cost').innerText = '£' + cost.toFixed(2);
}

const TOOL_FUEL_TRIP_COST = {
    id: 'fuel-trip-cost',
    name: 'UK Car Fuel & Trip Cost Calculator',
    category: 'Utilities',
    icon: 'fa-car',
    color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50',
    shortDesc: 'Calculate total petrol or diesel expense for UK road journeys based on MPG.',
    seoDesc: 'Calculate British fuel trip costs in pounds. Estimate petrol and diesel journey expenses.',
    render: () => `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
                <div><label class="block text-xs font-bold uppercase mb-1">Distance (Miles)</label><input type="number" id="fuel-miles" value="120" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"></div>
                <div><label class="block text-xs font-bold uppercase mb-1">Vehicle Efficiency (MPG)</label><input type="number" id="fuel-mpg" value="45" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"></div>
                <div><label class="block text-xs font-bold uppercase mb-1">Fuel Price (Pence per Litre)</label><input type="number" id="fuel-pence" value="142.9" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"></div>
                <button onclick="calcFuelCost()" class="w-full py-2.5 bg-amber-600 text-white font-bold rounded-xl">Calculate Journey Cost</button>
            </div>
            <div class="p-5 bg-amber-50/50 dark:bg-slate-800/80 rounded-2xl border border-amber-100 dark:border-slate-700 flex flex-col justify-center">
                <span class="text-xs text-slate-500 uppercase font-bold">Estimated Trip Cost</span>
                <div id="fuel-res-cost" class="text-3xl font-extrabold text-amber-600 mt-1">£17.32</div>
            </div>
        </div>
    `,
    init: () => calcFuelCost()
};
