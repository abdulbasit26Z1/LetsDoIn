function calcMortgage() {
    const principal = parseFloat(document.getElementById('mort-amount').value) || 0;
    const annualRate = (parseFloat(document.getElementById('mort-rate').value) || 0) / 100;
    const years = parseInt(document.getElementById('mort-years').value) || 1;

    const r = annualRate / 12;
    const n = years * 12;
    const monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalRepaid = monthly * n;

    document.getElementById('mort-res-monthly').innerText = '£' + monthly.toFixed(2);
    document.getElementById('mort-res-total').innerText = '£' + Math.round(totalRepaid).toLocaleString();
    document.getElementById('mort-res-interest').innerText = '£' + Math.round(totalRepaid - principal).toLocaleString();
}

const TOOL_MORTGAGE_CALC = {
    id: 'mortgage-calc',
    name: 'Mortgage & Loan Repayment Calculator',
    category: 'Finance',
    icon: 'fa-house-chimney',
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50',
    shortDesc: 'Estimate monthly repayment amounts and total interest on home mortgages.',
    seoDesc: 'Calculate British mortgage repayments, monthly interest, total repayment terms, and loan interest burden.',
    render: () => `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">Property Loan Amount (£)</label>
                    <input type="number" id="mort-amount" value="250000" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold outline-none">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">Interest Rate (%)</label>
                        <input type="number" id="mort-rate" value="4.5" step="0.1" class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">Term (Years)</label>
                        <input type="number" id="mort-years" value="25" class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none">
                    </div>
                </div>
                <button onclick="calcMortgage()" class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition">
                    Calculate Repayments
                </button>
            </div>
            <div class="bg-blue-50/50 dark:bg-slate-800/80 p-5 rounded-2xl border border-blue-100 dark:border-slate-700 space-y-3">
                <div>
                    <span class="text-xs text-slate-500 font-semibold uppercase">Estimated Monthly Repayment</span>
                    <div id="mort-res-monthly" class="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">£1,389.58</div>
                </div>
                <div class="space-y-2 border-t border-slate-200 dark:border-slate-700 pt-3 text-xs">
                    <div class="flex justify-between"><span class="text-slate-500">Total Repaid Over Term:</span><span id="mort-res-total" class="font-bold">£416,874</span></div>
                    <div class="flex justify-between"><span class="text-slate-500">Total Interest Paid:</span><span id="mort-res-interest" class="font-bold text-amber-600">£166,874</span></div>
                </div>
            </div>
        </div>
    `,
    init: () => calcMortgage()
};
