/* UK DIVIDEND TAX CALCULATOR */

const TOOL_DIVIDEND_TAX = {
    id: 'dividend-tax',
    name: 'UK Dividend Tax Calculator',
    category: 'Finance',
    icon: 'fa-chart-pie',
    color: 'from-emerald-700 via-teal-700 to-slate-900',
    shortDesc: 'Calculate UK dividend tax liability for Ltd company directors and investors using basic (8.75%), higher (33.75%), and additional (39.35%) tax bands.',
    seoDesc: 'Free UK dividend tax calculator 2026. Calculate HMRC dividend tax rates with £500 tax-free allowance.'
};

function renderDividendTaxTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-700 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-chart-pie"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Dividend Tax Calculator</h2>
                        <p class="text-xs text-slate-500">Calculate HMRC tax on dividends for Ltd company directors &amp; shareholders.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Annual Dividend Income (£)</label>
                            <input type="number" id="div-amount" value="25000" oninput="calculateDividendTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Other Salary / Pension Income (£)</label>
                            <input type="number" id="div-salary" value="12570" oninput="calculateDividendTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Estimated Dividend Tax Payable</span>
                            <span class="text-3xl font-black text-white mt-1 block" id="div-result-tax">£2,143.75</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="div-result-net">Net Dividend After Tax: £22,856.25</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Tax-Free Allowance Used:</span>
                                <span class="font-bold text-emerald-400">£500</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateDividendTax() {
    const dividends = parseFloat(document.getElementById('div-amount')?.value) || 0;
    const salary = parseFloat(document.getElementById('div-salary')?.value) || 0;

    const personalAllowance = 12570;
    const unusedPA = Math.max(0, personalAllowance - salary);

    const taxableDividends = Math.max(0, dividends - unusedPA - 500);

    let tax = 0;
    const totalIncomeBeforeDiv = Math.max(salary, personalAllowance);

    if (totalIncomeBeforeDiv + taxableDividends <= 50270) {
        tax = taxableDividends * 0.0875;
    } else {
        const basicBandRemaining = Math.max(0, 50270 - totalIncomeBeforeDiv);
        const inBasic = Math.min(taxableDividends, basicBandRemaining);
        const inHigher = Math.max(0, taxableDividends - inBasic);

        tax = (inBasic * 0.0875) + (inHigher * 0.3375);
    }

    const net = dividends - tax;

    const tElem = document.getElementById('div-result-tax');
    const nElem = document.getElementById('div-result-net');

    if (tElem) tElem.innerText = `£${tax.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (nElem) nElem.innerText = `Net Dividend After Tax: £${net.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

setTimeout(calculateDividendTax, 100);
