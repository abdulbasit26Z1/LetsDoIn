function calcWater() {
    const w = parseFloat(document.getElementById('water-weight').value) || 70;
    const litres = (w * 0.035).toFixed(1);
    document.getElementById('water-res-target').innerText = litres + ' Litres (' + Math.round(litres * 4) + ' Glasses)';
}

const TOOL_WATER_TRACKER = {
    id: 'water-tracker',
    name: 'Daily Water Intake Calculator',
    category: 'Health',
    icon: 'fa-glass-water',
    color: 'text-blue-400 bg-blue-50 dark:bg-blue-950/50',
    shortDesc: 'Calculate ideal daily water intake based on body weight and activity levels.',
    seoDesc: 'Calculate recommended hydration intake in litres and glasses.',
    render: () => `
        <div class="space-y-4">
            <div><label class="block text-xs font-bold uppercase mb-1">Body Weight (kg)</label><input type="number" id="water-weight" value="70" oninput="calcWater()" class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"></div>
            <div class="p-4 bg-blue-50 dark:bg-slate-800 rounded-xl flex items-center justify-between">
                <span class="text-sm font-bold">Recommended Daily Target:</span>
                <span id="water-res-target" class="text-2xl font-extrabold text-blue-600">2.4 Litres (10 Glasses)</span>
            </div>
        </div>
    `,
    init: () => calcWater()
};
