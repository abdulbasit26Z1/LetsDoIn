function calcVAT() {
    const amt = parseFloat(document.getElementById('vat-amount').value) || 0;
    const rate = parseFloat(document.getElementById('vat-rate').value) / 100;
    const mode = document.getElementById('vat-mode').value;

    let net, vat, gross;
    if (mode === 'add') {
        net = amt;
        vat = amt * rate;
        gross = net + vat;
    } else {
        gross = amt;
        net = amt / (1 + rate);
        vat = gross - net;
    }

    document.getElementById('vat-res-net').innerText = '£' + net.toFixed(2);
    document.getElementById('vat-res-tax').innerText = '£' + vat.toFixed(2);
    document.getElementById('vat-res-gross').innerText = '£' + gross.toFixed(2);
}

const TOOL_VAT_CALCULATOR = {
    id: 'vat-calculator',
    name: 'UK VAT Calculator (20% & 5%)',
    category: 'Finance',
    icon: 'fa-percent',
    color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50',
    shortDesc: 'Calculate Value Added Tax (VAT) at standard 20% or reduced 5% rates instantly.',
    seoDesc: 'Free UK VAT Calculator. Easily add or remove 20% standard rate or 5% reduced rate UK VAT from gross or net amounts.',
    render: () => `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">Amount (£)</label>
                    <input type="number" id="vat-amount" value="150.00" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-bold focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">VAT Rate</label>
                        <select id="vat-rate" class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none">
                            <option value="20">20% (Standard)</option>
                            <option value="5">5% (Reduced)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">Action</label>
                        <select id="vat-mode" class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none">
                            <option value="add">Add VAT (+20%)</option>
                            <option value="remove">Remove VAT (-20%)</option>
                        </select>
                    </div>
                </div>
                <button onclick="calcVAT()" class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition shadow-md">
                    Calculate VAT
                </button>
            </div>
            <div class="bg-indigo-50/50 dark:bg-slate-800/80 p-5 rounded-2xl border border-indigo-100 dark:border-slate-700 space-y-3">
                <div>
                    <span class="text-xs text-slate-500 font-semibold uppercase">Net Amount (excl. VAT)</span>
                    <div id="vat-res-net" class="text-xl font-bold text-slate-800 dark:text-slate-100">£125.00</div>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700 pt-2">
                    <span class="text-xs text-slate-500 font-semibold uppercase">VAT Amount</span>
                    <div id="vat-res-tax" class="text-xl font-bold text-indigo-600 dark:text-indigo-400">£25.00</div>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700 pt-2">
                    <span class="text-xs text-slate-500 font-semibold uppercase">Gross Total (incl. VAT)</span>
                    <div id="vat-res-gross" class="text-2xl font-extrabold text-slate-900 dark:text-white">£150.00</div>
                </div>
            </div>
        </div>
    `,
    init: () => calcVAT()
};
