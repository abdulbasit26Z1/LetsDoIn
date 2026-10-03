/* UK DRIP (DIVIDEND REINVESTMENT PLAN) CALCULATOR */

const TOOL_DRIP_CALCULATOR = {
    id: 'drip-calculator',
    name: 'DRIP (Dividend Reinvestment Plan) Calculator',
    category: 'Finance',
    icon: 'fa-arrows-rotate',
    color: 'from-emerald-700 via-teal-800 to-slate-900',
    shortDesc: 'Model how automatically reinvesting ETF and stock dividends exponentially accelerates long-term wealth growth vs cash payouts.',
    seoDesc: 'Free Dividend Reinvestment Plan (DRIP) Calculator UK. Calculate compound dividend growth, extra shares accumulated, and wealth acceleration.',
    render: () => renderDripCalculatorTool(),
    init: () => calculateDrip()
};

function renderDripCalculatorTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-800 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-arrows-rotate"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">DRIP (Dividend Reinvestment Plan) Calculator</h2>
                        <p class="text-xs text-slate-500">Compare automatic dividend reinvestment against cash dividend payouts to see compounding in action.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Initial Portfolio (£)</label>
                                <input type="number" id="drip-init" value="10000" oninput="calculateDrip()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Monthly Deposit (£)</label>
                                <input type="number" id="drip-monthly" value="250" oninput="calculateDrip()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Dividend Yield (%)</label>
                                <input type="number" id="drip-yield" value="3.5" step="0.1" oninput="calculateDrip()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Share Growth (%)</label>
                                <input type="number" id="drip-growth" value="5.5" step="0.5" oninput="calculateDrip()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Div Growth Rate (%)</label>
                                <input type="number" id="drip-div-growth" value="3.0" step="0.5" oninput="calculateDrip()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Time Horizon (Years)</label>
                                <input type="number" id="drip-years" value="20" min="1" max="50" oninput="calculateDrip()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                            </div>
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Portfolio Value WITH DRIP Reinvestment</span>
                            <span class="text-3xl font-black text-white mt-1 block" id="drip-res-with">£184,320</span>
                            <span class="text-xs text-emerald-300 mt-1 block" id="drip-res-boost">+£42,850 Extra Gained via DRIP!</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Value WITHOUT DRIP (Cash Dividends):</span>
                                <span class="font-bold text-slate-300" id="drip-res-without">£141,470</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-400">Cumulative Dividend Income Earned:</span>
                                <span class="font-bold text-sky-400" id="drip-res-cumulative-div">£56,200</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- DRIP Comparison Table -->
                <div class="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    <h3 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">DRIP vs Cash Dividend Comparison Timeline</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">
                                <tr>
                                    <th class="p-2.5 rounded-l-lg">Timeline</th>
                                    <th class="p-2.5">Without DRIP</th>
                                    <th class="p-2.5">With DRIP</th>
                                    <th class="p-2.5 rounded-r-lg">DRIP Extra Wealth</th>
                                </tr>
                            </thead>
                            <tbody id="drip-timeline-body" class="divide-y divide-slate-100 dark:divide-slate-800">
                                <!-- Dynamic -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateDrip() {
    const init = parseFloat(document.getElementById('drip-init')?.value) || 0;
    const monthly = parseFloat(document.getElementById('drip-monthly')?.value) || 0;
    const divYieldPercent = parseFloat(document.getElementById('drip-yield')?.value) || 0;
    const growthPercent = parseFloat(document.getElementById('drip-growth')?.value) || 0;
    const years = parseInt(document.getElementById('drip-years')?.value) || 1;

    const monthlyGrowth = growthPercent / 100 / 12;
    const monthlyYield = divYieldPercent / 100 / 12;
    const months = years * 12;

    // Simulation With DRIP (reinvesting monthly dividends)
    let valWithDrip = init;
    let valNoDrip = init;
    let totalCashDivs = 0;

    for (let m = 0; m < months; m++) {
        // DRIP reinvests dividend back into portfolio
        const mDivDrip = valWithDrip * monthlyYield;
        valWithDrip = (valWithDrip + monthly + mDivDrip) * (1 + monthlyGrowth);

        // No DRIP payouts dividend as cash outside portfolio
        const mDivNoDrip = valNoDrip * monthlyYield;
        totalCashDivs += mDivNoDrip;
        valNoDrip = (valNoDrip + monthly) * (1 + monthlyGrowth);
    }

    const boost = valWithDrip - valNoDrip;

    const resWith = document.getElementById('drip-res-with');
    const resBoost = document.getElementById('drip-res-boost');
    const resWithout = document.getElementById('drip-res-without');
    const resDiv = document.getElementById('drip-res-cumulative-div');

    if (resWith) resWith.innerText = `£${Math.round(valWithDrip).toLocaleString('en-GB')}`;
    if (resBoost) resBoost.innerText = `+£${Math.round(boost).toLocaleString('en-GB')} Extra Gained via DRIP Compounding!`;
    if (resWithout) resWithout.innerText = `£${Math.round(valNoDrip).toLocaleString('en-GB')}`;
    if (resDiv) resDiv.innerText = `£${Math.round(totalCashDivs).toLocaleString('en-GB')}`;

    // Timeline table
    const timelineBody = document.getElementById('drip-timeline-body');
    if (timelineBody) {
        let html = '';
        const intervals = [1, 5, 10, 15, 20, 25, 30].filter(y => y <= years);
        if (!intervals.includes(years)) intervals.push(years);
        intervals.sort((a, b) => a - b);

        intervals.forEach(y => {
            let mCount = y * 12;
            let vWith = init;
            let vNo = init;
            for (let m = 0; m < mCount; m++) {
                let divD = vWith * monthlyYield;
                vWith = (vWith + monthly + divD) * (1 + monthlyGrowth);
                vNo = (vNo + monthly) * (1 + monthlyGrowth);
            }
            let diff = vWith - vNo;
            html += `
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td class="p-2.5 font-bold text-slate-900 dark:text-white">Year ${y}</td>
                    <td class="p-2.5">£${Math.round(vNo).toLocaleString('en-GB')}</td>
                    <td class="p-2.5 font-extrabold text-emerald-600 dark:text-emerald-400">£${Math.round(vWith).toLocaleString('en-GB')}</td>
                    <td class="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">+£${Math.round(diff).toLocaleString('en-GB')}</td>
                </tr>
            `;
        });
        timelineBody.innerHTML = html;
    }
}

setTimeout(calculateDrip, 100);
