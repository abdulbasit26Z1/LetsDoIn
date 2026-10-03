/* UK UNIVERSITY GRADE & DEGREE CLASSIFIER CALCULATOR */

const TOOL_DEGREE_CLASSIFIER = {
    id: 'degree-classifier',
    name: 'UK University Grade & Degree Classifier Calculator',
    category: 'Utilities',
    icon: 'fa-award',
    color: 'from-blue-600 via-indigo-700 to-slate-900',
    shortDesc: 'Calculate weighted average percentage grades for UK university modules to predict First Class (1st), Upper Second (2:1), Lower Second (2:2), and Third Class degrees.',
    seoDesc: 'Free UK University degree classification calculator 2026. Calculate weighted average percentage for 1st, 2:1, 2:2, and 3rd class honours.'
};

function renderDegreeClassifierTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-award"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK University Grade &amp; Degree Classifier Calculator</h2>
                        <p class="text-xs text-slate-500">Calculate weighted module averages and predicted UK honours classification (1st, 2:1, 2:2, 3rd).</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Year 2 Average Grade (%) &amp; Weighting (e.g. 33%)</label>
                            <div class="grid grid-cols-2 gap-2">
                                <input type="number" id="deg-y2-grade" value="68" max="100" oninput="calculateDegreeClass()" placeholder="Grade %" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                                <input type="number" id="deg-y2-weight" value="33" max="100" oninput="calculateDegreeClass()" placeholder="Weight %" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Year 3 / Final Year Average Grade (%) &amp; Weighting (e.g. 67%)</label>
                            <div class="grid grid-cols-2 gap-2">
                                <input type="number" id="deg-y3-grade" value="74" max="100" oninput="calculateDegreeClass()" placeholder="Grade %" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                                <input type="number" id="deg-y3-weight" value="67" max="100" oninput="calculateDegreeClass()" placeholder="Weight %" class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                            </div>
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-indigo-400 font-bold uppercase tracking-wider block">Predicted Degree Honours Classification</span>
                            <span class="text-3xl font-black text-emerald-400 mt-1 block" id="deg-class-result">First-Class Honours (1st)</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="deg-weighted-avg">Weighted Average: 72.02%</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">UK Grading Thresholds:</span>
                                <span class="font-bold text-slate-200">1st (70%+), 2:1 (60%+), 2:2 (50%+)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateDegreeClass() {
    const y2Grade = parseFloat(document.getElementById('deg-y2-grade')?.value) || 0;
    const y2Weight = parseFloat(document.getElementById('deg-y2-weight')?.value) || 33;
    const y3Grade = parseFloat(document.getElementById('deg-y3-grade')?.value) || 0;
    const y3Weight = parseFloat(document.getElementById('deg-y3-weight')?.value) || 67;

    const totalWeight = y2Weight + y3Weight;
    const weightedAvg = totalWeight > 0 ? ((y2Grade * y2Weight) + (y3Grade * y3Weight)) / totalWeight : 0;

    let degreeClass = 'Fail (<40%)';
    let colorClass = 'text-red-400';

    if (weightedAvg >= 70) {
        degreeClass = 'First-Class Honours (1st)';
        colorClass = 'text-emerald-400';
    } else if (weightedAvg >= 60) {
        degreeClass = 'Upper Second-Class (2:1)';
        colorClass = 'text-blue-400';
    } else if (weightedAvg >= 50) {
        degreeClass = 'Lower Second-Class (2:2)';
        colorClass = 'text-amber-400';
    } else if (weightedAvg >= 40) {
        degreeClass = 'Third-Class Honours (3rd)';
        colorClass = 'text-orange-400';
    }

    const cElem = document.getElementById('deg-class-result');
    const wElem = document.getElementById('deg-weighted-avg');

    if (cElem) {
        cElem.innerText = degreeClass;
        cElem.className = `text-3xl font-black ${colorClass} mt-1 block`;
    }
    if (wElem) wElem.innerText = `Weighted Average: ${weightedAvg.toFixed(2)}%`;
}

setTimeout(calculateDegreeClass, 100);
