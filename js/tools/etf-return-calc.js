/* S&P 500 / GLOBAL ETF RETURN & DIVIDEND CALCULATOR (GBP £) */

const ETF_PRESETS = {
    vusa: { name: 'Vanguard S&P 500 (VUSA / VUSD)', return: 10.5, dividend: 1.3, ocf: 0.07, desc: 'Tracks S&P 500 index. Popular UK choice for US mega-cap tech & broad market growth.' },
    vwrp: { name: 'Vanguard FTSE All-World (VWRP / VWRL)', return: 8.5, dividend: 1.8, ocf: 0.22, desc: 'Global equities ETF covering 3,700+ large & mid-cap stocks across 49 countries.' },
    eqqq: { name: 'Invesco EQQQ Nasdaq-100 (EQQQ)', return: 14.0, dividend: 0.6, ocf: 0.30, desc: 'Focuses on top 100 non-financial tech leaders including Apple, Microsoft, NVIDIA.' },
    isf: { name: 'iShares Core FTSE 100 (ISF)', return: 6.5, dividend: 3.8, ocf: 0.07, desc: 'Top 100 UK blue-chip dividend payers like Shell, AstraZeneca, HSBC, BP.' }
};

const TOOL_ETF_RETURN = {
    id: 'etf-return-calc',
    name: 'S&P 500 & Global ETF Return Calculator (GBP £)',
    category: 'Finance',
    icon: 'fa-chart-line',
    color: 'from-blue-600 via-indigo-700 to-slate-900',
    shortDesc: 'Calculate compound growth, dividend payouts, and TER fund expense fees in GBP (£) for popular UK ETFs like VUSA, VWRP, EQQQ, and ISF.',
    seoDesc: 'Free UK ETF Dividend & Compound Return Calculator 2026. Model Vanguard VUSA, VWRP, Invesco EQQQ, and iShares FTSE 100 growth in GBP (£).',
    render: () => renderEtfReturnTool(),
    init: () => calculateEtfReturn()
};

function renderEtfReturnTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-chart-line"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">S&amp;P 500 &amp; Global ETF Return Calculator (GBP £)</h2>
                        <p class="text-xs text-slate-500">Project Vanguard, Invesco &amp; iShares ETF portfolio growth, dividend yield &amp; OCF fees in Pounds Sterling.</p>
                    </div>
                </div>

                <!-- ETF Quick Preset Selection Buttons -->
                <div class="space-y-2">
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Select Popular UK ETF Preset</label>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <button type="button" onclick="applyEtfPreset('vusa')" class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-indigo-500 text-left transition focus:ring-2 focus:ring-indigo-500">
                            <span class="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 block">VUSA / VUSD</span>
                            <span class="text-[10px] text-slate-500 block">S&amp;P 500 (10.5% avg)</span>
                        </button>
                        <button type="button" onclick="applyEtfPreset('vwrp')" class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-indigo-500 text-left transition focus:ring-2 focus:ring-indigo-500">
                            <span class="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 block">VWRP / VWRL</span>
                            <span class="text-[10px] text-slate-500 block">All-World (8.5% avg)</span>
                        </button>
                        <button type="button" onclick="applyEtfPreset('eqqq')" class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-indigo-500 text-left transition focus:ring-2 focus:ring-indigo-500">
                            <span class="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 block">EQQQ</span>
                            <span class="text-[10px] text-slate-500 block">Nasdaq-100 (14.0% avg)</span>
                        </button>
                        <button type="button" onclick="applyEtfPreset('isf')" class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-indigo-500 text-left transition focus:ring-2 focus:ring-indigo-500">
                            <span class="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 block">ISF</span>
                            <span class="text-[10px] text-slate-500 block">FTSE 100 (6.5% avg)</span>
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">ETF Name / Ticker</label>
                            <input type="text" id="etf-name" value="Vanguard S&P 500 (VUSA)" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Initial Lump Sum (£)</label>
                                <input type="number" id="etf-init" value="3000" oninput="calculateEtfReturn()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Monthly Deposit (£)</label>
                                <input type="number" id="etf-monthly" value="300" oninput="calculateEtfReturn()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                        </div>

                        <div class="grid grid-cols-3 gap-2">
                            <div>
                                <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Return (%)</label>
                                <input type="number" id="etf-return" value="10.5" step="0.1" oninput="calculateEtfReturn()" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Dividend (%)</label>
                                <input type="number" id="etf-dividend" value="1.3" step="0.1" oninput="calculateEtfReturn()" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">OCF/TER (%)</label>
                                <input type="number" id="etf-ocf" value="0.07" step="0.01" oninput="calculateEtfReturn()" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Time Horizon (Years)</label>
                            <input type="number" id="etf-years" value="20" min="1" max="50" oninput="calculateEtfReturn()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-indigo-400 font-bold uppercase tracking-wider block" id="etf-result-title">Projected Portfolio Value (GBP £)</span>
                            <span class="text-3xl font-black text-white mt-1 block" id="etf-res-total">£218,940</span>
                            <span class="text-xs text-emerald-400 mt-1 block" id="etf-res-profit">Total Gross Capital Gain: £143,940</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Total Invested Capital:</span>
                                <span class="font-bold text-slate-200" id="etf-res-invested">£75,000</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-400">Total Dividends Earned:</span>
                                <span class="font-bold text-sky-400" id="etf-res-dividends">£18,240</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-400">Total Fund Expense (TER/OCF) Paid:</span>
                                <span class="font-bold text-rose-400" id="etf-res-ter">£1,420</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ETF Portfolio Growth Milestones -->
                <div class="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    <h3 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">ETF Portfolio Milestones (in GBP £)</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">
                                <tr>
                                    <th class="p-2.5 rounded-l-lg">Years</th>
                                    <th class="p-2.5">Total Invested</th>
                                    <th class="p-2.5">Dividends</th>
                                    <th class="p-2.5">Total Value (£)</th>
                                </tr>
                            </thead>
                            <tbody id="etf-timeline-body" class="divide-y divide-slate-100 dark:divide-slate-800">
                                <!-- Dynamic -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function applyEtfPreset(key) {
    const preset = ETF_PRESETS[key];
    if (!preset) return;

    const nameElem = document.getElementById('etf-name');
    const returnElem = document.getElementById('etf-return');
    const divElem = document.getElementById('etf-dividend');
    const ocfElem = document.getElementById('etf-ocf');

    if (nameElem) nameElem.value = preset.name;
    if (returnElem) returnElem.value = preset.return;
    if (divElem) divElem.value = preset.dividend;
    if (ocfElem) ocfElem.value = preset.ocf;

    calculateEtfReturn();
}

