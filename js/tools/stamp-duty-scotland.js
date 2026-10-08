const TOOL_STAMP_DUTY_SCOTLAND = {
    id: 'stamp-duty-scotland',
    name: 'Scotland LBTT & Wales LTT Property Tax Calculator',
    category: 'Finance',
    icon: 'fa-house-flag',
    color: 'from-blue-600 to-indigo-600',
    shortDesc: 'Calculate Land and Buildings Transaction Tax (LBTT Scotland) and Land Transaction Tax (LTT Wales) on residential property purchases.',
    seoDesc: 'Calculate Scottish LBTT and Welsh LTT property tax purchase rates for main homes, first-time buyers, and additional properties.',
    render: () => `
        <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Region</label>
                    <select id="lbtt-region" onchange="calcLBTT()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="scotland">Scotland (Revenue Scotland LBTT)</option>
                        <option value="wales">Wales (Welsh Revenue Authority LTT)</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Property Purchase Price (£)</label>
                    <input type="number" id="lbtt-price" value="280000" step="5000" oninput="calcLBTT()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Buyer Type</label>
                    <select id="lbtt-buyer" onchange="calcLBTT()" class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="first">First Time Buyer</option>
                        <option value="main" selected>Moving Home (Main Residence)</option>
                        <option value="additional">Additional Property / Buy to Let</option>
                    </select>
                </div>
            </div>

            <div id="lbtt-result" class="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 space-y-3">
                <!-- Result -->
            </div>
        </div>
    `
};

function calcLBTT() {
    const region = document.getElementById('lbtt-region')?.value || 'scotland';
    const price = parseFloat(document.getElementById('lbtt-price')?.value) || 0;
    const buyer = document.getElementById('lbtt-buyer')?.value || 'main';

    let tax = 0;
    let addTax = 0;

    if (region === 'scotland') {
        const threshold = buyer === 'first' ? 175000 : 145000;
        if (price > 750000) tax += (price - 750000) * 0.12 + (750000 - 325000) * 0.10 + (325000 - 250000) * 0.05 + (250000 - threshold) * 0.02;
        else if (price > 325000) tax += (price - 325000) * 0.10 + (325000 - 250000) * 0.05 + (250000 - threshold) * 0.02;
        else if (price > 250000) tax += (price - 250000) * 0.05 + (250000 - threshold) * 0.02;
        else if (price > threshold) tax += (price - threshold) * 0.02;

        if (buyer === 'additional') addTax = price * 0.06; // ADS 6%
    } else {
        if (price > 1000000) tax += (price - 1000000) * 0.12 + (1000000 - 750000) * 0.10 + (750000 - 400000) * 0.075 + (400000 - 225000) * 0.06;
        else if (price > 750000) tax += (price - 750000) * 0.10 + (750000 - 400000) * 0.075 + (400000 - 225000) * 0.06;
        else if (price > 400000) tax += (price - 400000) * 0.075 + (400000 - 225000) * 0.06;
        else if (price > 225000) tax += (price - 225000) * 0.06;

        if (buyer === 'additional') addTax = price * 0.04;
    }

    const totalTax = tax + addTax;
    const effectiveRate = price > 0 ? (totalTax / price) * 100 : 0;

    const elem = document.getElementById('lbtt-result');
    if (elem) {
        elem.innerHTML = `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-slate-800">
                    <span class="block text-[10px] uppercase font-bold text-slate-500">Standard ${region.toUpperCase()} Tax</span>
                    <span class="text-xl font-extrabold text-blue-600">£${Math.round(tax).toLocaleString()}</span>
                </div>
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-slate-800">
                    <span class="block text-[10px] uppercase font-bold text-slate-500">Additional Surcharge</span>
                    <span class="text-xl font-extrabold text-amber-600">£${Math.round(addTax).toLocaleString()}</span>
                </div>
                <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-slate-800">
                    <span class="block text-[10px] uppercase font-bold text-slate-500">Total Tax Due</span>
                    <span class="text-xl font-extrabold text-indigo-600">£${Math.round(totalTax).toLocaleString()}</span>
                </div>
            </div>
            <div class="text-xs text-slate-600 dark:text-slate-400 font-semibold text-center pt-2">
                Effective Tax Rate: <strong class="text-indigo-600">${effectiveRate.toFixed(2)}%</strong>
            </div>
        `;
    }
}

setTimeout(calcLBTT, 200);
