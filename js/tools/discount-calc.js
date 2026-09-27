function calcDiscount() {
    const orig = parseFloat(document.getElementById('disc-orig').value) || 0;
    const pct = parseFloat(document.getElementById('disc-pct').value) || 0;
    document.getElementById('disc-res-final').innerText = '£' + (orig * (1 - pct / 100)).toFixed(2);
}

const TOOL_DISCOUNT_CALC = {
    id: 'discount-calc',
    name: 'Discount & Sale Savings Calculator',
    category: 'Utilities',
    icon: 'fa-tags',
    color: 'text-pink-500 bg-pink-50 dark:bg-pink-950/50',
    shortDesc: 'Determine final price and money saved during high street clearance sales.',
    seoDesc: 'Calculate sale savings and final prices for discounted shopping.',
    render: () => `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
                <div><label class="block text-xs font-bold uppercase mb-1">Original Price (£)</label><input type="number" id="disc-orig" value="75.00" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"></div>
                <div><label class="block text-xs font-bold uppercase mb-1">Discount (%)</label><input type="number" id="disc-pct" value="30" class="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"></div>
                <button onclick="calcDiscount()" class="w-full py-2.5 bg-pink-600 text-white font-bold rounded-xl">Calculate Discount</button>
            </div>
            <div class="p-5 bg-pink-50/50 dark:bg-slate-800/80 rounded-2xl border border-pink-100 dark:border-slate-700 flex flex-col justify-center">
                <span class="text-xs text-slate-500 uppercase font-bold">Final Sale Price</span>
                <div id="disc-res-final" class="text-3xl font-extrabold text-pink-600 mt-1">£52.50</div>
            </div>
        </div>
    `,
    init: () => calcDiscount()
};
