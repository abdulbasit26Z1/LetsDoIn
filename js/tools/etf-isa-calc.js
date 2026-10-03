/* UK ETF & STOCKS & SHARES ISA CALCULATOR */

const TOOL_ETF_ISA_CALC = {
    id: 'etf-isa-calc',
    name: 'UK ETF & Stocks & Shares ISA Calculator',
    category: 'Finance',
    icon: 'fa-chart-pie',
    color: 'from-emerald-600 via-teal-700 to-slate-900',
    shortDesc: 'Calculate compound returns, dividend reinvestment, and UK tax-free ISA capital gains for ETFs like S&P 500 (VUSA) and All-World (VWRP).',
    seoDesc: 'Free UK ETF & Stocks & Shares ISA Calculator 2026. Calculate compound growth, dividend returns, and £20,000 annual ISA tax shelter benefits.'
};

function renderEtfIsaCalcTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <!-- Header -->
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-800 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-chart-pie"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK ETF &amp; Stocks ISA Growth Calculator</h2>
                        <p class="text-xs text-slate-500">Project S&amp;P 500, FTSE, and All-World ETF portfolio returns with tax-free ISA benefits.</p>
                    </div>
                </div>

                <!-- Input & Output Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Controls -->
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Initial Lump Sum (£)</label>
                            <input type="number" id="etf-init" value="5000" step="100" oninput="calculateEtfIsaGrowth()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Monthly Contribution (£)</label>
                            <input type="number" id="etf-monthly" value="500" step="50" oninput="calculateEtfIsaGrowth()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                            <span class="text-[10px] text-slate-400 mt-1 block">Annual ISA limit is £20,000 (£1,666/month)</span>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Years Invested</label>
                                <input type="number" id="etf-years" value="15" min="1" max="50" oninput="calculateEtfIsaGrowth()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Annual Return (%)</label>
                                <input type="number" id="etf-return" value="8" step="0.5" oninput="calculateEtfIsaGrowth()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Estimated Dividend Yield (%)</label>
                            <input type="number" id="etf-dividend" value="1.8" step="0.1" oninput="calculateEtfIsaGrowth()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Account Wrapper</label>
                            <select id="etf-wrapper" onchange="calculateEtfIsaGrowth()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                                <option value="isa" selected>Stocks &amp; Shares ISA (100% Tax Free)</option>
                                <option value="gia">General Investment Account (GIA - Taxable)</option>
                            </select>
                        </div>
                    </div>

                    <!-- Results Box -->
                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-5 flex flex-col justify-between shadow-xl">
                        <div>
                            <span class="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Estimated Total Portfolio Value</span>
                            <span class="text-4xl font-black text-white mt-1 block" id="etf-res-total">£181,420</span>
                            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 mt-2 border border-emerald-500/30" id="etf-tax-badge">
                                <i class="fa-solid fa-shield-halved mr-1.5"></i> 100% Tax Free under ISA Rules
                            </span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-3 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Total Capital Contributed:</span>
                                <span class="font-bold text-white" id="etf-res-deposits">£95,000</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-400">Total Investment Growth:</span>
                                <span class="font-bold text-emerald-400" id="etf-res-growth">£86,420</span>
                            </div>
                            <div class="flex justify-between border-t border-slate-800/80 pt-2">
                                <span class="text-slate-400">Estimated Reinvested Dividends:</span>
                                <span class="font-bold text-teal-300" id="etf-res-dividends">£18,250</span>
                            </div>
                            <div class="flex justify-between text-slate-400 pt-1">
                                <span>Estimated CGT Tax Saved (ISA):</span>
                                <span class="font-extrabold text-amber-400" id="etf-res-cgt-saved">£16,684</span>
                            </div>
                        </div>

                        <div class="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
                            <i class="fa-solid fa-circle-info text-emerald-400 mr-1"></i>
                            <strong>Disclaimer:</strong> Investment growth rates are for illustrative purposes. Past performance is no guarantee of future returns. Estimates based on 2026/2027 HMRC ISA allowances.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateEtfIsaGrowth() {
    const init = parseFloat(document.getElementById('etf-init')?.value) || 0;
    const monthly = parseFloat(document.getElementById('etf-monthly')?.value) || 0;
    const years = Math.max(1, parseInt(document.getElementById('etf-years')?.value) || 10);
    const annualReturn = (parseFloat(document.getElementById('etf-return')?.value) || 7) / 100;
    const dividendYield = (parseFloat(document.getElementById('etf-dividend')?.value) || 1.5) / 100;
    const wrapper = document.getElementById('etf-wrapper')?.value || 'isa';

    const totalGrowthRate = annualReturn;
    const monthlyRate = totalGrowthRate / 12;
    const months = years * 12;

    let balance = init;
    let totalDeposits = init;

    for (let m = 0; m < months; m++) {
        balance = (balance + monthly) * (1 + monthlyRate);
        totalDeposits += monthly;
    }

    const totalGrowth = Math.max(0, balance - totalDeposits);
    const estimatedDividends = balance * (dividendYield / (totalGrowthRate || 0.01)) * 0.25;

    // Estimate CGT saved if in ISA wrapper
    const cgtExemption = 3000;
    const taxableProfit = Math.max(0, totalGrowth - cgtExemption);
    const cgtSaved = taxableProfit * 0.20; // 20% CGT rate for stocks/shares above exemption

    const resTotal = document.getElementById('etf-res-total');
    const resDeposits = document.getElementById('etf-res-deposits');
    const resGrowth = document.getElementById('etf-res-growth');
    const resDividends = document.getElementById('etf-res-dividends');
    const resCgtSaved = document.getElementById('etf-res-cgt-saved');
    const taxBadge = document.getElementById('etf-tax-badge');

    if (resTotal) resTotal.innerText = `£${Math.round(balance).toLocaleString('en-GB')}`;
    if (resDeposits) resDeposits.innerText = `£${Math.round(totalDeposits).toLocaleString('en-GB')}`;
    if (resGrowth) resGrowth.innerText = `£${Math.round(totalGrowth).toLocaleString('en-GB')}`;
    if (resDividends) resDividends.innerText = `£${Math.round(estimatedDividends).toLocaleString('en-GB')}`;
    if (resCgtSaved) resCgtSaved.innerText = `£${Math.round(cgtSaved).toLocaleString('en-GB')}`;

    if (taxBadge) {
        if (wrapper === 'isa') {
            taxBadge.className = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 mt-2 border border-emerald-500/30';
            taxBadge.innerHTML = '<i class="fa-solid fa-shield-halved mr-1.5"></i> 100% Tax Free under ISA Rules';
        } else {
            taxBadge.className = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 mt-2 border border-amber-500/30';
            taxBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-1.5"></i> Taxable GIA (Est. CGT: £${Math.round(cgtSaved).toLocaleString('en-GB')})`;
        }
    }
}

// Auto calculate on load if element exists
setTimeout(calculateEtfIsaGrowth, 100);
