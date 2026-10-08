const TOOL_OVERTIME_PAY = {
    id: 'overtime-pay-calc',
    name: 'UK Overtime Pay & Shift Tax Calculator',
    category: 'Finance',
    icon: 'fa-business-time',
    color: 'from-purple-600 to-indigo-600',
    shortDesc: 'Calculate gross & net take-home pay for UK overtime hours worked at 1.5x (time-and-a-half) or 2.0x (double time) rates.',
    seoDesc: 'Calculate UK overtime pay after Income Tax and National Insurance deductions for time-and-a-half (1.5x) and double time (2.0x) hours.',
    render: () => `
        <div class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Standard Hourly Rate (£)</label>
                    <input type="number" id="ot-rate" value="18.50" step="0.50" oninput="calcOvertime()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold outline-none focus:ring-2 focus:ring-purple-500">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Time & a Half (1.5x) Hours</label>
                    <input type="number" id="ot-hrs-15" value="10" oninput="calcOvertime()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold outline-none focus:ring-2 focus:ring-purple-500">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Double Time (2.0x) Hours</label>
                    <input type="number" id="ot-hrs-20" value="4" oninput="calcOvertime()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold outline-none focus:ring-2 focus:ring-purple-500">
                </div>
            </div>

            <div id="ot-result" class="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 space-y-3">
                <!-- Result -->
            </div>
        </div>
    `
};

function calcOvertime() {
    const rate = parseFloat(document.getElementById('ot-rate')?.value) || 0;
    const h15 = parseFloat(document.getElementById('ot-hrs-15')?.value) || 0;
    const h20 = parseFloat(document.getElementById('ot-hrs-20')?.value) || 0;

    const pay15 = h15 * rate * 1.5;
    const pay20 = h20 * rate * 2.0;
    const grossOvertime = pay15 + pay20;

    const estTaxNI = grossOvertime * 0.28; // ~20% Tax + 8% NI marginal rate
    const netOvertime = grossOvertime - estTaxNI;

    const elem = document.getElementById('ot-result');
    if (elem) {
        elem.innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-slate-800">
                    <span class="block text-[10px] uppercase font-bold text-slate-500">Gross Overtime Pay</span>
                    <span class="text-xl font-extrabold text-purple-600">£${grossOvertime.toFixed(2)}</span>
                </div>
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-slate-800">
                    <span class="block text-[10px] uppercase font-bold text-slate-500">Est. Tax & NI Deductions</span>
                    <span class="text-xl font-extrabold text-red-600">£${estTaxNI.toFixed(2)}</span>
                </div>
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-slate-800">
                    <span class="block text-[10px] uppercase font-bold text-slate-500">Est. Net Take-Home</span>
                    <span class="text-xl font-extrabold text-emerald-600">£${netOvertime.toFixed(2)}</span>
                </div>
            </div>
        `;
    }
}

setTimeout(calcOvertime, 200);
