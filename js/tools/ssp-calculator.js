/* UK STATUTORY SICK PAY (SSP) CALCULATOR */

const TOOL_SSP_CALCULATOR = {
    id: 'ssp-calculator',
    name: 'UK Statutory Sick Pay (SSP) Calculator',
    category: 'Finance',
    icon: 'fa-user-nurse',
    color: 'from-rose-600 via-pink-700 to-slate-900',
    shortDesc: 'Calculate statutory sick pay (SSP) entitlement (£116.75/week) for UK employees based on sick leave days and qualifying work days.',
    seoDesc: 'Free UK Statutory Sick Pay (SSP) calculator 2026. Calculate SSP £116.75 weekly rate and 3 waiting day rules.'
};

function renderSspCalculatorTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-700 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-user-nurse"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Statutory Sick Pay (SSP) Calculator</h2>
                        <p class="text-xs text-slate-500">Calculate weekly SSP pay (£116.75/wk) and waiting day deductions for UK workers.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Total Off-Work Sick Days</label>
                            <input type="number" id="ssp-days" value="10" min="1" max="140" oninput="calculateSspPay()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Qualifying Work Days Per Week</label>
                            <input type="number" id="ssp-workdays" value="5" min="1" max="7" oninput="calculateSspPay()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-rose-400 font-bold uppercase tracking-wider block">Total Estimated SSP Pay</span>
                            <span class="text-3xl font-black text-white mt-1 block" id="ssp-total-result">£163.45</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="ssp-daily-rate">Daily SSP Rate: £23.35 / day (5-day week)</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Unpaid Waiting Days:</span>
                                <span class="font-bold text-amber-400">First 3 Work Days</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateSspPay() {
    const totalDays = parseFloat(document.getElementById('ssp-days')?.value) || 0;
    const workDaysPerWeek = parseFloat(document.getElementById('ssp-workdays')?.value) || 5;

    const weeklySspRate = 116.75;
    const dailySspRate = weeklySspRate / workDaysPerWeek;

    const workDaysOff = Math.min(totalDays, (totalDays / 7) * workDaysPerWeek);
    const paidWorkDays = Math.max(0, workDaysOff - 3); // 3 unpaid waiting days

    const totalSspPay = paidWorkDays * dailySspRate;

    const rElem = document.getElementById('ssp-total-result');
    const dElem = document.getElementById('ssp-daily-rate');

    if (rElem) rElem.innerText = `£${totalSspPay.toFixed(2)}`;
    if (dElem) dElem.innerText = `Daily Rate: £${dailySspRate.toFixed(2)} / day (${workDaysPerWeek}-day week)`;
}

setTimeout(calculateSspPay, 100);
