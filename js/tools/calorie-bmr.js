function calcBMR() {
    const age = parseFloat(document.getElementById('bmr-age').value) || 30;
    const w = parseFloat(document.getElementById('bmr-weight').value) || 75;
    const h = parseFloat(document.getElementById('bmr-height').value) || 178;
    const bmr = 10 * w + 6.25 * h - 5 * age + 5;
    document.getElementById('bmr-res-calories').innerText = Math.round(bmr * 1.375) + ' kcal/day';
}

const TOOL_CALORIE_BMR = {
    id: 'calorie-bmr',
    name: 'Calorie & BMR Calculator',
    category: 'Health',
    icon: 'fa-fire',
    color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/50',
    shortDesc: 'Determine Basal Metabolic Rate (BMR) and daily maintenance calorie requirements.',
    seoDesc: 'Mifflin-St Jeor BMR and daily maintenance calorie requirement calculator.',
    render: () => `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
                <div><label class="block text-xs font-bold uppercase mb-1">Age</label><input type="number" id="bmr-age" value="30" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"></div>
                <div><label class="block text-xs font-bold uppercase mb-1">Weight (kg)</label><input type="number" id="bmr-weight" value="75" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"></div>
                <div><label class="block text-xs font-bold uppercase mb-1">Height (cm)</label><input type="number" id="bmr-height" value="178" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"></div>
                <button onclick="calcBMR()" class="w-full py-2.5 bg-orange-600 text-white font-bold rounded-xl">Calculate Calories</button>
            </div>
            <div class="p-5 bg-orange-50/50 dark:bg-slate-800/80 rounded-2xl border border-orange-100 dark:border-slate-700 flex flex-col justify-center">
                <span class="text-xs text-slate-500 uppercase font-bold">Maintenance Calories</span>
                <div id="bmr-res-calories" class="text-3xl font-extrabold text-orange-600 mt-1">2,250 kcal/day</div>
            </div>
        </div>
    `,
    init: () => calcBMR()
};
