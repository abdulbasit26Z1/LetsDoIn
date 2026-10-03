/* UK CAPITAL GAINS TAX (CGT) ALLOWANCE & ESTIMATOR CALCULATOR */

const TOOL_CGT_CALCULATOR = {
    id: 'cgt-calculator',
    name: 'UK Capital Gains Tax (CGT) Allowance Calculator',
    category: 'Finance',
    icon: 'fa-sack-dollar',
    color: 'from-blue-600 via-indigo-800 to-slate-900',
    shortDesc: 'Calculate UK Capital Gains Tax on ETF sales, shares, crypto, and property using HMRC\'s reduced £3,000 annual exempt allowance.',
    seoDesc: 'Free UK Capital Gains Tax (CGT) Calculator 2026. Calculate tax on ETF share sales, crypto, and property with the £3,000 HMRC exempt allowance.',
    render: () => renderCgtCalculatorTool(),
    init: () => calculateCgtTax()
};

function renderCgtCalculatorTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-800 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-sack-dollar"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Capital Gains Tax (CGT) Allowance Calculator</h2>
                        <p class="text-xs text-slate-500">Calculate HMRC tax on ETF, stock, crypto, and property sale profits using the £3,000 Annual Exempt Allowance.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Asset Type</label>
                            <select id="cgt-asset-type" onchange="calculateCgtTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="shares" selected>ETFs, Shares, Crypto &amp; General Assets (10% Basic / 20% Higher)</option>
                                <option value="property">Residential Property (18% Basic / 24% Higher)</option>
                            </select>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Sale / Disposal Price (£)</label>
                                <input type="number" id="cgt-sale" value="18000" oninput="calculateCgtTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Purchase Price (£)</label>
                                <input type="number" id="cgt-buy" value="10000" oninput="calculateCgtTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Broker &amp; Legal Fees (£)</label>
                                <input type="number" id="cgt-expenses" value="100" oninput="calculateCgtTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Prior Capital Losses (£)</label>
                                <input type="number" id="cgt-losses" value="0" oninput="calculateCgtTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Income Tax Band</label>
                            <select id="cgt-tax-band" onchange="calculateCgtTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="basic">Basic Rate Taxpayer (Income up to £50,270)</option>
                                <option value="higher" selected>Higher / Additional Rate Taxpayer (Income > £50,270)</option>
                            </select>
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-indigo-400 font-bold uppercase tracking-wider block">Estimated CGT Bill Payable</span>
                            <span class="text-3xl font-black text-white mt-1 block" id="cgt-result-tax">£980</span>
                            <span class="text-xs text-emerald-400 mt-1 block" id="cgt-result-allowance">HMRC £3,000 Annual Exempt Allowance Applied</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Total Net Gain / Profit:</span>
                                <span class="font-bold text-slate-200" id="cgt-gross-gain">£7,900</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-400">Taxable Gain (after £3k allowance):</span>
                                <span class="font-bold text-amber-400" id="cgt-taxable-gain">£4,900</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-400">Effective CGT Rate Applied:</span>
                                <span class="font-bold text-indigo-300" id="cgt-effective-rate">20.0%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- HMRC Rule Note -->
                <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                    <div class="flex items-center space-x-2 font-bold text-slate-900 dark:text-white">
                        <i class="fa-solid fa-circle-info text-indigo-500 text-sm"></i>
                        <span>HMRC 2024/2025/2026 CGT Rules Summary</span>
                    </div>
                    <p>HMRC reduced the Capital Gains Tax Annual Exempt Allowance (AEA) to <strong>£3,000 per tax year</strong> for individuals. Gains inside a Stocks &amp; Shares ISA or pension are 100% tax-free and do not use up this allowance.</p>
                </div>
            </div>
        </div>
    `;
}

function calculateCgtTax() {
    const sale = parseFloat(document.getElementById('cgt-sale')?.value) || 0;
    const buy = parseFloat(document.getElementById('cgt-buy')?.value) || 0;
    const expenses = parseFloat(document.getElementById('cgt-expenses')?.value) || 0;
    const losses = parseFloat(document.getElementById('cgt-losses')?.value) || 0;
    const asset = document.getElementById('cgt-asset-type')?.value || 'shares';
    const band = document.getElementById('cgt-tax-band')?.value || 'higher';

    const rawGain = sale - buy - expenses;
    const grossGain = Math.max(0, rawGain - losses);

    const allowance = 3000;
    const taxableGain = Math.max(0, grossGain - allowance);

    let rate = 0.20;
    if (asset === 'property') {
        rate = band === 'basic' ? 0.18 : 0.24;
    } else {
        rate = band === 'basic' ? 0.10 : 0.20;
    }

    const tax = taxableGain * rate;

    const tElem = document.getElementById('cgt-result-tax');
    const aElem = document.getElementById('cgt-result-allowance');
    const gElem = document.getElementById('cgt-gross-gain');
    const tgElem = document.getElementById('cgt-taxable-gain');
    const rElem = document.getElementById('cgt-effective-rate');

    if (tElem) tElem.innerText = `£${Math.round(tax).toLocaleString('en-GB')}`;
    if (aElem) {
        if (grossGain <= 3000) {
            aElem.innerText = `£0 Tax Due! Profit is within £3,000 Annual Allowance.`;
            aElem.className = 'text-xs text-emerald-400 font-bold mt-1 block';
        } else {
            aElem.innerText = `HMRC £3,000 Annual Exempt Allowance Applied`;
            aElem.className = 'text-xs text-indigo-300 mt-1 block';
        }
    }
    if (gElem) gElem.innerText = `£${Math.round(grossGain).toLocaleString('en-GB')}`;
    if (tgElem) tgElem.innerText = `£${Math.round(taxableGain).toLocaleString('en-GB')}`;
    if (rElem) rElem.innerText = `${(rate * 100).toFixed(0)}%`;
}

setTimeout(calculateCgtTax, 100);
