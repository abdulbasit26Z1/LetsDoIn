/* UK SIDE HUSTLE TAX CALCULATOR (£1,000 ALLOWANCE) */

const TOOL_SIDE_HUSTLE_TAX = {
    id: 'side-hustle-tax',
    name: 'UK Side Hustle Tax Calculator (£1,000 Trading Allowance)',
    category: 'Finance',
    icon: 'fa-cash-register',
    color: 'from-emerald-600 via-teal-700 to-slate-900',
    shortDesc: 'Calculate UK HMRC Income Tax and National Insurance liability on self-employed side hustle income, Vinted, Etsy, eBay, and freelance earnings.',
    seoDesc: 'Free UK side hustle tax calculator 2026. Calculate tax on Vinted, eBay, Airbnb earnings using £1,000 trading allowance.'
};

function renderSideHustleTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-cash-register"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Side Hustle Tax Calculator (£1,000 Trading Allowance)</h2>
                        <p class="text-xs text-slate-500">Calculate HMRC tax &amp; NI reporting thresholds on eBay, Etsy, Vinted, Uber &amp; freelance income.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Annual Side Hustle Gross Revenue (£)</label>
                            <input type="number" id="sh-revenue" value="4500" oninput="calculateSideHustleTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Allowable Business Expenses (£)</label>
                            <input type="number" id="sh-expenses" value="600" oninput="calculateSideHustleTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Main Employed PAYE Salary (£)</label>
                            <input type="number" id="sh-salary" value="32000" oninput="calculateSideHustleTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Estimated HMRC Tax &amp; NI Bill</span>
                            <span class="text-3xl font-black text-white mt-1 block" id="sh-tax-bill">£700 / yr</span>
                            <span class="text-xs text-amber-400 mt-1 block" id="sh-hmrc-declaration">HMRC Self Assessment Registration Required!</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Taxable Profit (Used £1,000 Allowance):</span>
                                <span class="font-bold text-emerald-400" id="sh-taxable-profit">£3,500</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateSideHustleTax() {
    const rev = parseFloat(document.getElementById('sh-revenue')?.value) || 0;
    const exp = parseFloat(document.getElementById('sh-expenses')?.value) || 0;
    const salary = parseFloat(document.getElementById('sh-salary')?.value) || 0;

    const tradingAllowance = 1000;
    const deduction = Math.max(exp, tradingAllowance);
    const taxableProfit = Math.max(0, rev - deduction);

    let marginalTaxRate = 0.20;
    if (salary + taxableProfit > 125140) marginalTaxRate = 0.45;
    else if (salary + taxableProfit > 50270) marginalTaxRate = 0.40;
    else if (salary + taxableProfit > 12570) marginalTaxRate = 0.20;

    const incomeTax = taxableProfit * marginalTaxRate;
    let niClass4 = 0;
    if (taxableProfit > 12570) {
        niClass4 = (taxableProfit - 12570) * 0.06;
    }

    const totalTaxNi = incomeTax + niClass4;

    const bElem = document.getElementById('sh-tax-bill');
    const dElem = document.getElementById('sh-hmrc-declaration');
    const pElem = document.getElementById('sh-taxable-profit');

    if (bElem) bElem.innerText = `£${Math.round(totalTaxNi).toLocaleString('en-GB')} / yr`;
    if (dElem) {
        if (rev > 1000) {
            dElem.innerText = `HMRC Self Assessment Registration Required (Revenue > £1,000)`;
            dElem.className = 'text-xs text-amber-400 font-bold mt-1 block';
        } else {
            dElem.innerText = `Tax Free! Below £1,000 HMRC Trading Allowance`;
            dElem.className = 'text-xs text-emerald-400 font-bold mt-1 block';
        }
    }
    if (pElem) pElem.innerText = `£${Math.round(taxableProfit).toLocaleString('en-GB')}`;
}

setTimeout(calculateSideHustleTax, 100);