function calculateEtfReturn() {
    const init = parseFloat(document.getElementById('etf-init')?.value) || 0;
    const monthly = parseFloat(document.getElementById('etf-monthly')?.value) || 0;
    const grossReturnRate = parseFloat(document.getElementById('etf-return')?.value) || 0;
    const divRate = parseFloat(document.getElementById('etf-dividend')?.value) || 0;
    const ocfRate = parseFloat(document.getElementById('etf-ocf')?.value) || 0;
    const years = parseInt(document.getElementById('etf-years')?.value) || 1;

    // Net rate after OCF fee
    const netReturnRate = Math.max(0, grossReturnRate - ocfRate) / 100 / 12;
    const divMonthlyRate = divRate / 100 / 12;
    const months = years * 12;

    let portfolioValue = init;
    let totalInvested = init;
    let totalDividends = 0;
    let totalTerFees = 0;

    for (let m = 0; m < months; m++) {
        // TER monthly fee subtracted from portfolio
        const monthlyTerFee = portfolioValue * (ocfRate / 100 / 12);
        totalTerFees += monthlyTerFee;

        const monthlyDiv = portfolioValue * divMonthlyRate;
        totalDividends += monthlyDiv;

        portfolioValue = (portfolioValue + monthly) * (1 + netReturnRate);
        totalInvested += monthly;
    }

    const gains = portfolioValue - totalInvested;

    const resTotal = document.getElementById('etf-res-total');
    const resProfit = document.getElementById('etf-res-profit');
    const resInvested = document.getElementById('etf-res-invested');
    const resDividends = document.getElementById('etf-res-dividends');
    const resTer = document.getElementById('etf-res-ter');

    if (resTotal) resTotal.innerText = `£${Math.round(portfolioValue).toLocaleString('en-GB')}`;
    if (resProfit) resProfit.innerText = `Total Gross Capital Gain: £${Math.round(gains).toLocaleString('en-GB')}`;
    if (resInvested) resInvested.innerText = `£${Math.round(totalInvested).toLocaleString('en-GB')}`;
    if (resDividends) resDividends.innerText = `£${Math.round(totalDividends).toLocaleString('en-GB')}`;
    if (resTer) resTer.innerText = `£${Math.round(totalTerFees).toLocaleString('en-GB')}`;

    // Timeline table
    const timelineBody = document.getElementById('etf-timeline-body');
    if (timelineBody) {
        let html = '';
        const intervals = [1, 5, 10, 15, 20, 25, 30].filter(y => y <= years);
        if (!intervals.includes(years)) intervals.push(years);
        intervals.sort((a, b) => a - b);

        intervals.forEach(y => {
            let mCount = y * 12;
            let pVal = init;
            let inv = init;
            let divs = 0;
            for (let m = 0; m < mCount; m++) {
                divs += pVal * divMonthlyRate;
                pVal = (pVal + monthly) * (1 + netReturnRate);
                inv += monthly;
            }
            html += `
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td class="p-2.5 font-bold text-slate-900 dark:text-white">Year ${y}</td>
                    <td class="p-2.5">£${Math.round(inv).toLocaleString('en-GB')}</td>
                    <td class="p-2.5 text-sky-600 dark:text-sky-400 font-bold">£${Math.round(divs).toLocaleString('en-GB')}</td>
                    <td class="p-2.5 font-extrabold text-slate-900 dark:text-white">£${Math.round(pVal).toLocaleString('en-GB')}</td>
                </tr>
            `;
        });
        timelineBody.innerHTML = html;
    }
}

setTimeout(calculateEtfReturn, 100);
