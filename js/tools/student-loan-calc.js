/* UK STUDENT LOAN REPAYMENT ESTIMATOR */

const TOOL_STUDENT_LOAN = {
    id: 'student-loan-calc',
    name: 'UK Student Loan Repayment Estimator',
    category: 'Finance',
    icon: 'fa-graduation-cap',
    color: 'from-purple-700 via-indigo-700 to-blue-900',
    shortDesc: 'Calculate monthly UK student loan repayments for Plan 1, Plan 2, Plan 4, Plan 5, and Postgraduate loans based on gross salary.',
    seoDesc: 'Free UK student loan repayment calculator 2026. Calculate Plan 1, Plan 2, Plan 5, and Masters Postgraduate deduction rates.'
};

function renderStudentLoanTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-700 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-graduation-cap"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Student Loan Repayment Estimator</h2>
                        <p class="text-xs text-slate-500">Calculate exact monthly pay deductions for Plan 1, 2, 4, 5 &amp; Postgraduate loans.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Gross Annual Salary (£)</label>
                            <input type="number" id="sl-salary" value="38000" oninput="calculateStudentLoan()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Student Loan Plan</label>
                            <select id="sl-plan" onchange="calculateStudentLoan()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="plan2" selected>Plan 2 (Pre-2023 Entrants - Threshold £27,295 @ 9%)</option>
                                <option value="plan5">Plan 5 (Post-2023 Entrants - Threshold £25,000 @ 9%)</option>
                                <option value="plan1">Plan 1 (Pre-2012 / NI - Threshold £24,990 @ 9%)</option>
                                <option value="plan4">Plan 4 (Scotland - Threshold £31,395 @ 9%)</option>
                                <option value="postgrad">Postgraduate / Masters (Threshold £21,000 @ 6%)</option>
                            </select>
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-purple-400 font-bold uppercase tracking-wider block">Monthly Student Loan Deduction</span>
                            <span class="text-3xl font-black text-white mt-1 block" id="sl-monthly-result">£80.29 / mo</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="sl-annual-result">Annual Total: £963.45 / yr</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Selected Threshold:</span>
                                <span class="font-bold" id="sl-threshold-display">£27,295</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-400">Income Above Threshold:</span>
                                <span class="font-bold text-emerald-400" id="sl-above-display">£10,705</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateStudentLoan() {
    const salary = parseFloat(document.getElementById('sl-salary')?.value) || 0;
    const plan = document.getElementById('sl-plan')?.value || 'plan2';

    let threshold = 27295;
    let rate = 0.09;

    if (plan === 'plan5') { threshold = 25000; rate = 0.09; }
    else if (plan === 'plan1') { threshold = 24990; rate = 0.09; }
    else if (plan === 'plan4') { threshold = 31395; rate = 0.09; }
    else if (plan === 'postgrad') { threshold = 21000; rate = 0.06; }

    const taxableIncome = Math.max(0, salary - threshold);
    const annualDeduction = taxableIncome * rate;
    const monthlyDeduction = annualDeduction / 12;

    const mElem = document.getElementById('sl-monthly-result');
    const aElem = document.getElementById('sl-annual-result');
    const tElem = document.getElementById('sl-threshold-display');
    const abElem = document.getElementById('sl-above-display');

    if (mElem) mElem.innerText = `£${monthlyDeduction.toFixed(2)} / mo`;
    if (aElem) aElem.innerText = `Annual Total: £${annualDeduction.toFixed(2)} / yr`;
    if (tElem) tElem.innerText = `£${threshold.toLocaleString('en-GB')}`;
    if (abElem) abElem.innerText = `£${taxableIncome.toLocaleString('en-GB')}`;
}

setTimeout(calculateStudentLoan, 100);
