/* UK STAMP DUTY LAND TAX (SDLT) CALCULATOR */

const TOOL_SDLT_CALC = {
    id: 'sdlt-calc',
    name: 'UK Stamp Duty (SDLT) Calculator',
    category: 'Finance',
    icon: 'fa-house-chimney-crack',
    color: 'from-blue-700 via-indigo-700 to-slate-900',
    shortDesc: 'Calculate UK Stamp Duty Land Tax (SDLT) for primary homes, first-time buyers, and additional buy-to-let properties in England & Northern Ireland.',
    seoDesc: 'Free UK Stamp Duty Land Tax (SDLT) calculator 2026. Estimate SDLT for first-time buyers, main residence moves, and second homes.'
};

function renderSdltCalcTool() {
    return `
        <div class="space-y-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div class="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-700 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-house-chimney-crack"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">UK Stamp Duty Land Tax (SDLT) Calculator</h2>
                        <p class="text-xs text-slate-500">Calculate exact SDLT rates for England &amp; Northern Ireland property purchases.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Property Purchase Price (£)</label>
                            <input type="number" id="sdlt-price" value="350000" oninput="calculateSdltTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Buyer Status</label>
                            <select id="sdlt-buyer-type" onchange="calculateSdltTax()" class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="first">First-Time Buyer (Relief up to £425k)</option>
                                <option value="next" selected>Next Home / Moving Main Residence</option>
                                <option value="additional">Additional Property / Buy-to-Let (+5% Surcharge)</option>
                            </select>
                        </div>
                    </div>

                    <div class="p-6 rounded-2xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                        <div>
                            <span class="text-xs text-indigo-400 font-bold uppercase tracking-wider block">Total SDLT Payable</span>
                            <span class="text-3xl font-black text-white mt-1 block" id="sdlt-total-result">£3,500</span>
                            <span class="text-xs text-slate-400 mt-1 block" id="sdlt-effective-rate">Effective Tax Rate: 1.00%</span>
                        </div>

                        <div class="border-t border-slate-800 pt-4 space-y-2 text-xs">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Property Price:</span>
                                <span class="font-bold" id="sdlt-breakdown-price">£350,000</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-400">SDLT Banded Tax:</span>
                                <span class="font-bold text-emerald-400" id="sdlt-breakdown-tax">£3,500</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateSdltTax() {
    const price = parseFloat(document.getElementById('sdlt-price')?.value) || 0;
    const buyer = document.getElementById('sdlt-buyer-type')?.value || 'next';

    let tax = 0;

    if (buyer === 'first') {
        if (price <= 425000) {
            if (price > 250000) tax = (price - 250000) * 0.05;
        } else if (price <= 625000) {
            tax = (425000 - 250000) * 0.05 + (price - 425000) * 0.05;
        } else {
            tax = calculateStandardSdlt(price);
        }
    } else {
        tax = calculateStandardSdlt(price);
        if (buyer === 'additional') {
            tax += price * 0.05;
        }
    }

    const effective = price > 0 ? ((tax / price) * 100).toFixed(2) : '0.00';

    const resElem = document.getElementById('sdlt-total-result');
    const effElem = document.getElementById('sdlt-effective-rate');
    const prElem = document.getElementById('sdlt-breakdown-price');
    const taxElem = document.getElementById('sdlt-breakdown-tax');

    if (resElem) resElem.innerText = `£${Math.round(tax).toLocaleString('en-GB')}`;
    if (effElem) effElem.innerText = `Effective Tax Rate: ${effective}%`;
    if (prElem) prElem.innerText = `£${Math.round(price).toLocaleString('en-GB')}`;
    if (taxElem) taxElem.innerText = `£${Math.round(tax).toLocaleString('en-GB')}`;
}

function calculateStandardSdlt(price) {
    let t = 0;
    if (price > 250000) {
        const b1 = Math.min(price, 925000) - 250000;
        t += b1 * 0.05;
    }
    if (price > 925000) {
        const b2 = Math.min(price, 1500000) - 925000;
        t += b2 * 0.10;
    }
    if (price > 1500000) {
        t += (price - 1500000) * 0.12;
    }
    return t;
}

setTimeout(calculateSdltTax, 100);
