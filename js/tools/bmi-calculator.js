function calcBMI() {
    const w = parseFloat(document.getElementById('bmi-weight').value);
    const h = parseFloat(document.getElementById('bmi-height').value) / 100;
    const bmi = (w / (h * h)).toFixed(1);
    document.getElementById('bmi-res-num').innerText = bmi;
}

const TOOL_BMI_CALCULATOR = {
    id: 'bmi-calculator',
    name: 'BMI & Healthy Weight Calculator',
    category: 'Health',
    icon: 'fa-heart-pulse',
    color: 'text-red-500 bg-red-50 dark:bg-red-950/50',
    shortDesc: 'Calculate Body Mass Index (BMI) using metric or imperial units.',
    seoDesc: 'NHS standard Body Mass Index (BMI) calculator. Check healthy weight range for adults.',
    render: () => `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div><label class="block text-xs font-bold uppercase mb-1">Weight (kg)</label><input type="number" id="bmi-weight" value="70" class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"></div>
                <div><label class="block text-xs font-bold uppercase mb-1">Height (cm)</label><input type="number" id="bmi-height" value="175" class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"></div>
                <button onclick="calcBMI()" class="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl">Calculate BMI</button>
            </div>
            <div class="p-5 bg-red-50/50 dark:bg-slate-800/80 rounded-2xl border border-red-100 dark:border-slate-700 space-y-3">
                <span class="text-xs text-slate-500 uppercase font-bold">Your BMI Result</span>
                <div id="bmi-res-num" class="text-4xl font-extrabold text-red-600">22.9</div>
                <div id="bmi-res-cat" class="text-sm font-bold text-slate-700 dark:text-slate-200">Normal weight</div>
            </div>
        </div>
    `,
    init: () => calcBMI()
};
