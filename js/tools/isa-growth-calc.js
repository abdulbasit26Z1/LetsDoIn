/* UK STOCKS & SHARES ISA GROWTH CALCULATOR */

const TOOL_ISA_GROWTH = {
    id: 'isa-growth-calc',
    name: 'UK Stocks & Shares ISA Growth Calculator',
    category: 'Finance',
    icon: 'fa-piggy-bank',
    color: 'from-emerald-600 via-teal-600 to-slate-900',
    shortDesc: 'Calculate tax-free compound growth within the £20,000 annual UK ISA allowance and compare against taxable brokerage accounts.',
    seoDesc: 'Free UK Stocks & Shares ISA Growth Calculator 2026. Calculate tax-free ISA compound interest growth, annual £20,000 allowance limits, and HMRC tax savings.',
    render: () => renderIsaGrowthTool(),
    init: () => calculateIsaGrowth()
};

function renderIsaGrowthTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-piggy-bank"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Stocks &amp; Shares ISA Growth Calculator</h2>
                        <p class="text-xs text-slate-500">Project tax-free wealth accumulation within HMRC's £20,000 annual ISA allowance limit.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Initial ISA Lump Sum (£)</label>
                            <input type="number" id="isa-init" value="5000" oninput="calculateIsaGrowth()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                        </div>

                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Monthly Contribution (£)</label>
                                <span id="isa-annual-badge" class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">Annual: £11,000 / £20,000 limit</span>
                            </div>
                            <input type="number" id="isa-monthly" value="500" oninput="calculateIsaGrowth()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Expected Return (%)</label>
                                <input type="number" id="isa-rate" value="7.0" step="0.5" oninput="calculateIsaGrowth()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Duration (Years)</label>
                                <input type="number" id="isa-years" value="15" min="1" max="50" oninput="calculateIsaGrowth()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Non-ISA Income Tax Band (for Comparison)</label>
                            <select id="isa-tax-band" onchange="calculateIsaGrowth()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                                <option value="basic">Basic Rate (20% Income / 10% CGT / 8.75% Dividend)</option>
                                <option value="higher" selected>Higher Rate (40% Income / 20% CGT / 33.75% Dividend)</option>
                                <option value="additional">Additional Rate (45% Income / 20% CGT / 39.35% Dividend)</option>
                            </select>
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Estimated Tax-Free ISA Portfolio Value</span>
                            <span class="text-3xl font-black text-white mt-1 block" id="isa-res-total">£162,143</span>
                            <span class="text-xs text-emerald-300 mt-1 block" id="isa-res-growth">Tax-Free Gains: £67,143</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Total Invested Contributions:</span>
                                <span class="font-bold text-slate-200" id="isa-res-invested">£95,000</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-400">Estimated HMRC Tax Saved vs GIA:</span>
                                <span class="font-bold text-emerald-400" id="isa-res-tax-saved">£12,828</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ISA Allowance Warning Box -->
                <div id="isa-warning-box" class="hidden p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs space-y-1">
                    <p class="font-bold"><i class="fa-solid fa-triangle-exclamation mr-1.5"></i> HMRC Annual ISA Limit Exceeded!</p>
                    <p>Your total annual contribution of <span id="isa-warning-amount" class="font-bold">£0</span> exceeds the £20,000 maximum tax year allowance. Only £20,000 per tax year can be shielded inside an ISA; excess funds must be held in a taxable General Investment Account (GIA).</p>
                </div>

                <!-- Compound Growth Milestones Table -->
                <div class="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    <h3 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">ISA Portfolio Growth Timeline</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">
                                <tr>
                                    <th class="p-2.5 rounded-l-lg">Timeline</th>
                                    <th class="p-2.5">Total Contributions</th>
                                    <th class="p-2.5">Tax-Free Gains</th>
                                    <th class="p-2.5 rounded-r-lg">ISA Value</th>
                                </tr>
                            </thead>
                            <tbody id="isa-timeline-body" class="divide-y divide-slate-100 dark:divide-slate-800">
                                <!-- Populated dynamically -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateIsaGrowth() {
    const init = parseFloat(document.getElementById('isa-init')?.value) || 0;
    const monthly = parseFloat(document.getElementById('isa-monthly')?.value) || 0;
    const ratePercent = parseFloat(document.getElementById('isa-rate')?.value) || 0;
    const years = parseInt(document.getElementById('isa-years')?.value) || 1;
    const band = document.getElementById('isa-tax-band')?.value || 'higher';

    const monthlyRate = ratePercent / 100 / 12;
    const months = years * 12;

    const annualContribution = init + (monthly * 12);
    const annualBadge = document.getElementById('isa-annual-badge');
    const warningBox = document.getElementById('isa-warning-box');
    const warningAmount = document.getElementById('isa-warning-amount');

    if (annualBadge) {
        annualBadge.innerText = `Year 1: £${Math.round(annualContribution).toLocaleString('en-GB')} / £20,000 limit`;
        if (annualContribution > 20000) {
            annualBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300';
            if (warningBox) warningBox.classList.remove('hidden');
            if (warningAmount) warningAmount.innerText = `£${Math.round(annualContribution).toLocaleString('en-GB')}`;
        } else {
            annualBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300';
            if (warningBox) warningBox.classList.add('hidden');
        }
    }

    let totalISA = init;
    let totalInvested = init;

    for (let i = 0; i < months; i++) {
        totalISA = (totalISA + monthly) * (1 + monthlyRate);
        totalInvested += monthly;
    }

    const gains = totalISA - totalInvested;

    // HMRC Tax saved calculation vs GIA (General Investment Account)
    // In GIA: £3,000 CGT allowance applies. Remaining gain taxed at 10% (basic) or 20% (higher/additional).
    const cgtRate = band === 'basic' ? 0.10 : 0.20;
    const taxableGainGIA = Math.max(0, gains - 3000);
    const taxSaved = taxableGainGIA * cgtRate;

    const resTotal = document.getElementById('isa-res-total');
    const resGrowth = document.getElementById('isa-res-growth');
    const resInvested = document.getElementById('isa-res-invested');
    const resTaxSaved = document.getElementById('isa-res-tax-saved');

    if (resTotal) resTotal.innerText = `£${Math.round(totalISA).toLocaleString('en-GB')}`;
    if (resGrowth) resGrowth.innerText = `Tax-Free Gains: £${Math.round(gains).toLocaleString('en-GB')}`;
    if (resInvested) resInvested.innerText = `£${Math.round(totalInvested).toLocaleString('en-GB')}`;
    if (resTaxSaved) resTaxSaved.innerText = `£${Math.round(taxSaved).toLocaleString('en-GB')}`;

    // Populate timeline table
    const timelineBody = document.getElementById('isa-timeline-body');
    if (timelineBody) {
        let html = '';
        const intervals = [1, 5, 10, 15, 20, 25, 30].filter(y => y <= years || (y === 5 && years < 5));
        if (!intervals.includes(years)) intervals.push(years);
        intervals.sort((a, b) => a - b);

        intervals.forEach(y => {
            let mCount = y * 12;
            let val = init;
            let inv = init;
            for (let m = 0; m < mCount; m++) {
                val = (val + monthly) * (1 + monthlyRate);
                inv += monthly;
            }
            let g = val - inv;
            html += `
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td class="p-2.5 font-bold text-slate-900 dark:text-white">Year ${y}</td>
                    <td class="p-2.5">£${Math.round(inv).toLocaleString('en-GB')}</td>
                    <td class="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">+£${Math.round(g).toLocaleString('en-GB')}</td>
                    <td class="p-2.5 font-extrabold text-slate-900 dark:text-white">£${Math.round(val).toLocaleString('en-GB')}</td>
                </tr>
            `;
        });
        timelineBody.innerHTML = html;
    }
}

setTimeout(calculateIsaGrowth, 100);
